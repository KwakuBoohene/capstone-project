import React from "react";
import {Redirect,Link} from "react-router-dom";



export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectPage: '',
        };
        this.redirect = this.redirect.bind(this);
        this.logout = this.logout.bind(this);
    }

    redirect(){
        this.setState({
            redirectPage : '/home',
            redirect: true,
            
        })
    }

    logout(){
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('fname')
        this.setState({
            redirectPage: '/',
            redirect:true,
        });
        console.log(sessionStorage)
    }
    render(){
        return(
            // <section className="header">
            //     <div className="container-fluid">
            //         <div className="row justify-content-sm-center">
            //             <div className="col-sm-5">
                            
            //                     <h2>
            //                        <Link to ="/" className="header-icon">MYACCOUNTS</Link>
            //                     </h2>
                             
            //             </div>
            //             <div className="col-sm-5">

            //             </div>

            //             <div className="col-sm-2">
            //                 <Link to='/' className="header-links btn btn-danger" onClick = {this.logout}>Logout</Link>
            //             </div>
            //         </div>
            //     </div>

            //     {this.state.redirect?<Redirect to={this.state.redirectPage}/>:null}
            // </section>

         <section className="header">
            <div className="header-icon ">
               <div className="option m-3">
                  <Link className="header-text" to="/">MYACCOUNTS</Link>
               </div>
            </div>

            <div className="header-section">
               <div className="option m-3">
                  <Link className="header-login" to="/login">Log in</Link>
               </div>
            </div>

            <div className="header-section">
               <div className="option m-3">
                  <Link className="header-signup" to="/signup">Sign Up</Link>
               </div>
            </div>
         </section>
        )
    }
}