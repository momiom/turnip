<template>
  <div class="container mx-auto px-4 py-4">
    <div class="grid grid-cols-1 gap-4">
      <div class="text-2xl text-center text-green-800">
        カブ価予報
      </div>

      <turnip-prices v-model="currentPrices" />

      <result-board :turnip-pattern-type="patternType" />

      <prediction-detail
        v-model="patternType"
        :current-prices="currentPrices"
      />
    </div>
  </div>
</template>

<script>
import TurnipPrices from '~/components/TurnipPrices'
import ResultBoard from '~/components/ResultBoard'
import PredictionDetail from '~/components/PredictionDetail'

// const PATTERN_TYPE = {
//   wave: 0,
//   middleSpike: 1,
//   highSpike: 2,
//   consistentlyDecreasing: 3
// }

export default {
  components: {
    TurnipPrices,
    ResultBoard,
    PredictionDetail
  },
  data() {
    return {
      // currentPrices: [101, 58, 54, 133, 137],
      // currentPrices: [96, 74, 69], // middle spike
      currentPrices: [96, 83, 79, 76, 72, 119], // high spike
      patternType: 0
    }
  },

  // computed: {
  //   patternType() {
  //     return PATTERN_TYPE.highSpike
  //   }
  // },

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
