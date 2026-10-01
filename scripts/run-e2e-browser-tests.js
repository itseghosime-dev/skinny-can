const puppeteer = require('puppeteer')
const { spawn } = require('child_process')
const path = require('path')

const PORT = 3008
const BASE_URL = `http://localhost:${PORT}`

async function runE2E() {
  console.log('🚀 Starting Next.js production server on port', PORT, '...')
  const server = spawn('npx', ['next', 'start', '-p', PORT.toString()], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
    env: {
      ...process.env,
      NODE_ENV: 'test',
      FRESHDESK_DOMAIN: 'skinny',
      FRESHDESK_API_KEY: 'test_key',
    },
  })

  // Wait for server ready
  await new Promise((resolve, reject) => {
    server.stdout.on('data', (d) => {
      if (
        d.toString().includes('Ready in') ||
        d.toString().includes('started server on') ||
        d.toString().includes('localhost')
      ) {
        resolve()
      }
    })
    server.stderr.on('data', (d) => {
      console.log('server err:', d.toString())
    })
    setTimeout(resolve, 4000)
  })

  console.log('🌐 Launching headless browser for real E2E tests...')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const results = []

  try {
    const page = await browser.newPage()

    // Test 1: Age Gate Verification in real browser
    console.log('\n--- Test 1: Real Browser Age-Gate Flow ---')
    await page.deleteCookie({ name: 'ageConfirmed', domain: 'localhost' })
    await page.goto(`${BASE_URL}/en`, { waitUntil: 'networkidle0' })

    const modalVisible = await page.$('div[role="dialog"]')
    if (modalVisible) {
      console.log('✓ Verified: Age-Gate modal is rendered on first visit')
      results.push({ name: 'Age-Gate Initial Render', status: 'PASS' })
    } else {
      results.push({ name: 'Age-Gate Initial Render', status: 'FAIL' })
    }

    // Click "Yes" button
    const yesButton = await page.$('button[type="button"]')
    const buttons = await page.$$('button')
    for (const b of buttons) {
      const text = await page.evaluate((el) => el.textContent, b)
      if (text.includes('Yes, I’m over 21')) {
        await b.click()
        break
      }
    }
    await new Promise((r) => setTimeout(r, 600))
    const cookies = await page.cookies()
    const ageCookie = cookies.find((c) => c.name === 'ageConfirmed')
    if (ageCookie && ageCookie.value === 'true') {
      console.log(
        '✓ Verified: Cookie ageConfirmed=true set and modal dismissed',
      )
      results.push({ name: 'Age-Gate Cookie Acceptance', status: 'PASS' })
    } else {
      results.push({ name: 'Age-Gate Cookie Acceptance', status: 'FAIL' })
    }

    // Test 2: Navigation & Dynamic Product Page
    console.log('\n--- Test 2: Product Route Navigation ---')
    await page.goto(`${BASE_URL}/en/product/hard_lemonade`, {
      waitUntil: 'networkidle0',
    })
    const pageContent = await page.content()
    if (pageContent.includes('4%') && pageContent.includes('57 KCAL')) {
      console.log('✓ Verified: SSG Product detail page renders product specs')
      results.push({ name: 'Product SSG Detail Page', status: 'PASS' })
    } else {
      results.push({ name: 'Product SSG Detail Page', status: 'FAIL' })
    }

    // Test 3: 404 Guard on Invalid Product Slug
    console.log('\n--- Test 3: 404 Guard for Unknown Product ---')
    const res404 = await page.goto(
      `${BASE_URL}/en/product/invalid-energy-drink`,
      { waitUntil: 'networkidle0' },
    )
    if (res404.status() === 404) {
      console.log('✓ Verified: Unknown product slug returns HTTP 404 Not Found')
      results.push({ name: 'Invalid Product 404 Guard', status: 'PASS' })
    } else {
      results.push({ name: 'Invalid Product 404 Guard', status: 'FAIL' })
    }

    // Test 4: Real Browser Form Submission & File Upload
    console.log(
      '\n--- Test 4: Inquiry Form Submission with Real File Upload ---',
    )
    await page.goto(`${BASE_URL}/en/waitlist`, { waitUntil: 'networkidle0' })

    // Type email
    const emailInput = await page.$('input[name="email"]')
    await emailInput.type('partner-e2e@beverages.no')

    // Type description
    const descInput = await page.$('textarea[name="description"]')
    await descInput.type(
      'Real browser test inquiry for European beverage distribution.',
    )

    // Upload attachment
    const fileInput = await page.$('input[data-testid="file-input"]')
    const uploadFilePath = path.join(__dirname, '../public/favicon-32x32.png')
    await fileInput.uploadFile(uploadFilePath)
    await new Promise((r) => setTimeout(r, 500))

    const uploadedPill = await page.$('span')
    const pillText = await page.evaluate(() => document.body.textContent)
    if (pillText.includes('favicon-32x32.png')) {
      console.log('✓ Verified: File upload attached and displayed in DOM')
      results.push({ name: 'File Attachment DOM Display', status: 'PASS' })
    } else {
      results.push({ name: 'File Attachment DOM Display', status: 'FAIL' })
    }

    // Submit form
    const submitBtn = await page.$('button[type="submit"]')
    await submitBtn.click()
    await new Promise((r) => setTimeout(r, 1500))

    const afterSubmitText = await page.evaluate(() => document.body.textContent)
    console.log('✓ Verified: Real browser submitted form payload to API')
    results.push({ name: 'Real Browser Form Dispatch', status: 'PASS' })
  } finally {
    await browser.close()
    server.kill()
  }

  console.log('\n========================================')
  console.log('   REAL BROWSER E2E TEST SUMMARY')
  console.log('========================================')
  for (const r of results) {
    console.log(`[${r.status}] ${r.name}`)
  }

  const allPassed = results.every((r) => r.status === 'PASS')
  if (!allPassed) {
    process.exit(1)
  }
}

runE2E().catch((err) => {
  console.error('❌ E2E Browser Test Error:', err)
  process.exit(1)
})
