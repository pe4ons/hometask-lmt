import { test, expect } from '@playwright/test';
import { ObservationPage } from '../page/observationPage';

test.describe('foo', () => {
    test('bar', async ({ page }) => {
        const observationPage = new ObservationPage(page);

        await page.goto('http://localhost:8000/');
        await page.waitForTimeout(200);
    })
});