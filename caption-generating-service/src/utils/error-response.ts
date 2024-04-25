class ErrorResponse {
    message: string
    statusCode: number
    error: Error
    success: boolean = false

    constructor(message: string, statusCode: number, error: Error) {
        this.message = message;
        this.statusCode = statusCode;
        this.error = error
    }
}

export default ErrorResponse