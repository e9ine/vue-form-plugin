<template>
    <div v-if="model && data">
        <slot :errors="errors" :invalid="invalid"></slot>
    </div>
</template>

<script>
export default {
    name: 'SubFormFor',
    props: {
        data: {
            type: Object,
            default: () => {
                return {};
            }
        },
        displayMode: {
            type: String
        },
        model: {}
    },
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
