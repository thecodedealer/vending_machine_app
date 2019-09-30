import log from 'loglevel'

/**
 *  HANDLE INTERNAL ERRORS
 * @param error {Object} - error object
 * @param msg {String} - custom message
 */
export const handleError = (error, msg = "") => {
    if (!!msg)
        log.error(msg)
    throw error
}
