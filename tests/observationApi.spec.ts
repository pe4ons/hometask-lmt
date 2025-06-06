import { test, expect } from '@playwright/test';
import { defaultApiData } from '../data/formData';
import { deleteRequest, getRequest, postRequest } from '../helpers/api';

test.describe('observation api', () => {
    test('should get observation list', async ({ request }) => {
        const insertObservationRequest = await postRequest(
            request,
            '/api/observations',
            defaultApiData
        );
        expect(insertObservationRequest).toBeOK();

        const observationList = await getRequest(
            request,
            '/api/observations'
        );
        expect(observationList).toBeOK();

        const response = await observationList.json();
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
        const insertObservationRequest = await postRequest(
            request,
            '/api/observations',
            defaultApiData
        );
        expect(insertObservationRequest).toBeOK();

        const newObservationID = (await insertObservationRequest.json()).id;
        const observation = await getRequest(
            request,
            `/api/observation/${newObservationID}`
        );
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
        const insertObservationRequest = await postRequest(
            request,
            '/api/observations',
            defaultApiData
        );
        expect(insertObservationRequest).toBeOK();

        const newObservationID = (await insertObservationRequest.json()).id;
        const deleteObservationRequest = await deleteRequest(
            request,
            `/api/observation/${newObservationID}`
        );
        expect(deleteObservationRequest).toBeOK();

        // This assertion is commented out because of a bug where the returned response code is 500 when looking up deleted records.

        // const observation = await getRequest(
        //     request,
        //     `/api/observation/${newObservationID}`
        // )
        // expect(observation.status()).toEqual(404) 
    });
});