import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from "@/components/users/Register";
import Login from "@/components/users/Login";
import Home from "@/components/todo/Home";
import updateTask from "./components/todo/updateTask";
import addTask from "./components/todo/addTask";
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
        {
            path: '/addTask',
            name: 'addTask',
            component: addTask,
        },

    ]
});

export default router;