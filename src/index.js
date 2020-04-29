// Declare install function executed by Vue.use()
import FieldFor from './lib/FieldFor';
import FormFor from './lib/FormFor';

export default {
    install(Vue, options = { formFor: true }) {
        Vue.component(FieldFor.name, FieldFor);
        if (options.formFor) {
            Vue.component(FormFor.name, FormFor);
        }
    }
};
