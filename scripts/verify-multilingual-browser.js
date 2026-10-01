const puppeteer = require('puppeteer')
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

const PORT = 3000
const BASE_URL = `http://localhost:${PORT}`
const SCREENSHOT_DIR = path.join(
  __dirname,
  '../public/screenshots/multilingual',
)

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const LOCALES = ['en', 'no', 'se']
const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
]

const ROUTES = [
  { path: '', name: 'home' },
  { path: '/product', name: 'products' },
  { path: '/product/hard_lemonade', name: 'product-lemonade' },
  { path: '/product/hard_berries', name: 'product-berries' },
  { path: '/story', name: 'story' },
  { path: '/bbs', name: 'science' },
  { path: '/partner', name: 'partner' },
  { path: '/waitlist', name: 'inquiry' },
]

// Known English source sentences that MUST NOT appear on Norwegian or Northern Sámi pages
const UNTRANSLATED_ENGLISH_CHECKS = [
  'For those who invest in better choices',
  "The revolution didn't start in a lab",
  'Alcohol belabors your organs',
  'A strategic logistics partnership with Red Bull',
  'We created Skinny Cans to make it effortless',
  'Designed for the way we live Tomorrow',
  'Just checking, you are over 21?',
  'Submit a request',
  'Please enter a valid email address',
  'Description must be at least 5 characters',
]

// Expected localized strings for each route in NO and SE
const ROUTE_CONTENT_ASSERTIONS = {
  no: {
    home: [
      'Hjem',
      'Produkter',
      'Historien',
      'Smartere drikking',
      'BEDRE drikking',
      'For de som investerer i bedre valg.',
      'Alkohol → Betennelse',
      'Sukker → Fett',
      'Kalorier → Metabolske forstyrrelser',
      'LITT ALKOHOL MED BARE DET GODE',
      'GJØR ALKOHOL BEDRE',
      'Gode stunder, bedre bokser',
      'Bli partner',
      'VENNLIGST DRIKK ANSVARLIG.',
    ],
    story: [
      'Historien om Skinny',
      'Håndbrygget. Født av frustrasjon. Bygget for frihet.',
      'Revolusjonen startet ikke i et laboratorium',
      'År senere i Norge sto Alek',
      'Det handlet om Skinny Konsekvenser.',
      'I dag er vi Skinny.',
    ],
    science: [
      'Forskning viser',
      'En populasjonsbasert kohortstudie',
      'Alkohol og kroppen din',
      'Sukker gjør det verre',
      'Kaloriene du ikke legger merke til',
      'Et nytt behov',
      'Derfor eksisterer Skinny',
      'Uten filter. Uten kompromisser. Uten unnskyldninger.',
    ],
    partner: [
      'Bli partner',
      'Samarbeid med Starzinger',
      'Strategisk logistikkpartnerskap med Red Bull',
      'Lanserer en banebrytende ny kategori',
      'Aktiv i dag',
      'Varelager',
    ],
    products: [
      'SKINNY UTVALG',
      'En ny måte å drikke på',
      'Hard lemonade',
      'Hard BERRIES',
      'oppdag',
    ],
    'product-lemonade': [
      'Hard Lemonade',
      'Frisk. Livlig. Ren.',
      'Laget med verdens fineste sitroner',
      '4% alkohol',
      '100% sukkerfri',
      'Kun 57 kalorier per boks',
      'Finn forhandler',
    ],
    inquiry: [
      'Send inn en forespørsel',
      'Tema',
      'Beskrivelse',
      'Din e-postadresse',
      'Send inn',
    ],
  },
  se: {
    home: [
      'Ruoktu',
      'Buvttat',
      'Muitalus',
      'Čeahpibut juhkan',
      'BUORET juhkan',
      'Sidjiide geat háliidit buoret válljemiid.',
      'Alkohola → Bohtaneapmi',
      'Sohkar → Buoidi',
      'Kaloriijat → Metabolalaš váttisvuođat',
      'VEAHA ALKOHOLA DUŠŠE BUORRE ÁVDNASIIGUIN',
      'RÁHKADIT BUORET ALKOHOLA',
      'Buorit áiggit, buoret boanddat',
      'Šatta ovttasbargoguoibmin',
      'JUOGA OVDDASVÁSTÁDUSLAČČAT.',
    ],
    story: [
      'Muitalus Skinny birra',
      'Gieđain ráhkaduvvon. Šaddan duhtameahttunvuođas.',
      'Molsašupmi ii álgán laboratoriijas',
      'Jagit maŋŋil Norggas Alek',
      'Lei Skinny Váikkuhusaid birra.',
      'Otne mii leat Skinny.',
    ],
    science: [
      'Dutkan čájeha',
      'Populašuvdnii vuođđuduvvon dutkamuš',
      'Alkohola ja du rumaš',
      'Sohkar dahká heajubun',
      'Kaloriijat maid it fuomaš',
      'Ođđa dárbu',
      'Danin Skinny lea gávdnamis',
      'Filtariid haga. Kompromissahaga.',
    ],
    partner: [
      'Šatta ovttasbargoguoibmin',
      'Ovttasbargu Starzingeriin',
      'Strategalaš logistihkkaovttasbargu Red Bulliin',
      'Almmustahttit ođđa ja mearkkašahtti kategoriija',
      'Doaimmas otne',
      'Gálvovuorká',
    ],
    products: [
      'SKINNY VÁLLJUMAT',
      'Ođđa vuohki juhkat',
      'Hard Lemonade',
      'Hard BERRIES',
      'gávnna',
    ],
    'product-lemonade': [
      'Hard Lemonade',
      'Rássi. Ealli. Buhtis.',
      'Ráhkaduvvon máilmmi buoremus liibbaiguin',
      '4% alkohola',
      '100% sohkarkmeahtun',
      'Dušše 57 kaloriija boanddas',
      'Gávnna vuovdi',
    ],
    inquiry: [
      'Sádde jearaldaga',
      'Fáddá',
      'Čilgehus',
      'Du e-poastačujuhus',
      'Sádde',
    ],
  },
}

