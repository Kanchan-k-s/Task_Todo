
<template>
    <div>
        <form id="add-task" class="d-flex justify-content-center align-items-center mb-4">
            <div class="form-outline flex-fill" id="descp">
                <input type="text" v-model="task.description" class="form-control" placeholder="New task..." required />
            </div>
            <div id="priority" class="d-flex justify-content-center align-items-center">
                <label style="padding-right:3%">PRIORITY: </label>
                <select class="form-outline flex-fill" v-model="task.priority" required>
                    <option class="greenText" selected disabled hidden>Priority of the task</option>
                    <option v-for="p in priorities" v-bind:value=p.key>{{ p.value }}</option>
                </select>
            </div>


            <button class="btn  ms-2" style="background: rgba(80, 139, 252, 1)"
                v-on:click.prevent="addTask">Add</button>

        </form>
        <div class="alert alert-danger text-center" role="alert" show dismissible variant="danger"
            v-if="errors.length > 0" style="margin-left: 25%;
    margin-right: 25%;">
            ALERT :
            <span v-for="error in errors" :key="error" style="padding-right:2%">
                {{ error }}
            </span>
        </div>
    </div>
</template>
<script >
export default {
    props: {
        'log_id': {
            type: Object
        }
    },
    data() {
        return {
            task: {
                description: '',
                priority: null,
                user_id: this.log_id.user_id
            },
            errors: [],
            priorities: [
                { key: 1, value: 'High' },
                { key: 2, value: 'Medium' },
                { key: 3, value: 'Low' }
            ]
        }

    },
    methods: {
        addTask: function () {
            this.errors = [];
            if (!this.task.description) {
                this.errors.push('Description required');
            }
            if (!this.task.priority) {
                this.errors.push('Priority required');
            }
            else {
                this.$http.post('http://localhost:3000/task/create', {
                    description: this.task.description,
                    priority: this.task.priority,
                    user_id: this.log_id.user_id
                }).then(function (data) {
                    this.task.description = ''

                    this.$emit('addTask', data.body)
                })
            }


        }
    }
}
</script>

<style scoped>
#add-task {
    padding-left: 15%;
    padding-right: 15%;
}

#descp {
    margin-right: 5%;
}

#priority {
    padding-right: 5%;
}

select {
    padding: 2% 5% 5% 2%;
}

#one {
    background-color: blue;
}
</style>