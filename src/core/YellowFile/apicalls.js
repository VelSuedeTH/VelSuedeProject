import { API } from '../../backend'

export const getYellowFileCategory = () => {
    return fetch(`${API}yellowfile/yf_category`, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log(err));
};


export const getYellowFileTypeChange = () => {
    return fetch(`${API}yellowfile/yf_cng_type`, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log(err));
};


export const getYellowFileTypeEffect = () => {
    return fetch(`${API}yellowfile/yf_cng_effect_type`, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log(err));
};


export const getYellowFileStorage = () => {
    return fetch(`${API}yellowfile/yf_apq`, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log(err));
};


export const getProductProcess = () => {
    return fetch(`${API}products/product_process`, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log(err));
};


