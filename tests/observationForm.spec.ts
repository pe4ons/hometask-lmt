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

        await observationPage.fillForm();
        await observationPage.addBtn.click();
        const firstText = page.getByText(defaultInputData.location).first();
        await expect(firstText).toBeVisible();
    });

    test('delete observation', async ({ page }) => {
        const observationPage = new ObservationPage(page);

        await observationPage.fillForm({ location: 'Delete me' });
        await observationPage.addBtn.click();
        await observationPage.deleteBtn.last().click();
        await expect(page.getByText('Delete me')).not.toBeVisible();
    });
});