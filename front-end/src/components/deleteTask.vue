

<template>

    <button class="btn profile-edit-btn" v-on:click.prevent="delTask(id)">Delete</button>

</template>

<script >
export default {
    props: {
        id: {
            type: Number
        }
    },
    methods: {
        delTask: function (id) {
            this.$http.delete('http://localhost:3000/task/delete/' + this.id, {
                headers: {
                    authorization: 'Bearer ' + this.$session.get('token')
                }
            }).then(function (data) {

                this.$emit('deleteTask', id);
            })
        }
    }
}
</script>

<style scoped>

</style>