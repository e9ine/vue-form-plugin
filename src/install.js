// Declare install function executed by Vue.use()
import './scss/style.scss';
import FieldFor from './lib/FieldForBrowser.vue';
import FormFor from './lib/FormFor.vue';
import messages from './helpers/messages';

export function install(Vue, options = { formFor: true }) {
    if (install.installed) return;
    install.installed = true;
    Vue.component(FieldFor.name, FieldFor);
    if (options.formFor) {
        Vue.component(FormFor.name, FormFor);
        Vue.prototype.$messages = {...messages, ...options.messages}; // Merge the messages
    }
}

export { FieldFor, FormFor };

const plugin = {
    install
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.vue;
}

if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default plugin;
