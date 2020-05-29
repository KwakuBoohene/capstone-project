import React from "react";
import {Redirect} from "react-router-dom";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';

export default class AddSale extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ename : "",
            amount : "",
            date : "",
            redirect: false,
            userid: Number(sessionStorage.getItem('userid')),
          
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
            
            .post('http://localhost:5000/sales/add',
            {
                'description':this.state.ename,
                'amount':this.state.amount,
                'date':this.state.date,
                'userid':this.state.userid,
                'quantity': this.state.quantity,
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

    onProceed = e => {
        var validate = this.validate();
        if(validate===true){
            this.addFormData();
        }
    };

    render(){
        return(
            <div className="">
                <Header/>
                <div className="">
                    <div className="row">
                        <SideNav/>

                        <div className="col col-sm-10 container">
                            <div className="row">
                                <div className="col col-sm-9">
                                    <h3>Please input the details of your sale here</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Name of the sale</label>
                                            <input type="text"
                                            name = "ename" onChange = {e => this.Change(e)}
                                            className="form-control" placeholder="What did  you sell" 
                                            value={this.state.ename} />
                                        </div>

                                        <div className="form-group">
                                            <label>amount</label>
                                            <input type="number" name= "amount" onChange = {e => this.Change(e)}
                                             className="form-control" placeholder="How much did you sell it for" value={this.state.amount}/>
                                        </div>

                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input type="number" name= "quantity" onChange = {e => this.Change(e)}
                                             className="form-control" placeholder="Quantity sold" value={this.state.quantity}/>
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
                                         onClick = {this.onProceed}>
                                            Proceed
                                        </button>

                                    
                                    </form>

                                </div>
                            </div>
                            

                            
                        </div>
                    </div>

                </div>
                {this.state.redirect?<Redirect to="./all-sales"/>:null}
                
            </div>
        )
    }

}