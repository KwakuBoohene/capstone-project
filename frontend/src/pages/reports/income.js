import React from "react";
import Header from "../../components/header";
import SideNav from "../../components/sidenav";
export default class IncomeStatement extends React.Component{
    render(){
    

        return(
            <div className="">
                <Header startpage="/home"/>
                <div className="row">
                    <SideNav/>
                    <section className="col-sm-10 container">
                    <h2 className="text-center">Income statement for the year 2020</h2>
                        <table className="table ">
                            <tbody>

                                <tr>
                                    <th className="font-italic">Revenue</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td scope="col"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sales</td>
                                    <td >GHS 150</td>
                                </tr>
                                <tr>
                                    <td scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Other Income</td>
                                    <td >GHS 150</td>
                                </tr>
                                <tr>
                                    <td  className="font-weight-bold" scope="col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total Revenue</td>
                                    <td className = "font-weight-bold">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    GHS 300 
                                    </td>
                                </tr>

                                <tr>
                                    <th className="font-italic">Expenses</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Labour/Wages</td>
                                    <td>GHS500</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cost of Goods sold/Cost of Service</td>
                                    <td>GHS 670</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Selling and Administrative Expenses</td>
                                    <td>GHS 500</td>
                                </tr>
                                <tr>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Other Expenses</td>
                                    <td>GHS 600</td>
                                </tr>

                                <tr>
                                    <td className="font-weight-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total Expenses</td>
                                    <td className="font-weight-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GHS 600</td>
                                </tr>

                                <tr>
                                    <th className="font-italic">Net Income</th>
                                    <td className = "font-italic font-weight-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GHS 560.00</td>
                                </tr>
                                
                            </tbody>
                            <select class="custom-select">
                                <option value="0" selected>Select Year</option>
                                <option value="1">2020</option>
                                <option value="2">2019</option>
                                <option value="3">2018</option>
                            </select>
                        </table>

                    <br/>
                    </section>
                    
                </div>
                
                
            </div>
        )
    }

}