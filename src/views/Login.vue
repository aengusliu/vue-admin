<template>
    <div id="login">
        <div id="login-wrap">
            <ul class="tab-menu">
                <!-- class 属性绑定： :class="{'current': isActive}" 
                     表示当isActive为true时，有 class='current' -->
                <li v-for="item in tabMenu" v-bind:key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">
                    {{item.txt}}
                </li>
            </ul>
            <!-- 表单内容 -->
            <div>
                <el-form :model="ruleForm" :size="medium" status-icon :rules="rules" ref="ruleForm">

                    <el-form-item prop="username" class="item-form">
                        <label>邮箱</label>
                        <el-input type="text" v-model="ruleForm.username" autocomplete="off" clearable></el-input>
                    </el-form-item>

                    <el-form-item prop="password"  class="item-form">
                        <label>密码</label> 
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="18" clearable show-password></el-input>
                    </el-form-item>

                    <el-form-item prop="Rpassword"  class="item-form" v-if="register">
                        <label>重复密码</label> 
                        <el-input type="password" v-model="ruleForm.Rpassword" autocomplete="off" minlength="6" maxlength="18" clearable show-password></el-input>
                    </el-form-item>

                    <el-form-item prop="code" class="item-form1">
                        <label>验证码</label> 
                        <el-row :gutter="11">
                            <el-col :span="15">
                                <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6" clearable></el-input>
                            </el-col>
                            <el-col :span="9">
                                <el-button type="success" style="width: 100%">获取验证码</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="danger" @click="submitForm('ruleForm')" class="block">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>    
    </div>
</template>

<script>
// 引入接口请求函数
import { stripscript, qaq } from '@/utils/validate';

export default {
    name: "Login",
    components: {},
    data() {
        // 验证用户名为邮箱 
        var validateUsername = (rule, value, callback) => {
            // 邮箱验证的正则表达式
            let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            // value为输入的值
            if (value === '') {                     // 首先验证输入的值是否为空
                callback(new Error('请输入用户名'));
            } else if(!reg.test(value)) {           // 其次验证输入值的格式是否符合正则表达式要求
                callback(new Error('用户名格式有误'));
            } else {                                // 如果正确输入了一个邮箱，则验证通过
                callback();
            }
        };
        // 验证密码格式
        var validatePassword = (rule, value, callback) => {
            // 过滤多余字符
            this.ruleForm.password = stripscript(value);
            value=this.ruleForm.password;
            // console.log(stripscript(value))
            let reg = /^[a-zA-Z]\w{5,17}$/;
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!reg.test(value)) {
                callback(new Error('密码格式有误（以字母开头，长度在6-18之间，只能包含字母、数字和下划线）'));
            } else {
                callback();
            }
        };
        // 第二次输出密码
        // 验证密码格式
        var validateRPassword = (rule, value, callback) => {
            // 过滤多余字符
            this.ruleForm.Rpassword = stripscript(value);
            value=this.ruleForm.Rpassword;
            // console.log(stripscript(value))
            let reg = /^[a-zA-Z]\w{5,17}$/;
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (!reg.test(value)) {
                callback(new Error('密码格式有误（以字母开头，长度在6-18之间，只能包含字母、数字和下划线）'));
            } else if(this.ruleForm.password !== this.ruleForm.Rpassword){
                callback(new Error('两次密码输入不一致，请重新输入'));
            }else {
                callback();
            }
        };
        // 验证验证码
        var checkCode = (rule, value, callback) => {
            let reg = /^\d{6}$/;
            if (!value) {
                callback(new Error('请输入验证码'));
            }else if(!reg.test(value)) {
                callback(new Error('验证码格式有误（为六位数字）'));
            }else {
                callback();
            }
        };
        return {
            tabMenu: [
                {txt: '登录', current: true, state: 'login'},
                {txt: '注册', current: false, state: 'register'}
            ],
            register: false,
            isActive: true,
            ruleForm: {
                username: '',
                password: '',
                Rpassword: '',
                code: ''
            },
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                Rpassword: [
                    { validator: validateRPassword, trigger: 'blur' }
                ],
                code: [
                    { validator: checkCode, trigger: 'blur' }
                ]
            }
        }
    },    
    // 在模板渲染成html前调用，通常用于初始化某些属性值，用于后面渲染视图的操作
    created(){},
    // 在模板渲染成html后调用，初始化页面完成后，可以对html的DOM节点进行相应操作
    mounted(){},
    methods: {
        // 登录注册切换时的显示
        toggleMenu(data) {
            this.tabMenu.forEach((element,index) => {
                element.current=false; 
                this.ruleForm = {};
            });
            if (data.state === 'login'){
                this.register = false;
            }else {
                this.register = true;
            }
            // 高光
            data.current=true;
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        },
    }
}
</script>

<style lang="scss" scoped>
// 设置整体界面
#login {
    height: 100vh; // 整个看到的界面为100vh
    background-color: #344a5f; // 设置整个界面的背景颜色为紫色
}
// 设置登录模块
#login-wrap {
    width: 330px; // 宽度为300px
    margin: auto; // 设置DOM元素居中
}
.tab-menu {
    text-align: center; // 文本在其所在块级元素内居中
    li {
        display: inline-block; // 设置li标签为不独占一行的块级元素
        width: 88px; // 设置li标签宽度
        line-height: 36px; // 设置li标签高度
        font-size: 14px; // 字体大小
        color: #fff; // 字体颜色为白色
        border-radius: 2px; // 块级元素有圆角
        cursor: pointer; // 把鼠标指针变成小手的形状
    }
}
.current {
    background-color: rgba(2, 2, 2, 0.1);
}
.item-form {
    margin-bottom: 6px;
}
.item-form1 {
    height: 90px;
    margin-top: 15px;
    margin-bottom: 0px;
}
.block {
    width: 100%;
    margin-top: 25px;
}
label {
    color: #fff;
    font-size: 14px;
    display: block;
    margin-top: 10px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.el-col {
border-radius: 4px;
}
</style>