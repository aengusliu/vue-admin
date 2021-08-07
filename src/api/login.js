/**
 * 定义登录、注册界面要用到的接口（就是各种功能的实现）
 */

import service from "../utils/service";

// 获取验证码
// 发送请求
// 获取用户角色

// 登录
export function login() {
    service.request({
        method: 'post',
        url: '/user/12345',
        data: {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }    
    })
}

// 注册