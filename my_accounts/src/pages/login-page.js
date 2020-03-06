import React from "react";
import {Redirect} from "react-router";
import Header from "../components/header.js";
import Modal from "../components/modal.js";
import axios from 'axios';

export default class LoginPage extends React.Component{
        constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false,

        };
        this.onLogin = this.onLogin.bind(this);
        this.Change = this.Change.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
       // this.checkFormData = this.checkFormData(this);
    };

//logs in user details 
checkFormData(){
let formData = new FormData();
formData.append('email', this.state.email)
formData.append('password',this.state.password)
axios
    .post('http://localhost:5000/user',formData)
    .then(res =>{
        alert(res.data);
    })
    .catch(error =>{
        alert(error);
    })
}

//This is a class method which allows changes in the input fields
Change = e => {
  this.setState({
    [e.target.name]: e.target.value
    });
};

validation(){
    if(this.state.email==='' || this.state.password===''){
        return false;
    }else{
        return true;
    }
}
    
onLogin = e => {
     var response = this.validation();
     console.log(response);
     if(response==true){
         e.preventDefault();
         this.checkFormData();
         this.setState({redirect:true});
     }else{
         this.modalOpen()
         e.preventDefault();
         this.setState({redirect:false});
     }
    
}


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

    render(){
    
        return(
            <div id="main" onClick={this.modalClose}>
                <Header startPage="/"/>

                <div className="container-fluid">
                    <div className="row justify-content-sm-center">

                        <form    className="login-page col col-sm-6">
                            <h3>LOGIN TO YOUR ACCOUNT</h3>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email"
                                name="email" onChange ={this.Change} />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password"
                                name= "password" onChange={this.Change} />
                            </div>

                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1"  />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>

                           <button type="submit" className="btn btn-danger btn-block" onClick = {this.checkFormData} > Login</button>

                            
                            <p className="forgot-password text-right">
                                Forgot <a href="#">password?</a>
                            </p>
                        </form>

                        
                    </div>

                </div>



            <Modal message="invalid input details"/>
                

            {this.state.redirect?<Redirect to="./home"/>:null}
            </div>

            
        )
    }
}