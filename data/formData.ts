export interface InputData {
    location: string,
    date: string,
    url: string,
    description: string
}

export const defaultInputData = {
    location: 'new observation title',
    date: '2025-04-01',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Supposed_UFO%2C_Passaic%2C_New_Jersey.jpg/500px-Supposed_UFO%2C_Passaic%2C_New_Jersey.jpg',
    description: 'this is description'
}