import React from "react";
import {Redirect} from "react-router-dom";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';


export default class AllSales extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : Number(sessionStorage.getItem('userid')),
            sales: [],
            redirect: false,
            redirectto: '',
            salesGraph: [],
            data : {},
        } 
        
    }


    componentDidMount(){




        axios.get('http://localhost:5000/sales/' + String(this.state.id)
        // , {
        //     params: {
        //         id: this.state.id,
        //     }
        // }
        )
        .then(res => {
        const sales = res.data;
        this.setState({ sales });
    
      })
        .catch(function (error) {
            console.log(error);
        });
    }



    editSale(saleItem){
        sessionStorage.setItem('editsale',saleItem)
        this.setState({
            redirectto: './edit-sale'
        })
        this.setState({
            redirect: true,
        })


    }
    onAddSales = e => {
        this.setState({
            redirectto: './add-sale'
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
                                                    <th scope="col">Sale Description</th>
                                                    <th scope="col">Sale Amount</th>
                                                    <th scope="col">Date Recorded</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                            { this.state.sales.map(sales => 
                                                <tr name={String(sales.id)}>
                                                    <td>{sales.description}</td>
                                                    <td> GHS {sales.amount}.00</td>
                                                    <td>{sales.date}</td>
                                                    
                                                    <td className="hidden-managers">
                                                    <button type="button" className="btn btn-success" onClick= {() => this.editSale(sales.sale_id)}>
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
                                    <button onClick = {this.onAddSales}
                                    type="button" className="btn btn-danger btn-block">
                                        add Sales
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