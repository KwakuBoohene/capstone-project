import React from "react";
import {Redirect,Link} from "react-router-dom";
import Modal from "../../components/modal.js";
import axios from 'axios';
import Header from "../../components/header.js"

export default class LoginPage extends React.Component{
        constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false,
            message: "invalid input details",
            login: false,

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
        this.props.handleLogin();
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
            <div className="body signup-page" onClick={this.modalClose}>
                <Header/>

                <div className="flex-center page">
               <form action="" className="signup-form p-5">
                  
                  <div className="signup-header">
                     <h5 className="">Create An Account</h5>
                  </div>

                  <div className="form-label-group">
                     <label htmlFor="email">Email address</label><br/>
                     <input type="email" id="email" className="form-control mb-5" placeholder="Email address"
                     required autoFocus name="email" onKeyUp={this.enterLogin} onChange ={this.Change}/>
                  </div>

               <div className="form-label-group">
                  <label htmlFor="password">Password</label><br/>
                  
                  <input type="password" id="password" className="form-control mb-4" placeholder="Password"
                  name= "password" onKeyUp={this.enterLogin} onChange={this.Change} required/>               
               </div>

               <button type="button" className="mb-2" onClick={this.onLogin}>
                  Sign in
               </button>

                  
                  

               </form>
               <Modal message={this.state.message}/>
               {this.state.redirect?<Redirect to="./home"/>:null}
         </div>
      </div>

            
        )
    }
}