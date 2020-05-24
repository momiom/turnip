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

export default {
  components: {
    TurnipPredictionChart
  },

  model: {
    prop: 'turnipPatternObj'
  },

  props: {
    currentPrices: {
      type: Array,
      default: () => []
    },
    turnipPatternObj: {
      type: Object,
      default: () => {
        return {
          type: -1,
          highSpikeDay: null,
          minPrice: 0,
          maxPrice: 0
        }
      }
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
    chartData() {
      const { minMaxData, minWeekValue } = this.calcPattern

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
          borderColor: '#A5D5A5',
          pointRadius: 0,
          pointHoverRadius: 0,
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
    },

    calcPattern() {
      let patterns = possiblePatterns(this.currentPrices)

      const patternCount = patterns.reduce((acc, cur) => acc + cur.length, 0)
      if (patternCount === 0)
        patterns = possiblePatterns([0, ...this.currentPrices.slice(1)])

      const minMaxPattern = patternReducer(patterns)
      const minMaxData = this.$zip(...minMaxPattern)
      // const avgPattern = patternReducer(patterns, averageReducer)
      // const avgData = zip(...avgPattern)
      const [minWeekValue] = patternReducer(patterns, minWeekReducer)

      this.updateTurnipPattern(patterns, minMaxData, minWeekValue)

      return { minMaxData, minWeekValue }
    }
  },

  methods: {
    updateTurnipPattern(patterns, minMaxData, minPrice) {
      // 購入価格、日毎の価格、予測パターンのいづれかが空の場合、予測不能として返す
      const isEmptyBuyPrice =
        this.currentPrices[0] === 0 || this.currentPrices[0] === ''
      const isEmptyPrices = this.currentPrices
        .slice(1)
        .every((v) => v.length === 0)
      const isEmptyPatterns = patterns.every((v) => v.length === 0)

      if (isEmptyPrices || isEmptyPatterns || isEmptyBuyPrice) {
        this.$emit('input', {
          type: -1,
          highSpikeDay: null,
          minPrice: 0,
          maxPrice: 0
        })
      } else {
        const maxPrice = Math.max(...minMaxData[1])
        const highSpikeDay = minMaxData[1].indexOf(maxPrice)

        const possiblePatternLengths = patterns.map((v) => v.length)
        const possiblePatternTypes = possiblePatternLengths.reduce(
          (a, c, i) => {
            c === Math.max(...possiblePatternLengths) && a.push(i)
            return a
          },
          []
        )

        // this.turnipPattern = {
        //     type: 0,
        //     decreasingDay: 0,
        //     highSpikeDay: 0,
        //     minPrice: 0,
        //     maxPrice: 0
        //   }
        // type: 0, msg: 'ゆらゆら<br />上下'
        // type: 1, msg: 'おおきく<br />上昇'
        // type: 2, msg: 'どんどん<br />下落'
        // type: 3, msg: 'ちょっと<br />上昇'
        let type = -1
        if (possiblePatternTypes.length === 1) {
          type = possiblePatternTypes[0]
        } else if (possiblePatternTypes.length === 2) {
          if (
            !possiblePatternTypes.includes(1) &&
            !possiblePatternTypes.includes(3)
          ) {
            type = -1
          }
          // middle, high ならしきい値以上をhighとして返す
          // high 2 ~ 6
          // middle 1.4 ~ 2
          const buyPrice = this.currentPrices[0]
          const threshold = maxPrice / buyPrice
          if (threshold > 2) {
            // high
            type = 1
          } else if (threshold < 2) {
            // middle
            type = 3
          } else {
            // Undeterminable
            type = -1
          }
        }

        this.$emit('input', {
          type,
          highSpikeDay,
          minPrice,
          maxPrice
        })
      }
    }
  }
}
</script>
