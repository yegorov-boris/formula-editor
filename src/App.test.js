import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

describe('formula-editor', () => {
    const testDataPath = './test-data';
    const hardcoded = [
        'abc',
        // '{-b \\pm \\sqrt{b^2-4ac} \\over 2a}'
    ];
    var browser;
    var page;

    beforeAll(() => (async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        page = await browser.newPage();
        await page.goto('http://localhost:5000');
        await page._client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: testDataPath
        });
    })());

    afterAll(() => browser.close());

    it('should render TeX entered by hand', () => (async () => {
        for (const i in hardcoded) {
            await page.focus('#MathInput');
            page.keyboard.type(hardcoded[i]);
            await delay(50);
            await page.click('#SaveJpeg');
            await delay(500);
            const files = fs.readdirSync(testDataPath);
            const expected = fs.readFileSync(path.join(testDataPath, 'expected', `${i}.jpg`));
            const actual = fs.readFileSync(path.join(testDataPath, files[1]));
            expect(expected.length).toEqual(actual.length);
            var isEqual = true;
            expected.forEach((data, j) => {
                if (data !== actual[j]) isEqual = false;
            });
            expect(isEqual).toBeTruthy();
        }
    })());
});

const delay = t => new Promise(r => setTimeout(r, t));
