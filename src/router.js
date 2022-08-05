import VueRouter from 'vue-router';
import Vue from 'vue';
import KeywordGenerator from './pages/keyword-generator/KeywordGenerator.vue';
import HomePage from './pages/index.vue';
import Count from './pages/count-word/Count.vue';

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: HomePage },
        { path: '/keyword-generator', component: KeywordGenerator },
        { path: '/count-word',name: 'count-word', component: Count,props: true  },
    ],
});

export default router;
