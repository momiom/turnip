<template>
  <div class="container mx-auto px-4 py-4">
    <div class="grid grid-cols-1 gap-4">
      <div class="text-2xl text-center text-green-800">
        カブ価予報
      </div>

      <turnip-prices v-model="currentPrices" />

      <result-board :turnip-pattern-type="patternType" />

      <forecast-detail :current-prices="debounceCurrentPrices" />

      <vue-disqus
        shortname="turnip-forecast"
        identifier="index"
        url="https://turnip-forecast.netlify.app/"
      ></vue-disqus>
    </div>
  </div>
</template>

<script>
import TurnipPrices from '~/components/TurnipPrices'
import ResultBoard from '~/components/ResultBoard'
import ForecastDetail from '~/components/ForecastDetail'

export default {
  components: {
    TurnipPrices,
    ResultBoard,
    ForecastDetail
  },
  data() {
    return {
      // currentPrices: [101, 58, 54, 133, 137],
      // currentPrices: [96, 74, 69], // middle spike
      // currentPrices: [96, 83, 79, 76, 72, 119], // high spike
      currentPrices: Array.from({ length: 13 }, () => ''),
      patternType: 0,
      debounceCurrentPrices: []
    }
  },

  watch: {
    currentPrices() {
      this.debouncedCurrentPrices()
    }
  },

  created() {
    this.debouncedCurrentPrices = this.$debounce(this.returnCurrentPrices, 800)
  },

  methods: {
    returnCurrentPrices() {
      this.debounceCurrentPrices = this.currentPrices
    }
  }
}
</script>

<style></style>
