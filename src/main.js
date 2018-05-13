import Vue from 'vue';
import App from './App';
import router from './router';
// promise兼容ie，处理axios菜蔬
import 'babel-polyfill';
// 初始化全局http回调
import {init} from './common/request.js';

import './main.less';
//引入bootstorp
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// 引入头部Header，公共组件
// import Header from './components/Header/header';
// Vue.use(Header);

Vue.prototype.$bus = new Vue();
//ajax

Vue.prototype.jqajax = function (url, pms = {}, cbk) {
    if (!url || $.trim(url) == "" || !cbk) return;
    let _type = pms.type ? pms.type : "JSONP",
        _dataType = pms.dataType ? pms.dataType : "jsonp",
        _data = pms.data ? pms.data : {};
    //定义ajax参数
    let _ajaxPms = {
        type: _type,
        url: url,
        dataType: _dataType,
        data: _data,
        success: function (msg) {
            if (msg && cbk) {
                cbk(msg);
            }
        },
        error: function (e) {
            console.log(e);
        }
    };
    if (pms.callback) {
        _ajaxPms.jsonpCallback = pms.callback;
    }
    $.ajax(_ajaxPms);
};

// 获取token
Vue.prototype.getToken = function () {
    let currentHash = window.location.hash;
    // searchStringToObj() {
    // 获取URL中?之后的字符
    let str = currentHash;
    console.log(str);
    if(str.indexOf('?')>=0){
        str = str.split('?')[1];
    }
    console.log(str);
    // str = str.substring(1,str.length);
    // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
    let arr = str.split("&");

    // console.log(arr,111)
    let obj = new Object();

    // 将每一个数组元素以=分隔并赋给obj对象
    for(let i = 0; i < arr.length; i++) {
        let tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }
    console.log(obj);
    return obj;
    // },

};
//检测客户端
Vue.prototype.isLenovo = function(){
    if(window.external.LoginLenovoID){
       return true;
    }
    return false
};
//检测ie
Vue.prototype.isIe = function(){
    let usr = navigator.userAgent;
    if(usr.toLowerCase().indexOf("ie") > -1){
        return true;
    }
    return false;
};
//全局配置
Vue.prototype.gmConf = {
    domainHttp:"http://",
    domainHttps:"https://"
};
//样式冲突 删除MuseUI
/*import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI);*/

/* eslint-disable no-new */
console.log('============================================');
console.log('执行了main代码');
// 图片懒加载
Echo.init({
    offset: 900,
    throttle: 0
});
const vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});

init({
    success(res) {
        // vm.$message.success('操作成功');
    },
    error(err) {

    }
});

