import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Blacklist from '<./components/Blacklist';
import Result from './components/Result';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home',
            component: Home,
            name: 'home'
        },
        {
            path: '/blacklist',
            component: Blacklist,
            name: 'blacklist'
        },
        {
            path: '/result',
            component: Result,
            name: 'result'
        },
        {
            path: '/*',
            redirect: '/home'
        }
    ]
});

export default router;