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
            <div className="col-lg-2">
                <section className ="sidenav col-lg-12 d-none d-sm-block">
                    <ul className ="list-group list-group-flush">
                        <li className ="list-group-item"> 
                            
                            <NavLink to="/home" activeClassName="selected" > Dashboard</NavLink>
                        </li>
                        {/* <li className="list-group-item" >
                            <a name="budget" onClick={this.redirectTo} >Budget</a>
                        </li> */}
                        <li className="list-group-item" >
                            <NavLink to="/sales" activeClassName="selected">Sales</NavLink>
                        </li>
                        <li className="list-group-item">
                            <NavLink to="/expenses" activeClassName="selected" >Expenses</NavLink>
                        </li>
                        <li className="list-group-item" >
                            <NavLink to="/debtors" activeClassName="selected">Debtors</NavLink>
                        </li>
                        <li className="list-group-item" >
                           <NavLink to="/creditors" activeClassName="selected">Creditors</NavLink>
                        </li>
                        <li className="list-group-item">
                            <NavLink to="/statement-1" activeClassName="selected">Reports</NavLink>
                        </li>
                        {this.props.printButton}
                    </ul>

                    
                </section>
                
                {this.state.redirect?<Redirect to= {this.state.nextPage}/>:null}
            </div>
                        
        )
    }

}