// Declare install function executed by Vue.use()
import FieldFor from './lib/FieldFor';
import FormFor from './lib/FormFor';
import SubFormFor from './lib/SubFormFor';

export default {
    install(Vue, options = { formFor: true, subFormFor: true }) {
        Vue.component(FieldFor.name, FieldFor);
        if (options.formFor) {
            Vue.component(FormFor.name, FormFor);
        }
        if (options.subFormFor) {
            Vue.component(SubFormFor.name, SubFormFor);
        }
    }
};
