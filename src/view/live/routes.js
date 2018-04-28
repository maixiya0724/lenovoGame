/**
 * Created by Lzhang on 2017/12/11.
 */

const component = resolve => require(['./index.vue'], resolve);

export default[
    {
        path: '/',
        name: 'live',
        component,
    }
]