<template>
  <div class="container mx-auto px-4 py-4">
    <div class="grid grid-cols-1 gap-4">
      <div class="text-2xl text-center text-green-800">
        Turnip Clculator
      </div>

      <div class="grid grid-cols-4 gap-4 p-4 bg-green-400 rounded-lg">
        <div class="col-span-4 flex items-stretch">
          <div class="flex-1 rounded-lg bg-green-500 p-1 mx-1 bg-opacity-50">
            <div
              class="text-center align-middle text-white text-opacity-50 text-sm"
            >
              ゆらゆら<br />上下
            </div>
          </div>
          <div class="flex-1 rounded-lg bg-green-500 p-1 mx-1 bg-opacity-50">
            <div
              class="text-center align-middle text-white text-opacity-50 text-sm"
            >
              ちょっと<br />上昇
            </div>
          </div>
          <div class="flex-1 rounded-lg bg-green-500 p-1 mx-1">
            <div class="text-center align-middle text-white text-sm">
              おおきく<br />上昇
            </div>
          </div>
          <div class="flex-1 rounded-lg bg-green-500 p-1 mx-1 bg-opacity-50">
            <div
              class="text-center align-middle text-white text-opacity-50 text-sm"
            >
              どんどん<br />下落
            </div>
          </div>
        </div>
        <turnip-pattern-chart
          :chart-pattern="patternType"
          class="col-span-4 md:col-start-2 md:col-span-2 bg-green-600 p-2 rounded-lg"
        />
      </div>

      <div class="container mx-auto p-4 bg-green-400 rounded-lg">
        <turnip-prices v-model="filter" />
      </div>
    </div>
  </div>
</template>

<script>
import TurnipPrices from '~/components/TurnipPrices'
import TurnipPatternChart from '~/components/TurnipChart/TurnipPatternChart'

import { possiblePatterns } from '~/utils/patterns'

const PATTERN_TYPE = {
  highSpike: 0,
  smallSpike: 1,
  middleSpike: 2,
  consistentlyDecreasing: 3
}

export default {
  components: {
    TurnipPrices,
    TurnipPatternChart
  },
  data() {
    return {
      filter: [101, 58, 54, 133, 137]
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
    },

    patternType() {
      return PATTERN_TYPE.highSpike
    }
  },

  methods: {
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
