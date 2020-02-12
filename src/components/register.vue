<template>
  <div>
    <van-nav-bar
      title="注册"
      left-text
      right-text="登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="register_box">
      <div class="inp">
        <label for="nickname" class="tit">昵称:</label>
        <input type="text" v-model="nickname" id="nickname" @blur="blurname" ref="name" />
        <span class="err">{{text1}}</span>
      </div>
      <div class="inp">
        <label for="name" class="tit">手机号:</label>
        <input type="text" v-model="phone" id="name" ref="phone" @blur="blurphone" />
        <span class="err">{{text2}}</span>
      </div>
      <div class="inp">
        <label for="pass" class="tit">密码:</label>
        <input type="password" v-model="password" id="pass" ref="pass" @blur="blurpass" />
        <span class="err">{{text3}}</span>
      </div>
      <div class="inp">
        <label for="pass" class="tit">验证码:</label>
        <input type="text" id="pass" ref="code" @blur="blurcode"  v-model="captcha"/>
        <span>{{text5}}</span>
        <span class="get" @click="get()">点击获取</span>
      </div>
      <div class="login_btn" @click="next()">下一步</div>
      <div class="check">
        <van-checkbox v-model="checked" checked-color="#ff9900" shape="square" class="chech_box">复选框</van-checkbox>
        <span>我已阅读并同意使用条款和隐私政策</span>
        <span class="err">{{text4}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../common/api'
export default {
  data() {
    return {
      checked: true,
      nickname: "",
      phone: "",
      password: "",
      captcha:"",
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      text5:''
    };
  },
  methods: {
    blurname(){ //昵称判空
      if (this.nickname == "") {
        this.text1 = "请输入昵称";
      }else{
        this.text1=''
      }
    },
    blurphone(){ //手机号判空
      let reg2 = /^1[0-9]{10}$/;
      if(reg2.test(this.phone) == false) {
        this.text2 = "请输入正确的手机号";
      }else{
        this.$http({ //手机号是否被注册
           url:api.checkPhone,
           params:{
             phone:this.phone
           }
        })
        .then(res=>{
           if(res.data.exist==1){
             this.text2='手机号已经被注册'
           }
        })
        .catch(err=>{
           console.log(err,'err')
        })
      }
    },
    blurpass(){ 
      let reg1 = /^[a-zA-Z]\w{5,16}/;
      if (reg1.test(this.password) == false) {
        this.text3 = "请输入以字母开头的6-16密码";
      }else{
        this.text3 = "";
      }
    },
    blurcode(){
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        path: "/login"
      });
    },
    //进行注册
    next(){  
      //匹配手机
       let reg2 = /^1[0-9]{10}$/;
      //匹配密码 
      let reg1 = /^[a-zA-Z]\w{5,16}/;
          if(this.checked==false){
              this.$swal({
              text: '请勾选同意条款',
              confirmButtonText: '确定',
            })
         }else{//注册前判空
          if(this.text1==''&& this.text2=='手机号已经被注册' &&  this.text3 ==""){
              this.$http({ //验证码检测
                url:api.verify,
                params:{
                  phone:this.phone,
                  captcha:this.captcha
                }
              })
              .then(res=>{
                if(res.data.code==200){
                    //进行注册
                    this.$http({
                      url:api.register,
                      params:{
                          phone:this.phone,
                          password:this.password,
                          captcha:this.captcha,
                          nickname:this.nickname
                      }
                    })
                    .then(res=>{
                    console.log(res,'resssss')
                      if(res.data.code==200){
                         this.$swal({
                          text: '注册成功,快去登录吧',
                          confirmButtonText: '确定',
                        })
                        this.$router.push('/login')
                      }
                    })
                    .catch(err=>{
                        this.$swal({
                          text: '注册失败',
                          confirmButtonText: '确定',
                        })
                    })
                }
              })
              .catch(err=>{
                 this.$swal({
                          text: '验证码错误',
                          confirmButtonText: '确定',
                        })
              })
            }else{
              this.$swal({
                text: '请完整填写必要信息',
                confirmButtonText: '确定',
              })
                }
         }
    },
    //发送验证码
    get() {
      this.$http({
        url: "http://localhost:3000/captcha/sent",
        params: {
          phone: this.phone
        }
      })
      .then(res => {
          if(res.data.code==200){
            this.$swal({
              text: '验证码发送成功',
              confirmButtonText: '确定',
            })
          }
        })
        .catch(err => {
            this.$swal({
              text: '发送验证码超过限制:每个手机号一天只能发5条验证码',
              confirmButtonText: '确定',
            })
        });
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
.register_box
  width 8rem /* 600/75 */
  margin 3.2rem /* 240/75 */ auto 0
  .err
    color red
  .inp
    height 1.04rem /* 78/75 */
    border-bottom 0.03rem /* 2/75 */ solid #b8b8b8
    margin-bottom 0.64rem /* 48/75 */
    .tit
      font-size 0.4rem /* 30/75 */
      color #6e6e6e
    .get
      float right
      color #fe0041
      font-size 0.35rem /* 26/75 */
  .no
    font-size 0.35rem /* 26/75 */
    color #b7b7b7
    height 0.73rem /* 55/75 */
    text-align right
  .login_btn
    width 100%
    height 1.33rem /* 100/75 */
    background-color #ff9900
    text-align center
    font-size 0.43rem /* 32/75 */
    color #ffffff
    line-height 1.33rem /* 100/75 */
    border-radius 0.13rem /* 10/75 */
    margin-bottom 0.67rem /* 50/75 */
  .check
    height 0.4rem /* 30/75 */
    color #666666
    font-size 0.35rem /* 26/75 */
    line-height 0.4rem /* 30/75 */
    .chech_box
      float left
      width 0.39rem /* 29/75 */
      height 0.39rem /* 29/75 */
      border 1px solid #666
      margin-right 0.27rem /* 20/75 */
</style>