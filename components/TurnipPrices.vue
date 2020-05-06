<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
    <div class="col-span-2 sm:col-span-3 md:col-span-6 p-4 bg-white rounded-lg">
      <div class="text-sm text-green-700">
        購入金額
      </div>
      <input
        class="input"
        :value="prices[0]"
        type="number"
        @input="updatePrices($event, 0)"
      />
    </div>

    <div v-for="n in 6" :key="n" class="p-2 bg-white rounded-lg">
      <div v-for="m in 2" :key="m" class="p-2">
        <div class="text-sm text-green-700">
          {{ weekDay[n - 1] + '曜日:' + ((m - 1) % 2 === 0 ? '午前' : '午後') }}
        </div>
        <div>
          <input
            class="input"
            type="number"
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
    prop: 'filter'
  },
  props: {
    filter: {
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
    return {
      rules: {
        mustBeInt: (value) =>
          value === '' ||
          isNaN(parseInt(value)) === false ||
          '数字を入れてください。'
      }
    }
  },
  computed: {
    prices: {
      get() {
        console.debug('prices get: this.$props.filter', this.$props.filter)
        const buyPrice = this.$props.filter[0]
        let pricesPerDay = split(this.$props.filter.slice(1), 2)
        pricesPerDay = Array.from({ length: 6 }, (_, i) =>
          typeof pricesPerDay[i] !== 'undefined' ? pricesPerDay[i] : ['', '']
        )

        console.debug('prices get: return', [buyPrice, ...pricesPerDay])
        return [buyPrice, ...pricesPerDay]
      },
      set(val) {
        console.debug('val', val)
        const filter = val.slice(1).reduce((pre, curr) => {
          if (curr.length !== 0) pre.push(...curr)
          return pre
        }, [])
        this.$emit('input', [val[0], ...filter])
      }
    },
    weekDay() {
      return ['月', '火', '水', '木', '金', '土']
    }
  },
  pricesPerDay() {
    // filter [購入金額, 月AM, 月PM, 火AM, 火PM ...]
    // を↓に変換
    // [
    //   [月AM, 月PM],
    //   [火AM, 火P],
    //   ...
    // ]
    return split(this.filter.slice(1), 2)
  },

  methods: {
    updatePrices(value, n, m) {
      value = parseInt(value)
      const prices = this.prices.slice(0)
      if (n === 0) {
        prices[n] = value
      } else {
        prices[n][m - 1] = value
      }
      console.debug('prices', prices)

      this.prices = prices
    }
  }
}
</script>

<style scoped>
.input {
  @apply bg-transparent border-b border-gray-300 px-2 block w-full text-gray-800 appearance-none leading-normal transition ease-in-out duration-300;
}

.input:focus {
  @apply outline-none border-green-500;
}
</style>
