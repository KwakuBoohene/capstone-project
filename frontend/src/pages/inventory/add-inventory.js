import React from "react";
import {Redirect} from "react-router";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';

export default class AddInventory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            price : "",
            qty : 1,
            redirect: false,
            userid: 1,
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
            
            .post('http://localhost:5000/inventory/add',
            {
                'name':this.state.name,
                'price':this.state.price,
                'qty':this.state.qty,
                'userid':this.state.userid,
            })
            .then(response =>{
                console.log(response);
                alert('Inventory Item added');
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
        if(this.state.name==""||this.state.price==""){
            alert("Please add the name and pricee");
            return false;
        }
        if(this.state.date==""){
            this.setState(
                {qty: 1,}
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
                                    <h3>Please input the details of the item here</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Name of the item</label>
                                            <input type="text"
                                            name = "name" onChange = {e => this.Change(e)}
                                            className="form-control" placeholder="What are you adding" 
                                            value={this.state.name} />
                                        </div>

                                        <div className="form-group">
                                            <label>Price</label>
                                            <input type="number" name= "price" onChange = {e => this.Change(e)}
                                             className="form-control" placeholder="What is the unit price" value={this.price}/>
                                        </div>

                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input type="number" name="qty" placeholder="How much of it did you buy" required 
                                             
                                            className="form-control" onChange = {e => this.Change(e)}
                                            title="" value={this.state.qty}/>
                                            *Default quantity would be 1*
                                            
                                        </div>

                                        {/* <input type="submit" value="Proceed" className = "btn btn-danger btn-block"/> */}
                                        <button type="button" className="btn btn-danger btn-block"
                                         onClick = {this.onProceed}>
                                            Proceed
                                        </button>

                                    
                                    </form>

                                </div>
                            </div>
                            

                            
                        </div>
                    </div>

                </div>
                {this.state.redirect?<Redirect to="./inventory"/>:null}
                
            </div>
        )
    }

}