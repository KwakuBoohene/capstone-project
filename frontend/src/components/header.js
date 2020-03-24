import React from "react";
import {Redirect} from "react-router";
import {Link} from 'react-router-dom';


export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectPage: '',
        };
        this.redirect = this.redirect.bind(this);
        this.logout = this.logout.bind(this);
    }

    redirect(){
        this.setState({
            redirectPage : '/home',
            redirect: true,
            
        })
    }

    logout(){
        localStorage.removeItem('userid');
        localStorage.removeItem('fname')
        this.setState({
            redirectPage: '/',
            redirect:true,
        });
        console.log(localStorage)
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
                        <div className="col-sm-1">

                        </div>

                        {this.props.buttons}

                    </div>
                </div>

                {this.state.redirect?<Redirect to={this.state.redirectPage}/>:null}
            </section>
        )
    }
}