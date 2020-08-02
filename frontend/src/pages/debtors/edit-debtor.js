import React from "react";
import {Redirect} from "react-router-dom";
import Page from "../general/page";
import axios from 'axios';

export default class EditDebtor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dname : "",
            amount : "",
            dBorrow : "",
            dline:"",
            vPay:"",
            redirect: false,
            userid: Number(sessionStorage.getItem('userid')),
            id: Number(sessionStorage.getItem('editdebtor')),
        };
        this.Change = this.Change.bind(this);
        this.editFormData = this.editFormData.bind(this);
        this.onUpdate =  this.onUpdate.bind(this);
        this.validate = this.validate.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    getDebtorData(){
                axios.get('http://localhost:5000/debtors/single/' + String(this.state.id)
        )
        .then(res => {
        const debtor = res.data;
        debtor.map(debtor =>
        this.setState({ 
                dname:debtor.name,
                amount:debtor.amount,
                dBorrow:debtor.dBorrow,
                dline: debtor.dline,
                vPay: debtor.vPay,
             })
        )

      })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount(){
        console.log(sessionStorage.removeItem('editdebtor'))
        this.getDebtorData();
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
        
        .post('http://localhost:5000/debtors/update',
        {
        'name':this.state.dname,
        'amount':this.state.amount,
        'dBorrow':this.state.dBorrow,
        'dline': this.state.dline,
        'vPay': this.state.vPay,
        'id':this.state.id,
        
        })
        .then(response =>{
            console.log(response);
            alert('Debtor updated');
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
       const content = <div className="">
              <div className="col col-sm-10 container">
                            <div className="row">
                                <div className="col col-sm-9">
                                    <h3>Please input the details of your Debtor here</h3>
                                    <form>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text"
                                            name = "dname" onChange = {e => this.Change(e)}
                                            className="form-control" placeholder="Name of the person or the Business" 
                                            value={this.state.dname} />
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
        return(
            <div className="">
               <Page main={content}/>
                    

                              {this.state.redirect?<Redirect to="./debtors"/>:null}
                
            </div>
        )
    }

}