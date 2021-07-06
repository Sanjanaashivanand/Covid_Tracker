import React,{useState, useEffect} from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius:0
        },
    },
    maintainAspectRatio: false,
    tooltips:{
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes : [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                }
            }
        ],
        yAxis : [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function(value, index, values){
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}

export default function LineGraph() {

    const[chartData, setChartData] = useState({});

    const buildChartData = (data, casesType = "cases") => {
        let chartData = [];
        let prevDataPoint;
        for(let date in data.cases){
            if(prevDataPoint){
                const newDataPoint = {
                    x:date,
                    y: data[casesType][date] - prevDataPoint
                };
                chartData.push(newDataPoint);
            }
            prevDataPoint = data[casesType][date];
        }
        return chartData;
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response => response.json())
            .then(data => {
                let chartData = buildChartData(data);
                setChartData(chartData);
                console.log(chartData)
            })
        };

        fetchData();
    }, [])

    return (
        <div>
            <h1>fuck this shit</h1>
        </div>
    )
}
