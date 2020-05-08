import React from "react";
import {BrowserRouter,Route} from "react-router-dom";

import LandingPage from "./pages/general/landing-page";
import LoginPage from "./pages/general/login-page";
import SignupPage from "./pages/general/signup-page";
import HomePage from "./pages/general/home-page";

import AddExpense from "./pages/expenses/add-expense";
import ExpensesPage from "./pages/expenses/expenses-page";
import EditExpense from "./pages/expenses/edit-expense";
import AllExpenses from  "./pages/expenses/all-expenses";

import AddSale from "./pages/sales/add-sale";
import SalesPage from "./pages/sales/sales-page";
import EditSale from "./pages/sales/edit-sale";
import AllSales from  "./pages/sales/all-sales";

import CreditorsPage from "./pages/creditors/creditors-page";
import AllCreditors from "./pages/creditors/all-creditors";
import AddCreditor from "./pages/creditors/add-creditor";
import EditCreditor from "./pages/creditors/edit-creditor";

import DebtorsPage from "./pages/debtors/debtors-page";
import AllDebtors from "./pages/debtors/all-debtors";
import AddDebtor from "./pages/debtors/add-debtor";
import EditDebtor from "./pages/debtors/edit-debtor";

import IncomeStatement from "./pages/reports/income";


// import SideNav2 from "./components/sidenav2";

export default () => (
    
    <BrowserRouter>
        <div>
            <Route exact path = "/" render={() => <LandingPage  />} /> 
            <Route exact path = "/login" component = {LoginPage} />
            <Route exact path = "/signup" component = {SignupPage} />
            <Route exact path = "/home" component = {HomePage} />

            <Route exact path = "/add-expense" component = {AddExpense} />
            <Route exact path = "/expenses" render = {() => <ExpensesPage/> }/>
            <Route exact path = "/edit-expense" render = {() => <EditExpense/> }/>
            <Route exact path = "/all-expenses" render = {() => <AllExpenses/> }/>

            <Route exact path = "/all-sales" render = {() => <AllSales/> }/>
            <Route exact path = "/add-sale" render = {() => <AddSale/> }/>
            <Route exact path = "/edit-sale" render = {() => <EditSale/> }/>
            <Route exact path = "/sales" render = {() => <SalesPage/> }/>

            <Route exact path = "/all-creditors" render = {() => <AllCreditors/> }/>
            <Route exact path = "/creditors" render = {() => <CreditorsPage/> }/>
            <Route exact path = "/add-creditor" render = {() => <AddCreditor/> }/>
            <Route exact path = "/edit-creditor" render = {() => <EditCreditor/> }/>


            <Route exact path = "/all-debtors" render = {() => <AllDebtors/> }/>
            <Route exact path = "/debtors" render = {() => <DebtorsPage/> }/>
            <Route exact path = "/add-debtor" render = {() => <AddDebtor/> }/>
            <Route exact path = "/edit-debtor" render = {() => <EditDebtor/> }/>
            <Route exact path = "/statement-1" render = {() => <IncomeStatement/> }/>

            {/* <Route exact path = "/test" component = {SideNav2}/> */}
        </div>

    </BrowserRouter>
)