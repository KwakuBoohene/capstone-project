import React from "react";
import {Link} from "react-router-dom";

export default class LandingPage extends React.Component{
    render(){

        return(
        <div>

            <section className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="header-icon col-sm-2">
                            <h2>
                                <Link className="header-icon" to="/">MYACCOUNTS</Link>
                            </h2>
                        </div>
                        <div className="col-sm-6">
                        </div>
                        <div className="col-sm-2">
                            <h4><a className="header-links btn btn-success" href="/login">Log in</a></h4>
                        </div>
                        <div className="col-sm-2">
                            <h4> <a className="header-links btn btn-success" href="/signup">Sign up</a></h4>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-middle">
                <div className="container-fluid">
                    <div className="row justify-content-sm-center">
                        <h2 className="text-center">
                        USE THE MY-ACCOUNTS APP TO MANAGE <br/> YOUR BUSINESS' 
                        FINANCES
                        </h2>
                        <p className="text-center">LEARN HOW TO USE OUR APP BY CLICKING HERE</p>
                        <button className="btn btn-success">Quick Tutorial</button>  
                    </div>
                </div>
            </section>

            <section className="landing-upper-bottom">
                <div className="container-fluid">
                    <div className="row justify-content-sm-center">
                        <h2 className="text-center">FOR THE START UP AND THE GHANAIAN ENTREPRENEUR
                            WHO WOULD RATHER NOT PAY FOR AN ACCOUNTANT. <br/> THIS APP IS FOR YOU
                        </h2>
                    </div>
                </div>
            </section>


            <section className="landing-lower-bottom">
                <div className="container-fluid">
                    <div className="app-features row justify-content-sm-center">
                        <div className="col-sm-3">
                            <img className='landing-icon' src={require('../../images/landing-expenses-icon.png')}/>
                            <p>Keep track of all your sales, expenses and revenue</p>
                        </div>

                        <div className="col-sm-3">
                            <img className='landing-icon' src={require("../../images/landing-budget-icon.png")}/>
                            <p>Draw up your budget and get alerts when you deviate from it</p>
                        </div>

                        <div className="col-sm-3">
                            <img className='landing-icon' src={require("../../images/landing-costing-icon.png")}/>
                            <p>Cost your jobs to estimate your profit
                            and make sure you break even.
                            Avoid a loss at all costs
                            </p>
                        </div>

                        <div className="col-sm-3">
                            <img className='landing-icon' src={require("../../images/landing-debtor-icon.png")}/>
                            <p>Keep track of who you owe and who owes you.</p>
                        </div>
                    </div>
                </div>

            </section>

            <section className="footer">
                <div className="container-fluid">
                    <div className="row justify-content-sm-center">
                        <div className="icons-reference">
                            <p>Icons made by <a href="https://www.flaticon.com/authors/monkik"> monkik</a>
                            from <a href="https://www.flaticon.com/"> www.flaticon.com</a>
                            </p>
                        </div>

                        <div className="copyright">
                            <br/> <br/>
                            <p>Copyright, 2020</p>
                        </div>
                    </div>
                </div>

                
                
                
            </section>

        </div>
        )
        
    };
};