import React from "react";
import {Bar} from 'react-chartjs-2';
import axios from 'axios';


export default class ExpenseGraph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            expenses: [],
        }
    }

    componentWillMount(){
        this.getMonthExpenses();
    }

    getMonthExpenses(){
            axios.post('http://localhost:5000/expenses/month',{
            id:this.state.id,
        })
        .then(res => {
            const expenses = res.data;
            this.setState({ expenses });
        })
        .catch(function(error){
            alert(error);
        })
    }

    
    
    getAmounts(expenses){
        var keys = Object.values(expenses);
        var accum = [];
        for (const[index,value]of keys.entries()){
            accum.push(keys[index].amount)
            if( accum.length >6){
                break
            }
        }
        return accum
    }

        getDate(expenses){
        var keys = Object.values(expenses);
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
        var amounts = this.getAmounts(this.state.expenses);
        var dates2 = this.getDate(this.state.expenses);
     
        const data = {
        labels: dates2,
        datasets: [
            {
            label: 'Amount in Cedis',
            lineTension: 0.1,
            backgroundColor: '#00695c',
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