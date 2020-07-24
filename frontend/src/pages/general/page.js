import React from "react";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";

export default class Page extends React.Component{
   render(){
      return(
<div className="body">    

   <div className="page-grid">

      <div className="sidenav-space">
         <SideNav/>
      </div>

      <section className="">
         {this.props.main}
      </section>
      
      </div>
   </div>
      )
   }


}