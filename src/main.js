import '@/scss/style.scss';
import App from './App.vue';
import Vue from 'vue';
import VueFormPlugin from './index';

Vue.config.productionTip = false;
Vue.use(VueFormPlugin, {
    formFor: true,
    messages: {
        required: 'Filling this field is completely required'
        //Use as function : required: (props, property) => `Filling ${props.label ?? property.name} field is completely required`
    }
});

new Vue({
    render: h => h(App)
}).$mount('#app');
