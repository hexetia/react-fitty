/**
 * @jest-environment node
 */
import puppeteer from 'puppeteer';

let browser: puppeteer.Browser | undefined = undefined;

test('fit parent size', async () => {
    browser = await puppeteer.launch({
        defaultViewport: {
            width: 1280,
            height: 720,
        },
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:1234/');
    await page.waitForSelector('#example', { timeout: 30_000 });

    await page.waitForFunction(() => {
        const fittyText = document.querySelector('#example') as HTMLDivElement;
        return fittyText.offsetWidth > 1000 && fittyText.offsetWidth <= 1280;
    });

    await page.waitForFunction(() => {
        const fittyText = document.querySelector('#mui') as HTMLDivElement;
        return fittyText.offsetWidth > 1000 && fittyText.offsetWidth <= 1280;
    });

    await page.waitForFunction(() => {
        const fittyText = document.querySelector('#styled') as HTMLDivElement;
        return fittyText.offsetWidth > 1000 && fittyText.offsetWidth <= 1280;
    });
}, 45_000);

afterAll(async () => {
    await browser?.close();
});
