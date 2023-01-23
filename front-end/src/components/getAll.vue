
<template >
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-12 col-xl-10">
                <div class="card mask-custom">
                    <div class="card-body p-4 text-white">
                        <div class="text-center pt-3 pb-2">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                                alt="Check" width="60">
                            <div v-if="this.log_id.user_type === 1">
                                <router-link to="/dashboard" style="text-decoration: none; color: inherit;">
                                    <h2>{{
                                        this.log_id.user_name
                                    }}</h2>
                                </router-link>
                                <h6 class="text-black-50">Click On User name to go back</h6>
                            </div>

                            <h2 v-else>{{ this.log_id.user_name }}</h2>
                            <router-link class="btn ms-2" style="background: rgba(80, 139, 252, 1)"
                                v-bind:to="'/setting/' + this.log_id.user_id">Profile</router-link>
                            <button style="background: rgba(80, 139, 252, 1)" v-on:click.prevent="loggedout"
                                class="btn ms-2">
                                Logout</button>
                        </div>

                        <add-task v-bind:log_id="log_id" v-on:addTask="updateTask($event)"></add-task>
                        <div class="container">
                            <div id="content">
                                <form class='form-inline'>
                                    <div class="input-group">
                                        <input type="text" id='search' class="form-control search-form" v-model="search"
                                            placeholder="Search Tasks" />
                                        <button v-on:click.prevent="sortTasks" class="btn ms-2"
                                            style="background: rgba(80, 139, 252, 1)">Sort On
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
                                        <delete-task v-bind:id=task.todo_id
                                            v-on:deleteTask="delTask($event)"></delete-task>

                                    </td>
                                    <td class="align-middle">
                                        <edit-task v-bind:task_default="{
                                            todo_id: task.todo_id,
                                            description: task.description,
                                            priority: task.priority,
                                            user_id: task.user_id
                                        }" v-on:edTask="edTask($event)"></edit-task>
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
            //tasks: [],
            log_id: {},
            tasks: [],
            id: null,
            search: '',
            users: {}
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
            temp.push(data)
            temp = temp.sort();
            this.tasks = temp;
        },
        loggedout: function () {
            this.$http.delete('http://localhost:3000/auth/logout', {
            }).then(function (data) {
                this.$session.destroy();
                location.replace('/login');
            })
        },
        sortTasks: function () {

            return this.tasks.sort((a, b) => {
                if (a.priority < b.priority) {
                    return -1
                }
                if (a.priority > b.priority) {
                    return 1
                }
                return 0;

            })
        }

    },
    beforeUpdate() {

    },
    beforeCreate() {
        if (this.$route.params.id !== this.$session.get('userid')) {
            this.$http.delete('http://localhost:3000/auth/logout', {
            }).then(function (data) {
                this.$session.destroy();
                location.replace('/error');
            })
        } else {
            this.$http.get('http://localhost:3000/user/' + this.$route.params.id, {
                headers: {
                    authorization: 'Bearer ' + this.$session.get('token')
                }
            }).then(function (data) {
                this.log_id = data.body;
            })
            this.$http.get('http://localhost:3000/task/get/' + this.$route.params.id, {
                headers: {
                    authorization: 'Bearer ' + this.$session.get('token')
                }
            }).then(function (data) {
                this.tasks = data.body;
            })
        }

    },

    mixins: [
        filteredTasks
    ]
}
</script>

<style scoped>
.gradient-custom-2 {
    /* fallback for old browsers */
    background: #7e40f6;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to right,
            rgba(126, 64, 246, 1),
            rgba(80, 139, 252, 1));

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to right,
            rgba(126, 64, 246, 1),
            rgba(80, 139, 252, 1));
}

.mask-custom {
    background: rgba(80, 140, 252, 0.479);
    border-radius: 2em;
    backdrop-filter: blur(25px);
    border: 2px solid rgba(255, 255, 255, 0.05);
    background-clip: padding-box;
    box-shadow: 10px 10px 10px rgba(46, 54, 68, 0.03);
}

#content {

    padding-left: 25%;
    padding-right: 25%;
}

.search-form {
    border-radius: 30px 30px 30px 30px;
}

.text-center {
    color: black;
}
</style>