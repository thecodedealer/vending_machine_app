import axios from 'axios'

class RequestService {
    #instance
    #DEFAULT_TIMEOUT = 2 * 1000

    getDefaultPost() {
        return {
            device: '',
            lang: '',
        }
    }

    createInstance(url) {
        // create instance
        this.#instance = axios.create({
            baseURL: url,
            timeout: this.#DEFAULT_TIMEOUT,
        })
        // set up interceptors
        this.setUpInterceptors()
        // return instance
        return this.#instance
    }

    setUpInterceptors() {
        // Add a request interceptor
        this.#instance.interceptors.request.use((config) => {
            // console.log('request sent')
            // console.log(config)
            // Do something before request is sent
            return config
        }, (error) => {
            // Do something with request error
            return Promise.reject(error)
        })

        // Add a response interceptor
        this.#instance.interceptors.response.use((response) => {
            // console.log('response received')
            // console.log(response)
            // Do something with response data
            return response
        }, (error) => {
            // Do something with response error
            return Promise.reject(error)
        })
    }

    updateSecurityHeader(token) {
        this.#instance.defaults.headers.common['Access-token'] = token
    }
}

export default RequestService
