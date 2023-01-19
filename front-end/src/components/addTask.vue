
<template>
    <form id="add-task" class="d-flex justify-content-center align-items-center mb-4">
        <div class="form-outline flex-fill">
            <input type="text" id="form2" v-model="task.description" class="form-control" placeholder="New task..." />
        </div>

        <select v-model="task.priority">
            <option id="one" selected disabled hidden>Priority of the task</option>
            <option v-for="p in priorities" v-bind:value=p.key>{{ p.value }}</option>
        </select>
        <button class="btn btn-info ms-2" v-on:click="addTask">Add</button>
    </form>

</template>
<script >
export default {
    data() {
        return {
            task: {
                description: ''
            },
            priorities: [
                { key: 1, value: 'High' },
                { key: 2, value: 'Medium' },
                { key: 3, value: 'Low' }
            ]
        }

    },
    methods: {
        addTask: function () {
            this.$http.post('http://localhost:3000/create', {
                description: this.task.description,
                priority: this.task.priority
            }).then(function (data) {
                this.task.description = ''
                this.$emit('addTask', data.body)
            })
        }
    },
    created() {

    }
}
</script>

<style scoped>
#add-task {
    padding-left: 15%;
    padding-right: 15%;
}

select {
    margin-left: 5%;
    margin-right: 5%;
    padding: 1% 1% 1% 1%;
}

#one {
    color: black;
}
</style>