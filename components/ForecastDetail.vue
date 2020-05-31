<template>
  <div class="grid grid-cols-1 gap-4 p-6 bg-main-green rounded-lg">
    <turnip-prediction-chart
      :chart-data="chartData"
      :options="options"
      class="bg-main-yellow p-4 rounded-lg"
    />

    <div
      class="bg-main-yellow p-4 rounded-lg text-main-brown grid grid-cols-1 gap-2"
    >
      <div>
        <h3>カブ価の範囲</h3>
        <p-br-opt
          class="pl-4 text-sm"
          :content="
            `|-ある曜日の-||-午前・午後の-||-最低カブ価と-||-最高カブ価です。-|<br />
          |-例えば-||-木曜日の-||-午後の-||-カブ価が-||-84ベル〜-||-608ベルの-||-予報だったとき、-||-実際の-||-カブ価は-||-84ベル〜-||-608ベルの間の-||-どれかになります。-|`
          "
        />
      </div>

      <div>
        <h3>最低保証カブ価</h3>
        <p-br-opt
          class="pl-4 text-sm"
          :content="
            `|-月曜日〜-||-土曜日の-||-最低カブ価のなかで、-||-最も高いカブ価のことです。-|<br />
          |-例えば-||-最低保証カブ価が-||-84ベルの-||-予報だったとき、-||-カブ価の-||-範囲が-||-「84ベル〜」のときに-||-カブを-||-売るのが-||-一番お得です。-|`
          "
        />
      </div>
    </div>
  </div>
</template>
<script>
import TurnipPredictionChart from './TurnipChart/TurnipPredictionChart'
import PBrOpt from '~/components/PBrOpt'

import {
  possiblePatterns,
  patternReducer,
  minWeekReducer
} from '~/utils/patterns'

export default {
  components: {
    TurnipPredictionChart,
    PBrOpt
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
          enabled: true,
          intersect: false,
          mode: 'index',
          callbacks: {
            title(tooltipItem, data) {
              return tooltipItem[0].xLabel
            },
            label(tooltipItems, data) {
              const currentDatasets = data.datasets[tooltipItems.datasetIndex]
              const label = currentDatasets.label

              // カブ価の範囲は最低〜最大の表記にする
              if (label === 'カブ価の範囲') {
                const min = currentDatasets.data[tooltipItems.index]
                const max =
                  data.datasets[tooltipItems.datasetIndex + 1].data[
                    tooltipItems.index
                  ]
                return `${label}  ${min}ベル 〜 ${max}ベル`
              }

              // 最低カブ価は非表示
              const newLabel = label === '最低カブ価' ? '' : label

              return newLabel === ''
                ? ''
                : `${newLabel}  ${tooltipItems.yLabel}ベル`
            },
            labelColor(tooltipItems, chart) {
              const data = chart.data.datasets[tooltipItems.datasetIndex]
              const label = data.label
              if (label === '購入カブ価') {
                return {
                  borderColor: '#7B6C53',
                  backgroundColor: '#7B6C53'
                }
              }
              if (label === '最低保証カブ価') {
                return {
                  borderColor: '#007D75',
                  backgroundColor: '#007D75'
                }
              }

              return {
                borderColor: data.borderColor,
                backgroundColor: data.backgroundColor
              }
            }
          }
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
        },
        legend: {
          display: true,
          labels: {
            filter(items, chartData) {
              // 最低カブ価を非表示
              return items.text !== '最低カブ価'
            }
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
          label: 'カブ価',
          data: Array.from(
            { length: 12 },
            (v, i) => this.currentPrices[i + 1] || null
          ),
          fill: false,
          backgroundColor: '#EF8341',
          borderColor: '#EF8341'
        },
        {
          label: 'カブ価の範囲', // 最高カブ価
          data: minMaxData[1] || new Array(12).fill(null),
          backgroundColor: 'rgba(165, 213, 165, 0.7)',
          borderColor: 'rgba(0, 0, 0, 0)',
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: 2
        },
        {
          label: '最低カブ価', // 最低カブ価 legend非表示
          data: minMaxData[0] || new Array(12).fill(null),
          borderColor: 'rgba(0, 0, 0, 0)',
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false
        },
        {
          label: '購入カブ価',
          data: new Array(12).fill(this.currentPrices[0] || null),
          fill: true,
          backgroundColor: 'transparent',
          borderColor: '#7B6C53',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderDash: [5, 15]
        },
        {
          label: '最低保証カブ価',
          data: new Array(12).fill(minWeekValue || null),
          fill: true,
          backgroundColor: 'transparent',
          borderColor: '#007D75',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderDash: [3, 6]
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
