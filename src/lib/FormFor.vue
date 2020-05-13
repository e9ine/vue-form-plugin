<template>
    <div v-if="data && data.schema" autocomplete="off">
        <slot :invalid="invalid" :errors="errors"></slot>
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
            schema: null,
            errors: [],
            invalid: false
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
