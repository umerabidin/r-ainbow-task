import axios from "axios";

export const getCatchBlockError = (error: unknown) => {
    console.log("axios.isAxiosError(error)  => ", axios.isAxiosError(error));

    if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        if (error.response) {
            // Server responded with a status code outside the range of 2xx
            console.log('error.response.status => ', error.response.status);
            var errorMessage = error.response.data?.message || 'An error occurred';
            if (error.response.status === 500) {
                errorMessage = 'Internal Server Error. Please try again later.';
            }

        } else if (error.request) {
            // No response was received
            errorMessage = `No response received:, ${error.request}`
        } else {
            // Other errors
            errorMessage = `Error in setting up request:${error.message}`
        }
    } else {
        // Non-Axios error
        errorMessage = `Unexpected Error:${error}`
    }
    console.log("errorMessage===> ", errorMessage);

    return errorMessage
}