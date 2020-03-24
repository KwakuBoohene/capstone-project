import React from "react";
import {Redirect} from "react-router";
import ReactDOM from "react-dom";
import Header from "../../components/header.js";
import axios from 'axios';
import Modal from "../../components/modal.js";

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
            message: "Please fill all fields",
            data: '',
        };
        this.onSignUpClicked = this.onSignUpClicked.bind(this);
        this.Change = this.Change.bind(this);

    };


modalOpen(){
    var modal = document.getElementById("myModal");
    // When the user clicks the button, open the modal 
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
modalClose = e => {
    var modal = document.getElementById("myModal");
    var main =  document.getElementById("main");
    if(e.target == modal){
        modal.style.display = "none";
    }
}

//This is a class method which allows changes in the input fields
    Change = e => {
  this.setState({
    [e.target.name]: e.target.value
    });
    
    };

    checkEmail(){
        axios
            .get('http://localhost:5000/user/'+this.state.email)
            .then(res =>{
                const returnData = Object.keys(res.data).length;
                this.setState({
                    data: returnData
                });
                if(returnData!==0){
                    this.setState({
                        message : "There already exists a user with this email!",
                    });
                 this.modalOpen();
                }else{
                    this.addFormData()
                }
            })
    }

    addFormData(){
        if(this.checkEmail){
            axios
            .post('http://localhost:5000/user-add',{
                'fname': this.state.fname,
                'email': this.state.email,
                'lname': this.state.lname,
                'password': this.state.password,
            })
            .then(response =>{
                console.log(response);
               this.setState({redirect:true});
            })
            .catch(error =>{
                console.log(error);
            })

        }
        
    }

    validation(){
        
        if(this.state.fname== ''||this.state.email== ''||
        this.state.lname== ''||
        this.state.password== ''||
        this.state.rpassword == ''){ 
            this.modalOpen();
            return false;
        }else{
            if(this.state.rpassword!==this.state.password){
                this.setState(
                    {message: "Please repeat your initial password" }
                )
                this.modalOpen();
                return false;
            }else{
                return true;
            }
        }
    }

    onSignUpClicked = e => {
        if(this.validation()){
            this.checkEmail();
        }
    };

        //

    render(){
        return(
            <div className="">
                <Header startPage="/"/>

                <div class="container">
                        <div class="row">
                        <div class="col-lg-10 col-xl-9 mx-auto">
                            <div class="card card-signin flex-row my-5">
                            <div class="card-img-left d-none d-md-flex">
                                {/* <!-- Background image for card set in CSS! --> */}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title text-center">Register</h5>
                                <form class="form-signin">
                                <div class="form-label-group">
                                    <input name="fname" type="text" id="inputUserame" class="form-control" placeholder="First Name"
                                    value={this.state.fname} onChange = {this.Change} required autofocus/>
                                    <label for="inputUserame">First Name</label>
                                </div>

                                <div class="form-label-group">
                                    <input name="lname" type="text" id="inputSurname" class="form-control" placeholder="Surname"
                                    value={this.state.lname} onChange = {this.Change} required autofocus/>
                                    <label for="inputSurname">Surname</label>
                                </div>


                                <div class="form-label-group">
                                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address"
                                    value={this.state.email} onChange = {this.Change} required name="email"/>
                                    <label for="inputEmail">Email address</label>
                                </div>
                                
                                <hr/>

                                <div class="form-label-group">
                                    <input type="password" id="inputPassword" class="form-control" placeholder="Password"
                                    value={this.state.password} onChange = {this.Change} name="password" required/>
                                    <label for="inputPassword">Password</label>
                                </div>
                                
                                <div class="form-label-group">
                                    <input type="password" id="inputConfirmPassword" class="form-control" placeholder="Password"
                                    value={this.state.rpassword} onChange = {this.Change} name="rpassword" required/>
                                    <label for="inputConfirmPassword">Confirm password</label>
                                </div>

                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick= {this.onSignUpClicked}>Register</button>

                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
  <Modal message={this.state.message}/>
            {this.state.redirect?<Redirect to="./home"/>:null}
            </div>
        );
    };
};