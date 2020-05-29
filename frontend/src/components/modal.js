import React from "react";
import {Redirect} from "react-router";

export default class Modal extends React.Component{
    constructor(props) {
        super(props);
    
    
        this.modalCloseButton = this.modalCloseButton.bind(this);
        
    }


// When the user clicks on <span> (x), close the modal
modalCloseButton(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}



render(){
    return(
                    <div className="">
                        {/* <!-- The Modal -->  */}
                        <div id="myModal" className="modal" >
                            <div className="container">
                                <div className="row">
                        {/* <!-- Modal content --> */}
                            <div className="modal-content">
                                <span className="close" onClick={this.modalCloseButton}>&times;</span>
                                <p>{this.props.message}</p>
                                {this.props.buttons}
                            </div>
                                </div>
                            </div>

                        </div>
                    </div>                 
                        
   
    )
}        
}