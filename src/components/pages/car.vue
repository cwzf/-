<template>
  <div class="bigBox">
      <van-nav-bar    title="购物车" left-text left-arrow @click-left="onClickLeft" />
    <div class="none" v-if="play1">
      <img :src="imgurl" alt="空购物车" />
      <p>购物车还是空的 快去逛逛吧~</p>
    </div>
    <div class="has" v-if="play2">
      <div class="listBox" >
        <div class="car_list" v-for=" (item,i) in carlist" :key=item.id>
          <p class="title">
          <img :src="shoplogo" alt="logo">
          <span class="tit">{{tit}}</span> 
          </p>
          <div class="conBox" >
            <div class="con clearfix" ref='cardMain' @touchstart='touchStart(i)' @touchmove='touchMove(i)' @touchend='touchEnd(i)'>
              <div class="dan">
                <label :for=i   :class="item.check?'iconHigh':'icon'"></label>
                <input type="checkbox"  :id=i  v-model="item.check" @click="check(i)">
              </div>
              <img :src="item.imgurl" alt="">
              <div class="desc">
                <div class="tit_box">
                  <span class="baoti">{{item.title}}</span>
                  <p class="num">{{item.size}}</p>
                  <p class="age">{{item.age}}</p>
                </div>
                <button class="btn"  @click="down(i)">-</button><button class="count">{{item.buyNum}}</button><button class="btn" @click="add(i)">+</button>
              </div>
              <p class="price">
              ￥{{ Number(item.price).toFixed(2)}}
              </p>
           </div>
          <div class="delBox" ref='remove' @click='del(i)'>
              删除
          </div>
          </div>
        </div>
      </div>
      <div class="clear_box">
              <div class="all">
                <div class="dan">
                  <!--  -->
                  <label for='al' :class="checkAll?'iconAhigh':'iconA'" ></label>
                  <input id='al' type="checkbox"  @click="checkA" v-model="checkAll" />
                </div>
                <p class="font">全选</p>
              </div>
              <div class="edit">
                <img :src="deitUrl" alt class="edit_img" />
                <p class="font">编辑</p>
              </div>
              <div class="count">
                <span>合计为:{{ Number(allPrice).toFixed(2) }}</span>
                <p>(不含运费)</p>
              </div>
              <div class="clear_btn">去结算</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject:['reload'], //注入reload方法
  data() {
    return {
      checkAll: false,
      play1:false,
      play2:false,
      tit: "杭州保税区仓",
      shoplogo: require("../../assets/images/car/shop.jpg"),
      imgurl: require("../../assets/images/car/shopping_wu.png"),
      deitUrl: require("../../assets/images/car/editor_nor.png"),
      carlist: [] //列表信息
    };
  },
  computed: {
    allPrice() {
      //单选控制(选中就计算，不选就不计算)
      let sum = 0;
      this.carlist.map((item, i) => {
        if (item.check) {
          sum += item.price * item.buyNum;
        }
      });
      return sum;
    }
  },
  methods: {    
    //全选按钮
    //选中为false 未选中为true
    checkA() {
      if (this.checkAll) { //全选未勾选时
        this.carlist.map(item => {
          item.check = false;
        });
      } else {  //全选勾选时
        this.carlist.map(item => {
          item.check = true;
        });
      }
    },
    // 勾选时为false,未勾选时为true  首先取反(勾选时为true,未勾选时为false)用map映射，把check状态放置在新数组
    check(i) { //单选
      this.$set(this.carlist[i], "check", !this.carlist[i].check);
      let result = this.carlist.map((item, i) => {
        return item.check;
      });
      //利用every方法，判断数组是否都是true,都是true，返回true 有一个false 返回false
      let bool = result.every((item, i) => {
        return item == true;
      });
      if (bool) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    down(i) { //购买数量减少
      if (this.carlist[i].buyNum <= 1) {
        this.carlist[i].buyNum = 1;
      } else {
        this.carlist[i].buyNum--;
      }
    },
    add(i) {//购买数量增加
      this.carlist[i].buyNum++;
    },
    
    touchStart(index, ev) {//开始触摸
      ev = ev || event;
      this.startX = 0;
      // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if (ev.touches.length === 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX;
      }
      // this.$refs.cardMain[index].style = "transition:1s";
    },
    touchMove(index, ev) {
      ev = ev || event;
      // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd = this.$refs.remove[index].offsetWidth;
      if (ev.touches.length === 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX;
        // 起始位置 - 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX;
        // 如果是向右滑动或者不滑动，不改变滑块的位置  
        this.$refs.cardMain[index].style = "transition:"+1+"s";
        if (this.disX < 0 || this.disX == 0) {
          this.$refs.cardMain[index].style = "transform:translateX(0px)";
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (this.disX > 0) {
          // 具体滑动距离我取的是 手指偏移距离*5。
          this.$refs.cardMain[index].style =
            "transform:translateX(-" + this.disX * 5 + "px)"; 
        
          // 最大也只能等于删除按钮宽度
          if (this.disX * 5 >= wd) {
            this.$refs.cardMain[index].style =
              "transform:translateX(-" + wd + "px)";
          }
        }
      }
    },
   
    touchEnd(index, ev) { // 触摸结束
      ev = ev || event;
      let wd = this.$refs.remove[index].offsetWidth;
      if (ev.changedTouches.length === 1) {
        let endX = ev.changedTouches[0].clientX;
        this.disX = this.startX - endX;
        // 如果距离小于删除按钮一半,强行回到起点 
        if (this.disX * 5 < wd / 2) {
          this.$refs.cardMain[index].style = "transform:translateX(0px)";
        } else {
          // 大于一半 滑动到最大值
          this.$refs.cardMain[index].style =
            "transform:translateX(-" + wd + "px)";
        }
        
      }
    },
   
    del(i){ //删除单个商品
      //取出全部信息
      let Arr= JSON.parse(localStorage.getItem('carArr'));
       Arr.splice(i,1)
       //再重新存进去
       localStorage.setItem('carArr',JSON.stringify(Arr))
       this.reload() //刷新页面
    } 
  },
  mounted(){ 
    //从存储中取值
    let listArr=JSON.parse(localStorage.getItem("carArr"))
    if(Number(listArr)==0){ //非空数组 []也为true
      this.play1=true
    }else{
      this.play2=true
    }
    this.carlist = JSON.parse(localStorage.getItem("carArr")); 
  },
};
</script>
<style lang="stylus" scoped>
.bigBox
  background-color #fafafa
  .van-nav-bar
    width 100%
    background-color #ff9900
    position fixed
    top 0 
    .van-nav-bar__title, .van-nav-bar__text
      color #fff
      font-size 0.53rem /* 40/75 */
    .van-icon
      color #fff
      font-size 0.48rem /* 36/75 */
  .none
    width 3.2rem /* 240/75 */
    height   10.67rem /* 800/75 */
    margin  1.23rem /* 92/75 */ auto  0
    padding-top 50%
    text-align center
    img
      width 1.15rem /* 86/75 */
      height 1.23rem /* 92/75 */
      margin-bottom 0.4rem /* 30/75 */
    p
      font-size 0.4rem /* 30/75 */
      line-height 0.61rem /* 46/75 */
  .has
    .listBox
     padding-left .48rem /* 36/75 */
     padding-top 1.23rem /* 92/75 */
     margin-bottom  100px  
     .car_list
      height  4.37rem /* 328/75 */
      .title
        height 1.41rem /* 106/75 */
        line-height 1.41rem /* 106/75 */
        position relative
        z-index 0
        img
          width  .48rem /* 36/75 */
          height  .48rem /* 36/75 */
          position absolute
          top .47rem /* 35/75 */
        .tit
          padding-left .83rem /* 62/75 */
          color #afafaf 
          font-size .35rem /* 26/75 */
      .conBox
        position relative
        z-index 0
        .con
          background-color #fbfbfb
          position absolute
          right 0
          left 0
          z-index 20
          .dan
            float left
            width .56rem /* 42/75 */
            height .56rem /* 42/75 */
            margin-top .75rem /* 56/75 */
            margin-right .27rem /* 20/75 */
            position relative
            .icon{
              position absolute
              width .56rem /* 42/75 */
              height .56rem /* 42/75 */
              background url('../../assets/images/car/radio_gray.png') no-repeat
              background-size  .56rem .56rem
              z-index 10
            }
            .iconHigh{
              position absolute
              width .56rem /* 42/75 */
              height .56rem /* 42/75 */
              background url('../../assets/images/car/radio_hig.png') no-repeat
              background-size  .56rem .56rem
              z-index 10
            }
            input{
              position absolute
              width .56rem /* 42/75 */
              height .56rem /* 42/75 */
              z-index 20
              opacity 0
            }
          img
            float left
            width 2.09rem /* 157/75 */
            height  2.09rem /* 157/75 */
            margin-right .27rem /* 20/75 */
          .desc
            float left
            width 3.71rem /* 278/75 */
            margin-right .56rem /* 42/75 */
            margin-bottom .4rem /* 30/75 */
            .tit_box
              width 3.71rem /* 278/75 */
              margin-bottom .48rem /* 36/75 */
              overflow hidden
              white-space:nowrap
              text-overflow:ellipsis
            .baoti
                width 3.71rem /* 278/75 */
                font-size .4rem /* 30/75 */
                color #333333
                line-height .51rem /* 38/75 */
            p
              color #afafaf
              font-size .35rem /* 26/75 */
              line-height .51rem /* 38/75 */
            .num
               float left
            .age
               float right
            .btn
              border none 
              display inline-block
              height  .56rem /* 42/75 */
              width  .99rem /* 74/75 */
              line-height .56rem /* 42/75 */
              border .04rem /* 3/75 */ solid #cccccc
              background-color #fff
            .count
              border none 
              background-color #fff
              display inline-block
              height  .56rem /* 42/75 */
              width  .99rem /* 74/75 */
              line-height  .56rem /* 42/75 */
              border-top .04rem /* 3/75 */ solid #cccccc
              border-bottom .04rem /* 3/75 */ solid #cccccc
              margin-top 0
          .price
            float left
            color #000000
            line-height 2.75rem /* 206/75 */
            height 2.75rem /* 206/75 */
            font-size .33rem /* 25/75 */
      .delBox 
        position absolute
        right 1px
        top 1px
        width 1.33rem /* 100/75 */
        height  2.6rem /* 206/75 */
        background-color orange
        color  #ffffff
        font-size .4rem /* 30/75 */
        line-height 2.75rem /* 206/75 */
        text-align center
        z-index 10
    .clear_box
      position fixed
      width 100%
      z-index 20
      height 1.49rem /* 112/75 */
      border-top .04rem /* 3/75 */ solid #eeeeee
      border-bottom .04rem /* 3/75 */ solid #eeeeee
      bottom 1.41rem /* 106/75 */
      left 0
      bottom  50px
      background-color  #fff
      padding-bottom .16rem /* 12/75 */
      .all
        float left
        margin-left .51rem /* 38/75 */
        width .73rem /* 55/75 */
        text-align right 
        .font
          display inline-block
          width .73rem /* 55/75 */
          color #8c8c8c
          font-size .35rem /* 26/75 */
          line-height .69rem /* 52/75 */
        .dan
          width .56rem /* 42/75 */
          height .56rem /* 42/75 */
          margin-top .24rem /* 18/75 */
          position relative
          .iconA{
            position absolute
            width .56rem /* 42/75 */
            height .56rem /* 42/75 */
            background url('../../assets/images/car/radio_gray.png') no-repeat
            background-size  .56rem .56rem
            z-index 10
            }
          .iconAhigh{
            position absolute
            width .56rem /* 42/75 */
            height .56rem /* 42/75 */
            background url('../../assets/images/car/radio_hig.png') no-repeat
            background-size  .56rem .56rem
            z-index 10
            }
          input{
            width .56rem /* 42/75 */
            height .56rem /* 42/75 */
            z-index 20
            opacity 0
            }
          
      .edit 
        float left
        margin-left .51rem /* 38/75 */
        width .73rem /* 55/75 */
        text-align  right
        margin-right 1.47rem /* 110/75 */
        .font
          display inline-block
          width .73rem /* 55/75 */
          color #8c8c8c
          font-size .35rem /* 26/75 */
          line-height .69rem /* 52/75 */
        
        .edit_img
          width .56rem /* 42/75 */
          height .63rem /* 47/75 */
          margin-top .16rem /* 12/75 */
      .count
        float left
        text-align center
        height  1.49rem /* 112/75 */
        font-size .27rem /* 20/75 */
        color #cdcdcd
        margin-top .45rem /* 34/75 */
      .clear_btn
        position absolute
        right 0
        bottom 0
        width 3.09rem /* 232/75 */
        background-color #ff5500
        line-height   1.65rem /* 124/75 */
        height  1.65rem /* 124/75 */
        font-size .48rem /* 36/75 */
        color #ffffff
        text-align center  
      
</style>