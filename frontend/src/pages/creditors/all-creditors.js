import React from "react";
import {Redirect} from "react-router-dom";
import Page from "../general/page";
import axios from 'axios';


export default class AllCreditors extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : Number(sessionStorage.getItem('userid')),
            creditors: [],
            redirect: false,
            redirectto: '',
            // salesGraph: [],
            // data : {},
        } 
        this.onAddCreditor = this.onAddCreditor.bind(this);
    }


    componentDidMount(){




        axios.get('http://localhost:5000/creditors/' + String(this.state.id)
        // , {
        //     params: {
        //         id: this.state.id,
        //     }
        // }
        )
        .then(res => {
        const creditors = res.data;
        this.setState({ creditors });
    
      })
        .catch(function (error) {
            console.log(error);
        });
    }



    editCreditor(saleItem){
        sessionStorage.setItem('editcreditor',saleItem)
        this.setState({
            redirectto: './edit-creditor'
        })
        this.setState({
            redirect: true,
        })


    }
    onAddCreditor = e => {
        this.setState({
            redirectto: './add-creditor'
        })
        this.setState({
            redirect: true,
        })
    }

    AllCreditors = e => {
        this.setState({
            redirectto: './all-creditors'
        })
        this.setState({
            redirect: true,
        })
    }
    
    render(){

      let content = <div className="">

<div className="col col-sm-10 container">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Date Recorded</th>
                                                    <th scope="col">Payment Made</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                            { this.state.creditors.map(creditors => 
                                                <tr name={String(creditors.id)}>
                                                    <td>{creditors.name}</td>
                                                    <td>GHS {creditors.amount}.00</td>
                                                    <td>{creditors.dBorrow}</td>
                                                    <td> {(creditors.made_payment)?"Yes":"No"}</td>
                                                    <td className="hidden-managers">
                                                    <button type="button" className="btn btn-success" onClick= {() => this.editCreditor(creditors.id)}>
                                                        Edit
                                                    </button>
                                                    </td>
                                                </tr>
                                                )
                                            }
                                            </tbody>
                                      </table>
                            
                            <div className="row">
                                <div className="col-4">
                                    <button onClick = {this.onAddCreditor}
                                    type="button" className="btn btn-danger btn-block">
                                        add Creditor
                                    </button>
                                </div>

                                
                            </div>
                            {this.state.redirect?<Redirect to={this.state.redirectto}/>:null}
                        </div>
  
      </div>
        return(
            <div className="">
              <Page main={content}/>
            </div>
        )
    }
}