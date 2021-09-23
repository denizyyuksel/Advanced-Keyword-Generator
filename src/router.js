import VueRouter from 'vue-router';
import KeywordDensity from './pages/keyword-density/KeywordDensity.vue';
import Vue from 'vue';
import KeywordGenerator from './pages/key-generator/KeywordGenerator.vue';

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/keyword-generator', component: KeywordGenerator },
        { path: '/', redirect: '/keyword-generator' },
        { path: '/keyword-density', component: KeywordDensity },
    ],
});

export default router;
