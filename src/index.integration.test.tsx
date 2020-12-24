/**
 * @jest-environment node
 */
const puppeteer = require('puppeteer');

test('fit parent size', async () => {
    const browser = await puppeteer.launch({
        defaultViewport: {
            width: 1280,
            height: 720,
        },
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:1234/');
    await page.waitForSelector('#fitty', { timeout: 30_000 });

    await page.waitForFunction(() => {
        const fittyText = document.querySelector('#fitty') as HTMLDivElement;
        return fittyText.offsetWidth > 1000 && fittyText.offsetWidth < 1280;
    });

    await browser.close();
}, 45_000);
