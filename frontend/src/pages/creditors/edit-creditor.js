import React from "react";
import {Redirect} from "react-router-dom";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from 'axios';

export default class EditCreditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cname : "",
            amount : "",
            dBorrow : "",
            dline:"",
            vPay:"",
            redirect: false,
            userid: Number(sessionStorage.getItem('userid')),
            id: Number(sessionStorage.getItem('editcreditor')),
        };
        this.Change = this.Change.bind(this);
        this.editFormData = this.editFormData.bind(this);
        this.onUpdate =  this.onUpdate.bind(this);
        this.validate = this.validate.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    getCreditorData(){
                axios.get('http://localhost:5000/creditors/single/' + String(this.state.id)
        )
        .then(res => {
        const creditor = res.data;
        creditor.map(creditor =>
        this.setState({ 
                cname:creditor.name,
                amount:creditor.amount,
                dBorrow:creditor.dBorrow,
                dline: creditor.dline,
                vPay: creditor.vPay,
             })
        )

      })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount(){
        console.log(sessionStorage.removeItem('editcreditor'))
        this.getCreditorData();
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
        
        .post('http://localhost:5000/creditors/update',
        {
        'name':this.state.cname,
        'amount':this.state.amount,
        'dBorrow':this.state.dBorrow,
        'dline': this.state.dline,
        'vPay': this.state.vPay,
        'id':this.state.id,
        
        })
        .then(response =>{
            console.log(response);
            alert('Creditor updated');
            this.setState({redirect: true})
            
        })
        .catch(error =>{
            console.log(error);
            alert(error);
        })


    }

    deleteCreditor(){
        axios
        
        .post('http://localhost:5000/creditors/delete',
        {
            'delete':this.state.id,
        })
        .then(response =>{
            console.log(response);
            alert('Creditor entry deleted');
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
    };

    validate = () => {
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

    onUpdate = () => {
        var validate = this.validate();
        if(validate===true){
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
                                    <h3>Please input the details of your Creditor here</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text"
                                            name = "cname" onChange = {e => this.Change(e)}
                                            className="form-control" placeholder="Name of the person or the Business" 
                                            value={this.state.cname} />
                                        </div>

                                        <div className="form-group">
                                            <label>Amount / Value</label>
                                            <input type="number" name= "amount" onChange = {e => this.Change(e)}
                                             className="form-control" placeholder="Value of the work done or item(s) bought on credit" value={this.state.amount}/>
                                        </div>


                                        <div className="form-group">
                                            <label>Date Recorded</label>
                                            <input type="date" name="dBorrow" placeholder="YYYY-MM-DD" required 
                                             
                                            className="form-control" onChange = {e => this.Change(e)}
                                            title="Enter a date in this format YYYY-MM-DD" value={this.state.dBorrow}/>
                                            *Default date would be the current date*
                                        </div>

                                        <div className="form-group">
                                            <label>Deadline for Payment</label>
                                            <input type="date" name="dline" placeholder="YYYY-MM-DD" required 
                                             
                                            className="form-control" onChange = {e => this.Change(e)}
                                            title="Enter a date in this format YYYY-MM-DD" value={this.state.dline}/>
                                            *Default date would be the current date*
                                        </div>

                                        <div className="form-group">
                                            <label>Payment Made</label>
                                                <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <label class="input-group-text" for="inputGroupSelect01">Options</label>
                                                </div>
                                                <select name="vPay" class="custom-select" id="inputGroupSelect01" onChange = {e => this.Change(e)} value = {this.state.vPay} >
                                                    <option value='1' >Yes</option>
                                                    <option selected value="0" >No</option>
                                                    
                                                </select>
                                                </div>
                                        </div>





                                        {/* <input type="submit" value="Proceed" className = "btn btn-danger btn-block"/> */}
                                        <button type="button" className="btn btn-success btn-block"
                                         onClick = {this.onUpdate}>
                                            Proceed
                                        </button>

                                    
                                    </form>

                                </div>
                            </div>
                            

                            
                        </div>
                    </div>

                </div>
                {this.state.redirect?<Redirect to="./creditors"/>:null}
                
            </div>
        )
    }

}