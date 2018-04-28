/**
 * Created by yuliang on 2017/5/19.
 */

// const login =  resolve => require(['./Login/header.vue'], resolve)

const home = resolve => require(['./Home/index.vue'], resolve)

import childrenRoutes from '../allRoutes.js';

export default [
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: login
    // },
    {
        path: '/',
        name: 'home',
        component: home,
        children: childrenRoutes
    }
];

