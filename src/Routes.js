import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import ModelPage from "./core/pmodel/ModelPage";
import Signin from "./user/Signin";


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/signin" component={Signin} />
                <Route path="/model" component={ModelPage} />

                <PrivateRoutes path="/" exact component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;