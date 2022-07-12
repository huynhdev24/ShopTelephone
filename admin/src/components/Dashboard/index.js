import React from "react";
import Sidebar from "../Sidebar";
import Employees from "../../pages/Employees";
import Products from "../../pages/Products";
import Order from "../../pages/Orders";
import Profile from "../../pages/Profile";
import NotFound from "../../pages/NotFound";
import Overview from "../../pages/Overview";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import "./styles.css";

const Dashboard = () => {
    let match = useRouteMatch();

    return (
        <>
            <Sidebar match={match}/>
            <div className='main-content'>
                <main>
                    <Switch>
                        <Route exact path={`${match.url}`} component={Overview} />
                        <Route path={`${match.url}/users`} component={Employees} />
                        <Route path={`${match.url}/products`} component={Products} />
                        <Route path={`${match.url}/orders`} component={Order} />
                        <Route path={`${match.url}/profile`} component={Profile} />
                        <Route path='/*' component={NotFound} />
                    </Switch>
                </main>
            </div>
        </>
    );
};

export default Dashboard;
