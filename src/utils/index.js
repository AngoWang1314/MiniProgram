/*jshint esversion: 6 */

function formatNumber(n) {
    const str = n.toString();
    return str[1] ? str : `0${str}`;
}

// web-view标记已登录的cookie参数
export const cookieCheck = {
  name: 'check',
  value: '%08%09S%5ESZS%0D%0EX%08%08SX%5C%0ASS%5EZ%0A%0F%5ES%0FY%5B%08Y%0EY_'
}

// web-view试卷id
export const wvPaperId = {
  name: 'paper_id',
  value: '1531385005ktazse'
}


export function formatTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const t1 = [year, month, day].map(formatNumber).join('/');
    const t2 = [hour, minute, second].map(formatNumber).join(':');

    return `${t1} ${t2}`;
}

/**
 * 封装wx api的Promise
 */
export function wxPromiseUtil(fn) {
    return function(obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function(res) {
                resolve(res);
            }

            obj.fail = function(er) {
                reject(er);
            }

            fn(obj);
        });
    }
}

// 获取页面参数
export function getQuery() {
    /* 获取当前路由栈数组 */
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const options = currentPage.options;
    return options;
}

export default {
    formatNumber,
    formatTime
};
