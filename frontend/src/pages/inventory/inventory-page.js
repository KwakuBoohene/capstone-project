import React from "react";
import {Redirect} from "react-router";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';

export default class InventoryPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : 1,
            inventory: [],
            redirect: false,
            redirectto: '',
        } 
        this.onAddInventory = this.onAddInventory.bind(this);
    }


    


    componentDidMount(){

        axios.get('http://localhost:5000/inventory/' + String(this.state.id)
        // , {
        //     params: {
        //         id: this.state.id,
        //     }
        // }
        )
        .then(res => {
        const inventory = res.data;
        this.setState({ inventory });
        // console.log(inventory);
      })
        .catch(function (error) {
            console.log(error);
        });
    }



    editInventory(inventoryItem){
        localStorage.setItem('editinventory',inventoryItem)
        this.setState({
            redirectto: './edit-inventory'
        })
        this.setState({
            redirect: true,
        })


    }
    onAddInventory = e => {
        this.setState({
            redirectto: './add-inventory'
        })
        this.setState({
            redirect: true,
        })
    }
    
    render(){
        return(
            <div className="">
                <Header startPage="/home"/>
                <div className="container-fluid">
                    <div className="row">
                    <SideNav/>
                        <div className="col col-sm-10 container">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Inventory Item</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity In Stock</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                            { this.state.inventory.map(inventory => 
                                                <tr name={String(inventory.id)}>
                                                    <td>{inventory.name}</td>
                                                    <td> GHS {inventory.price}.00</td>
                                                    <td>{inventory.qty_in_stock}</td>
                                                    <td className="hidden-managers">
                                                    <button type="button" className="btn btn-primary" onClick= {() => this.editInventory(inventory.id)}>
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
                                    <button onClick = {this.onAddInventory}
                                    type="button" className="btn btn-danger btn-block">
                                        add  to Inventory
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