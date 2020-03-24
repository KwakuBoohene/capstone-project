import React from "react";
import {Redirect} from "react-router";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';

export default class EditExpenses extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ename : "",
            amount : "",
            date : "",
            redirect: false,
            userid: 1,
            id: Number(localStorage.getItem('editexpense')),
        };
        this.Change = this.Change.bind(this);
        this.editFormData = this.editFormData.bind(this);
        this.onUpdate =  this.onUpdate.bind(this);
        this.validate = this.validate.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    getExpenseData(){
                axios.get('http://localhost:5000/expenses/single/' + String(this.state.id)
        )
        .then(res => {
        const expense = res.data;
        expense.map(expense =>
        this.setState({ 
            ename:expense.expense_name,
            amount:expense.amount,
            date: expense.date
             })
        )

      })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount(){
        console.log(localStorage.removeItem('editexpense'))
        this.getExpenseData();
    }
    Change = e => {
        this.setState({
        [e.target.name]: e.target.value
    });
    
    };

    getDate(){
        var today = new Date().toISOString().split('T')[0];
        var date =  String(today);
        return date;
    }

    editFormData(){
    axios
        
        .post('http://localhost:5000/expenses/update',
        {
            'ename':this.state.ename,
            'amount':this.state.amount,
            'date':this.state.date,
            'id':this.state.id,
        })
        .then(response =>{
            console.log(response);
            alert('expense updated');
            this.setState({redirect: true})
            
        })
        .catch(error =>{
            console.log(error);
            alert(error);
        })


    }

    deleteExpense(){
        axios
        
        .post('http://localhost:5000/expenses/delete',
        {
            'delete':this.state.id,
        })
        .then(response =>{
            console.log(response);
            alert('expense deleted');
            this.setState({redirect: true})
            
        })
        .catch(error =>{
            console.log(error);
            alert(error);
        })

    }

    Change = e => {
        this.setState({
        [e.target.name]: e.target.value
        });
        var item = e.target.name;
        console.log(this.state);
    };

    validate = e => {
        if(this.state.name==""||this.state.amount==""){
            alert("Please fill name and amount form");
            return false;
        }
        if(this.state.date==""){
            this.setState(
                {date: this.getDate(),}
            )
            return true;
        }else{
            return true;
        }
    };

    onUpdate = e => {
        var validate = this.validate();
        if(validate==true){
            this.editFormData();
        }
    };

    render(){
        return(
            <div className="">
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <SideNav/>

                        <div className="col col-sm-10 container">
                            <div className="row">
                                <div className="col col-sm-9">
                                    <h3>Please input the details of your expense here</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Name of the expense</label>
                                            <input type="text"
                                            name = "ename" onChange = {e => this.Change(e)}
                                            className="form-control" placeholder="What are you spending on" 
                                            value={this.state.ename} />
                                        </div>

                                        <div className="form-group">
                                            <label>amount</label>
                                            <input type="number" name= "amount" onChange = {e => this.Change(e)}
                                             className="form-control" placeholder="How much are you spending" value={this.state.amount}/>
                                        </div>

                                        <div className="form-group">
                                            <label>Date</label>
                                            <input type="date" name="date" placeholder="YYYY-MM-DD" required 
                                             
                                            className="form-control" onChange = {e => this.Change(e)}
                                            title="Enter a date in this format YYYY-MM-DD" value={this.state.date}/>
                                            *Default date would be the current date*
                                            
                                        </div>

                                        {/* <input type="submit" value="Proceed" className = "btn btn-danger btn-block"/> */}
                                        <button type="button" className="btn btn-success btn-block"
                                         onClick = {this.onUpdate}>
                                            Update
                                        </button>
                                        <button type="button" className="btn btn-danger btn-block"
                                         onClick = {() => this.deleteExpense()}>
                                            Delete
                                        </button>
                                        

                                    
                                    </form>

                                </div>
                            </div>
                            

                            
                        </div>
                    </div>

                </div>
                {this.state.redirect?<Redirect to="./expenses"/>:null}
                
            </div>
        )
    }

}