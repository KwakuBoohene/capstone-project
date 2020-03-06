import React from "react";
import {Redirect} from "react-router";
import Header from "../components/header";
import SideNav from "../components/sidenav";

export default class HomePage extends React.Component{
    render(){
        return(
            <div>
                <Header startPage="/home"/>
                <div className="container-fluid">
                    <div className="row">
                        <SideNav/>
                        <section className="homepage-main col col-sm-10 container">
                            <div className="row">

                                <div class="card col col-sm-5" id="homepage-grid-item">
                                    <div class="card-body">
                                        <h5 class="card-title">Money made/Income</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">See how much money has come in
                                        in the last 30 days</h6>
                                        <br/><br/><br/>
                                        <button className="btn btn-success">View info</button>
                                    </div>
                                </div>

                                <div class="card col col-sm-5" id="homepage-grid-item">
                                    <div class="card-body">
                                        <h5 class="card-title">Expenses</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">See what you have spent on
                                        in the last 30 days</h6>
                                        <br/><br/><br/>
                                        <button className="btn btn-success">View info</button>
                                    </div>
                                </div>

                                <div class="card col col-sm-5" id="homepage-grid-item">
                                    <div class="card-body">
                                        <h5 class="card-title">Expenses</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">See what you have spent on
                                        in the last 30 days</h6>
                                        <br/><br/><br/>
                                        <button className="btn btn-success">View info</button>
                                    </div>
                                </div>

                                <div class="card col col-sm-5" id="homepage-grid-item">
                                    <div class="card-body">
                                        <h5 class="card-title">Inventory</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">Check stock of the products
                                        and resources you have available</h6>
                                        <br/><br/><br/>
                                        <button className="btn btn-success">View info</button>
                                    </div>
                                </div>




                            </div>
                            

                            
                            
                        </section>
                    </div>
                </div>
                
                
            </div>
        )
    }
}