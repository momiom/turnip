<template>
  <div>
    <p v-html="brOptContent"></p>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    brOptContent() {
      return this.$brOpt(this.content)
    }
  }
}
</script>
