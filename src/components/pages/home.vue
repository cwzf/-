<template>
  <div>
    <div class="banner">
      <div class="search_box">
        <input type="text" class="search" placeholder="Montagne jeunesse" />
        <p class="search_btn"></p>
      </div>
    </div>
    <div class="main_box">
      <div class="con_box" v-for="(item,i) in goodsList" :key=i>
        <p class="title">
          <span class="logo">
            <img :src='logoImg[i]' alt="">
          </span>
          {{item.name}}
        </p>
        <ul class="good_box">
          <li class="good_item" v-for="its in item.list" :key="its.id" @click='goDetail(its.id)'>
            <div class="image">
              <img :src="its.thumbnail" alt />
            </div>
            <p class="price_box clearfix">
              <span class="price">￥{{its.reduct_price}}</span>
              <span class="del">￥{{its.original_price}}</span>
            </p>
            <p class="desc">{{its.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../common/api'
export default {
  data() {
    return {
      goodsList: [],
      logoImg:[
        require("../../assets/images/index/hot.png"),
        require("../../assets/images/index/baby.png"),
        require("../../assets/images/index/meizhuang.png"),
        require("../../assets/images/index/furniture.png"),
        require("../../assets/images/index/food.png"),
        require("../../assets/images/index/airplane.png")
      ]
    };
  },
  methods: {
    goDetail(Id){
      console.log(Id,'Id')
      this.$router.push({
        path:'/detail',
        query:{
          id:Id
        }
      })
    }
  },
  mounted() {
    this.$http({
      url:api.home,
    })
    .then(res=>{ 
        this.goodsList=res.data.data
    })
    .catch(err=>{
       console.log(err,'res')
    })
  },
};
</script>
<style lang="stylus" scoped>
.banner
  width 10rem /* 750/75 */
  height 6.07rem /* 455/75 */
  background url('../../assets/images/index/banner_01.jpg') no-repeat
  background-size cover
  text-align center
  padding-top 0.88rem /* 66/75 */
  .search_box
    position relative
    .search
      width 6.57rem /* 493/75 */
      height 0.8rem /* 60/75 */
      background-color rgba(255, 255, 255, 0.5)
      border-radius 0.13rem /* 10/75 */
      font-size 0.38rem /* 28.13/75 */
      font-family PingFang
      color #999999
      padding-left 0.31rem /* 23/75 */
    .search_btn
      width 0.49rem /* 37/75 */
      height 0.52rem /* 39/75 */
      background url('../../assets/images/index/search.png') no-repeat
      background-size cover
      position absolute
      top 0.15rem /* 11/75 */
      right 1.85rem /* 139/75 */
.main_box
  width 100%
  padding-bottom  1.67rem /* 125/75 */
  background-color #fafafa
  .con_box
    .title
      padding 0 0.25rem /* 19/75 */
      height 1.28rem /* 96/75 */
      line-height 1.28rem /* 96/75 */
      font-size 0.38rem /* 28.13/75 */
      font-family PingFang
      .logo
        display inline-block
        width 0.39rem /* 29/75 */
        height 0.51rem /* 38/75 */
        margin-right 0.24rem /* 18/75 */
        img{
          width 0.39rem /* 29/75 */
          height 0.51rem /* 38/75 */
        }

    .good_box
      height 6.27rem /* 470/75 */
      display flex
      justify-content space-around
      .good_item
        width   4.13rem /* 310/75 */
        border 0.01rem /* 1/75 */ solid #f2f2f2
        padding-left 0.24rem /* 18/75 */
        background-color #fff
        text-align center
        .image
          width 2.19rem /* 164/75 */
          height 3.51rem /* 263/75 */
          margin-top 0.71rem /* 53/75 */
          margin-left 1.2rem /* 90/75 */
          img
            width 2.19rem /* 164/75 */
            height 3.51rem /* 263/75 */
        .price_box
          width 3.79rem /* 284/75 */
          .price
            float left
            line-height 0.56rem /* 42/75 */
            font-size 0.35rem /* 26/75 */
            color #e60012
          .del
            float right
            font-size 0.27rem /* 20/75 */
            color #949494
            text-decoration line-through solid #949494
        .desc
          width 3.79rem /* 284/75 */
          fon-size 0.43rem /* 32/75 */
          font-family PingFang
          text-align left
          height 1.09rem /* 82/75 */
          line-height 0.56rem /* 42/75 */
.footer
  position fixed
  left 0
  bottom 0
</style>