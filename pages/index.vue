<template>
  <div class="container mx-auto px-4 py-4 pb-10">
    <div class="grid grid-cols-1 gap-6">
      <div class="text-2xl text-center text-white whitespace-no-wrap title">
        <svg
          width="168"
          height="67"
          viewBox="0 0 168 67"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M132.931 2.03298C126.858 1.15947 104.636 0.0311936 85.5424 0.0311936C74.5006 -0.254822 31.8594 1.4485 21.3614 4.21675C3.41835 8.94822 1.35508 15.569 0.197973 21.3229C-1.41227 29.33 7.3293 37.2351 7.32931 41.3407C7.32932 45.1623 6.08446 51.1418 7.32931 53.5334C8.93959 56.6271 14.0002 62.2685 25.9622 63.9063C37.9243 65.5442 64.1376 67 85.5424 67C118.898 67 131.321 65.1802 141.442 63.9063C148.716 62.991 156.165 59.9028 159.155 55.1713C162.181 50.384 160.536 46.6316 160.536 41.3407C160.536 38.429 166.057 31.1498 167.207 26.9643C168.037 23.9412 169.737 17.5013 162.606 11.314C155.475 5.12665 140.522 3.12486 132.931 2.03298Z"
            fill="#1BC7BD"
          />
        </svg>
        <p>
          カブ価予報
        </p>
      </div>

      <div class="bg-main-yellow border-lg px-6 text-main-brown text-center">
        今週のカブ価予報をおとどけします。<br />
        火曜日の午後ごろまで入力すると<br />
        それなりなカブ価予報となるでしょう。
      </div>

      <div
        class="md:hidden grid grid-cols-1 gap-4 p-4 bg-main-green rounded-lg"
      >
        <p class="text-center text-money-blue">今週のカブ価</p>
        <result-board-panel
          class="flex items-stretch"
          :pattern-type="turnipPatternObj.type"
        />
      </div>

      <turnip-prices
        v-model="currentPrices"
        @delete="showDeleteConfirm = true"
      />

      <result-board :turnip-pattern-obj="turnipPatternObj" />

      <forecast-detail
        v-model="turnipPatternObj"
        :current-prices="debounceCurrentPrices"
      />

      <reaction-board :reactions="reactions" @click="updateReaction($event)" />
    </div>

    <delete-confirm-modal
      :show-delete-confirm="showDeleteConfirm"
      @close="showDeleteConfirm = false"
      @clearPrices="clearPrices"
    />

    <pwa-promotion-modal v-model="showPwaPromotion" />
  </div>
</template>

<script>
import TurnipPrices from '~/components/TurnipPrices'
import ResultBoard from '~/components/ResultBoard'
import ForecastDetail from '~/components/ForecastDetail'
import ResultBoardPanel from '~/components/ResultBoardPanel'
import ReactionBoard from '~/components/ReactionBoard'
import DeleteConfirmModal from '~/components/DeleteConfirmModal'
import PwaPromotionModal from '~/components/PwaPromotionModal'

export default {
  components: {
    TurnipPrices,
    ResultBoard,
    ForecastDetail,
    ResultBoardPanel,
    ReactionBoard,
    DeleteConfirmModal,
    PwaPromotionModal
  },
  data() {
    return {
      currentPrices: Array.from({ length: 13 }, () => ''),
      turnipPatternObj: {
        type: -1,
        highSpikeDay: null,
        minPrice: 0,
        maxPrice: 0
      },
      debounceCurrentPrices: [],
      showDeleteConfirm: false,
      reactions: [
        {
          id: 1,
          text: '👍 いいね！',
          isActive: false
        },
        {
          id: 2,
          text: '👎 う〜ん',
          isActive: false
        },
        {
          id: 3,
          text: '😝 おもしろい！',
          isActive: false
        },
        {
          id: 4,
          text: '😍 だいすき！',
          isActive: false
        },
        {
          id: 5,
          text: '😦 へんな予報',
          isActive: false
        },
        {
          id: 6,
          text: '😤 ぜんぜん当たんないよ！',
          isActive: false
        },
        {
          id: 7,
          text: '😥 よくわかんない。。',
          isActive: false
        }
      ],
      showPwaPromotion: false
    }
  },

  watch: {
    currentPrices() {
      // localstrageに保存
      localStorage.setItem('currentPrices', JSON.stringify(this.currentPrices))

      // 設定時間後にthis.debounceCurrentPricesを更新する関数を呼び出す関数を呼び出し
      this.debouncedCurrentPrices()
    },

    showPwaPromotion() {
      localStorage.setItem('pwaPromotion', false)
    }
  },

  created() {
    // currentPricesをdebounceする関数を登録
    this.debouncedCurrentPrices = this.$debounce(this.updateCurrentPrices, 800)
  },

  mounted() {
    // localstrageの初期化
    this.initLocalstrage()

    // iOSの場合ホーム画面に追加を促す
    if (this.$isiOS()) {
      // 条件: query paramにstandaloneがついていない && localStrageにpwaPromotionが存在しない
      this.showPwaPromotion =
        !this.$route.query.standalone && !localStorage.getItem('pwaPromotion')
    }
  },

  methods: {
    // debounce関数に渡す関数
    // 設定時間後に呼び出されthis.debounceCurrentPricesを更新する
    updateCurrentPrices() {
      this.debounceCurrentPrices = this.currentPrices
    },

    clearPrices() {
      // lengthが13の空文字の配列を生成
      this.currentPrices = Array.from({ length: 13 }, () => '')
    },

    initLocalstrage() {
      // 入力カブ価のリストア
      const currentPrices = JSON.parse(localStorage.getItem('currentPrices'))
      if (currentPrices) {
        this.currentPrices = currentPrices
      } else {
        this.currentPrices = Array.from({ length: 13 }, () => '')
      }

      // リアクションのリストア
      const reactionId = localStorage.getItem('reactionId')
      if (!isNaN(parseInt(reactionId))) {
        this.updateReaction(parseInt(reactionId), true)
      }
    },

    updateReaction(id, init = false) {
      const curr = this.reactions.filter((r) => {
        return r.id === id
      })
      if (curr && curr.length > 0) {
        if (!curr[0].isActive) {
          // idの登録・更新
          localStorage.setItem('reactionId', id)
          if (!init) {
            this.$gtag('event', 'リアクションON', {
              event_category: 'リアクション',
              event_label: curr[0].text,
              value: id
            })
          }
        } else {
          // idの削除
          localStorage.removeItem('reactionId')
          if (!init) {
            this.$gtag('event', 'リアクションOFF', {
              event_category: 'リアクション',
              event_label: curr[0].text,
              value: id
            })
          }
        }
      }

      this.reactions = this.reactions.map((r) => {
        const isActive = r.id === id ? !r.isActive : false
        return { id: r.id, text: r.text, isActive }
      })
    }
  }
}
</script>

<style scoped>
.title {
  position: relative;
}
.title p {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
}
.title svg {
  width: 55vw;
  max-width: 200px;
  margin: 0 auto;
}
</style>
