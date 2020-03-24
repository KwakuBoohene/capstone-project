import React from "react";
import {Redirect} from "react-router";
import axios from 'axios';
import CanvasJSReact from '../assets/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var Canvas = CanvasJSReact.CanvasJSChart;

export default class ExpenseGraph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            expenses: [],
            data: {},
        }
    }

    componentDidMount(){
        var date1 = new Date();
        var thismonth = date1.getMonth() + 1; 

        axios.post('http://localhost:5000/expenses/month',{
            id:this.state.id,
            month: thismonth,
        })
        .then(res => {
            const expenses = res.data;
            this.setState({ expenses });
        })
        .catch(function(error){
            alert(error);
        })
           

    }
    
    render(){
        var keys = Object.values(this.state.expenses);
        var amounts = [];
        var datapoints1 = [];
        var accum = 0;
        for (const[index,value]of keys.entries()){
            accum = accum + keys[index].amount
            amounts.push(accum)
            datapoints1.push({y: accum, label: keys[index].date })
        }
        console.log(datapoints1)

        const options = {
                animationEnabled: true,	
				title:{
					text: "Expenses for the Month of March"
				},
				axisY : {
					title: "Amount spent in Cedis",
					includeZero: false
				},
				toolTip: {
					shared: true
				},
                data : [{
                    type: "spline",
					name: "March",
					showInLegend: true,
					dataPoints: datapoints1
                } ]
        } 

        

        return(
            <div className="">
               <Canvas options = {options} />
            </div>
        )
    }
}