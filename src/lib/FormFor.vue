<template>
    <div v-if="model && data" autocomplete="off">
        <slot :invalid="invalid" :errors="errors"></slot>
    </div>
</template>

<script>
export default {
    name: 'FormFor',
    props: ['displayMode', 'model', 'data'],
    data() {
        return {
            schema: null,
            errors: [],
            invalid: false
        };
    },
    async created() {
        this.schema = this.model.schema();
    }
};
</script>

<style scoped></style>
