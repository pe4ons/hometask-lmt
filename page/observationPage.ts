import { type Locator, type Page } from '@playwright/test'
import { InputData, defaultInputData } from '../data/formData';

export class ObservationPage {
    readonly newObservationToggle: Locator;
    readonly locationInput: Locator;
    readonly dateInput: Locator;
    readonly imageUrlInput: Locator;
    readonly descriptionInput: Locator;
    readonly addBtn: Locator;
    readonly deleteBtn: Locator;

    constructor(private readonly page: Page) {
        this.newObservationToggle = page.getByTestId('new-observation-toggle');
        this.locationInput = page.getByTestId('new-observation-location');
        this.dateInput = page.getByTestId('new-observation-date');
        this.imageUrlInput = page.getByTestId('new-observation-image-url');
        this.descriptionInput = page.getByTestId('new-observation-description');
        this.addBtn = page.getByTestId('new-observation-add-button');
        this.deleteBtn = page.getByRole('button', { name: 'delete' });
    }

    async openObservationPage() {
        await this.page.goto('http://localhost:8000/');
    }

    async fillForm(data: Partial<InputData> = defaultInputData) {
        await this.locationInput.fill(data.location ?? defaultInputData.location);
        await this.dateInput.fill(data.date ?? defaultInputData.date);
        await this.imageUrlInput.fill(data.url ?? defaultInputData.url);
        await this.descriptionInput.fill(data.description ?? defaultInputData.description);
    }
}