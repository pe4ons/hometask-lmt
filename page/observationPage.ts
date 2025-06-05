import { type Locator, type Page } from '@playwright/test'

export class ObservationPage {
    readonly newObservationToggle: Locator;
    readonly locationInput: Locator;
    readonly dateInput: Locator;
    readonly imageUrlInput: Locator;
    readonly descriptionInput: Locator;
    readonly deleteBtn: Locator;

    constructor(private readonly page: Page) {
        this.newObservationToggle = page.getByTestId('new-observation-toggle');
        this.locationInput = page.getByTestId('new-observation-location');
        this.dateInput = page.getByTestId('new-observation-date');
        this.imageUrlInput = page.getByTestId('new-observation-image-url');
        this.descriptionInput = page.getByTestId('new-observation-description');
        this.deleteBtn = page.getByRole('button', { name: 'delete' });
    }

    async openObservationPage() {
        await this.page.goto('http://localhost:8000/');
    }

    async fillForm(location: string, date: string, imageUrl: string, description: string) {
        await this.locationInput.fill(location);
        await this.dateInput.fill(date);
        await this.imageUrlInput.fill(imageUrl);
        await this.descriptionInput.fill(description);
    }
}