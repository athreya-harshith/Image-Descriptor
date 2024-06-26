class SuccessResponse {
    message?: string
    statusCode?: number
    data: Object[] | Object

    constructor(data: Object[] | Object, message: string = 'Successfully completed the request', statusCode?: number) {
        this.message = message,
            this.statusCode = statusCode
        this.data = data
    }
}
export default SuccessResponse