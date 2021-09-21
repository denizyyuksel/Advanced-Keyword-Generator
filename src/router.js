import VueRouter from 'vue-router';
import KeywordDensity from './pages/keyword-density/KeywordDensity.vue';
import Vue from 'vue';
import HomePage from './pages/index.vue';

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: HomePage },
        { path: '/', redirect: '/keyword-density' },
        { path: '/keyword-density', component: KeywordDensity },
    ],
});

export default router;
