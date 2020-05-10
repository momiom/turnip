<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-4 bg-green-400 rounded-lg"
  >
    <div class="col-span-2 sm:col-span-3 md:col-span-6 p-2 bg-white rounded-lg">
      <div class="text-sm text-green-900">
        購入価格
      </div>
      <input
        class="input"
        :value="prices[0]"
        type="tel"
        @input="updatePrices($event, 0)"
      />
    </div>

    <div v-for="n in 6" :key="n" class=" bg-white rounded-lg">
      <div v-for="m in 2" :key="m" class="p-2">
        <div class="text-sm text-green-900">
          {{ weekDay[n - 1] + '曜日:' + ((m - 1) % 2 === 0 ? '午前' : '午後') }}
        </div>
        <div>
          <input
            class="input"
            type="tel"
            :value="prices[n][m - 1]"
            @input="updatePrices($event, n, m)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// １次元配列をn個の配列に分割する
// e.g. split([1, 2, 3, 4], 2) --> [[1, 2], [3, 4]]
const split = (array, n) => {
  const result = array.reduce(
    (a, c, i) =>
      i % n === 0 ? [...a, [c]] : [...a.slice(0, -1), [...a[a.length - 1], c]],
    []
  )
  return result
}

export default {
  model: {
    prop: 'currentPrices'
  },
  props: {
    currentPrices: {
      type: Array,
      required: true,
      validator(value) {
        return (
          value.length === 0 ||
          value.every((v) => !isNaN(parseInt(v) || v === ''))
        )
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    prices: {
      get() {
        const buyPrice = this.$props.currentPrices[0]
        let pricesPerDay = split(this.$props.currentPrices.slice(1), 2)
        pricesPerDay = Array.from({ length: 6 }, (_, i) =>
          typeof pricesPerDay[i] !== 'undefined' ? pricesPerDay[i] : ['', '']
        )
        return [buyPrice, ...pricesPerDay]
      },
      set(val) {
        // 2次元配列を1次元配列に変換
        const currentPrices = val.slice(1).reduce((pre, curr) => {
          if (curr.length !== 0) pre.push(...curr)
          return pre
        }, [])
        this.$emit('input', [val[0], ...currentPrices])
      }
    },
    weekDay() {
      return ['月', '火', '水', '木', '金', '土']
    }
  },

  methods: {
    updatePrices(e, n, m) {
      console.debug('TurnipPrices.vue updatePrices() e: ', e)
      const value = parseInt(e.target.value)
      if (isNaN(value)) {
        return
      }
      const prices = this.prices.slice(0)
      if (n === 0) {
        prices[n] = value
      } else {
        prices[n][m - 1] = value
      }
      this.prices = prices
    }
  }
}
</script>

<style scoped>
.input {
  @apply bg-transparent border-b rounded-none	border-gray-300 px-2 block w-full text-gray-800 appearance-none leading-normal transition ease-in-out duration-300;
}

.input:focus {
  @apply outline-none border-green-500;
}
</style>
