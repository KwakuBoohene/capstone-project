import React from "react";
import {BrowserRouter,Route} from "react-router-dom";


import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import HomePage from "./pages/home-page";
import AddExpenses from "./pages/expenses/add-expense";
import ExpensesPage from "./pages/expenses/expenses-page";

export default () => (
    <BrowserRouter>
        <div>
            <Route exact path = "/" component ={LandingPage} /> 
            <Route exact path = "/login" component = {LoginPage} />
            <Route exact path = "/signup" component = {SignupPage} />
            <Route exact path = "/home" component = {HomePage} />
            <Route exact path = "/add-expense" component = {AddExpenses} />
            <Route exact path = "/expenses" component = {ExpensesPage}/>
        </div>

    </BrowserRouter>
)