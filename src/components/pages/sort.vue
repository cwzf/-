<template>
  <div>
    <div class="nav_top">
      <div class="search_box">
        <input type="text" class="search" placeholder="Montagne jeunesse" />
        <p class="search_btn"></p>
      </div>
    </div>
    <div class="con_box">
      <van-tree-select :items="items" :main-active-index.sync="activeIndex">
        <template slot="content">
          <div v-if="activeIndex === 0">
              <ul class="sort">
                <li class="good_item" v-for='item in babyArr' :key=item.id>
                  <img :src="item.thumbnail" alt="">
                  <p class="title">{{item.name}}</p>
                </li>
              </ul>
          </div>
          <div v-if="activeIndex === 1">
              <ul class="sort">
                <li class="good_item" v-for='item in Makeup' :key=item.id>
                  <img :src="item.thumbnail" alt="">
                  <p class="title">{{item.name}}</p>
                </li>
              </ul>
          </div>
          <div v-if="activeIndex === 2">
              <ul class="sort">
                <li class="good_item" v-for='item in live' :key=item.id>
                  <img :src="item.thumbnail" alt="">
                  <p class="title">{{item.name}}</p>
                </li>
              </ul>
          </div>
          <div v-if="activeIndex === 3">
              <ul class="sort">
                <li class="good_item" v-for='item in food' :key=item.id>
                  <img :src="item.thumbnail" alt="">
                  <p class="title">{{item.name}}</p>
                </li>
              </ul>
          </div>
          <div v-if="activeIndex === 4">
              <ul class="sort">
                <li class="good_item" v-for='item in world' :key=item.id>
                  <img :src="item.thumbnail" alt="">
                  <p class="title">{{item.name}}</p>
                </li>
              </ul>
          </div>
        </template>
      </van-tree-select>
    </div>
 
  </div>
</template>
<script>
import api from '../../common/api'
export default {
  data() {
    return {
      activeIndex: 0,
      items: [{ text: '' }, { text: '' },{ text: '' }, { text: '' }, { text: '' }],
      babyArr:[],
      Makeup:[],
      live:[],
      food:[],
      world:[]
    };
  },
  mounted() {
     this.$http({
        url:api.sort
    })
    .then(res=>{
       let arr=[];
       let arrList=[];
       res.data.data.map((item)=>{
         arr.push(item.name)
         arrList.push(item.list)
       })
       this.items.map((item,i)=>{
         item.text=arr[i]
       })
       //赋值给数组
       this.babyArr=arrList[0];
       this.Makeup=arrList[1];
       this.live=arrList[2];
       this.food=arrList[3];
       this.world=arrList[4]
    })
    .catch(err=>{
      console.log(err,'err')
    })
  },
};
</script>
<style lang="stylus" scoped>
.nav_top
  height 1.07rem /* 80/75 */
  text-align center
  background-color #ff9900
  padding-top 0.77rem /* 58/75 */
.search_box
  position relative
  .search
    width 6.57rem /* 493/75 */
    height 0.8rem /* 60/75 */
    background-color rgba(255, 255, 255, 0.7)
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

.con_box{
    .van-slidebar{
       width 3.11rem /* 233/75 */
     }
    .sort{
      padding .27rem /* 20/75 */  .2rem /* 15/75 */ 0
      display flex
      justify-content space-between
      flex-wrap wrap
      .good_item{
        width 2.99rem /* 224/75 */
        border  .04rem /* 3/75 */ solid #1d84a7
        border-radius  .07rem /* 5/75 */
        text-align center
        padding-top .19rem /* 14/75 */
        margin-bottom .29rem /* 22/75 */
        img{
          width 2.2rem /* 165/75 */
          height 2.29rem /* 172/75 */
        }
        .title{
          font-size .29rem /* 22/75 */
          color #fff
          line-height  .77rem /* 58/75 */
          height .64rem /* 48/75 */
          background-color #1d84a7
        }
      }
    }
   } 
</style>