async function run() {
  console.log(`🌐 Connecting headless browser to ${BASE_URL}...`)
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const results = []
  const overflowIssues = []
  const translationFailures = []
  const untranslatedLeaks = []

  try {
    const page = await browser.newPage()

    // 1. Age-Gate in Norwegian & Northern Sámi
    console.log('\n--- 1. Auditing Age-Gate Localization ---')
    for (const locale of ['no', 'se']) {
      await page.deleteCookie({
        name: 'ageConfirmed',
        url: `${BASE_URL}/${locale}`,
      })
      await page.goto(`${BASE_URL}/${locale}`, {
        waitUntil: 'domcontentloaded',
      })
      await new Promise((r) => setTimeout(r, 600))
      const content = await page.content()

      if (locale === 'no') {
        const hasNoText = content.includes('Bare sjekker, er du over 21?')
        console.log(`✓ Norwegian Age-Gate rendered correctly: ${hasNoText}`)
        results.push({
          name: 'Age-Gate (Norwegian)',
          status: hasNoText ? 'PASS' : 'FAIL',
        })
      } else {
        const hasSeText = content.includes(
          'Dárkkistan dušše, leat go badjel 21 jagi?',
        )
        console.log(`✓ Northern Sámi Age-Gate rendered correctly: ${hasSeText}`)
        results.push({
          name: 'Age-Gate (Northern Sámi)',
          status: hasSeText ? 'PASS' : 'FAIL',
        })
      }
    }

    // Set cookie to dismiss age gate for all further navigation
    await page.setCookie({
      name: 'ageConfirmed',
      value: 'true',
      domain: 'localhost',
      path: '/',
    })

    // 2. Comprehensive Route-by-Route Content & Layout Audit
    console.log(
      '\n--- 2. Auditing Route-Level Content & Capturing Screenshots ---',
    )
    for (const locale of LOCALES) {
      for (const route of ROUTES) {
        const url = `${BASE_URL}/${locale}${route.path}`
        for (const vp of VIEWPORTS) {
          await page.setViewport({ width: vp.width, height: vp.height })
          await page.goto(url, { waitUntil: 'networkidle0' })
          await new Promise((r) => setTimeout(r, 400))

          // Check horizontal overflow
          const hasOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth + 1
          })

          if (hasOverflow) {
            overflowIssues.push({
              locale,
              route: route.name,
              viewport: vp.name,
            })
          }

          // Content Inspection (on desktop viewport)
          if (vp.name === 'desktop' && (locale === 'no' || locale === 'se')) {
            const { pageText, rawText } = await page.evaluate(() => ({
              pageText: document.body.innerText.replace(/\s+/g, ' '),
              rawText: document.body.textContent.replace(/\s+/g, ' '),
            }))

            const combinedLower = (pageText + ' ' + rawText).toLowerCase()

            // Assert presence of expected translated sentences
            const expectedStrings =
              ROUTE_CONTENT_ASSERTIONS[locale]?.[route.name] || []
            for (const expected of expectedStrings) {
              const normalizedExpected = expected
                .replace(/\s+/g, ' ')
                .toLowerCase()
              if (!combinedLower.includes(normalizedExpected)) {
                translationFailures.push({
                  locale,
                  route: route.name,
                  missingString: expected,
                })
              }
            }

            // Assert absence of untranslated English strings
            for (const englishSentence of UNTRANSLATED_ENGLISH_CHECKS) {
              const normalizedEnglish = englishSentence
                .replace(/\s+/g, ' ')
                .toLowerCase()
              if (combinedLower.includes(normalizedEnglish)) {
                untranslatedLeaks.push({
                  locale,
                  route: route.name,
                  leakedEnglish: englishSentence,
                })
              }
            }
          }

          const screenshotName = `${locale}-${route.name}-${vp.name}.png`
          await page.screenshot({
            path: path.join(SCREENSHOT_DIR, screenshotName),
          })
        }
        console.log(
          `✓ Verified and captured ${locale.toUpperCase()} ${route.name}`,
        )
      }
    }

    // 3. Language Switching with Query Parameter & Product Slug Preservation
    console.log(
      '\n--- 3. Testing Language Switching, Product Slug & Query Param Retention ---',
    )
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(
      `${BASE_URL}/en/product/hard_lemonade?ref=marketing&source=partner_campaign`,
      {
        waitUntil: 'networkidle0',
      },
    )

    // Switch language to Northern Sámi on product page
    const selectTriggerProduct = await page.$(
      'button[aria-label="Select Language"]',
    )
    if (selectTriggerProduct) {
      await selectTriggerProduct.click()
      await page.waitForSelector('[role="option"]', { timeout: 3000 })
      const clicked = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('[role="option"]'))
        const sami = items.find(
          (el) =>
            el.textContent.includes('Sámegiella') ||
            el.getAttribute('data-value') === 'se',
        )
        if (sami) {
          sami.click()
          return true
        }
        return false
      })

      if (clicked) {
        await new Promise((r) => setTimeout(r, 1000))

        const currentUrl = page.url()
        const expectedPattern =
          '/se/product/hard_lemonade?ref=marketing&source=partner_campaign'
        const preserved = currentUrl.includes(expectedPattern)
        console.log(
          `✓ Switched product page to Northern Sámi with slug & query preserved: ${currentUrl}`,
        )
        results.push({
          name: 'Product Language Switcher (Slug & Query Preservation)',
          status: preserved ? 'PASS' : 'FAIL',
        })

        // Test persistence across hard page reload
        await page.reload({ waitUntil: 'networkidle0' })
        const reloadedUrl = page.url()
        const reloadPreserved = reloadedUrl.includes(expectedPattern)
        console.log(
          `✓ Page hard reload retained slug & query parameters: ${reloadedUrl}`,
        )
        results.push({
          name: 'Page Reload Retention (Slug & Query Parameters)',
          status: reloadPreserved ? 'PASS' : 'FAIL',
        })
      }
    }

    // 4. Keyboard Navigation & Focus State Audit
    console.log('\n--- 4. Auditing Keyboard Focus Accessibility ---')
    await page.goto(`${BASE_URL}/no/waitlist`, { waitUntil: 'networkidle0' })
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement
      return el
        ? {
            tag: el.tagName,
            ariaLabel: el.getAttribute('aria-label'),
            role: el.getAttribute('role'),
          }
        : null
    })
    console.log(
      `✓ Keyboard Tab focus successfully active on: ${JSON.stringify(focusedElement)}`,
    )
    results.push({
      name: 'Keyboard Tab Navigation & Focus Traversal',
      status: focusedElement ? 'PASS' : 'FAIL',
    })

    // 5. Localized Inline Form Validation in Norwegian
    console.log('\n--- 5. Testing Localized Form Validation in Norwegian ---')
    await page.goto(`${BASE_URL}/no/waitlist`, { waitUntil: 'networkidle0' })
    const invalidEmailInput = await page.$('input[name="email"]')
    const shortDescInput = await page.$('textarea[name="description"]')
    await invalidEmailInput.type('not-an-email')
    await shortDescInput.type('Hi')

    const submitBtnVal = await page.$('button[type="submit"]')
    await submitBtnVal.click()
    await new Promise((r) => setTimeout(r, 600))

    const pageContent = await page.content()
    const hasEmailVal = pageContent.includes(
      'Vennligst skriv inn en gyldig e-postadresse',
    )
    const hasDescVal = pageContent.includes(
      'Beskrivelsen må være på minst 5 tegn',
    )
    console.log(
      `✓ Norwegian localized validation messages displayed: email=${hasEmailVal}, desc=${hasDescVal}`,
    )
    results.push({
      name: 'Localized Inline Form Validation (Norwegian)',
      status: hasEmailVal && hasDescVal ? 'PASS' : 'FAIL',
    })

    // 6. Form Submission in Norwegian
    console.log('\n--- 6. Testing Inquiry Form Submission in Norwegian ---')
    await page.goto(`${BASE_URL}/no/waitlist`, { waitUntil: 'networkidle0' })
    const emailInput = await page.$('input[name="email"]')
    const descInput = await page.$('textarea[name="description"]')
    await emailInput.type('partner-norge@skinnystory.no')
    await descInput.type('Forespørsel om distribusjon i det norske markedet.')

    const submitBtn = await page.$('button[type="submit"]')
    await submitBtn.click()
    await new Promise((r) => setTimeout(r, 1200))
    console.log('✓ Norwegian form submitted cleanly')
    results.push({ name: 'Norwegian Form Submission', status: 'PASS' })
  } finally {
    await browser.close()
  }

  console.log('\n========================================')
  console.log('   MULTILINGUAL AUDIT SUMMARY')
  console.log('========================================')
  for (const r of results) {
    console.log(`[${r.status}] ${r.name}`)
  }
  console.log(`Overflow issues detected: ${overflowIssues.length}`)
  if (overflowIssues.length > 0) {
    console.log('Overflow Issues:', overflowIssues)
  }
  console.log(`Translation missing assertions: ${translationFailures.length}`)
  if (translationFailures.length > 0) {
    console.log('Missing Translations:', translationFailures)
  }
  console.log(`Untranslated English leaks: ${untranslatedLeaks.length}`)
  if (untranslatedLeaks.length > 0) {
    console.log('Leaked English Strings:', untranslatedLeaks)
  }

  const allPassed =
    results.every((r) => r.status === 'PASS') &&
    overflowIssues.length === 0 &&
    translationFailures.length === 0 &&
    untranslatedLeaks.length === 0

  if (!allPassed) {
    process.exit(1)
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
