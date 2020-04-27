import '@/scss/style.scss';
import App from './App.vue';
import Vue from 'vue';
import VueFormPlugin from './index';

Vue.config.productionTip = false;
Vue.use(VueFormPlugin);

new Vue({
    render: h => h(App)
}).$mount('#app');
