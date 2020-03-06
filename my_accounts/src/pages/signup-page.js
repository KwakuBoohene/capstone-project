import React from "react";
import {Redirect} from "react-router";
import ReactDOM from "react-dom";
import Header from "../components/header.js";
import axios from 'axios';

export default class SignupPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fname: '',
            lname : '',
            email: '',
            password: '',
            rpassword: '',
            redirect: false,
        };
        this.onSignUpClicked = this.onSignUpClicked.bind(this);
        this.Change = this.Change.bind(this);

    };


//This is a class method which allows changes in the input fields
    Change = e => {
  this.setState({
    [e.target.name]: e.target.value
    });
    
    };

    addFormData(){
        let formData = new FormData();
        formData.append('first_name', this.state.fname)
        formData.append('email', this.state.email)
        formData.append('last_name', this.state.lname)
        formData.append('password', this.state.password)

        axios
            .post('http://myaccounts/api/users/add',formData)
            .then(response =>{
                console.log(response);
                this.setState({redirect:true});
            })
            .catch(error =>{
                console.log(error);
            })

    }

    validation(){
        if(this.state.fname||this.state.email||this.state.lname||this.state.password == ""){
            console.log("Please fill all the required fields");
        }
    }

    onSignUpClicked = e => {
        e.preventDefault();
        this.addFormData();
    };

        //

    render(){
        return(
            <div className="">
                <Header startPage="/"/>



                <div className="container-fluid">
                    <div className="row justify-content-sm-center">
                        <div className="login-page col-sm-5">
                            <form>
                            <h3>Sign Up</h3>

                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" className="form-control"
                                 name = "fname"
                                 placeholder="First name" 
                                 value={this.state.fname}
                                  onChange = {e => this.Change(e)} />
                            </div>

                            <div className="form-group">
                                <label>Last name</label>
                                <input type="text" className="form-control"
                                 name = "lname"
                                 placeholder="Last name"
                                 value={this.state.lname} onChange = {e => this.Change(e)}/>
                            </div>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control"
                                name = "email"
                                 placeholder="Enter email" 
                                 value={this.state.email} onChange = {e => this.Change(e)}/>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control"
                                 name = "password"
                                 placeholder="Enter password"
                                 value={this.state.password} onChange = {e => this.Change(e)} />
                            </div>

                            <div className="form-group">
                                <label>Re-enter Password</label>
                                <input type="password" className="form-control"
                                name = "rpassword" 
                                placeholder="Please enter password again"
                                 value={this.state.rpassword}
                                 onChange = {e => this.Change(e)} />
                            </div>

                            <button type="submit" className="btn btn-danger btn-block"
                             onClick = {this.onSignUpClicked}>Sign Up</button>
                            <p className="forgot-password text-right">
                                Already registered <a href="#">sign in?</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>


            {this.state.redirect?<Redirect to="./home"/>:null}
            </div>
        );
    };
};