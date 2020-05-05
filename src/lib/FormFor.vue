<template>
    <div v-if="data && data.schema" autocomplete="off">
        <slot :invalid="form.invalid" :errors="form.errors"></slot>
    </div>
</template>

<script>
export default {
    name: 'FormFor',
    props: {
        displayMode: {
            type: String
        },
        data: {}
    },
    data() {
        return {
            form: {
                errors: [],
                invalid: false
            },
            schema: this.data.schema()
        };
    },
    provide() {
        return {
            schema: this.schema,
            form: this.form,
            options: {
                data: this.data,
                displayMode: this.displayMode
            }
        };
    },
    async created() {
        if (!this.data.schema) {
            console.error('Constructor of Model is not initialised. Make sure it is in `new Model()` format');
        }
        this.schema = this.data.schema();
    }
};
</script>

<style scoped></style>
