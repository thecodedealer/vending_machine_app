import RequestService from '../requestService'


class AuthClient extends RequestService{
    #request
    #testRequest
    #baseURL = 'https://vending-app-c1b48.firebaseio.com/'

    constructor() {
        super();

        //create new request instance
        this.#request = this.createInstance(this.#baseURL)

    }

    /*
       ENDPOINTS
     */
    checkCredentials(POST) {
        return this.#request.post('admin.json', POST)
    }

}

export default new AuthClient()
