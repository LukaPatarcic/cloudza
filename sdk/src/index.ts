import { fetchJson } from './fetchJson';

let API_KEY: string | null = null
let URL: string = 'http://localhost:5000'

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
 * @param url the url of the server you are targeting
 * @returns {void}
 */
export function setUrl(url: string) {
    URL = url;
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
    return fetchJson(URL,'/weather', {
        headers: {
            'X-API-KEY': API_KEY
        }
    })
}

export default { setApiKey, setUrl, getWeather };
