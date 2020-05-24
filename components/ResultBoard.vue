<template>
  <div class="grid grid-cols-4 gap-4 p-6 bg-main-green rounded-lg">
    <result-board-panel
      class="flex items-stretch md:grid md:grid-cols-2 md:gap-4 col-span-4 md:col-span-2"
      :pattern-type="turnipPattern.type"
    />

    <result-board-message
      class="col-span-4 md:col-start-3 md:col-span-2 bg-main-yellow p-4 rounded-lg"
      :pattern-type="turnipPattern.type"
      :high-spike-day="turnipPattern.highSpikeDay"
      :min-price="turnipPattern.minPrice"
      :max-price="turnipPattern.maxPrice"
    />
  </div>
</template>

<script>
import ResultBoardMessage from '~/components/ResultBoardMessage'
import ResultBoardPanel from '~/components/ResultBoardPanel'

export default {
  components: {
    ResultBoardMessage,
    ResultBoardPanel
  },
  props: {
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
      styles: {
        position: 'relative',
        height: '8vh'
        // 'min-height': '70px'
      }
    }
  },

  computed: {
    turnipPattern() {
      let turnipPattern = {}
      if (this.turnipPatternObj.type !== -1) {
        turnipPattern = this.turnipPatternObj
      } else {
        turnipPattern = {
          type: -1,
          highSpikeDay: null,
          minPrice: 0,
          maxPrice: 0
        }
      }

      return turnipPattern
    }
  }
}
</script>
