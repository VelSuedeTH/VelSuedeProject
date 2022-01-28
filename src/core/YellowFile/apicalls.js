import { API } from '../../backend'

export const getModel = () => {
    return fetch(`${API}model`, {method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .catch((err) => console.log(err));
};