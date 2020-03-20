import React from "react";
import {Redirect} from "react-router";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import Modal from "../../components/modal";
import axios from 'axios';

export default class EditInventory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            price : "",
            qty : "",
            redirect: false,
            userid: 1,
            id: Number(localStorage.getItem('editinventory')),
            message: "",
            buttons: "",
        };
        this.Change = this.Change.bind(this);
        this.editFormData = this.editFormData.bind(this);
        this.onUpdate =  this.onUpdate.bind(this);
        this.validate = this.validate.bind(this);
        
    }

    getItemData(){
                axios.get('http://localhost:5000/inventory/single/' + String(this.state.id)
        )
        .then(res => {
        const item  = res.data;
        item.map(item =>
        this.setState({ 
            name:item.name,
            price:item.price,
            qty: item.qty_in_stock
             })
        )

      })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount(){
        console.log(localStorage.removeItem('editinventory'))
        this.getItemData();
    }
    Change = e => {
        this.setState({
        [e.target.name]: e.target.value
    });
    
    };



    editFormData(){
    axios
        
        .post('http://localhost:5000/inventory/update',
        {
            'name':this.state.name,
            'price':this.state.price,
            'qty':this.state.qty,
            'id':this.state.id,
        })
        .then(response =>{
            console.log(response);
            alert('Inventory Item updated');
            this.setState({redirect: true})
            
        })
        .catch(error =>{
            console.log(error);
            alert(error);
        })


    }

    deleteInventory(){
        axios
        
        .post('http://localhost:5000/inventory/delete',
        {
            'delete':this.state.id,
        })
        .then(response =>{
            console.log(response);
            alert('inventory Item deleted');
            this.setState({redirect: true})
            
        })
        .catch(error =>{
            console.log(error);
            alert(error);
        })

    }

    Change = e => {
        this.setState({
        [e.target.name]: e.target.value
        });
        
        console.log(this.state);
    };

    validate = e => {
        if(this.state.name==""||this.state.amount==""){
            alert("Please fill name and amount form");
            return false;
        }
        if(this.state.date==""){
            this.setState(
                {date: this.getDate(),}
            )
            return true;
        }else{
            return true;
        }
    };

    onUpdate = e => {
        var validate = this.validate();
        if(validate==true){
            this.editFormData();
        }
    };

    
    modalOpen(message,buttons){
        this.setState({
            message: message,
            buttons: buttons,
        })
        var modal = document.getElementById("myModal");
        // When the user clicks the button, open the modal 
        modal.style.display = "block";
    }

// When the user clicks anywhere outside of the modal, close it
modalClose = e => {
    var modal = document.getElementById("myModal");
    var main =  document.getElementById("main");
    if(e.target == modal){
        modal.style.display = "none";
    }
}



    render(){
        var buttons =
        <div className="">
            <button className='btn btn-danger' onClick = {()=> this.modalClose()}>No</button>
            <button className="btn btn-success" onClick={() => this.deleteInventory()}>Yes</button>
        </div>

        var buttons2 =
        <div className="">
            <button className='btn btn-danger' onClick = {()=> this.modalClose()}>No</button>
            <button className="btn btn-success" onClick={this.onUpdate}>Yes</button>
        </div>


        return(
            <div className="">
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <SideNav/>

                        <div className="col col-sm-10 container">
                            <div className="row">
                                <div className="col col-sm-9">
                                    <h3>Please input the details of your item here</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Name of the Item</label>
                                            <input type="text"
                                            name = "name" onChange = {e => this.Change(e)}
                                            className="form-control" placeholder="Inventory Item" 
                                            value={this.state.name} />
                                        </div>

                                        <div className="form-group">
                                            <label>Price</label>
                                            <input type="number" name= "price" onChange = {e => this.Change(e)}
                                             className="form-control" placeholder="How much are you spending on it"
                                              value={this.state.price}/>
                                        </div>

                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input type="number" name="qty" placeholder="YYYY-MM-DD" required 
                                             
                                            className="form-control" onChange = {e => this.Change(e)}
                                            title="Enter a date in this format YYYY-MM-DD" value={this.state.qty}/>
                                            *Default quantity would be 1*
                                            
                                        </div>

                                        {/* <input type="submit" value="Proceed" className = "btn btn-danger btn-block"/> */}
                                        <button type="button" className="btn btn-success btn-block"
                                         onClick = {() => this.modalOpen('Do you want to save the changes you made ?',buttons2)}>
                                            Update
                                        </button>
                                        <button type="button" className="btn btn-danger btn-block"
                                         onClick = {() => this.modalOpen('Are you sure you want to Delete the message?',buttons)}>
                                            Delete
                                        </button>
                                        

                                    
                                    </form>

                                </div>
                            </div>
                            

                            
                        </div>
                    </div>

                </div>
                <Modal message={this.state.message} buttons={this.state.buttons}/>
                {this.state.redirect?<Redirect to="./inventory"/>:null}
                
            </div>
        )
    }

}