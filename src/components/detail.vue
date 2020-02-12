<template>
  <div>
    <div class="state"></div>
    <div class="main">
      <div class="con">
        <div class="nav_bar">
          <div class="back" @click="back()">
            <img :src="backurl" alt />
          </div>
          <div class="right">
            <div class="car" @click="goCar()">
              <img :src="carurl" alt />
            </div>
            <div class="more">
              <img :src="moreurl" alt />
            </div>
          </div>
        </div>
        <swiper :arr="swiperArr"></swiper>
      </div>
      <!-- 商品描述 -->
      <div class="detail_box">
        <div class="clearfix">
          <p class="title">{{descArr.name}}</p>
          <p class="collect">
            <span class="logo">
              <img :src="collUrl" alt />
            </span>
            <span class="text">收藏</span>
          </p>
        </div>
        <div class="clearfix">
          <div class="left">
            <p class="ori_price">￥{{ Number(descArr.reduct_price).toFixed(2)}}</p>
            <p class="red_price">￥{{ Number(descArr.original_price).toFixed(2)}}</p>
          </div>
          <div class="right">
            <p class="tit_box">
              <span class="allowance">{{(descArr.allowance*10).toFixed(1)}}折</span>
              <span class="FreeShip" v-if="descArr.isFreeShip">包邮</span>
            </p>
            <p class="des_box">
              <span class="desc" v-for="(item,index) in  descArr.describe" :key="index">{{item}}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- tab切换 -->
      <div class="tab">
        <div class="tab_btn">
          <span
            class="tab_detail"
            @click="goodetail()"
            :class='[comtype=="goodetail" ? "color" :""]'
          >商品详情</span>
          <span class="tab_buyer" @click="buyer()" :class='[comtype=="koubie" ? "color" :""]'>买家口碑</span>
        </div>
        <div :is="comtype" :arr="this.shopDes" :obj="this.obj"></div>
      </div>
      <!-- 加入购物车 -->
      <div class="mask" v-show='isShow'>
        <div class="content">
          <div class="top_box">
            <img :src="imgUrl" alt />
            <div class="desc">
              <p class="price">￥{{Number(price).toFixed(2)}}</p>
              <p class="ku">库存{{total}}件</p>
              <p class="select">请选择商品属性</p>
            </div>
            <div class="close_btn" @click='isShow=false'></div>
          </div>
          <div class="info_box clearfix">
            <p class="num_tit">购买数量</p>
            <div class="num_box">
              <span class="down" @click='down()'>-</span>
              <span class="count">{{buyNum}}</span>
              <span class="add" @click=add()>+</span>
            </div>
          </div>
          <div class="select_box">
            <h3 class="title">{{sizeName}}</h3>
            <span v-for='(size,sizeId) in sizeArr' :key=sizeId  :class='[num1==sizeId? "active" : ""]' @click="num1=sizeId">{{size}}</span>
          </div>
          <div class="select_box">
            <h3 class="title">{{ageName}}</h3>
            <span v-for='(age,ageId) in ageArr' :key=ageId :class='[num2==ageId? "active" : ""]' @click="num2=ageId">{{age}}</span>
          </div>
          <div class="sure_btn">确定</div>
        </div>
      </div>
      <van-goods-action style="z-index: 5">
        <span class="sum_price">总价:￥{{ Number(totalPrice).toFixed(2) }}</span>
        <van-goods-action-button type="warning" text="加入购物车" @click="addBtn()" />
        <van-goods-action-button type="danger" text="立即购买" @click="buyBtn" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
