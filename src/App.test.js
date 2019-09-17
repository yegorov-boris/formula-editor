import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

describe('formula-editor', () => {
    const testDataPath = './test-data';
    const hardcoded = [
        '{-b \\pm \\sqrt{b^2-4ac} \\over 2a}',
        'x_{1,2}=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}',
        '1 + 2 = 3',
        'f(x) = x^2',
        'g(x) = \\frac{1}{x}',
        'F(x) = \\int^a_b \\frac{1}{3}x^3',
        '\\frac{1}{\\sqrt{x}}',
        '\\begin{matrix} 1 & 0\\\\ 0 & 1 \\end{matrix}',
        '[\n' +
        '\\begin{matrix}\n' +
        '1 & 0\\\\\n' +
        '0 & 1\n' +
        '\\end{matrix}\n' +
        ']',
        '\\left[\n' +
        '\\begin{matrix}\n' +
        '1 & 0\\\\\n' +
        '0 & 1\n' +
        '\\end{matrix}\n' +
        '\\right]',
        '\\left(\\frac{1}{\\sqrt{x}}\\right)',
        'f(x) = x^2\\\\\n' +
        'g(x) = \\frac{1}{x}\\\\\n' +
        'F(x) = \\int^a_b \\frac{1}{3}x^3',
        '1 + 2 = 3\\\\\n' +
        '  1 = 3 - 2',
        'c = \\pm\\sqrt{a^2 + b^2}',
        'x^n + y^n = z^n ',
        '\\alpha \\beta \\gamma \\rho \\sigma \\delta \\epsilon',
        '\\times \\otimes \\oplus \\cup \\cap',
        '\\subset \\supset \\subseteq \\supseteq',
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
            await page.keyboard.type(hardcoded[i]);
            await delay(50);
            await page.click('#SaveJpeg');
            await delay(1000);
            const files = fs.readdirSync(testDataPath);
            const expected = fs.readFileSync(path.join(testDataPath, 'expected', `${i}.jpg`));
            const pathActual = path.join(testDataPath, files[1]);
            const actual = fs.readFileSync(pathActual);
            fs.unlinkSync(pathActual);
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
