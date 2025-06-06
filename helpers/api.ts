import { APIRequestContext} from "@playwright/test";

export async function postRequest(request: APIRequestContext, endpoint: string, data: object) {
    const endpointUrl = `http://localhost:8000${endpoint}`;
    const response = await request.post(endpointUrl, { data });
    return response;
}

export async function getRequest(request: APIRequestContext, endpoint: string) {
    const endpointUrl = `http://localhost:8000${endpoint}`;
    const response = await request.get(endpointUrl);
    return response;
}

export async function deleteRequest(request: APIRequestContext, endpoint: string) {
    const endpointUrl = `http://localhost:8000${endpoint}`;
    const response = await request.delete(endpointUrl);
    return response;
}