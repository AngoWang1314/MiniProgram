/*jshint esversion: 6 */

import { wxPromiseUtil, cookieCheck } from '@/utils/index';

// request请求
var wxRequest = wxPromiseUtil(wx.request);

// 授权
var wxAuthorize = wxPromiseUtil(wx.authorize);

// 登录
var wxLogin = wxPromiseUtil(wx.login);

// 检查登录状态
var wxCheckSession = wxPromiseUtil(wx.checkSession);

// 用户信息
var wxGetUserInfo = wxPromiseUtil(wx.getUserInfo);

// 获取权限列表
var wxGetSetting = wxPromiseUtil(wx.getSetting);

// 获取系统信息
var wxSystemInfo = wxPromiseUtil(wx.getSystemInfo);

// 获取缓存
var wxGetStorage = wxPromiseUtil(wx.getStorage);

// 滚动到目标位置
var wxPageScrollTo = wxPromiseUtil(wx.pageScrollTo);


function wxRequestFn(params) {
    return wxRequest({
        url: params.url,
        method: params.method || 'GET',
        data: params.data || null,
        header: {
            'content-type': 'application/json', // 默认值
            'cookie': `${cookieCheck.name}=${cookieCheck.value}`
        }
    });
}

export {
    wxRequestFn,
    wxAuthorize,
    wxLogin,
    wxCheckSession,
    wxGetUserInfo,
    wxGetSetting,
    wxSystemInfo,
    wxGetStorage,
    wxPageScrollTo
};
