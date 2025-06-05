import { test, expect } from '@playwright/test';
import { ObservationPage } from '../page/observationPage';
import { defaultInputData } from '../data/formData';

test.describe('observation form', () => {
    test.beforeEach(async ({ page }) => {
        const observationPage = new ObservationPage(page);
        await observationPage.openObservationPage();
        await observationPage.newObservationToggle.click();
    });

    test('adding new observation', async ({ page }) => {
        const observationPage = new ObservationPage(page);
        const randomLocation = Math.random().toString(32).substring(2);

        await observationPage.fillForm({ location: randomLocation });
        await observationPage.addBtn.click();
        await expect(page.getByText(randomLocation)).toBeVisible();
    });

    test('delete observation', async ({ page }) => {
        const observationPage = new ObservationPage(page);

        await observationPage.fillForm({ location: 'Delete me' });
        await observationPage.addBtn.click();
        await observationPage.deleteBtn.last().click();
        await expect(page.getByText('Delete me')).not.toBeVisible();
    });
});