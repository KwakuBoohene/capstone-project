import React from "react";
import {Redirect} from "react-router-dom";
import Page from '../general/page';
import axios from 'axios';
import SalesGraph from '../../components/salesGraph';

export default class SalesPage extends React.Component{
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
        this.onAddSales = this.onAddSales.bind(this);
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



    editSales(saleItem){
        sessionStorage.setItem('editsales',saleItem)
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

    AllSales = e => {
        this.setState({
            redirectto: './all-sales'
        })
        this.setState({
            redirect: true,
        })
    }
    
    render()
    {
      let content = <div>

<div className="main">
                        
                        <SalesGraph id={this.state.id}/>
                    
     
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Descriptionn</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Date Recorded</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                        { this.state.sales.slice(0, 3).map(sales => 
                                            <tr name={String(sales.sale_id)}>
                                                <td>{sales.description}</td>
                                                <td> GHS {sales.amount}.00</td>
                                                <td> {sales.quantity}</td>
                                                <td>{sales.date}</td>
                                                <td className="hidden-managers">
                                                <button type="button" className="btn btn-success" onClick= {() => this.editSales(sales.sale_id)}>
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

                            <div className="col-4">

                            </div>

                            <div className="col-4">
                                <button onClick = {this.AllSales}
                                type="button" className="btn btn-success btn-block">
                                    view all sales
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