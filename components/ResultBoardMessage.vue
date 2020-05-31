<template>
  <div class="text-main-brown grid grid-cols-1 gap-4">
    <template v-if="patternType === -1">
      <p class="fade">
        すみません。まだはっきりと予報が出せません。<br />
        もう少し先のカブ価がわかったら教えてください。
      </p>
      <p class="fade">
        参考までに、いちおう予報の詳細を下に出しておきますね。
      </p>
    </template>

    <template v-else>
      <p class="fade">
        今週のカブ価は<br />
        <span class="emphasize text-attention-pink text-xl">
          {{ patternTypeMsg }}
        </span>
        するでしょう。
      </p>

      <template v-if="patternType === 0">
        <p class="fade">
          2日おきくらいで上下をくりかえし、<br />
          {{ highSpikeDayMsg }}には<br />
          <span class="emphasize">
            最低<span class="text-money-blue text-xl"> {{ minPrice }}ベル</span>
            最高<span class="text-money-blue text-xl"> {{ maxPrice }}ベル</span>
          </span>
          となるでしょう。
        </p>
        <p class="fade">
          <span class="text-money-blue"> {{ maxPrice }}ベル</span
          >に近ければ売ってしまったほうがよいかもしれません。
        </p>
      </template>

      <template v-if="patternType === 1 || patternType === 3">
        <p class="fade">
          {{ highSpikeDayMsg }}にはピークを迎え<br />
          <span class="emphasize">
            最低でも
            <span class="text-money-blue text-xl"> {{ minPrice }}ベル</span>
            最高では
            <span class="text-money-blue text-xl"> {{ maxPrice }}ベル</span>
          </span>
          まで上昇するでしょう。
        </p>
      </template>

      <template v-if="patternType === 2">
        <p class="fade">
          <span class="text-attention-pink text-xl text-center">
            今すぐ売りましょう。
          </span>
        </p>
        <p class="fade">
          <span>お友だちの島にでかけるのもよいでしょう。</span>
        </p>
      </template>

      <template v-if="maxPrice > 660">
        <p class="fade">
          ...と予報はしてみましたが。。<br />
          カブ価は<span class="text-money-blue">660ベル</span
          >より上がることはないはずです。<br />
          購入価格やどこかの曜日の価格を間違えてはいないですか？
        </p>
        <p class="fade">
          いちおう予報の詳細を下に出しておきますが、<br />
          正しくないかもしれません。
        </p>
      </template>
      <template v-else>
        <p class="fade">それでは詳しいカブ価をみてみましょう。</p>
      </template>
    </template>
  </div>
</template>

<script>
const days = ['月', '火', '水', '木', '金', '土']

export default {
  props: {
    patternType: {
      type: Number,
      default: 0
    },
    highSpikeDay: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    maxPrice: {
      type: Number,
      default: 0
    }
  },

  computed: {
    patternTypeMsg() {
      const patternTypeMsg = [
        {
          type: 0,
          msg: 'ゆらゆら上下'
        },
        {
          type: 3,
          msg: 'ちょっと上昇'
        },
        {
          type: 1,
          msg: 'おおきく上昇'
        },
        {
          type: 2,
          msg: 'どんどん下落'
        }
      ]

      let msg = ''
      if (this.patternType !== -1) {
        msg = patternTypeMsg.filter((v) => v.type === this.patternType)[0].msg
      }
      return msg
    },

    highSpikeDayMsg() {
      const day = days[Math.trunc(this.highSpikeDay / 2)]
      const ampm = this.highSpikeDay % 2 === 0 ? '午前' : '午後'

      return `${day}曜日の${ampm}`
    }
  }
}
</script>

<style>
.emphasize {
  display: block;
  text-indent: 1.5em;
}

@keyframes text-in {
  0% {
    opacity: 0;
  }
}
.fade {
  animation: text-in 0.3s ease 0s backwards;
}
</style>
