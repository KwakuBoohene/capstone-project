import React from "react";
import {Redirect,Link} from "react-router-dom";
import Modal from "../../components/modal.js";
import axios from 'axios';

export default class LoginPage extends React.Component{
        constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false,
            message: "invalid input details",

        };
        this.onLogin = this.onLogin.bind(this);
        this.Change = this.Change.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
       // this.checkFormData = this.checkFormData(this);
    };

//verifies user login  details 
checkFormData(){
axios
//Makes a request to the API using an endpoint 
    .post('http://localhost:5000/user-search',
    {
        'email':this.state.email,
        'password': this.state.password
    })
//Receives the response from the API and uses it to verify 
// a user's details
    .then(res =>{
        const returnData = Object.keys(res.data).length;
        if(returnData==0){
        //Tells the user that  the credentials they entered are invalid
            this.setState({
                message :"User's email or password is invalid"
            });
            this.modalOpen();
        }else{
        //Redirects the user  to their dashboard upon entering the valid credentials
            
        const userid = Object.values(res.data)[0].id ;
        const fname = Object.values(res.data)[0].fname ;
        sessionStorage.setItem('userid',userid)
        sessionStorage.setItem('fname',fname)
        // alert("Welcome"+fname)
          this.setState({message:"Welcome"+" "+fname +" "+ "Loading.."});
          this.modalOpen();
         setTimeout(
    function() {
        this.setState({redirect: true});
    }
    .bind(this),
    1000
);
        }
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
    if(this.state.email==''){
        this.setState({message : "Please type your email in the required field"});
        this.modalOpen();
        return false;
    }else{
        if(this.state.password==''){
         this.setState({message : "Please type your password in the required field"});
         this.modalOpen();
         return false;   
        }else{
            return true;
        }
    }
}

enterLogin = event => {
    var code = event.keyCode || event.which
    if(code === 13) { 
        if(this.validation()){
            this.checkFormData();
        }
    } 
}
    
onLogin = e => {
     
     if(this.validation()){
         
          this.checkFormData();
     }
    
}


    modalOpen = e => {
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
                <section className="header">
                <div className="container-fluid">
                    <div className="row  justify-content-md-center">
                        <div className="header-icon col-sm-2">
                            <h2 className="text-center"><Link className="header-icon" to="/">MYACCOUNTS</Link> </h2>
                        </div>
                    </div>
                </div>
            </section>

                <div className="container-fluid">
                    <div className="row no-gutter">
                        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                        <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                <h3 className="login-heading mb-4">Welcome back!</h3>
                                <form>
                                    <div className="form-label-group">
                                    <input type="email" id="email" className="form-control" placeholder="Email address" required autoFocus name="email" onKeyUp={this.enterLogin} onChange ={this.Change}/>
                                    <label htmlFor="email">Email address</label>
                                    </div>

                                    <div className="form-label-group">
                                    <input type="password" id="password" className="form-control" placeholder="Password" name= "password" onKeyUp={this.enterLogin} onChange={this.Change} required/>
                                    <label htmlFor="password">Password</label>
                                    </div>

                                    <button type="button" className="btn btn-lg btn-success btn-block btn-login text-uppercase font-weight-bold mb-2" onClick={this.onLogin}>
                                    Sign in</button>
                                </form>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                                <Modal message={this.state.message}/>
                

            {this.state.redirect?<Redirect to="./home"/>:null}
                </div>

            </div>

            
        )
    }
}