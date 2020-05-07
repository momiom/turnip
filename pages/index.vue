<template>
  <div class="container mx-auto px-4 py-4">
    <div class="grid grid-cols-1 gap-4">
      <div class="text-2xl text-center text-green-800">
        Turnip Clculator
      </div>

      <result-board :turnip-pattern-type="patternType" />

      <turnip-prices v-model="filter" />
    </div>
  </div>
</template>

<script>
import TurnipPrices from '~/components/TurnipPrices'
import ResultBoard from '~/components/ResultBoard'

import { possiblePatterns } from '~/utils/patterns'

const PATTERN_TYPE = {
  wave: 0,
  middleSpike: 1,
  highSpike: 2,
  consistentlyDecreasing: 3
}

export default {
  components: {
    TurnipPrices,
    ResultBoard
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
