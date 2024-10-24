import ApiLocalStorage from "../api/api_localstorage";

export const LOG_ERRORS = true

interface PostParams {
    [key: string]: any;
}

export interface ApiResponse extends Response {
    data: any;
    error: string;
    message: string;
}

const handleError = async (response: Response) => {
    const text = await response.text();
    console.error(text)
};

export const basic_get = (url: string) => {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(async (response) => {
        if (!response.ok) {
            return handleError(response)
        }
        return await response.json()
    })
    .catch((error) => {
        if (LOG_ERRORS) {
            console.error("Error in fetch:", error);
            throw error;
        } else {
            //CreateNotify({type: "negative", message: "Internal error"});
        }
        
    });
};

export const basic_post = (url: string, params: PostParams) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
    .then((response) => {
        if (!response.ok) {
            return handleError(response);
        }
        const data = response.json()
        return data
    })
    .catch((error) => {
        if (LOG_ERRORS) {
            console.error("Error in basic_post:", error);
            throw error;
        } else {
            //CreateNotify({type: "negative", message: "Internal error"});
        }
    });
};

export const authenticated_get = (url: string) => {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "max-age=1200",
            "Authorization": `Bearer ${ApiLocalStorage.Token.Get()}`,
        },
    })
    .then((response) => {
        if (response.status < 200 || response.status > 299 ) {
            return handleError(response);
        }
        return response.json();
    })
    .catch((error) => {
        if (LOG_ERRORS) {
            console.error("Error in fetch:", error);
            throw error;
        } else {
            //CreateNotify({type: "negative", message: "Internal error"});
        }
    });
};

export const authenticated_post = (url: string, params: PostParams) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ApiLocalStorage.Token.Get()}`,
        },
        body: JSON.stringify(params)
    })
    .then((response) => {
        if (response.status < 200 || response.status > 299 ) {
            return handleError(response);
        }
        return response.json();
    })
    .catch((error) => {
        if (LOG_ERRORS) {
            console.error("Error in fetch:", error);
            throw error;
        } else {
            //CreateNotify({type: "negative", message: "Internal error"});
        }
    });
};

export const authenticated_put = (url: string, params: PostParams) => {
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ApiLocalStorage.Token.Get()}`,
        },
        body: JSON.stringify(params)
    })
    .then((response) => {
        if (response.status < 200 || response.status > 299 ) {
            return handleError(response);
        }
        return response.json();
    })
    .catch((error) => {
        if (LOG_ERRORS) {
            console.error("Error in fetch:", error);
            throw error;
        } else {
            //CreateNotify({type: "negative", message: "Internal error"});
        }
    });
};

export const authenticated_formdata_post = (url: string, formData: FormData) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${ApiLocalStorage.Token.Get()}`,
        },
        body: formData
    })
    .then((response) => {
        if (response.status < 200 || response.status > 299) {
            return handleError(response);
        }
        return response.json();
    })
    .catch((error) => {
        if (LOG_ERRORS) {
            console.error("Error in fetch:", error);
            throw error;
        } else {
            // CreateNotify({type: "negative", message: "Internal error"});
        }
    });
};