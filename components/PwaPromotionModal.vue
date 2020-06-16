<template>
  <!-- eslint-disable prettier/prettier -->
  <modal-wrapper :showing="showPwaPromotion" @close="$emit('close')">
    <div class="w-11/12 max-w-md modal">
      <svg
        width="168"
        height="67"
        viewBox="0 0 168 67"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M132.931 2.03298C126.858 1.15947 104.636 0.0311936 85.5424 0.0311936C74.5006 -0.254822 31.8594 1.4485 21.3614 4.21675C3.41835 8.94822 1.35508 15.569 0.197973 21.3229C-1.41227 29.33 7.3293 37.2351 7.32931 41.3407C7.32932 45.1623 6.08446 51.1418 7.32931 53.5334C8.93959 56.6271 14.0002 62.2685 25.9622 63.9063C37.9243 65.5442 64.1376 67 85.5424 67C118.898 67 131.321 65.1802 141.442 63.9063C148.716 62.991 156.165 59.9028 159.155 55.1713C162.181 50.384 160.536 46.6316 160.536 41.3407C160.536 38.429 166.057 31.1498 167.207 26.9643C168.037 23.9412 169.737 17.5013 162.606 11.314C155.475 5.12665 140.522 3.12486 132.931 2.03298Z"
        />
      </svg>
      <div class="grid grid-cols-1 gap-2 p-4 md:max-w-xs">
        <div>
          <p-br-opt
            class="text-center text-main-brown text-base"
            :content="
              `|-ホーム画面に-||-追加すると-|<br />|-すばやく-||-アクセス-||-できます。-|`
            "
          />
        </div>

        <div class="col-span-1 p-2 text-center">
          <button
            class="bg-money-blue hover:bg-money-blue-dark rounded-full pl-4 pr-3 py-1 text-center text-white text-base focus:outline-none"
            @click="$emit('close', false)"
          >{{ 'オッケー！' }}</button>
        </div>
      </div>
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '~/components/ModalWrapper'
import PBrOpt from '~/components/PBrOpt'

export default {
  components: {
    ModalWrapper,
    PBrOpt
  },

  model: {
    prop: 'showPwaPromotion',
    event: 'close'
  },

  props: {
    showPwaPromotion: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.modal {
  position: relative;
}
.modal > div {
  width: 85%;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
}
.modal svg {
  fill: #fff9e2;
  width: 100%;
  height: auto;
  max-width: 400px;
  margin: 0 auto;
}
</style>
