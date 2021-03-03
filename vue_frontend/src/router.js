import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from "@/Register";
import Login from "@/Login";
Vue.use(VueRouter);


const router =  new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },

    ]
});

export default router;