
<template >
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-12 col-xl-10">
                <div class="card mask-custom">
                    <div class="card-body p-4 text-white">
                        <div class="text-center pt-3 pb-2">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                                alt="Check" width="60">
                            <h2 class="my-4">Task List</h2>
                        </div>
                        <add-task v-on:addTask="updateTask($event)"></add-task>
                        <div class="container">
                            <div id="content">
                                <form class='form-inline'>
                                    <div class="input-group">
                                        <input type="text" id='search' class="form-control search-form" v-model="search"
                                            placeholder="Search Tasks" />
                                        <button v-on:click="sortTasks" class="btn btn-info ms-2">Sort On
                                            Priority</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <table class="table text-white mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Task</th>
                                    <th scope="col">Priority</th>
                                    <th scope="col">Action 1</th>
                                    <th scope="col">Action 2</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="fw-normal" v-for="task in filteredTasks">

                                    <td class="align-middle">
                                        <span>{{ task.description }}</span>
                                    </td>
                                    <td class="align-middle">
                                        <span v-if="task.priority === 1">High</span>
                                        <span v-else-if="task.priority === 2">Medium</span>
                                        <span v-else-if="task.priority === 3">Low</span>
                                    </td>
                                    <td class="align-middle">
                                        <delete-task v-bind:id="task.todo_id"
                                            v-on:deleteTask="delTask($event)"></delete-task>

                                    </td>
                                    <td class="align-middle">
                                        <edit-task v-bind:id="task.todo_id" v-on:edTask="edTask($event)"></edit-task>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import filteredTasks from '../mixins/search'
import sortTasks from '../mixins/sort'
import addTask from './addTask.vue'
import deleteTask from './deleteTask.vue'
import editTask from './editTask.vue'

export default {
    components: {
        'add-task': addTask,
        'delete-task': deleteTask,
        'edit-task': editTask
    },
    data() {
        return {
            tasks: [],
            id: null,
            search: ''
        }

    },
    methods: {
        updateTask: function (updatedTask) {
            this.tasks.push(updatedTask);
        },
        delTask: function (id) {
            this.tasks = this.tasks.filter(item => item.todo_id != id)
        },
        edTask: function (data) {
            let temp = this.tasks.filter(item => item.todo_id != data.todo_id);
            temp.push(data);
            temp = temp.sort();
            this.tasks = temp;

        }
    },
    computed: {

    },
    created() {
        this.$http.get('http://localhost:3000/get').then(function (data) {
            this.tasks = data.body;
        })
    },
    mixins: [
        filteredTasks,
        sortTasks
    ]
}
</script>

<style scoped>
#content {
    padding-left: 25%;
    padding-right: 25%;
}

.search-form {
    border-radius: 30px 30px 30px 30px;
}

.text-center {
    color: #fff;
}
</style>