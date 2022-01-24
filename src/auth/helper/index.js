import { API } from '../../backend'

export const signin = (user) => {
    const formData = new FormData();

    for(const name in user) {
        formData.append(name, user[name])
    }

    // const {email, password} = user;

    // formData.append('userCode', userCode)
    // formData.append('password', password)

    for(var key of formData.keys()) {
        console.log("MYKEY : ", key);
    }

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData
    })
    .then((res) => {
        console.log("SUCCESS", res);
        return res.json()
    })
    .catch((err) => console.log(err))
}


export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
};


export const isAuthenticated = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
      //TODO: compare JWT with database json token
    } else {
      return false;
    }
  };


export const signout = (next) => {
    const userId = isAuthenticated() && isAuthenticated().user.id;

    console.log("UserId : " + userId);

    if (typeof window !== undefined) {
        localStorage.removeItem("jwt")
        // next()

        return fetch(`${API}user/logout/${userId}`, {
            method: "GET"
        })
        .then(res => {
            console.log("Signout success")
            next()
        })
        .catch(err => console.log(err))
    }
}