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
                        <section className="sidenav col col-sm-2">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"> 
                                    <a name="dashboard"  onClick={this.redirectTo}>Dashboard</a>
                                </li>
                                <li className="list-group-item" >
                                    <a name="budget" onClick={this.redirectTo} >Budget</a>
                                </li>
                                <li className="list-group-item" >
                                    <a name ="sales"  onClick={this.redirectTo}>Sales</a>
                                </li>
                                <li className="list-group-item">
                                    <a name="expenses" onClick={this.redirectTo}>Expenses</a>
                                </li>
                                <li className="list-group-item" >
                                    <a name="debtors" onClick={this.redirectTo}>Debtors/Creditors</a>
                                </li>
                                <li className="list-group-item" >
                                    <a name="inventory" onClick={this.redirectTo}>Inventory</a>
                                </li>
                                <li className="list-group-item" >
                                    <a name= "costing" onClick={this.redirectTo}>Job Costing/Special order</a>
                                </li>

                            </ul>

                            {this.state.redirect?<Redirect to= {this.state.nextPage}/>:null}
                        </section>
        )
    }

}