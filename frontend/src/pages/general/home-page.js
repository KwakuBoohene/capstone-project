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
                <div className="container-fluid">
                    <div className="row">
                        <SideNav/>
                        
                        <section className="homepage-main col col-sm-10 container">

                            <br/>
                            <h5>Welcome {localStorage.getItem('fname')}</h5>
                            <br/>
                                            
                            <div className="row">

                                <div class="card col col-sm-5" id="homepage-grid-item">
                                    <div class="card-body">
                                        <h5 class="card-title">Money made/Income</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">See how much money has come in
                                        in the last 30 days</h6>
                                        <br/><br/><br/>
                                        <button type="button" name="sales" className="btn btn-success" onClick={this.redirectTo} >
                                            View info
                                        </button>
                                    </div>
                                </div>

                                <div class="card col col-sm-5" id="homepage-grid-item">
                                    <div class="card-body">
                                        <h5 class="card-title">Expenses</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">See what you have spent on
                                        in the last 30 days</h6>
                                        <br/><br/><br/>
                                        <button className="btn btn-success" type="button" onClick={this.redirectTo} name="expenses" >
                                        View info
                                        </button>
                                    </div>
                                </div>

                                <div class="card col col-sm-5" id="homepage-grid-item">
                                    <div class="card-body">
                                        <h5 class="card-title">Creditors</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">See who you owe or bought from on credit</h6>
                                        <br/><br/><br/>
                                        <button className="btn btn-success" type="button" onClick={this.redirectTo} name="creditors" >
                                        View info
                                        </button>
                                    </div>
                                </div>

                                <div class="card col col-sm-5" id="homepage-grid-item">
                                    <div class="card-body">
                                        <h5 class="card-title">Debtors</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">See who owes you or bought from you on credit</h6>
                                        <br/><br/><br/>
                                        <button className="btn btn-success" type="button" onClick={this.redirectTo} name="debtors">
                                        View info
                                        </button>
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