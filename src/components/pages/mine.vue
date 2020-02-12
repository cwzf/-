<template>
  <div>
    <div class="state"></div>
     <!-- //未登录 -->
    <div class="nologin" v-if='flag1'>
      <div class="nav-bar">
        <span class="kuo" @click="onClickLeft()"></span>
        <span class="mine">个人中心</span>
        <span class="more">
          <!-- <span class="num">1</span> -->
        </span>
        <div class="big_circle">
          <div class="sm_circle">
          </div>
          <p class="login_btn" @click="login_btn()">点击登录</p>
        </div>
      </div>
      <!-- 收藏 -->
      <div class="store">
        <p class="coll">
          <img :src="collurl" alt />我的收藏
        </p>
      </div>
      <!-- 我的订单 -->
      <div class="myorder">
        <h2 class="title">我的订单</h2>
        <h2 class="check">查看全部订单</h2>
      </div>
      <div class="list">
        <div class="boligation">
          <img :src="boligation" alt />
          <p>待付款</p>
        </div>
        <div class="boligation">
          <img :src="prepare" alt />
          <p>待发货</p>
          <!-- <span class="num">1</span> -->
        </div>
        <div class="boligation">
          <img :src="consignee " alt />
          <p>待收货</p>
          <!-- <span class="num">2</span> -->
        </div>
        <div class="boligation">
          <img :src="evaluate" alt />
          <p>待评价</p>
        </div>
        <div class="boligation">
          <img :src="refund" alt />
          <p>退款/售后</p>
        </div>
      </div>
      <!-- 收货地址管理 -->
      <div class="address">收货地址管理</div>
    </div>
    <!-- 已登录 -->
    <div class="logined" v-if="flag2">
      <div class="nav-bar">
        <span class="kuo" @click="onClickLeft()"></span>
        <span class="mine">个人中心</span>
        <span class="more">
          <span class="num">1</span>
        </span>
        <div class="big_circle">
          <div class="sm_circle">
             <img :src="loginImg" alt="">
          </div>
          <p class="login_btn">{{nickName}}</p>
        </div>
      </div>
      <!-- 收藏 -->
      <div class="store">
        <p class="coll">
          <img :src="collurl" alt />我的收藏
        </p>
      </div>
      <!-- 我的订单 -->
      <div class="myorder">
        <h2 class="title">我的订单</h2>
        <h2 class="check">查看全部订单</h2>
      </div>
      <div class="list">
        <div class="boligation">
          <img :src="boligation" alt />
          <p>待付款</p>
        </div>
        <div class="boligation">
          <img :src="prepare" alt />
          <p>待发货</p>
          <span class="num">1</span>
        </div>
        <div class="boligation">
          <img :src="consignee " alt />
          <p>待收货</p>
          <span class="num">2</span>
        </div>
        <div class="boligation">
          <img :src="evaluate" alt />
          <p>待评价</p>
        </div>
        <div class="boligation">
          <img :src="refund" alt />
          <p>退款/售后</p>
        </div>
      </div>
      <!-- 收货地址管理 -->
      <div class="address">收货地址管理</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginImg:"",
      nickName:"",
      flag1:false,
      flag2:false,
      myimgSrc: require("../../assets/images/mine/myimg.png"),
      boligation: require("../..//assets/images/mine/icon_boligation.png"),
      prepare: require("../..//assets/images/mine/prepare.png"),
      consignee: require("../..//assets/images/mine/icon_consignee.png"),
      evaluate: require("../..//assets/images/mine/icon_evaluate.png"),
      refund: require("../..//assets/images/mine/icon_refund.png"),
      active: 0,
      collurl: require("../../assets/images/mine/keep.png"),
    };
  },
  methods: {
    //退出登录
    onClickLeft() {
      sessionStorage.removeItem('loginInfo')
      this.$router.push("/home");
    },
    onClickRight() {
      Toast("按钮");
    },
    login_btn() {
      this.$router.push("/login");
    }
  },
  mounted() {
    //如果localStorage中有值，就显示已登录界面，否则就显示未登录状态
     if(sessionStorage.getItem('loginInfo')){
        this.flag2=true
        let loginArr=JSON.parse(sessionStorage.getItem('loginInfo')) ;
        this.loginImg=loginArr[0].bgcImg
        this.nickName=loginArr[0].nickname
        console.log(this.loginImg,'img')
     }else{
        this.flag1=true
     }
  },
};
</script>
<style lang="stylus" scoped>
.state
  background #ff9900
  height 0.52rem /* 39/75 */
