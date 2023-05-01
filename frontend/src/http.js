import { BASE_URL } from "./constants";

const http = {
    get: (path) => fetch(`${BASE_URL}/${path}`),
    post: (path, body = {}, headers = {}) => fetch(`${BASE_URL}/${path}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(body)
    }),
    postForm: (path, body = {}, headers = {}) => fetch(`${BASE_URL}/${path}`, {
        method: "POST",
        headers: {
            ...headers
        },
        body: body
    }),
    delete: (path, headers = {}) => fetch(`${BASE_URL}/${path}`, {method: "DELETE",headers: {...headers}})
};

export default http;
