import React from "react";
import {Bar} from 'react-chartjs-2';
import axios from 'axios';


export default class SalesGraph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: Number(localStorage.getItem('userid')),
            sales: [],
        }
    }

    componentWillMount(){
        this.getMonthSales();
    }

    getMonthSales(){
            axios.post('http://localhost:5000/sales/month',{
            id:this.state.id,
        })
        .then(res => {
            const sales = res.data;
            this.setState({ sales });
        })
        .catch(function(error){
            alert(error);
        })
    }

    
    
    getAmounts(sales){
        var keys = Object.values(sales);
        var accum = [];
        for (const[index,value]of keys.entries()){
            accum.push(keys[index].amount)
            if( accum.length >6){
                break
            }
        }
        return accum
    }

        getDate(sales){
        var keys = Object.values(sales);
        var accum = [];
        for (const[index,value]of keys.entries()){
            accum.push(keys[index].date)
            if( accum.length >4){
                break
            }
        }
        return accum
    }



    render(){
        var amounts = this.getAmounts(this.state.sales);
        var dates2 = this.getDate(this.state.sales);
     
        const data = {
        labels: dates2,
        datasets: [
            {
            label: 'Amount in Cedis',
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
  
            data: amounts
            }
        ]
        };
        return(
            <div className="">
               <Bar ref="chart" height={80}  data={data} />
            </div>
        )
    }
}