<template>
  <div>
    <van-nav-bar
      title="登录"
      left-text
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="login_box">
        <div class="inp">
            <label for="name" class="tit">手机号:</label>
           <input type="text"  v-model="phone" id="name">
           <span>{{text1}}</span>
        </div>
        <div class="inp">
            <label for="pass" class="tit">密码:</label>
           <input type="password"  v-model="password"  id="pass">
           <span>{{text2}}</span>
        </div>
         <p class="no">忘记密码</p>
        <div class="login_btn" @click='login_btn()'>登录</div>
    </div>
   
  </div>
</template>
<script>
import api from '../common/api'
export default {
    data() {
        return {
            phone:'',
            password:'',
            text1:'',
            text2:''
        }
    },
  methods: {
    onClickLeft() { //退出登录
      this.$router.go(-1)
    },
    onClickRight() {
      this.$router.push({
          path:'/register'
        })
    },

    login_btn(){ //登录
     this.$http({
       url: api.login,
       params:{
         phone:this.phone,
         password:this.password
       }
     })
     .then(res=>{
       
       if(res.data.code==200){
          this.$swal({
            text: '登录成功',
            confirmButtonText: '确定',
          })
        
         let arr=[]
         let obj={
           nickname:res.data.profile.nickname,
           bgcImg:res.data.profile.avatarUrl
         }
         arr.push(obj);
         sessionStorage.setItem('loginInfo',JSON.stringify(arr))
         this.$router.push('/mine')
       }
       
     })
     .catch(err=>{
       this.$swal({
            text: '手机号或密码错误',
            confirmButtonText: '确定',
          })
     })
        this.phone=''
        this.password=''
    }
  }
};
</script>
<style lang="stylus" scoped>
.van-nav-bar
  height 1.25rem /* 94/75 */
  background-color #ff9900
  .van-nav-bar__title, .van-nav-bar__text
    color #fff
    font-size 0.43rem /* 32/75 */
  .van-icon
    color #fff
.login_box{
     width 8rem /* 600/75 */
     margin 3.2rem /* 240/75 */ auto 0
     .inp{
        height 1.04rem /* 78/75 */
        border-bottom .03rem /* 2/75 */ solid #b8b8b8
        margin-bottom .64rem /* 48/75 */
        .tit{
            font-size .4rem /* 30/75 */
            color #6e6e6e
    }
         
     }
     .no{
         font-size .35rem /* 26/75 */
         color #b7b7b7
         height .73rem /* 55/75 */
         text-align right 
         
     }
     .login_btn{
         height 1.33rem /* 100/75 */
         background-color #ff9900
         text-align center
         font-size .43rem /* 32/75 */
         color #ffffff
         line-height 1.33rem /* 100/75 */
         border-radius .13rem /* 10/75 */
     }
}
</style>