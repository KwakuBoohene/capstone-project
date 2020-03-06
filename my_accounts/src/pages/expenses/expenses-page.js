import React from "react";
import {Redirect} from "react-router";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';

export default class ExpensesPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : 12,
            expense: [],
            redirect: false,
        } 
        this.onAddExpense = this.onAddExpense.bind(this);
    }

    
    componentDidMount(){

        axios.get('http://localhost:5000/expenses/', {
            params: {
                id: this.state.id,
            }
        })
        .then(res => {
        const expense = res.data;
        this.setState({ expense });
        console.log(expense);
      })
        .catch(function (error) {
            console.log(error);
        });
    }

    onAddExpense = e => {
        
        this.setState({
            redirect: true,
        })
    }
    
    render(){
        return(
            <div className="">
                <Header startPage="/home"/>
                <div className="container-fluid">
                    <div className="row">
                    <SideNav/>
                        <div className="col col-sm-10 container">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Expense</th>
                                                    <th scope="col">Expense Amount</th>
                                                    <th scope="col">Date Recorded</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                            { this.state.expense.map(expense => 
                                                <tr>
                                                    <td>{expense.expense_name}</td>
                                                    <td> GHS {expense.amount}.00</td>
                                                    <td>{expense.date_recorded}</td>
                                                </tr>
                                                )
                                            }
                                            </tbody>
                                      </table>
                            
                            <div className="row">
                                <div className="col-4">
                                    <button onClick = {this.onAddExpense}
                                    type="submit" className="btn btn-danger btn-block">
                                        add Expense
                                    </button>
                                </div>
                            </div>
                            {this.state.redirect?<Redirect to="./add-expense"/>:null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}