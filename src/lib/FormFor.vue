<template>
    <div v-if="data && data.schema" autocomplete="off">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FormFor',
    props: {
        data: {},
        options: {
            default: () => {
                return {
                    displayMode: 'EDIT',
                    errors: [],
                    invalid: false
                };
            }
        }
    },
    data() {
        return {
            schema: this.data.schema()
        };
    },
    provide() {
        return {
            schema: this.schema,
            options: {
                data: this.data,
                formOptions: this.options,
                key: Date.now() // Track the form-for through a unique key in case of chains of form-for
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
