import { API } from '../../backend'

export const getModel = () => {
    return fetch(`${API}model`, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log(err));
};


export const getCustomer = () => {
    return fetch(`${API}customers`, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log(err));
};


// Create New Model
export const createNewModel = (userId, token, modelData) => {
    const formData = new FormData();
    console.log(modelData);

    for (const name in modelData) {
        formData.append(name, modelData[name])
    }
    
    return fetch(`${API}model/add_model/${userId}/${token}/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };



export const reviceModel = (userId, token, modelData) => {
    const formData = new FormData();
    console.log(modelData);

    for (const name in modelData) {
        formData.append(name, modelData[name])
    }
    
    return fetch(`${API}model/revice_model/${userId}/${token}/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };


export const updateModel = (userId, token, modelData) => {
    const formData = new FormData();
    console.log(modelData);

    for (const name in modelData) {
        formData.append(name, modelData[name])
    }
    
    return fetch(`${API}model/update_new_model/${userId}/${token}/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };


export const removeModel = (userId, token, modelData) => {
    const formData = new FormData();
    console.log(modelData);

    for (const name in modelData) {
        formData.append(name, modelData[name])
    }
    
    return fetch(`${API}model/remove_model/${userId}/${token}/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };


export const cancelModel = (userId, token, modelData) => {
    const formData = new FormData();
    console.log(modelData);

    for (const name in modelData) {
        formData.append(name, modelData[name])
    }
    
    return fetch(`${API}model/cancel_model/${userId}/${token}/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
