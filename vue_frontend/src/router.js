import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from "@/components/Register";
import Login from "@/components/Login";
import Home from "@/components/Home";
import updateTask from "./components/updateTask";
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
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/update/:id/:task',
            name: 'update',
            component: updateTask,
        },

    ]
});

export default router;