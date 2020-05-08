import React from "react";
import {Redirect} from "react-router";




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
            <div className="col-lg-2">
                <section className ="sidenav col-lg-12 d-none d-sm-block">
                    <ul className ="list-group list-group-flush">
                        <li className ="list-group-item"> 
                            <a name="home"  onClick={this.redirectTo}>Dashboard</a>
                        </li>
                        {/* <li className="list-group-item" >
                            <a name="budget" onClick={this.redirectTo} >Budget</a>
                        </li> */}
                        <li className="list-group-item" >
                            <a name ="sales"  onClick={this.redirectTo}>Sales</a>
                        </li>
                        <li className="list-group-item">
                            <a name="expenses" onClick={this.redirectTo}>Expenses</a>
                        </li>
                        <li className="list-group-item" >
                            <a name="debtors" onClick={this.redirectTo}>Debtors</a>
                        </li>
                        <li className="list-group-item" >
                            <a name="creditors" onClick={this.redirectTo}>Creditors</a>
                        </li>
                        <li className="list-group-item">
                            <a name="statement-1" onClick={this.redirectTo}>Reports</a>
                        </li>
                    </ul>

                    
                </section>
                
                {this.state.redirect?<Redirect to= {this.state.nextPage}/>:null}
            </div>
                        
        )
    }

}