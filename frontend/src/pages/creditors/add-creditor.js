import React from "react";
import {Redirect} from "react-router";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';

export default class AddCreditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cname : "",
            amount : "",
            dBorrow : "",
            dPay:"",
            vPay:"",
            redirect: false,
            userid: Number(localStorage.getItem('userid')),
          
            quantity:"",
        };
        this.Change = this.Change.bind(this);
        this.addFormData = this.addFormData.bind(this);
        this.onProceed =  this.onProceed.bind(this);
        this.validate = this.validate.bind(this);
        this.getDate = this.getDate.bind(this);
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

        addFormData(){
        axios
            
            .post('http://localhost:5000/creditors/add',
            {
                'name':this.state.cname,
                'amount':this.state.amount,
                'dBorrow':this.state.dBorrow,
                'dPay': this.state.dPay,
                'vPay': parseInt(this.state.vPay),
                'userid':this.state.userid,
                
            })
            .then(response =>{
                console.log(response);
                alert('sale added');
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
        if(this.state.name===""||this.state.amount===""){
            alert("Please fill out the name, amount and date of Borrowing on the Form");
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

    onProceed = e => {
        var validate = this.validate();
        if(validate==true){
            this.addFormData();
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
                                    <h3>Please input the details of your Creditor here</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text"
                                            name = "cname" onChange = {e => this.Change(e)}
                                            className="form-control" placeholder="Name of the person or the Business" 
                                            value={this.state.cname} />
                                        </div>

                                        <div className="form-group">
                                            <label>Amount / Value</label>
                                            <input type="number" name= "amount" onChange = {e => this.Change(e)}
                                             className="form-control" placeholder="Value of the work done or item(s) bought on credit" value={this.state.amount}/>
                                        </div>


                                        <div className="form-group">
                                            <label>Date Recorded</label>
                                            <input type="date" name="dBorrow" placeholder="YYYY-MM-DD" required 
                                             
                                            className="form-control" onChange = {e => this.Change(e)}
                                            title="Enter a date in this format YYYY-MM-DD" value={this.state.dBorrow}/>
                                            *Default date would be the current date*
                                        </div>

                                        <div className="form-group">
                                            <label>Deadline for Payment</label>
                                            <input type="date" name="dPay" placeholder="YYYY-MM-DD" required 
                                             
                                            className="form-control" onChange = {e => this.Change(e)}
                                            title="Enter a date in this format YYYY-MM-DD" value={this.state.dPay}/>
                                            *Default date would be the current date*
                                        </div>

                                        <div className="form-group">
                                            <label>Payment Made</label>
                                                <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text" for="inputGroupSelect01">Options</label>
                                                </div>
                                                <select class="custom-select" id="inputGroupSelect01" value={this.state.vPay}>
                                                    <option value='1' >Yes</option>
                                                    <option selected value="0" >No</option>
                                                    
                                                </select>
                                                </div>
                                        </div>





                                        {/* <input type="submit" value="Proceed" className = "btn btn-danger btn-block"/> */}
                                        <button type="button" className="btn btn-success btn-block"
                                         onClick = {this.onProceed}>
                                            Proceed
                                        </button>

                                    
                                    </form>

                                </div>
                            </div>
                            

                            
                        </div>
                    </div>

                </div>
                {this.state.redirect?<Redirect to="./all-creditors"/>:null}
                
            </div>
        )
    }

}