<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-if="3>i" v-for="(item,i) in arr" :key="i">
          <img :src="item" alt />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
//局部引入swiper
import Swiper from "swiper";

export default {
  data() {
    return {};
  },
  props: ["arr"],
  methods: {
    getSwiper(){
      var swiper = new Swiper(".swiper-container", {
        //设置分页器
        pagination: {
          el: ".swiper-pagination"
        },
        paginationClickable: true,
        paceBetween: 30,
        centeredSlides: true,
        autoplay: true,
        autoplayDisableOnInteraction: false,
        loop: true
      });
    }
  },
  updated() {
     this.$nextTick(() => {
          this.getSwiper();
      });
  },
};
</script>
<style lang="stylus" scoped>
.swiper-wrapper
  height 7.23rem /* 542/75 */
  img
    height 6.67rem /* 500/75 */
    width 7.65rem /* 574/75 */
    margin-left 1.13rem /* 85/75 */
</style>