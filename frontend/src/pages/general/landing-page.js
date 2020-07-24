import React from "react";
import {Link} from "react-router-dom";
import Header from "../../components/header";

export default class LandingPage extends React.Component{
    render(){

        return(
<div className="body">

  <Header/>

   <section className="landing-middle page">
         
         <div className="middle-text-large flex-center ">
            <h2 className="">
               USE THE MY-ACCOUNTS APP TO MANAGE YOUR BUSINESS' <br/> FINANCES
            </h2>
         </div>

         <div className="middle-text-sub flex-center">
            <p className="">LEARN HOW TO USE OUR APP BY CLICKING HERE</p>
         </div>

         <div className="tutorial-button flex-center">
            <button className="">Quick Tutorial</button>
         </div>
   
     
   
   </section>

   <section className="lu-bottom mt-5" >
         <div className="">
            <h2 className="">
               FOR THE START UP AND THE GHANAIAN ENTREPRENEUR
               WHO WOULD RATHER NOT PAY FOR AN ACCOUNTANT. <br/> THIS APP IS FOR YOU
            </h2>
         </div>
   </section>


   <section className="landing-lower-bottom mt-5">
      
      <div className="app-features">   
         <div className="">
            <img className='landing-icon' src={require('../../images/landing-expenses-icon.png')}/>
            <p>Keep track of all your sales, expenses and revenue</p>
         </div>

         <div className="">
            <img className='landing-icon' src={require("../../images/landing-budget-icon.png")}/>
            <p>Draw up your budget and get alerts when you deviate from it</p>
         </div>

         <div className="">
            <img className='landing-icon' src={require("../../images/landing-costing-icon.png")}/>
            <p>Cost your jobs to estimate your profit and <br/> make sure you break even.
            Avoid a loss at all costs
            </p>
         </div>

         <div className="">
            <img className='landing-icon' src={require("../../images/landing-debtor-icon.png")}/>
            <p>Keep track of who you owe and who owes you.</p>
         </div>
      </div>
   </section>

   <section className="footer">
      <div className="flex-center">
      
         <p>Icons made by <a href="https://www.flaticon.com/authors/monkik"> monkik</a>
         from <a href="https://www.flaticon.com/"> www.flaticon.com</a>
         </p>
      
      </div>
      
      <div className="copyright flex-center">         
         <p>Copyright, 2020</p>
      </div>
      
      
   </section>

</div>
        )
        
    };
};