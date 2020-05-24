<template>
  <div>
    <div
      v-for="val in patternTypeMsg"
      :key="val.type"
      class="flex-1 rounded-lg bg-main-yellow p-1 mx-1 md:p-4 md:flex md:justify-center md:items-center transition ease-in-out duration-300"
      :class="{ 'bg-opacity-50': val.type !== patternType }"
    >
      <div
        class="text-center align-middle text-main-brown text-sm leading-tight md:text-lg transition ease-in-out duration-300"
        :class="{ 'text-opacity-50': val.type !== patternType }"
        v-html="val.msg"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    patternType: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      patternTypeMsg: [
        {
          type: 0,
          msg: 'ゆらゆら<br />上下'
        },
        {
          type: 3,
          msg: 'ちょっと<br />上昇'
        },
        {
          type: 1,
          msg: 'おおきく<br />上昇'
        },
        {
          type: 2,
          msg: 'どんどん<br />下落'
        }
      ]
    }
  }
}
</script>
