export const data = (country: string, date: string[], cases: number[]) => {
  return {
    labels: date,
    datasets: [
      {
        type: 'line',
        label: country,
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'square',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#eee',
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: cases,
      },
    ],
  }
}

export const chartOption = (country: string) => {
  return {
    title: {
      display: true,
      text: country,
    },
    tooltips: {
      mode: 'label',
    },
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: '人',
          },
        },
      ],
    },
  }
}
