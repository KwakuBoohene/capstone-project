import React from "react";
import {Redirect} from "react-router-dom";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';

export default class EditSale extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            description : "",
            amount : "",
            quantity:"",
            date : "",
            redirect: false,
            userid: Number(sessionStorage.getItem('userid')),
            id: Number(sessionStorage.getItem('editsales')),
        };
        this.Change = this.Change.bind(this);
        this.editFormData = this.editFormData.bind(this);
        this.onUpdate =  this.onUpdate.bind(this);
        this.validate = this.validate.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    getSalesData(){
                axios.get('http://localhost:5000/sales/single/' + String(this.state.id)
        )
        .then(res => {
        const sale = res.data;
        sale.map(sale =>
        this.setState({ 
            description:sale.description,
            amount:sale.amount,
            date: sale.date,
            quantity: sale.quantity
             })
        )

      })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount(){
        console.log(sessionStorage.removeItem('editsales'))
        this.getSalesData();
    }
    Change = e => {
        this.setState({
        [e.target.name]: e.target.value
    });
    
    };

    getDate(){
        var today = new Date().toISOString().split('T')[0];
        var date =  String(today);
        return date;
    }

    editFormData(){
    axios
        
        .post('http://localhost:5000/sales/update',
        {
            'description':this.state.description,
            'amount':this.state.amount,
            'date':this.state.date,
            'quantity':this.state.quantity,
            'id':this.state.id,
        })
        .then(response =>{
            console.log(response);
            alert('Sale updated');
            this.setState({redirect: true})
            
        })
        .catch(error =>{
            console.log(error);
            alert(error);
        })


    }

    deleteSale(){
        axios
        
        .post('http://localhost:5000/sales/delete',
        {
            'delete':this.state.id,
        })
        .then(response =>{
            console.log(response);
            alert('Sale entry deleted');
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
        var item = e.target.name;
        console.log(this.state);
    };

    validate = e => {
        if(this.state.name===""||this.state.amount===""){
            alert("Please fill name and amount form");
            return false;
        }
        if(this.state.date===""){
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

    render(){
        return(
            <div className="">
                <Header/>
                <div className="">
                    <div className="row">
                        <SideNav/>

                        <div className="col col-sm-10 container">
                            <div className="row">
                                <div className="col col-sm-9">
                                    <h3>Please Edit the details of your sale here</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Description of the Sale</label>
                                            <input type="text"
                                            name = "description" onChange = {e => this.Change(e)}
                                            className="form-control" placeholder="What did you sell" 
                                            value={this.state.description} />
                                        </div>

                                        <div className="form-group">
                                            <label>amount</label>
                                            <input type="number" name= "amount" onChange = {e => this.Change(e)}
                                             className="form-control" placeholder="How much did you make from the sale" value={this.state.amount}/>
                                        </div>

                                        <div className="form-group">
                                            <label>Quantity Sold</label>
                                            <input type="number" name= "quantity" onChange = {e => this.Change(e)}
                                             className="form-control" placeholder="How much did you sell" value={this.state.quantity}/>
                                        </div>

                                        <div className="form-group">
                                            <label>Date</label>
                                            <input type="date" name="date" placeholder="YYYY-MM-DD" required 
                                             
                                            className="form-control" onChange = {e => this.Change(e)}
                                            title="When did you make the sale?" value={this.state.date}/>
                                            *Default date would be the current date*
                                            
                                        </div>

                                        {/* <input type="submit" value="Proceed" className = "btn btn-danger btn-block"/> */}
                                        <button type="button" className="btn btn-success btn-block"
                                         onClick = {this.onUpdate}>
                                            Update
                                        </button>
                                        <button type="button" className="btn btn-danger btn-block"
                                         onClick = {() => this.deleteSale()}>
                                            Delete
                                        </button>
                                        

                                    
                                    </form>

                                </div>
                            </div>
                            

                            
                        </div>
                    </div>

                </div>
                {this.state.redirect?<Redirect to="./sales"/>:null}
                
            </div>
        )
    }

}