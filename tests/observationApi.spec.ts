import { test, expect } from '@playwright/test';
import { defaultApiData } from '../data/formData';

test.describe('observation api', () => {
    const urlPrefix = 'http://localhost:8000'

    test('should get observation list', async ({ request }) => {
        const insertObservationRequest = await request.post(`${urlPrefix}/api/observations`, {
            data: defaultApiData
        });
        expect(insertObservationRequest).toBeOK();

        const observationList = await request.get(`${urlPrefix}/api/observations`);
        const response = await observationList.json();

        expect(observationList).toBeOK();
        expect(response).not.toEqual([]);

        [
            'id',
            'location',
            'date',
            'image',
            'description',
        ].forEach(property => expect(response[0]).toHaveProperty(property));
    });

    test('should add new observation', async ({ request }) => {
        const insertObservationRequest = await request.post(`${urlPrefix}/api/observations`, {
            data: defaultApiData
        });

        expect(insertObservationRequest).toBeOK();
        const newObservationID = (await insertObservationRequest.json()).id;

        const observation = await request.get(`${urlPrefix}/api/observation/${newObservationID}`);
        expect(observation).toBeOK();

        const response = await observation.json();
        expect(response).toEqual({
            id: newObservationID,
            location: defaultApiData.location,
            date: defaultApiData.date,
            image: defaultApiData.image,
            description: defaultApiData.description
        });
    });

    test('should delete single observation', async ({ request }) => {
        const insertObservationRequest = await request.post(`${urlPrefix}/api/observations`, {
            data: defaultApiData
        });

        expect(insertObservationRequest).toBeOK();
        const newObservationID = (await insertObservationRequest.json()).id;

        const deleteObservationRequest = await request.delete(`${urlPrefix}/api/observation/${newObservationID}`)
        expect(deleteObservationRequest).toBeOK();

        const observation = await request.get(`${urlPrefix}/api/observation/${newObservationID}`);
        expect(observation.status()).toEqual(500) // 
    });
});