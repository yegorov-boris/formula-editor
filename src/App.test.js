import puppeteer from 'puppeteer';

it('renders without crashing', () => {
    return (async () => {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('http://localhost:5000');
        await page.focus('#MathInput');
        page.keyboard.type('x');
        await new Promise(r => setTimeout(r, 100));
        await page.click('#SaveJpeg');
        await new Promise(r => setTimeout(r, 300));
        await browser.close();
    })()
});
