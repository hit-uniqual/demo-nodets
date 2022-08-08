export const config = {
  /**
   * App port
   */
  serverPort: process.env.PORT || 3000,
  /**
   * App base url
   * @param {string} path
   */
  baseUrl(path = null) {
    const host = process.env.APP_URL
    const url = `${host}:${this.serverPort}`

    return url + (path ? `/${path}` : '')
  },
  /**
   * Api base url
   * @param {string} path
   */
  apiBaseUrl(path = null) {
    const url = `${this.baseUrl()}/api/v1`
    return url + (path ? `/${path}` : '')
  },
}

export const HTTP_INTERNAL_SERVER = 500
export const HTTP_UNPROCESSABLE = 422
export const HTTP_CONFLICT = 409
export const HTTP_NOT_FOUND = 404
export const HTTP_FORBIDDEN = 403
export const HTTP_UNAUTHORIZE = 401
export const HTTP_BAD_REQUEST = 400

export const APP_KEY = process.env.APP_KEY