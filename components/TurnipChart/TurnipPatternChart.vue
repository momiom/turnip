<template>
  <line-chart
    :chart-data="dataCollection"
    :options="options"
    style="position: relative; height: 10vh; min-height: 80px"
  />
</template>
<script>
import LineChart from './LineChart'

const PATTERN_TYPE = {
  highSpike: 0,
  smallSpike: 1,
  middleSpike: 2,
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
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    dataCollection() {
      console.debug('chart type: ', this.chartPattern)
      if (this.chartPattern === PATTERN_TYPE.highSpike) {
        console.debug('Render high spike chart')
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
        console.debug('Render sample chart')
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
