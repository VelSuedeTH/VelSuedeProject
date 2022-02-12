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

export const getUsage = () => {
    return fetch(`${API}usage`, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log(err));
};


export const getYellowFileIndex = () => {
    return fetch(`${API}yellowfile/yellow_file`, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log(err));
};


// Create Yellow File
export const createNewYellowFile = (userId, token, data) => {
    const formData = new FormData();
    console.log(data);

    for (const name in data) {
        formData.append(name, data[name])
    }
    console.log(formData);
    return fetch(`${API}yellowfile/yellow_file/add_yellowfile/${userId}/${token}/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

