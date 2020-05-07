<template>
  <line-chart
    :chart-data="dataCollection"
    :options="options"
    :style="chartStyles"
  />
</template>
<script>
import LineChart from './LineChart'

const PATTERN_TYPE = {
  wave: 0,
  middleSpike: 1,
  highSpike: 2,
  consistentlyDecreasing: 3
}

export default {
  components: {
    LineChart
  },
  props: {
    chartPattern: {
      type: Number,
      default: 0
    },
    chartStyles: {
      type: Object,
      default() {
        return {}
      }
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
      if (this.chartPattern === PATTERN_TYPE.highSpike) {
        return {
          labels: [0, 1, 2, 3, 4, 5],
          datasets: [
            {
              borderColor: '#C9E1C9',
              borderWidth: 5,
              borderCapStyle: 'round',
              borderJoinStyle: 'round',
              // lineTension: 1,
              fill: false,
              data: [100, 60, 90, 600, 300, 90]
            }
          ]
        }
      } else {
        return {
          labels: [0, 1, 2, 3, 4, 5],
          datasets: [
            {
              fill: false,
              data: [100, 100, 100, 100, 100, 100]
            }
          ]
        }
      }
    }
  }
}
</script>
