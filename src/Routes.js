import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import ModelPage from "./core/pmodel/ModelPage";
import CustomerPage from "./core/customer/CustomerPage";
import YellowFilePage from "./core/YellowFile/YellowFilePage";
import Signin from "./user/Signin";
import YellowFileForm from "./core/YellowFile/Components/YellowFileForm";



const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/signin" component={Signin} />
                <Route path="/yellowfile" component={YellowFilePage} />
                <Route path="/yellowfile-form1" component={YellowFileForm} />
                <Route path="/model" component={ModelPage} />
                <Route path="/customer" component={CustomerPage} />
                

                <PrivateRoutes path="/" exact component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;