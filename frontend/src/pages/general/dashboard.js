import React from "react";
import {Redirect,Link} from "react-router-dom";
import Page from "./page";
import image from "../../images/icons/discount.svg";

export default class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = { redirect : false, nextpage : ""}
        this.redirectTo = this.redirectTo.bind(this);
    }
   redirectTo = e => {
       this.setState({redirect : true,nextpage: e.target.name,})
   }
    render(){

      let content = 
      <div className="dashboard-main  pl-3 pr-3">
         <div className="page-heading ">
            <p className="username">Welcome {sessionStorage.getItem('fname')}</p>
            <p className="">General Report</p>
         </div>

         <div className="dashboard">
            <div className="db-summaries">
               <div className="sum-card">
                  <div className="sum-icon m-1">
                     <img src={image} alt=""  srcset=""/>
                  </div>

                  <div className="sum-figure m-1">
                     <p className="">4500</p>
                  </div>

                  <div className="sum-descrip m-1">
                     <p className="">Item sales</p>
                  </div>
               </div>

               <div className="sum-card ">
                  <div className="sum-icon m-1">
                     <img src={image} alt=""  srcset=""/>
                  </div>

                  <div className="sum-figure m-1">
                     <p className="">4500</p>
                  </div>

                  <div className="sum-descrip m-1">
                     <p className="">Item sales</p>
                  </div>
               </div>
               
               <div className="sum-card ">
                  <div className="sum-icon m-1">
                     <img src={image} alt=""  srcset=""/>
                  </div>

                  <div className="sum-figure m-1">
                     <p className="">4500</p>
                  </div>

                  <div className="sum-descrip m-1">
                     <p className="">Item sales</p>
                  </div>
               </div>
               
               <div className="sum-card ">
                  <div className="sum-icon m-1">
                     <img src={image} alt=""  srcset=""/>
                  </div>

                  <div className="sum-figure m-1">
                     <p className="">4500</p>
                  </div>

                  <div className="sum-descrip m-1">
                     <p className="">Item sales</p>
                  </div>
               </div>

            </div>
         
            <div className="sales-details">
               
            </div>
         </div>

         .

      </div>
        return(
         <div className="body">    
            <Page main={content}/>
               {this.state.redirect?<Redirect to={"./"+this.state.nextpage}/>:null}
         </div>
        )
    }
}