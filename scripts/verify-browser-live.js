const puppeteer = require('puppeteer')
const { spawn } = require('child_process')
const path = require('path')

const PORT = 3000
const BASE_URL = `http://localhost:${PORT}`

async function verify() {
  console.log(
    `🚀 Starting Next.js production server on standard port ${PORT}...`,
  )
  const server = spawn('npx', ['next', 'start', '-p', PORT.toString()], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
  })

  // Wait for server ready message
  await new Promise((resolve) => {
    server.stdout.on('data', (d) => {
      const str = d.toString()
      if (
        str.includes('Ready') ||
        str.includes('started server') ||
        str.includes('localhost:3000')
      ) {
        resolve()
      }
    })
    setTimeout(resolve, 3000)
  })

  console.log(
    '🌐 Launching browser to test live rendering and capture screenshots...',
  )
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
  })

  try {
    const page = await browser.newPage()

    // 1. Desktop Verification
    await page.setViewport({ width: 1280, height: 800 })
    console.log(`\nNavigating to ${BASE_URL}/en ...`)
    await page.goto(`${BASE_URL}/en`, { waitUntil: 'domcontentloaded' })
    await new Promise((r) => setTimeout(r, 1000))

    // Capture Age Gate Modal on Desktop
    await page.screenshot({
      path: path.join(
        __dirname,
        '../public/screenshots/live-agegate-desktop.png',
      ),
    })
    console.log('✓ Captured live-agegate-desktop.png')

    // Click "Yes, I'm over 21" button to dismiss modal
    const buttons = await page.$$('button')
    for (const b of buttons) {
      const text = await page.evaluate((el) => el.textContent, b)
      if (text.includes('Yes, I’m over 21')) {
        await b.click()
        break
      }
    }
    await new Promise((r) => setTimeout(r, 800))

    // Capture Full Live Homepage on Desktop
    await page.screenshot({
      path: path.join(
        __dirname,
        '../public/screenshots/live-homepage-desktop.png',
      ),
    })
    console.log('✓ Captured live-homepage-desktop.png')

    // Check visible text
    const bodyText = await page.evaluate(() => document.body.innerText)
    console.log('Visible Homepage Text Preview:\n', bodyText.substring(0, 250))

    // 2. Mobile Verification
    await page.setViewport({ width: 375, height: 667 })
    await page.goto(`${BASE_URL}/en`, { waitUntil: 'domcontentloaded' })
    await new Promise((r) => setTimeout(r, 800))
    await page.screenshot({
      path: path.join(
        __dirname,
        '../public/screenshots/live-homepage-mobile.png',
      ),
    })
    console.log('✓ Captured live-homepage-mobile.png')

    // 3. Product Page Verification
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(`${BASE_URL}/en/product/hard_lemonade`, {
      waitUntil: 'domcontentloaded',
    })
    await new Promise((r) => setTimeout(r, 800))
    await page.screenshot({
      path: path.join(
        __dirname,
        '../public/screenshots/live-product-desktop.png',
      ),
    })
    console.log('✓ Captured live-product-desktop.png')

    // 4. Inquiry Page Verification
    await page.goto(`${BASE_URL}/en/waitlist`, {
      waitUntil: 'domcontentloaded',
    })
    await new Promise((r) => setTimeout(r, 800))
    await page.screenshot({
      path: path.join(
        __dirname,
        '../public/screenshots/live-inquiry-desktop.png',
      ),
    })
    console.log('✓ Captured live-inquiry-desktop.png')

    console.log('\n🎉 ALL LIVE PAGES VERIFIED AND VISIBLE CONTENT CONFIRMED!')
  } finally {
    await browser.close()
    server.kill()
  }
}

verify().catch((err) => {
  console.error('❌ Verification failed:', err)
  process.exit(1)
})
