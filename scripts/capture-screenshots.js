const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const screenshotDir = path.join(__dirname, '../public/screenshots')
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true })
}

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
]

const routes = [
  { path: '/en', name: 'home' },
  { path: '/en/product', name: 'product-overview' },
  { path: '/en/product/hard_lemonade', name: 'product-lemonade' },
  { path: '/en/story', name: 'story' },
  { path: '/en/bbs', name: 'science' },
  { path: '/en/partner', name: 'partner' },
  { path: '/en/waitlist', name: 'inquiry' },
]

async function capture() {
  console.log('🚀 Launching headless browser for screenshot capture...')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()

  for (const vp of viewports) {
    console.log(
      `\n📸 Capturing ${vp.name.toUpperCase()} (${vp.width}x${vp.height})...`,
    )
    await page.setViewport({ width: vp.width, height: vp.height })

    // 1. Capture Age Gate Modal before setting cookie
    await page.deleteCookie({ name: 'ageConfirmed', domain: 'localhost' })
    await page.goto('http://localhost:3008/en', { waitUntil: 'networkidle0' })
    const modalPath = path.join(screenshotDir, `${vp.name}-age-gate.png`)
    await page.screenshot({ path: modalPath })
    console.log(`  ✓ Saved ${vp.name}-age-gate.png`)

    // 2. Set age gate cookie for subsequent pages
    await page.setCookie({
      name: 'ageConfirmed',
      value: 'true',
      domain: 'localhost',
      path: '/',
    })

    // 3. Capture all routes
    for (const r of routes) {
      await page.goto(`http://localhost:3008${r.path}`, {
        waitUntil: 'networkidle0',
      })
      const routePath = path.join(screenshotDir, `${vp.name}-${r.name}.png`)
      await page.screenshot({ path: routePath })
      console.log(`  ✓ Saved ${vp.name}-${r.name}.png`)
    }

    // 4. If mobile, capture open navigation drawer
    if (vp.name === 'mobile') {
      await page.goto('http://localhost:3008/en', { waitUntil: 'networkidle0' })
      const menuButton = await page.$('button[aria-label="Toggle Menu"]')
      if (menuButton) {
        await menuButton.click()
        await new Promise((resolve) => setTimeout(resolve, 500))
        const drawerPath = path.join(screenshotDir, `mobile-drawer-open.png`)
        await page.screenshot({ path: drawerPath })
        console.log(`  ✓ Saved mobile-drawer-open.png`)
      }
    }
  }

  await browser.close()
  console.log(
    '\n🎉 All browser screenshots captured successfully in public/screenshots/',
  )
}

capture().catch((err) => {
  console.error('❌ Error during browser screenshot capture:', err)
  process.exit(1)
})
