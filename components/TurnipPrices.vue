<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-6 bg-main-green rounded-lg"
  >
    <div
      class="col-span-2 sm:col-span-3 md:col-span-6 p-2 bg-main-yellow rounded-lg"
    >
      <div class="text-sm text-main-brown">
        購入価格
      </div>
      <input
        class="input"
        :value="prices[0]"
        type="tel"
        @input="updatePrices($event, 0)"
      />
    </div>

    <div v-for="n in 6" :key="n" class=" bg-main-yellow rounded-lg">
      <div v-for="m in 2" :key="m" class="p-2">
        <div class="text-sm text-main-brown">
          {{ weekDay[n - 1] + '曜日:' + ((m - 1) % 2 === 0 ? '午前' : '午後') }}
        </div>
        <div>
          <input
            class="input"
            type="tel"
            :value="prices[n][m - 1]"
            @input="updatePrices($event, n, m)"
            @blur="blurPriceInput($event, n, m)"
          />
        </div>
      </div>
    </div>

    <div class="col-span-1 col-end-3 sm:col-end-4 md:col-end-7">
      <button
        class="
        bg-yellow-300 hover:bg-yellow-400
        text-main-brown whitespace-no-wrap
        w-full h-full
        p-2 md:p-2
        rounded-lg
        inline-flex items-center justify-around
        focus:outline-none"
        @click="$emit('delete')"
      >
        <svg
          class="fill-current text-main-brown"
          width="15"
          height="20"
          viewBox="0 0 15 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.24998 17.2917C1.24998 18.4375 2.18748 19.375 3.33331 19.375H11.6666C12.8125 19.375 13.75 18.4375 13.75 17.2917V4.79167H1.24998V17.2917ZM3.81248 9.875L5.28123 8.40625L7.49998 10.6146L9.70831 8.40625L11.1771 9.875L8.96873 12.0833L11.1771 14.2917L9.70831 15.7604L7.49998 13.5521L5.29165 15.7604L3.8229 14.2917L6.03123 12.0833L3.81248 9.875ZM11.1458 1.66667L10.1041 0.625H4.89581L3.85415 1.66667H0.208313V3.75H14.7916V1.66667H11.1458Z"
          />
        </svg>
        データを削除
      </button>
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
        const pricesPerDay = split(this.$props.currentPrices.slice(1), 2)
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
      let value = parseInt(e.target.value)
      if (isNaN(value)) {
        value = ''
      }
      const prices = this.prices.slice(0)
      if (n === 0) {
        prices[n] = value
      } else {
        prices[n][m - 1] = value
      }
      this.prices = prices
    },
    blurPriceInput(e, n, m) {
      let value = parseInt(e.target.value)
      if (isNaN(value)) {
        value = 0
      }

      let eventLabel = ''
      if (n === 0) {
        eventLabel = '購入カブ価'
      } else {
        eventLabel =
          this.weekDay[n - 1] + '曜日:' + ((m - 1) % 2 === 0 ? '午前' : '午後')
      }

      this.$gtag('event', 'カブ価入力', {
        event_category: 'Turnip Prices',
        event_label: eventLabel,
        value
      })
    }
  }
}
</script>

<style scoped>
.input {
  @apply bg-transparent border-b-2 rounded-none	border-green-550 border-opacity-50 px-2 py-1 block w-full text-money-blue text-lg appearance-none leading-normal transition ease-in-out duration-300;
}

.input:focus {
  @apply outline-none border-opacity-100;
}
</style>
