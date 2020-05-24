<template>
  <line-chart :chart-data="dataCollection" :options="options" />
</template>
<script>
import LineChart from './LineChart'

export default {
  components: {
    LineChart
  },
  props: {
    chartPattern: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: 5
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              display: false,
              gridLines: {
                display: false
              },
              ticks: {
                min: 10,
                max: 700
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    dataCollection() {
      // 0: ゆらゆら上下
      // 1: おおきく上昇
      // 2: どんどん下落
      // 3: ちょっと上昇
      const collection = [
        [106, 128, 118, 104, 122, 117, 65, 56, 102, 95, 147, 105],
        [73, 79, 76, 72, 69, 107, 159, 511, 50, 106, 68, 61],
        [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45],
        [65, 60, 55, 50, 45, 118, 107, 210, 218, 183, 91, 87],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]

      const data = collection[this.chartPattern === -1 ? 4 : this.chartPattern]

      return {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        datasets: [
          {
            borderColor: '#C9E1C9',
            borderWidth: 5,
            borderCapStyle: 'round',
            borderJoinStyle: 'round',
            // lineTension: 1,
            fill: false,
            data
          }
        ]
      }
    }
  }
}
</script>
