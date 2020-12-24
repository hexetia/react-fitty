/**
 * @jest-environment node
 */
const puppeteer = require('puppeteer');
const waitOn = require('wait-on');

const serverOps = {
    resources: ['http://localhost:1234/'],
    delay: 1000, // initial delay in ms, default 0
    simultaneous: 1, // limit to 1 connection per resource at a time
    timeout: 30_000, // timeout in ms, default Infinity
    validateStatus: function(status: number) {
        return status >= 200 && status < 300;
    },
};

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
