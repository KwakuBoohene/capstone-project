import React from "react";
import {Redirect,Link} from "react-router-dom";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";


export default class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            nextpage : ""
        }
        this.redirectTo = this.redirectTo.bind(this);
    }
  
   redirectTo = e => {

       this.setState({
           redirect : true,
           nextpage: e.target.name,
       })
   }
    render(){
        

        

        return(
            <div>
                
                <Header startPage="/home" />
                <div className="">
                    <div className="row">
                        <SideNav/>
                        
                        <section className="homepage-main col col-sm-10 container">

                            <br/>
                            <h5>Welcome {localStorage.getItem('fname')}</h5>
                            <br/>
                                            
                            <div className="row">

                                <div className="card col-xs-12 col-sm-5 col-lg-5" id="homepage-grid-item">
                                    <div className="card-body">
                                        <h5 className="card-title">Money made/Income</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">See how much money has come in
                                        in the last 30 days</h6>
                                        <br/><br/><br/>
                                        <Link type="button" name="sales" className="btn btn-success" to="/sales" >
                                            View info
                                        </Link>
                                    </div>
                                </div>

                                <div className="card col-xs-12 col-sm-5 col-lg-5" id="homepage-grid-item">
                                    <div className="card-body">
                                        <h5 className="card-title">Expenses</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">See what you have spent on
                                        in the last 30 days</h6>
                                        <br/><br/><br/>
                                        <Link className="btn btn-success" type="button" to="/expenses" name="expenses" >
                                        View info
                                        </Link>
                                    </div>
                                </div>

                                <div className="card col-xs-12 col-sm-5 col-lg-5" id="homepage-grid-item">
                                    <div className="card-body">
                                        <h5 className="card-title">Creditors</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">See who you owe or bought from on credit</h6>
                                        <br/><br/><br/>
                                        <Link className="btn btn-success" type="button" to="/creditors" name="creditors" >
                                        View info
                                        </Link>
                                    </div>
                                </div>

                                <div className="card col-xs-12 col-sm-5 col-lg-5" id="homepage-grid-item">
                                    <div className="card-body">
                                        <h5 className="card-title">Debtors</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">See who owes you or bought from you on credit</h6>
                                        <br/><br/><br/>
                                        <Link className="btn btn-success" type="button" to="/debtors" name="debtors">
                                        View info
                                        </Link>
                                    </div>
                                </div>




                            </div>
                            

                            
                            
                        </section>
                    </div>
                </div>
                
                {this.state.redirect?<Redirect to={"./"+this.state.nextpage}/>:null}
            </div>
        )
    }
}