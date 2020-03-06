import React from "react";
import {Redirect} from "react-router";


export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
        this.redirect = this.redirect.bind(this);
    }

    redirect(){
        this.setState({
            redirect: true,
        })
    }
    
    render(){
        return(
            <section className="header">
                <div className="container-fluid">
                    <div className="row justify-content-sm-center">
                        <div className="col-sm-5">
                            
                                <h2 className="text-center">
                                    <a onClick={this.redirect} className="header-icon">MYACCOUNTS</a>
                                </h2>
                             
                        </div>
                    </div>
                </div>

                {this.state.redirect?<Redirect to={this.props.startPage}/>:null}
            </section>
        )
    }
}