import { fetchJson } from './fetchJson';

let API_KEY: string | null = null

/**
 *
 * @param apiKey the API Key generated from cloudza dashboard
 * @returns {void}
 */
export function setApiKey(apiKey: string) {
    API_KEY = apiKey;
}

/**
 *
 * @returns object returns the weather object for a given location
 * @throws {Error} if setApiKey function is not called prior it will throw an Error
 */
export function getWeather(): Promise<object> {
    if(!API_KEY) {
        throw new Error('Missing API KEY, please call setApiKey before calling other API methods')
    }
    return fetchJson('/weather', {
        headers: {
            'X-API-KEY': API_KEY
        }
    })
}

export default { setApiKey, getWeather };
