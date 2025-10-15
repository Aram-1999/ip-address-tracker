export class APIError extends Error {
    constructor(message) {
        super(message)
        this.name = 'APIError'
    }
}

export function handleErrors (error) {
    if (error instanceof APIError) {
        console.log('Failed to fetch the data!')
    } else {
        console.error(error)
    }
}