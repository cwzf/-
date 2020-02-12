<template>
  <div>
    <router-view></router-view>
    <div class="footer">
      <ul class="footNav">
        <li v-for="(item,i) in icon" :key=i  @click="go(item.path)">
          <div class="imgBox">
              <img :src="[item.path==flag ? item.hig:item.nor]" />
           </div>
           <div class="tit" :class="[item.path==flag ? 'active':'']">{{item.title}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: "/home",
      icon:[
        {
          title:'首页',
          nor: require("../assets/images/index/tab_home_nor.png"),
          hig: require("../assets/images/index/tab_home_hig.png"),
          path:'/home'
        },
        {
          title:'分类',
          nor: require("../assets/images/index/tab_menu_nor.png"),
          hig: require("../assets/images/index/tab_menu_hig.png"),
          path:'/sort'
        },
        {
          title:'购物车',
          nor: require("../assets/images/index/tab_shopping_nor.png"),
          hig: require("../assets/images/index/tab_shopping_hig.png"),
          path:'/car'
        },
        {
          title:'个人中心',
          nor: require("../assets/images/index/tab_me_nor.png"),
          hig: require("../assets/images/index/tab_me_hig.png"),
          path:'/mine'
        }
      ],
       
    };
  },
  mounted() {
    //解决路由跳转不显示到对应样式
    this.flag=this.$route.path
  },
  updated() {
     //解决刷新两遍才显示样式
    this.flag=this.$route.path
  },
  methods: {
    go(pathName){
      this.flag=pathName
      this.$router.push(pathName)
    }
  },
};
</script>
<style lang="stylus" scoped>
.footNav{
  height 50px
  width 100%
  background-color #fff
  position fixed
  left 0
  bottom 0
  z-index 20
  display flex
  border-top .03rem /* 2/75 */ solid #f0f0f0
  li{
    width 25%
    text-align center
    font-size .28rem /* 21/75 */
    color #666
    .imgBox{
      margin-top .19rem /* 14/75 */  
      text-align center
      img{
         width .56rem /* 42/75 */
         height .51rem /* 38/75 */
      }
    }
    .active{
      color orange
    }
  }
}
</style>