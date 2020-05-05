<template>
  <div class="container mx-auto px-4 py-4">
    <div class="grid grid-cols-1 gap-4">
      <div class="text-2xl text-center text-gray-800">
        Turnip Clculator
      </div>

      <turnip-chart
        class="rounded-lg bg-paper-yellow p-2"
        :chart-data="datacollection"
        :options="chartOptions"
        :style="chartStyles"
      />

      <div class="container mx-auto p-4 bg-green-400 rounded-lg">
        <turnip-prices v-model="filter" />
      </div>
    </div>
  </div>
</template>

<script>
import TurnipPrices from '~/components/TurnipPrices'
import TurnipChart from '~/components/TurnipChart'

import { possiblePatterns } from '~/utils/patterns'

export default {
  components: {
    TurnipPrices,
    TurnipChart
  },
  data() {
    return {
      filter: [101, 58, 54, 133, 137],
      // filter: [],
      datacollection: {},
      chartOptions: {
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      },
      chartStyles: {}
    }
  },

  computed: {
    patterns() {
      const filter = this.filter.slice(0)
      let patterns = possiblePatterns(filter)
      const patternCount = patterns.reduce((acc, cur) => acc + cur.length, 0)
      if (patternCount === 0) {
        patterns = possiblePatterns([0, ...filter.slice(1)])
      }

      return patterns
    }
  },

  mounted() {
    this.fillData()
  },

  methods: {
    updateChart() {},
    fillData() {
      this.datacollection = {
        fill: false,
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
        ],
        datasets: [
          {
            fill: false,
            // backgroundColor: '#f87979',
            data: this.filter
          }
        ]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    debounce(fn, interval) {
      let timer
      return function() {
        clearTimeout(timer)
        timer = setTimeout(function() {
          fn()
        }, interval)
      }
    }
  }
}
</script>

<style></style>
