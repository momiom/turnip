<template>
  <div class="grid grid-cols-4 gap-2 p-4 bg-green-400 rounded-lg">
    <div class="col-span-4 flex items-stretch">
      <div
        v-for="(msg, i) in patternMsg"
        :key="msg"
        class="flex-1 rounded-lg bg-green-500 p-1 mx-1"
        :class="{ 'bg-opacity-50': i !== turnipPatternType }"
      >
        <div
          class="text-center align-middle text-white text-sm leading-tight"
          :class="{ 'text-opacity-50': i !== turnipPatternType }"
          v-html="msg"
        ></div>
      </div>
    </div>

    <turnip-pattern-chart
      :chart-pattern="turnipPatternType"
      class="col-span-4 md:col-start-2 md:col-span-2 bg-green-500 p-2 rounded-lg"
      :chart-styles="styles"
    />
  </div>
</template>

<script>
import TurnipPatternChart from '~/components/TurnipChart/TurnipPatternChart'

export default {
  components: {
    TurnipPatternChart
  },
  props: {
    turnipPatternType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      styles: {
        position: 'relative',
        height: '8vh'
        // 'min-height': '70px'
      },
      patternMsg: [
        'ゆらゆら<br />上下',
        'ちょっと<br />上昇',
        'おおきく<br />上昇',
        'どんどん<br />下落'
      ]
    }
  }
}
</script>
