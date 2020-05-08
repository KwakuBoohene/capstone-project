import React from "react";
import {Redirect} from "react-router";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';


export default class DebtorsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : Number(localStorage.getItem('userid')),
            debtors: [],
            redirect: false,
            redirectto: '',
            // salesGraph: [],
            // data : {},
        } 
        this.onAddDebtor = this.onAddDebtor.bind(this);
    }


    componentDidMount(){




        axios.get('http://localhost:5000/debtors/' + String(this.state.id)
        // , {
        //     params: {
        //         id: this.state.id,
        //     }
        // }
        )
        .then(res => {
        const debtors = res.data;
        this.setState({ debtors });
    
      })
        .catch(function (error) {
            console.log(error);
        });
    }



    editDebtor(saleItem){
        localStorage.setItem('editdebtor',saleItem)
        this.setState({
            redirectto: './edit-debtor'
        })
        this.setState({
            redirect: true,
        })


    }
    onAddDebtor = e => {
        this.setState({
            redirectto: './add-debtor'
        })
        this.setState({
            redirect: true,
        })
    }

    AllDebtors = e => {
        this.setState({
            redirectto: './all-debtors'
        })
        this.setState({
            redirect: true,
        })
    }
    
    render(){
        return(
            <div className="">
                <Header startPage="/home"/>
                <div className="">
                    <div className="row">
                    <SideNav/>
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
                                            { this.state.debtors.slice(0, 3).map(debtors => 
                                                <tr name={String(debtors.id)}>
                                                    <td>{debtors.name}</td>
                                                    <td>GHS {debtors.amount}.00</td>
                                                    <td>{debtors.dBorrow}</td>
                                                    <td> {(debtors.received_payment)?"Yes":"No"}</td>
                                                    <td className="hidden-managers">
                                                    <button type="button" className="btn btn-success" onClick= {() => this.editDebtor(debtors.id)}>
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
                                    <button onClick = {this.onAddDebtor}
                                    type="button" className="btn btn-danger btn-block">
                                        add Debtor
                                    </button>
                                </div>

                                <div className="col-4">

                                </div>

                                <div className="col-4">
                                    <button onClick = {this.AllDebtors}
                                    type="button" className="btn btn-success btn-block">
                                        view all Debtors
                                    </button>
                                    
                                </div>
                            </div>
                            {this.state.redirect?<Redirect to={this.state.redirectto}/>:null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}