webpackJsonp([2],{HcNE:function(t,e){},q3Wa:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("w7XY"),n={data:function(){return{checked:!0,nickname:"",phone:"",password:"",captcha:"",text1:"",text2:"",text3:"",text4:"",text5:""}},methods:{blurname:function(){""==this.nickname?this.text1="请输入昵称":this.text1=""},blurphone:function(){var t=this;0==/^1[0-9]{10}$/.test(this.phone)?this.text2="请输入正确的手机号":this.$http({url:s.a.checkPhone,params:{phone:this.phone}}).then(function(e){1==e.data.exist&&(t.text2="手机号已经被注册")}).catch(function(t){console.log(t,"err")})},blurpass:function(){0==/^[a-zA-Z]\w{5,16}/.test(this.password)?this.text3="请输入以字母开头的6-16密码":this.text3=""},blurcode:function(){},onClickLeft:function(){this.$router.go(-1)},onClickRight:function(){this.$router.push({path:"/login"})},next:function(){var t=this;0==this.checked?this.$swal({text:"请勾选同意条款",confirmButtonText:"确定"}):""==this.text1&&"手机号已经被注册"==this.text2&&""==this.text3?this.$http({url:s.a.verify,params:{phone:this.phone,captcha:this.captcha}}).then(function(e){200==e.data.code&&t.$http({url:s.a.register,params:{phone:t.phone,password:t.password,captcha:t.captcha,nickname:t.nickname}}).then(function(e){console.log(e,"resssss"),200==e.data.code&&(t.$swal({text:"注册成功,快去登录吧",confirmButtonText:"确定"}),t.$router.push("/login"))}).catch(function(e){t.$swal({text:"注册失败",confirmButtonText:"确定"})})}).catch(function(e){t.$swal({text:"验证码错误",confirmButtonText:"确定"})}):this.$swal({text:"请完整填写必要信息",confirmButtonText:"确定"})},get:function(){var t=this;this.$http({url:"http://localhost:3000/captcha/sent",params:{phone:this.phone}}).then(function(e){200==e.data.code&&t.$swal({text:"验证码发送成功",confirmButtonText:"确定"})}).catch(function(e){t.$swal({text:"发送验证码超过限制:每个手机号一天只能发5条验证码",confirmButtonText:"确定"})})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-nav-bar",{attrs:{title:"注册","left-text":"","right-text":"登录","left-arrow":""},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight}}),t._v(" "),a("div",{staticClass:"register_box"},[a("div",{staticClass:"inp"},[a("label",{staticClass:"tit",attrs:{for:"nickname"}},[t._v("昵称:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.nickname,expression:"nickname"}],ref:"name",attrs:{type:"text",id:"nickname"},domProps:{value:t.nickname},on:{blur:t.blurname,input:function(e){e.target.composing||(t.nickname=e.target.value)}}}),t._v(" "),a("span",{staticClass:"err"},[t._v(t._s(t.text1))])]),t._v(" "),a("div",{staticClass:"inp"},[a("label",{staticClass:"tit",attrs:{for:"name"}},[t._v("手机号:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],ref:"phone",attrs:{type:"text",id:"name"},domProps:{value:t.phone},on:{blur:t.blurphone,input:function(e){e.target.composing||(t.phone=e.target.value)}}}),t._v(" "),a("span",{staticClass:"err"},[t._v(t._s(t.text2))])]),t._v(" "),a("div",{staticClass:"inp"},[a("label",{staticClass:"tit",attrs:{for:"pass"}},[t._v("密码:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],ref:"pass",attrs:{type:"password",id:"pass"},domProps:{value:t.password},on:{blur:t.blurpass,input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),a("span",{staticClass:"err"},[t._v(t._s(t.text3))])]),t._v(" "),a("div",{staticClass:"inp"},[a("label",{staticClass:"tit",attrs:{for:"pass"}},[t._v("验证码:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.captcha,expression:"captcha"}],ref:"code",attrs:{type:"text",id:"pass"},domProps:{value:t.captcha},on:{blur:t.blurcode,input:function(e){e.target.composing||(t.captcha=e.target.value)}}}),t._v(" "),a("span",[t._v(t._s(t.text5))]),t._v(" "),a("span",{staticClass:"get",on:{click:function(e){return t.get()}}},[t._v("点击获取")])]),t._v(" "),a("div",{staticClass:"login_btn",on:{click:function(e){return t.next()}}},[t._v("下一步")]),t._v(" "),a("div",{staticClass:"check"},[a("van-checkbox",{staticClass:"chech_box",attrs:{"checked-color":"#ff9900",shape:"square"},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}},[t._v("复选框")]),t._v(" "),a("span",[t._v("我已阅读并同意使用条款和隐私政策")]),t._v(" "),a("span",{staticClass:"err"},[t._v(t._s(t.text4))])],1)])],1)},staticRenderFns:[]};var c=a("VU/8")(n,i,!1,function(t){a("HcNE")},"data-v-6476a970",null);e.default=c.exports}});
//# sourceMappingURL=2.5a97a97773a5181b61e9.js.map