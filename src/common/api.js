let baseUrl='http://yd.msword.top/'
let baseUrl2='http://localhost:3000/'
//首页接口
let home=baseUrl+'getIndexData'
//详情页接口
let detail=baseUrl+'getDetails'
//分类接口
let sort=baseUrl+'getClassify'
//登录接口
let login=baseUrl2+'login/cellphone'
//手机号是否被注册验证接口
let checkPhone=baseUrl2+'existence/check'
//验证验证码是否正确接口
let verify=baseUrl2+'captcha/verify'
//注册接口
let register=baseUrl2+'register/cellphone'
export default{
    home,
    detail,
    sort,
    login,
    checkPhone,
    verify,
    register
}