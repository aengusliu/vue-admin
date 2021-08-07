<template>
    <div id="login-whole">
        <div class="login-content">
            <ul class="login-header">
                <li v-for="item in tabMenu" :key="item.id" :class="{'current': item.current}" @click="choose(item)">{{item.txt}}</li>
            </ul>
            <div>
                <el-form :model="ruleForm" ref="ruleForm1" status-icon :rules="rules" >

                    <el-form-item prop="email" class="form-item">
                        <label>邮箱</label>
                        <el-input v-model="ruleForm.email" autocomplete="off" clearable></el-input>
                    </el-form-item>

                    <el-form-item prop="password" class="form-item">
                        <label>密码</label>
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="18" clearable show-password></el-input>
                    </el-form-item>

                    <el-form-item prop="Rpassword" class="form-item" v-if="register">
                        <label>确认密码</label>
                        <el-input type="password" v-model="ruleForm.Rpassword" autocomplete="off" minlength="6" maxlength="18" clearable show-password></el-input>
                    </el-form-item>

                    <el-form-item prop="check" class="form-item">
                        <label>验证码</label>
                        <el-row :gutter="8">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.check"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-button type="success" style="width: 100%">获取验证码</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item class="but">
                        <el-button type="danger" @click="submitForm()" style="width: 100%">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref } from '@vue/reactivity';
    import {filterPwd, qaq} from "../utils/filter";
    import { onMounted } from '@vue/runtime-core';
    // 引入封装的拦截器
    // import service from '@/utils/service';
    // import {login} from '@/api/login'

    export default {
        name: "NewLogin",
        components: {},
        setup(props, context) {
            /**
             * 表单验证
             */
            // 验证邮箱
            const validateEmail = (rule, value, callback) => {
                let val = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; /*首先给出验证邮箱的正则表达式*/
                if (value === '') {                     /*判断输入框内部是否有内容*/
                    callback(new Error('请输入邮箱'));
                } else if(!val.test(value)){            /*然后判断输入的内容是否符合邮箱格式*/
                    callback(new Error('邮箱格式有误'));
                }else {
                    callback();
                }
            };
            // 验证密码（设置为6-18位的强密码）
            // 强密码：必须包含大小写字母和数字的组合，不能使用特殊字符，长度在6-18之间
            const validatePassword = (rule, value, callback) => {
                ruleForm.password = filterPwd(value);
                value = ruleForm.password;
                let val = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;  /*首先给出验证强密码的正则表达式*/
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (!val.test(value)) {
                    callback(new Error('密码格式有误!'));
                } else {
                    callback();
                }
            };
            // 注册时需要输入两次密码
            const validateRPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== ruleForm.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };
            // 验证验证码（6位数字）
            const checkCheck = (rule, value, callback) => {
                let val = /^\d{6}$/;
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else if (!val.test(value)) {
                    callback(new Error('验证码格式有误!'));
                } else {
                    callback();
                }
            };
            /**
             * 导入data中的数据
             */ 
            const tabMenu = reactive([
                    {txt: '登录', current: true, state: 'login'},
                    {txt: '注册', current: false, state: 'register'}
            ]);
            // 
            const ruleForm1 = ref();
            //
            let ruleForm = ref(
                {
                    email: '',
                    password: '',
                    Rpassword: '',
                    check: ''
                }
            );
            //
            const register = ref(false);
            //
            const rules = reactive(
                {
                    email: [
                        {validator: validateEmail, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    Rpassword: [
                        {validator: validateRPassword, trigger: 'blur'}
                    ],
                    check: [
                        {validator: checkCheck, trigger: 'blur'}
                    ]
                }
            );

            /**
             * methods中的方法
             */
            // 切换登录、注册状态
            const choose = (data => {
                if (data.state === 'login'){
                    tabMenu[0].current = true;
                    tabMenu[1].current = false;
                    register.value = false;
                }else {
                    tabMenu[0].current = false;
                    tabMenu[1].current = true;
                    register.value = true;
                };
                ruleForm.value= {};
            });
            //  登录时进行验证
            const submitForm = () => {
                // login();
                // alert("qaq");
                // console.log(ruleForm.value);
                ruleForm1.value.validate((valid => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                }));
            }; 
            
            /**
             * 生命周期
             */
            // 1.挂载完成后执行
            onMounted(() => {
                // console.log(ruleForm1.value);
            })
            /**
             * setup中定义的东西都要返回出去
             */
            return {
                validateEmail,
                validatePassword,
                validateRPassword,
                checkCheck,
                tabMenu,
                ruleForm,
                ruleForm1,
                register,
                rules,
                choose,
                submitForm
            }

        }
    }
</script>

<style lang="scss" scoped>
/*先设计整体页面*/
#login-whole {
    height: 100vh;
    background-color: #344a5f;
}
/*在设计有内容的部分模块*/
.login-content {
    width: 330px;
    margin: auto; /*用于设计内部元素居中显示*/
}
.login-header {
    text-align: center;
    li {
        display: inline-block;
        width: 88px;
        height: 30px;
        line-height: 30px;
        margin: 20px 5px;
        font-size: 10px;  /*文本字体大小*/
        color: #ffffff; /*li模块内部文本颜色*/
        border-radius: 3px; /*li模块有圆角*/
        cursor: pointer; /*鼠标移至li模块时，箭头变为小手*/
    }
}
.current {
    background-color: #6a6012;
}
.form-item {
    text-align: left;
    display: block;
    margin-bottom: 8px;
}
label {
    display: block;
    margin-bottom: auto;
    font-size: 10px;
    color: #ffffff;
}
.but {
    display: block;
    margin-top: 21px;
}
</style>