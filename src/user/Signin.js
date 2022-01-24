import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth/helper';
import Base from '../core/Base';



const Signin = () => {
    const [values, setValues] = useState({
        name: "",
        userCode: "1809",
        password: "Intira2017",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    })

    const { name, userCode, password, error, success, loading, didRedirect } = values;

    const handleChange = (userCode) =>
        (event) => {
        setValues({ ...values, error: false, [userCode]: event.target.value });
        };

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({userCode, password})
        .then((data) => {
            console.log("DATA", data);
            if (data.token) {
                // let sessionToken = data.token
                authenticate(data, () => {
                    console.log("TOKEN ADDED");
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
            } else {
                setValues({
                    ...values,
                    loading: false
                })
            }
        })
        .catch(err => console.log(err))
    }; 

    const performRedirect = () => {
        if (isAuthenticated()) {
          return <Redirect to="/" />;
        }
      };

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>

            )
        )
    }

    // const successMessage = () => {
    //     return (
    //       <div className="row">
    //         <div className="col-md-6 offset-sm-3 text-left">
    //           <div
    //             className="alert alert-success"
    //             style={{ display: success ? "" : "none" }}
    //           >
    //             New account created successfully. Please <Link
    //               to="/signin"
    //             >
    //               login now.
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   };
    
    //   const errorMessage = () => {
    //     return (
    //       <div className="row">
    //         <div className="col-md-6 offset-sm-3 text-left">
    //           <div
    //             className="alert alert-danger"
    //             style={{ display: error ? "" : "none" }}
    //           >
    //             Check all fields again
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   };
    
      const signinForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-light">User ID :</label>
                  <input
                    className="form-control"
                    value={userCode}
                    onChange={handleChange("userCode")}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">Password :</label>
                  <input
                    className="form-control"
                    value={password}
                    onChange={handleChange("password")}
                    type="password"
                  />
                </div>
                <button
                  onClick={onSubmit}
                  className="btn btn-success btn-block"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      };

    return (
        <Base title="Vel-Suede (Thailand)" desc="welcome to Vel-Suede System">
            {loadingMessage()}

            {signinForm()}
            {/* <p className="text-center">
                {JSON.stringify(values)}
            </p> */}

            {performRedirect()}

        </Base>
    )
}

export default Signin;