//引入子组件(商品详情/买家评价/轮播图)
import goodetail from "./views/goodetail";
import koubie from "./views/koubie";
import swiper from "./views/swiper";
//引入接口文件
import api from '../common/api'
export default {
  data() {
    return {
      obj: {},
      shopDes: [],
      swiperArr: [], //传过去的轮播图参数
      num1:0,
      num2:0,
      isShow: false,
      buyNum:1,
      imgUrl:'',
      price:"", //价格
      sizeArr:[],
      ageArr:[],
      sizeName:'',
      ageName:'',
      total:'',
      comtype: "goodetail",
      active: 1,
      collUrl: require("../../src/assets/images/detail/collect.png"),
      descArr: {}, //描述信息
      backurl: require("../../src/assets/images/detail/back.png"),
      carurl: require("../../src/assets/images/detail/car.png"),
      moreurl: require("../../src/assets/images/detail/more.png")
    };
  },
  components: {//注册子组件
    goodetail,
    koubie,
    swiper
  },
  computed: {
      totalPrice(){
        return this.buyNum*this.price
      }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    goCar() { //跳购物车页面
      this.$router.push("/car");
    },
    onClick(name, title) {
      this.$toast(title);
    },
    addBtn(){ //加入购物车
      this.isShow=true;
    },
    buyBtn() { //跳转到购物车页面
      let arr=[];
      let obj={
        imgurl:this.imgUrl,
        price:this.price,
        buyNum:this.buyNum,
        size:this.sizeArr[this.num1],
        age:this.ageArr[this.num2],
        title:this.descArr.name,
        check:false
      }
      // //存到localStorage中
      if(localStorage.getItem('carArr')){
        //如果有值，先存储取出来，赋值给arr,将新值push进去，再存储
        arr=JSON.parse(localStorage.getItem('carArr'))
        arr.push(obj)
        localStorage.setItem('carArr',JSON.stringify(arr))
      }else{
        arr.push(obj)
        localStorage.setItem('carArr',JSON.stringify(arr));
      }
      this.$router.push('/car')
    },
    down(){ //购买数量--
        this.buyNum--;
        if(this.buyNum<=1){
         this.buyNum=1
        }
    },
    add(){ //购买数量++
        this.buyNum++;
    },
    goodetail() {
      this.comtype = "goodetail";
    },
    buyer() {
      this.comtype = "koubie";
    }
  },
  mounted() {
     this.$http({
      url:api.detail,
      params: {
        pid: this.$route.query.id
      }
    })
      .then(res => {
        //轮播图
        this.swiperArr = res.data.data.swiperImgArr;
        //描述
        this.descArr = res.data.data;
        //商品详情
        this.shopDes = res.data.data.shopDes;
        //买家口碑
        this.obj = res.data.data.buyerReviews;
        //购物车
        this.imgUrl=res.data.data.swiperImgArr[0]
        this.total=res.data.data.total
        this.price=res.data.data.reduct_price
        this.sizeName=res.data.data.buySelect[0].name
        this.ageName=res.data.data.buySelect[1].name
        this.sizeArr=res.data.data.buySelect[0].list
        this.ageArr=res.data.data.buySelect[1].list
      })
      .catch(err => {
        console.log(err, "errr");
      });
  },
   
};
</script>
<style lang="stylus" scoped>
.state
  background #ff9900
  height 0.52rem /* 39/75 */
.main
  .con
    height 7.23rem /* 542/75 */
    border-bottom 1px solid #cccccc
    .nav_bar
      position fixed
      top 0.52rem /* 39/75 */
      left 0
      width 100%
      height 0.83rem /* 62/75 */
      padding-top 0.11rem /* 8/75 */
      z-index 10
      .back
        float left
        width 0.75rem /* 56/75 */
        height 0.75rem /* 56/75 */
        border-radius 50%
        background-color rgba(0, 0, 0, 0.5)
        margin-left 0.31rem /* 23/75 */
        img
          width 0.24rem /* 18/75 */
          height 0.35rem /* 26/75 */
          margin-left 0.28rem /* 21/75 */
          margin-top 0.19rem /* 14/75 */
      .right
        float right
        width 2.29rem /* 172/75 */
        .car
          float left
          width 0.75rem /* 56/75 */
          height 0.75rem /* 56/75 */
          border-radius 50%
          background-color rgba(0, 0, 0, 0.5)
          margin-right 0.53rem /* 40/75 */
          img
            width 0.39rem /* 29/75 */
            height 0.36rem /* 27/75 */
            margin-left 0.16rem /* 12/75 */
            margin-top 0.16rem /* 12/75 */
        .more
          float left
          width 0.75rem /* 56/75 */
          height 0.75rem /* 56/75 */
          border-radius 50%
          background-color rgba(0, 0, 0, 0.5)
          img
            width 0.35rem /* 26/75 */
            height 0.08rem /* 6/75 */
            margin-left 0.17rem /* 13/75 */
            margin-top 0.31rem /* 23/75 */
    .van-swipe
      height 7.23rem /* 542/75 */
      z-index 3
      img
        width 100%
        height 100%
  .detail_box
    padding-left 0.39rem /* 29/75 */
    margin-bottom 0.43rem /* 32/75 */
    .title
      float left
      width 7.27rem /* 545/75 */
      font-size 0.37rem /* 28/75 */
      color #333333
      line-height 0.6rem /* 45/75 */
    .collect
      float right
      width 1.31rem /* 98/75 */
      margin-top 0.11rem /* 8/75 */
      border-left 1px solid #dddddd
      text-align center
      span
        display block
      .logo
        width 0.48rem /* 36/75 */
        height 0.48rem /* 36/75 */
        margin 0 auto 0.17rem /* 13/75 */
        img
          width 0.48rem /* 36/75 */
          height 0.48rem /* 36/75 */
      .text
        font-size 0.2rem /* 15/75 */
        color #e71f19
    .left
      float left
      margin-right 0.51rem /* 38/75 */
      .ori_price
        font-size 0.33rem /* 25/75 */
        color #eb2222
      .red_price
        font-size 0.24rem /* 18/75 */
        color #999999
        text-decoration line-through solid #999
        line-height 0.67rem /* 50/75 */
    .right
      float left
      .tit_box
        margin-bottom 0.13rem /* 10/75 */
        span
          display inline-block
          width 0.93rem /* 70/75 */
          height 0.4rem /* 30/75 */
          background-color #ff9900
          margin-right 0.27rem /* 20/75 */
          font-size 0.25rem /* 19/75 */
          color #ffffff
          text-align center
          line-height 0.4rem /* 30/75 */
      .des_box
        .desc
          width 1.35rem /* 101/75 */
          height 0.35rem /* 26/75 */
          font-size 0.25rem /* 19/75 */
          line-height 0.35rem /* 26/75 */
          color #ff9900
          border 0.03rem /* 2/75 */ solid #ff9900
          margin-right 0.27rem /* 20/75 */
          padding 0 0.12rem /* 9/75 */
          text-align center
