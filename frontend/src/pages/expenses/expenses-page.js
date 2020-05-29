import React from "react";
import {Redirect} from "react-router-dom";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';
import ExpenseGraph from '../../components/expenseGraph';

export default class ExpensesPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : Number(sessionStorage.getItem('userid')),
            expense: [],
            redirect: false,
            redirectto: '',
            expensesGraph: [],
            data : {},
        } 
        this.onAddExpense = this.onAddExpense.bind(this);
    }


    componentDidMount(){




        axios.get('http://localhost:5000/expenses/' + String(this.state.id)
        // , {
        //     params: {
        //         id: this.state.id,
        //     }
        // }
        )
        .then(res => {
        const expense = res.data;
        this.setState({ expense });
    
      })
        .catch(function (error) {
            console.log(error);
        });
    }



    editExpense(expenseItem){
        sessionStorage.setItem('editexpense',expenseItem)
        this.setState({
            redirectto: './edit-expense'
        })
        this.setState({
            redirect: true,
        })


    }
    onAddExpense = e => {
        this.setState({
            redirectto: './add-expense'
        })
        this.setState({
            redirect: true,
        })
    }

    AllExpense = e => {
        this.setState({
            redirectto: './all-expenses'
        })
        this.setState({
            redirect: true,
        })
    }
    
    render(){
        return(
            <div className="">
                <Header startPage="/home"/>
                <div className="">
                    <div className="row">
                    <SideNav/>
                        <div className="col-sm-10 container">
                        
                            <ExpenseGraph/>
                        
         
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Expense</th>
                                                    <th scope="col">Expense Amount</th>
                                                    <th scope="col">Date Recorded</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                            { this.state.expense.slice(0, 3).map(expense => 
                                                <tr name={String(expense.expense_id)}>
                                                    <td>{expense.expense_name}</td>
                                                    <td> GHS {expense.amount}.00</td>
                                                    <td>{expense.date}</td>
                                                    <td className="hidden-managers">
                                                    <button type="button" className="btn btn-success" onClick= {() => this.editExpense(expense.expense_id)}>
                                                        Edit
                                                    </button>
                                                    </td>
                                                </tr>
                                                )
                                            }
                                            </tbody>
                                      </table>
                            
                            <div className="row">
                                <div className="col-4">
                                    <button onClick = {this.onAddExpense}
                                    type="button" className="btn btn-danger btn-block">
                                        add Expense
                                    </button>
                                </div>

                                <div className="col-4">

                                </div>

                                <div className="col-4">
                                    <button onClick = {this.AllExpense}
                                    type="button" className="btn btn-success btn-block">
                                        view all expenses
                                    </button>
                                    
                                </div>
                            </div>
                            {this.state.redirect?<Redirect to={this.state.redirectto}/>:null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}