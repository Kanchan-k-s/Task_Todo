

<template>

    <button class="btn profile-edit-btn" v-on:click="delTask(id)">Delete</button>

</template>
<script >
export default {
    props: {
        id: {
            type: Number
        }
    },
    data() {
        return {
        }

    },
    methods: {
        delTask: function (id) {
            this.$http.delete('http://localhost:3000/delete/' + id).then(function (data) {

                this.$emit('deleteTask', id);
            })
        }
    },
    created() {

    }
}
</script>

<style scoped>

</style>