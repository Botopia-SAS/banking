"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: 'Bancos',
                data: [1250, 2500, 3750],
                backgroundColor: ['#046b3b ', '#2a914f ', '#36b765 ']
            }
        ],
        labels: ['Banco 1', 'Banco 2', 'Banco 3']
    }
    return <Doughnut
     data={data}
     options={{
        cutout:'60%',
        plugins:{
            legend:{
                display:false
            }
        },
        animation:{
            duration:2500,
        }
     }}
      />
}

export default DoughnutChart