.sum_price
  width 30%
  font-size 0.37rem /* 28/75 */
  color #666666
  padding-left 0.4rem /* 30/75 */
.tab
  .tab_btn
    height 0.91rem /* 68/75 */
    border-top 1px solid #cccccc
    border-bottom 1px solid #cccccc
    span
      float left
      width 50%
      text-align center
      line-height 0.91rem /* 68/75 */
.color
  color #ff9900
  border-bottom 1px solid #ff9900
.mask
  width 100%
  height 100%
  background rgba(0, 0, 0, 0.5)
  position fixed
  top 0
  left 0
  z-index 4
  .content
    width 100%
    height 8.99rem /* 674/75 */
    background #fff
    position absolute
    bottom 0
    left 0
    margin-bottom 0.56rem /* 42/75 */
    .top_box
      height 2.75rem /* 206/75 */
      img
        width 2.77rem /* 208/75 */
        height 2.77rem /* 208/75 */
        position absolute
        left 0.56rem /* 42/75 */
        top -0.37rem /* 28/75 */
        border .09rem /* 7/75 */ solid #ccc
        border-radius  .07rem /* 5/75 */
      .desc
        position absolute
        left 3.71rem /* 278/75 */
        padding-top 0.88rem /* 66/75 */
        color #333
        font-size 0.32rem /* 24/75 */
        line-height 0.43rem /* 32/75 */
        .price
          color #eb2222
      .close_btn
        position absolute
        right 0.39rem /* 29/75 */
        top 0.39rem /* 29/75 */
        width 0.75rem /* 56/75 */
        height 0.75rem /* 56/75 */
        background url('../assets/images/detail/close.png')
        background-size cover
    .info_box
      padding-left 0.56rem /* 42/75 */
      padding-right 0.53rem /* 40/75 */
      .num_tit
        font-size 0.37rem /* 28/75 */
        color #333333
        float left
      .num_box
        float right
        span
          width 0.67rem /* 50/75 */
          height 0.67rem /* 50/75 */
          display inline-block
          background-color #999999
          color #ffffff
          line-height 0.67rem /* 50/75 */
          text-align center
        .count
          color #ccc
          background-color #fff
          width 1.33rem /* 100/75 */
          height 0.61rem /* 46/75 */
          border-top 0.01rem /* 1/75 */ solid #dddddd
          border-bottom 0.05rem /* 4/75 */ solid #dddddd
    .select_box
      padding-top 0.56rem /* 42/75 */
      padding-left .56rem /* 42/75 */
      .title
        font-size 0.37rem /* 28/75 */
        line-height 1
        margin-bottom 0.27rem /* 20/75 */
        color #333333
      span
        display inline-block
        width 1.6rem /* 120/75 */
        height 0.59rem /* 44/75 */
        color #999999
        line-height 0.59rem /* 44/75 */
        text-align center
        background-color #ddd
        border-radius 0.16rem /* 12/75 */ 0.12rem /* 9/75 */
        margin-right .27rem /* 20/75 */
      .active{
        background-color orange
        color #fff
      }
    .sure_btn{
        width  1.07rem /* 80/75 */
        height  .8rem /* 60/75 */
        background-color #ccc
        color #999
        border .01rem /* 1/75 */ solid #ccc
        line-height .8rem /* 60/75 */
        text-align center
        position absolute
        right .4rem /* 30/75 */
        bottom  .8rem /* 60/75 */
        border-radius  .33rem /* 25/75 */
    }
 
</style>