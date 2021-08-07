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
                <el-form :model="ruleForm" size="medium" status-icon :rules="rules" ref="ruleForm">

                    <el-form-item prop="email" class="item-form">
                        <label>邮箱</label>
                        <el-input v-model="ruleForm.email" autocomplete="off" clearable></el-input>
                    </el-form-item>

                    <el-form-item prop="password"  class="item-form">
                        <label>密码</label> 
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="18" clearable show-password></el-input>
                    </el-form-item>

                    <el-form-item prop="Rpassword"  class="item-form" v-if="register">
                        <label>重复密码</label> 
                        <el-input type="password" v-model="ruleForm.Rpassword" autocomplete="off" minlength="6" maxlength="18" clearable show-password></el-input>
                    </el-form-item>

                    <el-form-item prop="check" class="item-form1">
                        <label>验证码</label> 
                        <el-row :gutter="11">
                            <el-col :span="15">
                                <el-input v-model.number="ruleForm.check" minlength="6" maxlength="6" clearable></el-input>
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
import { stripscript, qaq } from '../utils/validate';
// 引入 reactive 和 ref
import { isRef, onMounted, reactive, ref, toRefs } from "vue";
export default {
    name: "Login",
    components: {},
    // 新特性1：setup函数
    // 其内部可以存放data数据、生命周期以及自定义的函数
    // setup函数会在创建组件实例时调用
    setup(props, context) {

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
            ruleForm.password = stripscript(value);
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
        
        // 新特性2：reactive
        // 通过reactive可以声明单一对象，即引用数据类型【PS:需要导入js函数】
        let tabMenu = reactive([
            {txt: '登录', current: true, state: 'login'},
            {txt: '注册', current: false, state: 'register'}
        ]);
        // console.log(tabMenu[0].txt);

        // const声明的变量是只读的，不可更改内容
        // 因为ruleForm内容会变化，因此使用let来定义
        let ruleForm = reactive(
            {
                email: '',
                password: '',
                Rpassword: '',
                check: ''
            }
        );

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
        // 新特性3：ref
        // 用于声明 基础数据类型 的变量【PS:需要导入】
        // const testRef = ref('qaq');
        // // 注意：获取ref定义的基本数据类型的变量的值，需要通过 变量名.value的方式
        // console.log(testRef.value);

        let register = ref(false);

        // 新特性4：isRef
        // 用于判定某变量是否为ref定义的基本数据类型【PS:需要导入】
        // console.log(isRef(testRef) ? 'it is defined by ref' : 'not defined by ref');

        // 新特性5：toRefs
        // 作用：将reactive定义的引用类型对象转化为普通基本数据类型
        // const letters = reactive({  // 首先通过reactive定义一个引用数据类型的对象
        //     a: 1,
        //     b: 2,
        // })
        // const newLetters = toRefs(letters); // 其次通过toRefs将引用数据类型转换为基本数据类型
        // console.log(newLetters.a.value);  // 注意到，如果只是通过newLetters.a是无法访问到原来a的值的
        // 注：一般用于解构（定义函数，调用函数）
        // function decompose() {
        //     const days = reactive({
        //         jintian: '周五',
        //         zuotian: '周四',
        //         minghtian: '周六'
        //     });
        //     return toRefs(days);
        // }
        // const {jintian, zuotian, minghtian} = decompose();
        // console.log(zuotian.value);

        /**
         * 自定义声明方法（对应methods中的内容）
         */

        // 登录注册切换时的显示
        // 方法名为toggleMenu，形参为data
        const toggleMenu = (data => {
            tabMenu.forEach((element,index) => {
                element.current=false; 
                ruleForm = {
                    email: '',
                    password: '',
                    Rpassword: '',
                    check: ''
                };
            });
            if (data.state === 'login'){
                register.value = false;
            }else {
                register.value = true;
            }
            // 高光
            data.current=true;
        })

        // 用于点击登录按钮时的验证
        // 方法名为submitForm，形参为formName
        const submitForm = (formName => {
            context.refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        })
        
        /**
         * 生命周期
         */
        // 1.挂载完成后执行
        onMounted(() => {

        })

        // 自定义的东西都要return出去
        return {
            tabMenu,
            ruleForm,
            register,
            rules,
            validateEmail,
            validatePassword,
            validateRPassword,
            checkCheck,
            toggleMenu,
            submitForm
        }
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