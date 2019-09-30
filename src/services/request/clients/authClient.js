import RequestService from '../requestService'


class AuthClient extends RequestService{
    #request
    #testRequest
    #baseURL = 'https://react-burger-96798.firebaseio.com/'

    constructor() {
        super();

        //create new request instance
        this.#request = this.createInstance(this.#baseURL)

        this.#testRequest = this.createInstance('http://localhost:5000/api/auth/')
    }

    /*
       ENDPOINTS
     */

    login() {
        return this.#testRequest.post('login', {user: 'test', pass: 'test123'})
    }

    getIngredients() {
        return this.#request.get('ingredients.json')
    }
}

export default new AuthClient()
