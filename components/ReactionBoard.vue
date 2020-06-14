<template>
  <div
    v-show="show"
    class="grid grid-cols-1 gap-4 p-4 rounded-lg text-main-brown"
  >
    <p class="text-center">予報はいかがでしたか？</p>
    <div class="flex flex-wrap justify-around">
      <button
        v-for="reaction in reactions"
        :key="reaction.id"
        class="btn"
        :class="{ active: reaction.isActive }"
        @click="$emit('click', reaction.id)"
      >
        <span>{{ reaction.text }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reactions: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      show: false
    }
  },

  mounted() {
    this.show = this.reactions.length > 0
  }
}
</script>

<style scoped>
.btn {
  @apply border border-main-brown rounded m-2 py-1 px-2 text-center opacity-75 transition duration-300;
}
.btn:focus {
  @apply outline-none;
}
.btn:hover {
  @apply bg-money-blue bg-opacity-25;
}
.btn.active {
  border-color: #2e87e7;
  color: #2e87e7;
  background-color: #f2f9ff;
}
</style>
