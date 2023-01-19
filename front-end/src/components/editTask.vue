

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
                <button class="btn btn-info ms-2 align-middle" v-on:click="edTask(id)">Update</button>
            </form>
        </div>
    </div>
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
            toEdit: false,
            description: ''
        }

    },
    methods: {
        edTask: function (id) {

            this.$http.put('http://localhost:3000/update/' + id, {
                description: this.description
            }).then(function (data) {
                this.toEdit = false
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