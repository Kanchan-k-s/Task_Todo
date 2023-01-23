

<template>
    <div id="edit-task" class="fw-normal">
        <div v-show="!toEdit">
            <button class="btn profile-edit-btn" v-on:click="toEdit = !toEdit">Edit</button>
        </div>
        <div v-show="toEdit">
            <form class="d-flex justify-content-center align-items-center  ">
                <div class="form-outline flex-fill align-middle">
                    <input type="text" v-model="description" class="form-control" placeholder="New description" />
                </div>
                <button class="btn  ms-2 align-middle" style="background: rgba(80, 139, 252, 1)"
                    v-on:click.prevent="edTask()">Update</button>
            </form>

        </div>
    </div>
</template>
<script >


export default {
    props: {
        'task_default': {
            title: Object
        }
    },
    data() {
        return {
            toEdit: false,
            description: ''
        }

    },
    methods: {
        edTask: function () {

            this.$http.put('http://localhost:3000/task/update/' + this.task_default.todo_id, {
                todo_id: this.task_default.todo_id,
                description: this.description,
                priority: this.task_default.priority,
                user_id: this.task_default.user_id
            }).then(function (data) {
                this.toEdit = false
                this.description = ''
                this.$emit('edTask', data.body)
            })
        }
    }
}
</script>

<style scoped>
#edit-task {
    display: inline-block;
}
</style>