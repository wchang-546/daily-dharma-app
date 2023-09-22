import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
// import { DateTime } from 'luxon';
// Chart.register(DateTime);

export default function CalendarChart({ entries }) { 
    const chartRef = useRef(null);
    let chartInstance = null;

    const createScatterPlot = () => {
        if (chartRef.current) {
            if (chartInstance) {
                chartInstance.destroy();
            }

            const ctx = chartRef.current.getContext('2d');

            const moodData = entries.map((entry) => entry.mood);
            const dateData = entries.map((entry) => entry.created_date);

            chartInstance = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: 'Mood',
                            data: moodData.map((mood, index) => ({
                                x: dateData[index], // Date on x-axis
                                y: mood, // Mood on y-axis
                            })),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                            pointRadius: 5,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: 'time', // Specify that x-axis represents time (date)
                            time: {
                                unit: 'day', // You can adjust this unit as needed
                            },
                            title: {
                                display: true,
                                text: 'Date', // Label for the x-axis
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Mood', // Label for the y-axis
                            },
                        },
                    },
                },
            });
        }
    };

    useEffect(() => {
             createScatterPlot(entries);
                return () => {
                    if (chartInstance) {
                        chartInstance.destroy();
                    }
                };
            }, [entries]);


    return (
        <div className='lower-box' >
            <canvas ref={chartRef}></canvas>
        </div>
    );
}