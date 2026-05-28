const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capture console errors
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

  const networkErrors = [];
  page.on('response', res => {
    if (res.url().includes('/api/') && res.status() >= 400) {
      networkErrors.push(`${res.status()} ${res.url()}`);
    }
  });

  console.log('\n=== 1. Loading /register ===');
  await page.goto('http://localhost:3000/register', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/signup-1-loaded.png' });
  console.log('Page loaded. Title:', await page.title());

  // Check what form fields are visible
  const fields = await page.$$eval('input, select', els =>
    els.map(el => ({ type: el.type, name: el.name, placeholder: el.placeholder, id: el.id }))
  );
  console.log('Form fields found:', JSON.stringify(fields, null, 2));

  console.log('\n=== 2. Filling form ===');
  const testEmail = `test_${Date.now()}@example.com`;

  await page.fill('input[type="email"]', testEmail);
  await page.fill('input[type="password"]:first-of-type', 'TestPass123!');

  // Fill confirm password - second password field
  const passwordFields = await page.$$('input[type="password"]');
  if (passwordFields.length > 1) {
    await passwordFields[1].fill('TestPass123!');
  }

  // First name - find by placeholder or position
  const textInputs = await page.$$('input[type="text"]');
  if (textInputs.length >= 1) await textInputs[0].fill('John');
  if (textInputs.length >= 2) await textInputs[1].fill('Doe');

  // Date of birth
  const dateInputs = await page.$$('input[type="date"]');
  if (dateInputs.length >= 1) await dateInputs[0].fill('1990-01-15');

  // Phone number - fill the tel input
  const telInput = await page.$('input[type="tel"]');
  if (telInput) await telInput.fill('07700900123');

  await page.screenshot({ path: '/tmp/signup-2-filled.png' });
  console.log('Form filled with email:', testEmail);

  console.log('\n=== 3. Submitting form ===');
  await page.click('button[type="submit"]');

  // Wait for response
  await page.waitForTimeout(4000);
  await page.screenshot({ path: '/tmp/signup-3-submitted.png' });

  const currentUrl = page.url();
  console.log('URL after submit:', currentUrl);

  // Check for success or error messages
  const successEl = await page.$('text=Account Created');
  const errorEl = await page.$('[class*="red"]');

  console.log('Success element found:', !!successEl);

  if (errorEl) {
    const errorText = await errorEl.textContent();
    console.log('Error text:', errorText?.trim());
  }

  // Check full page text for clues
  const bodyText = await page.evaluate(() => document.body.innerText);
  const relevant = bodyText.split('\n').filter(l =>
    l.includes('error') || l.includes('Error') || l.includes('success') ||
    l.includes('Success') || l.includes('Created') || l.includes('failed') ||
    l.includes('Payment') || l.includes('Registration')
  );
  console.log('Relevant page text:', relevant);

  console.log('\nConsole errors:', consoleErrors);
  console.log('Network errors:', networkErrors);

  await browser.close();
})().catch(e => {
  console.error('SCRIPT ERROR:', e.message);
  process.exit(1);
});
