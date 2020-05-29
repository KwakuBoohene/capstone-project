import React from "react";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
import axios from "axios";
import html2canvas from "html2canvas";
import * as jsPDF from 'jspdf'

export default class IncomeStatement extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userid : Number(sessionStorage.getItem('userid')),
            e_income:null,
            sales:'',
            expenses:'',
            cogs:null,
            sna:null,
            other:null,
            utilities:null,
            year:2020,
   
        }
        
    }
    componentWillMount(){
        this.getSales();
        this.getExpenses();
    }

    printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("incomeStatement.pdf");
      })
    ;
  }

    nullchecker = item =>{
        if(item===null){
            return "----"
        }else return ("GHS " + item + ".00")
    }

    getSales(){
        axios
        .post('http://localhost:5000/istatement/sales',
        {
            'userid':this.state.userid,
            'year':this.state.year
        })
        .then(response =>{
            response.data.map(sale =>
            {
                this.setState({sales: sale.amount})
            })
            
        })
    }

    getExpenses(){
        axios
            .post('http://localhost:5000/istatement/expenses',
            {
                'userid':this.state.userid,
                'year':this.state.year
            })
            .then(response =>{
                response.data.map(expense =>
                {   if(expense.expense_type===1){
                        this.setState({
                            sna:expense.amount
                        })
                    }
                    if(expense.expense_type===2){
                        this.setState({
                            cogs:expense.amount
                        })
                    }
                    if(expense.expense_type===3){
                        this.setState({
                            other:expense.amount
                        })
                    }
                    if(expense.expense_type===4){
                        this.setState({
                            utilities:expense.amount
                        })
                    }
                })                
            })

    }




   ChangeYear = e =>{
        this.setState({
            year : parseInt(e.target.value),
            sna:null,cogs:null,other:null,utilities:null,
        },async () => {
       await    this.getExpenses()
       await this.getSales()
         } );
       
    }
    render(){
        const {year,sales,e_income,cogs,sna,other,utilities} = this.state;
        const revenue = sales + e_income;
        const expenses =  cogs + sna + other + utilities;
        const profit = revenue - expenses;

        const printButton = (
            <li className="list-group-item">
                <button type="button" className="btn btn-primary btn-block"
                    onClick = {() => this.printDocument() }>
                    Download
                </button>
            </li>
        )
        return(
            <div className="">
                <Header startpage="/home"/>
                <div className="row">
                    <SideNav printButton= {printButton}/>
                    <section className="col-sm-8 container" >
                    <div className="col-sm-12" id ='divToPrint'>
                        <h2 className="text-center">Income statement for the year {year}</h2>
                        <table className="table ">
                            <tbody>

                                <tr>
                                    <th className="font-italic">Revenue</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td scope="col"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sales</td>
                                    <td >{this.nullchecker(sales) }</td>
                                </tr>
                                <tr>
                                    <td scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Other Income</td>
                                    <td >{this.nullchecker(e_income) } </td>
                                </tr>
                                <tr>
                                    <td  className="font-weight-bold" scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total Revenue</td>
                                    <td className = "font-weight-bold">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {this.nullchecker(revenue) }
                                    </td>
                                </tr>

                                <tr>
                                    <th className="font-italic">Expenses</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Utilities</td>
                                    <td>{this.nullchecker(utilities) }</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cost of Goods sold/Cost of Service</td>
                                    <td>{this.nullchecker(cogs) }</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Selling and Administrative Expenses</td>
                                    <td>{this.nullchecker(sna) }</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Other Expenses</td>
                                    <td>{this.nullchecker(other) }</td>
                                </tr>

                                <tr>
                                    <td className="font-weight-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total Expenses</td>
                                    <td className="font-weight-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.nullchecker(expenses)}</td>
                                </tr>

                                <tr>
                                    <th className="font-italic">Net Income</th>
                                    <td className = "font-italic font-weight-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ this.nullchecker(profit) } </td>
                                </tr>
                                
                            </tbody>
                            
                        </table>

                    </div>
                            <label htmlFor="year">Select Year</label>
                            <select name="year" class="custom-select" value={this.state.year} 
                            onChange = {e => this.ChangeYear(e)}>
                                <option value="0" selected>Select Year</option>
                                <option value='2020'>2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                            </select>
                    <br/>
                    </section>
                    
                </div>
                
                
            </div>
        )
    }

}