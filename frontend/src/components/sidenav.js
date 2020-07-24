import React from "react";
import {Redirect,NavLink} from "react-router-dom";




export default class SideNav extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            nextPage: '',

        }

    this.redirectTo = this.redirectTo.bind(this);
    };

    
    
   redirectTo = e => {

       this.setState({
           redirect : true,
           nextPage: e.target.name,
       })

   }
    render(){
        return(
            <div className="sidenav pt-5">
               <div className="sidenav-item p-2  flex-center">
                  <NavLink to="/home" className="nav-item m-1 "  > Dashboard</NavLink>
               </div>
               <div className="sidenav-item p-2  flex-center">
                  <NavLink to="/sales" className="nav-item m-1" >Sales</NavLink>
               </div>
               <div className="sidenav-item p-2  flex-center">
                  <NavLink to="/expenses" className="nav-item m-1"  >Expenses</NavLink>
               </div>
               <div className="sidenav-item p-2  flex-center">
                  <NavLink to="/debtors" className="nav-item m-1" >Debtors</NavLink>
               </div>
               <div className="sidenav-item p-2  flex-center">
                  <NavLink to="/creditors" className="nav-item m-1" >Creditors</NavLink>
               </div>
               <div className="sidenav-item p-2  flex-center">
               <NavLink to="/statement-1"className="nav-item m-1" >Reports</NavLink>
               </div>
               <div className="sidenav-item p-2  flex-center">
               <NavLink to="/"className="nav-item m-1  logout-button" >Logout</NavLink>      
               </div>
                                
                {this.state.redirect?<Redirect to= {this.state.nextPage}/>:null}
            </div>
                        
        )
    }

}