<template>
  <div class="text-main-brown grid grid-cols-1 gap-4">
    <template v-if="patternType === -1">
      <p class="fade">
        <span style="display: inline-block;">すみません。</span
        ><span style="display: inline-block;">まだはっきりと</span
        ><span style="display: inline-block;">予報が出せません。</span><br />
        <span style="display: inline-block;">もう少し</span
        ><span style="display: inline-block;">先のカブ価が</span
        ><span style="display: inline-block;">わかったら</span
        ><span style="display: inline-block;">教えてください。</span>
      </p>
      <p class="fade">
        <span style="display: inline-block;">参考までに、</span
        ><span style="display: inline-block;">いちおう</span
        ><span style="display: inline-block;">予報の詳細を</span
        ><span style="display: inline-block;">下に出して</span
        ><span style="display: inline-block;">おきますね。</span>
      </p>
    </template>

    <template v-else>
      <p class="fade">
        <span style="display: inline-block;">今週の</span
        ><span style="display: inline-block;">カブ価は</span><br />
        <span class="emphasize text-attention-pink text-xl">
          {{ patternTypeMsg }}
        </span>
        <span style="display: inline-block;">するでしょう。</span>
      </p>

      <template v-if="patternType === 0">
        <p class="fade">
          <span style="display: inline-block;">2日おきくらいで</span
          ><span style="display: inline-block;">上下を</span
          ><span style="display: inline-block;">くりかえし、</span><br />
          <span style="display: inline-block;">{{ highSpikeDayMsg }}には</span
          ><br />
          <span class="emphasize">
            <span style="display: inline-block;">最低</span
            ><span class="text-money-blue text-xl"> {{ minPrice }}ベル</span>
            <span style="display: inline-block;">最高</span
            ><span class="text-money-blue text-xl"> {{ maxPrice }}ベル</span>
          </span>
          <span style="display: inline-block;">となるでしょう。</span>
        </p>
        <p class="fade">
          <span class="text-money-blue"> {{ maxPrice }}ベル</span>に<span
            style="display: inline-block;"
            >近ければ</span
          ><span style="display: inline-block;">売ってしまったほうが</span
          ><span style="display: inline-block;">よいかもしれません。</span>
        </p>
      </template>

      <template v-if="patternType === 1 || patternType === 3">
        <p class="fade">
          <span style="display: inline-block;">{{ highSpikeDayMsg }}には</span
          >ピークを迎え<br />
          <span class="emphasize">
            最低でも<span class="text-money-blue text-xl">
              {{ minPrice }}ベル</span
            >
          </span>
          <span class="emphasize">
            最高では<span class="text-money-blue text-xl">
              {{ maxPrice }}ベル</span
            >
          </span>
          <span style="display: inline-block;">まで上昇するでしょう。</span>
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
          <span style="display: inline-block;">...と</span
          ><span style="display: inline-block;">予報は</span
          ><span style="display: inline-block;">してみましたが。。</span><br />
          <span style="display: inline-block;">カブ価は</span
          ><span class="text-money-blue">660ベル</span>より<span
            style="display: inline-block;"
            >上がることは</span
          ><span style="display: inline-block;">ないはずです。</span><br />
          <span style="display: inline-block;">購入価格や</span
          ><span style="display: inline-block;">どこかの</span
          ><span style="display: inline-block;">曜日の</span
          ><span style="display: inline-block;">価格を</span
          ><span style="display: inline-block;">間違えては</span
          ><span style="display: inline-block;">いないですか？</span>
        </p>
        <p class="fade">
          <span style="display: inline-block;">いちおう</span
          ><span style="display: inline-block;">予報の</span
          ><span style="display: inline-block;">詳細を</span
          ><span style="display: inline-block;">下に</span
          ><span style="display: inline-block;">出しておきますが、</span><br />
          <span style="display: inline-block;">正しくない</span
          ><span style="display: inline-block;">かもしれません。</span>
        </p>
      </template>
      <template v-else>
        <p class="fade">
          <span style="display: inline-block;">それでは</span
          ><span style="display: inline-block;">詳しいカブ価を</span
          ><span style="display: inline-block;">みてみましょう。</span>
        </p>
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
