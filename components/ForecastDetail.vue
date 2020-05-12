<template>
  <div>
    <turnip-prediction-chart :chart-data="chartData" :options="options" />
  </div>
</template>
<script>
import TurnipPredictionChart from './TurnipChart/TurnipPredictionChart'

import {
  possiblePatterns,
  patternReducer,
  // averageReducer,
  minWeekReducer
} from '~/utils/patterns'

const zip = (...args) => {
  args = [].slice.call(args)
  const shortest =
    args.length === 0
      ? []
      : args.reduce((a, b) => (a.length < b.length ? a : b))
  return shortest.map((_, i) => {
    return args.map((array) => {
      return array[i]
    })
  })
}

export default {
  components: {
    TurnipPredictionChart
  },

  props: {
    currentPrices: {
      type: Array,
      default: null
    }
  },

  data() {
    return {
      options: {
        maintainAspectRatio: false,
        showLines: true,
        tooltips: {
          intersect: false,
          mode: 'index'
        },
        scales: {
          y: {
            gridLines: {
              display: false
            },
            ticks: {
              min: 10,
              max: 600
            }
          }
        },
        elements: {
          line: {
            cubicInterpolationMode: 'monotone'
          }
        }
      }
    }
  },

  computed: {
    patterns() {
      const currentPrices = this.currentPrices.slice(0)
      let patterns = possiblePatterns(currentPrices)
      const patternCount = patterns.reduce((acc, cur) => acc + cur.length, 0)
      if (patternCount === 0) {
        patterns = possiblePatterns([0, ...currentPrices.slice(1)])
      }

      return patterns
    },

    chartData() {
      // console.debug(this.currentPrices)

      let patterns = possiblePatterns(this.currentPrices)

      const patternCount = patterns.reduce((acc, cur) => acc + cur.length, 0)
      if (patternCount === 0)
        patterns = possiblePatterns([0, ...this.currentPrices.slice(1)])

      // console.debug('patterns', patterns)

      const minMaxPattern = patternReducer(patterns)
      const minMaxData = zip(...minMaxPattern)
      // const avgPattern = patternReducer(patterns, averageReducer)
      // const avgData = zip(...avgPattern)
      const [minWeekValue] = patternReducer(patterns, minWeekReducer)

      // console.debug('minMaxPattern', minMaxPattern)
      // console.debug('minMaxData', minMaxData)
      // console.debug('avgPattern', avgPattern)
      // console.debug('avgData', avgData)
      // console.debug('minWeekValue', minWeekValue)

      const result = [
        {
          label: '購入価格',
          data: new Array(12).fill(this.currentPrices[0] || null),
          fill: true,
          backgroundColor: 'transparent',
          borderColor: '#7B6C53',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderDash: [5, 15]
        },
        {
          label: '最低保証価格',
          data: new Array(12).fill(minWeekValue || null),
          fill: true,
          backgroundColor: 'transparent',
          borderColor: '#007D75',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderDash: [3, 6]
        },
        {
          label: '価格',
          data: Array.from(
            { length: 12 },
            (v, i) => this.currentPrices[i + 1] || null
          ),
          fill: false,
          backgroundColor: '#EF8341',
          borderColor: '#EF8341'
        },
        // {
        //   label: '平均価格',
        //   data: avgData[0]
        //     ? avgData[0].map(Math.trunc)
        //     : new Array(12).fill(null),
        //   backgroundColor: '#F0E16F',
        //   borderColor: '#F0E16F',
        //   pointRadius: 0,
        //   fill: false
        // },
        {
          label: '最低価格',
          data: minMaxData[0] || new Array(12).fill(null),
          backgroundColor: '#88C9A1',
          borderColor: '#88C9A1',
          pointRadius: 0,
          pointHoverRadius: 0,
          // fill: 3
          fill: false
        },
        {
          label: '最大価格',
          data: minMaxData[1] || new Array(12).fill(null),
          backgroundColor: '#A5D5A5',
          borderColor: '#A5D5A5',
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: 3
        }
      ]
      // console.debug('result: ', JSON.stringify(result))
      return {
        datasets: result,
        labels: [
          '月:午前',
          '月:午後',
          '火:午前',
          '火:午後',
          '水:午前',
          '水:午後',
          '木:午前',
          '木:午後',
          '金:午前',
          '金:午後',
          '土:午前',
          '土:午後'
        ]
      }
    }
  }
}
</script>