.nav-bar
  background-color #ff9900
  height 4.31rem /* 323/75 */
  padding 0 0.4rem /* 30/75 */
  text-align center
  display flex
  justify-content space-between
  position relative
  span
    display inline-block
    margin-top 0.32rem /* 24/75 */
  .kuo
    width 0.67rem /* 50/75 */
    height 0.67rem /* 50/75 */
    background url('../../assets/images/mine/set.png') no-repeat
    background-size cover
  .mine
    font-size 0.51rem /* 38/75 */
    color #ffffff
  .more
    width 0.69rem /* 52/75 */
    height 0.63rem /* 47/75 */
    background url('../../assets/images/mine/news.png') no-repeat
    background-size cover
    position relative
    .num
      position absolute
      top -0.53rem /* 40/75 */
      right -0.33rem /* 25/75 */
      width 0.51rem /* 38/75 */
      height 0.51rem /* 38/75 */
      background-color #ff0000
      text-align center
      font-size 0.21rem /* 16/75 */
      line-height 0.51rem /* 38/75 */
      border-radius 50%
      z-index 10
      color #fff
  .big_circle
    position absolute
    left 3.63rem /* 272/75 */
    top 2.45rem /* 184/75 */
    width 2.75rem /* 206/75 */
    height 2.75rem /* 206/75 */
    border-radius 50%
    background-color #fff
    text-align center
    .sm_circle
      width 2.4rem /* 180/75 */
      height 2.4rem /* 180/75 */
      margin 0.17rem /* 13/75 */ auto
      background-color #ccc
      border-radius 50%
      img
        width 2.4rem /* 180/75 */
        height 2.4rem /* 180/75 */
        border-radius 50%
    .login_btn
      position absolute
      bottom -0.53rem /* 40/75 */
      left 0.6rem /* 45/75 */
      font-size 0.4rem /* 30/75 */
      color #333333
.store
  height 3.47rem /* 260/75 */
  background-color #fafafa
  padding-left 0.47rem /* 35/75 */
  margin-bottom 0.2rem /* 15/75 */
  .coll
    padding-top 2.4rem /* 180/75 */
    font-size 0.4rem /* 30/75 */
    line-height 0.53rem /* 40/75 */
    img
      width 0.51rem /* 38/75 */
      height 0.48rem /* 36/75 */
      margin-right 0.33rem /* 25/75 */
.myorder
  height 1.63rem /* 122/75 */
  border-bottom 0.01rem /* 1/75 */ solid #cccccc
  background-color #fafafa
  h2
    float left
    line-height 1.63rem /* 122/75 */
    font-size 0.4rem /* 30/75 */
  .title
    color #6c6c6c
    padding-left 0.64rem /* 48/75 */
  .check
    float right
    color #c3c3c3
.list
  padding-top 0.6rem /* 45/75 */
  background-color #fafafa
  display flex
  justify-content space-around
  text-align center
  padding-bottom 0.24rem /* 18/75 */
  margin-bottom 0.19rem /* 14/75 */
  .boligation
    position relative
    img
      width 0.8rem /* 60/75 */
      height 0.64rem /* 48/75 */
    p
      font-size 0.31rem /* 23/75 */
      color #b5b5b5
      line-height 1.03rem /* 77/75 */
    .num
      position absolute
      top -0.27rem /* 20/75 */
      right -0.27rem /* 20/75 */
      width 0.51rem /* 38/75 */
      height 0.51rem /* 38/75 */
      background-color #ff0000
      text-align center
      font-size 0.21rem /* 16/75 */
      line-height 0.51rem /* 38/75 */
      border-radius 50%
      z-index 10
      color #fff
.address
  height 1.71rem /* 128/75 */
  background-color #fafafa
  padding-left 0.6rem /* 45/75 */
  font-size 0.4rem /* 30/75 */
  color #cccccc
  line-height 1.71rem /* 128/75 */
</style>