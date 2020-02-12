<template>
    <div>
        <div class="tab_btn">
          <span v-for='(item,i) in arr' @click='change(i)' :key=i  :class="[num==i ? 'active':'']">{{item}}</span>
        </div>
        <div class="content" v-if='allArr'>
           <div  class="item" v-for=' (item,index) in allArr' :key=index>
                  <div class="clearfix"><p class="tit">{{item.buyerName}}</p><p class="time">{{ Number(item.createTime)| toTime}}</p></div>
                  <img :src="item.postImg[0]" alt="">
                  <img :src="item.postImg[1]" alt="">
                  <div class="desc">{{item.postDescribe}}</div>
                  <div class="anwser">{{item.adminReviews}}</div>
           </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            num:0, //默认第一个显示样式
            arr:['全部评价','好评','差评','晒单'],
            allArr:[]     
        }
    },
    props:['obj'],
    filters:{
       toTime(n){
         var date=new Date(n);
         //取值
         let year=date.getFullYear();
         let month=date.getMonth()+1 >= 10 ? date.getMonth()+1 :'0'+ (date.getMonth()+1);
         let day=date.getDate()>=10 ? date.getDate() :'0'+ date.getDate();
         let hour=date.getHours()>10 ?date.getHours() :'0'+date.getHours();
         let min=date.getMinutes()>10 ?date.getMinutes() :'0'+date.getMinutes();
         let sec=date.getSeconds()>10 ?date.getSeconds() :'0'+date.getSeconds();
         return `${year}-${month}-${day}  ${hour}:${min}:${sec}`
        }
    },
    mounted() {
        //默认显示全部（页面一加载，就显示）
        this.allArr=this.$props.obj.all
    },
    methods: {
        change(i){
            this.num=i //动态切换样式
            if(i==0){
                this.allArr=this.$props.obj.all
            }else if(i==1){
                this.allArr=this.$props.obj.good
            }else if(i==2){
                this.allArr=this.$props.obj.bad
            }else if(i==3){
                this.allArr=this.$props.obj.postForm
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
.tab_btn{
    height .93rem /* 70/75 */
    width 9.2rem /* 690/75 */
    border-bottom .01rem /* 1/75 */ solid #999999
    margin 0 auto 
    display flex
    justify-content space-between
    text-align center
    span{
        display inline-block
        width 1.8rem /* 135/75 */
        height .67rem /* 50/75 */
        line-height .67rem /* 50/75 */
        color #fff
        fone-size .29rem /* 22/75 */
        border-radius .29rem /* 22/75 */
        margin-top .13rem /* 10/75 */
        background-color #999999 
    }
    .active{
        background-color  orange
    }
}
.content{
     padding 0 .4rem /* 30/75 */
     margin-bottom 1.07rem /* 80/75 */
    .item{
         padding-bottom .27rem /* 20/75 */
         border-bottom  .01rem /* 1/75 */ solid #ccc
        .tit{
            float left
            height .83rem /* 62/75 */
            line-height .83rem /* 62/75 */
            font-size .32rem /* 24/75 */
            color #ff9900
        }
        .time{
            float right
            height .83rem /* 62/75 */
            line-height .83rem /* 62/75 */
            font-size  .21rem /* 16/75 */
            color #999999
        }
        img{
            width 2.03rem /* 152/75 */
            height 2.03rem /* 152/75 */
        }
        .desc{
            line-height .51rem /* 38/75 */
            color #cccccc
            font-size .27rem /* 20/75 */
        }
        .anwser{
            background-color #dddddd
            padding-left .13rem /* 10/75 */
            padding-top  .17rem /* 13/75 */
            color #666666
            font-size .21rem /* 16/75 */
            line-height .33rem /* 25/75 */
            padding-bottom .16rem /* 12/75 */
            border-radius .13rem /* 10/75 */
        }
    }
}
</style>