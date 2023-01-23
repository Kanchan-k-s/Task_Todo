

<template>
    <div>
        <nav-header></nav-header>
        <h2 class="text-center">LIST OF ACTIVE TASKS</h2>
        <div class="container">
            <div class="table">
                <div class="table-header">
                    <div class="header__item"><a id="name" class="filter__link" href="#">Task_ID</a></div>
                    <div class="header__item"><a id="wins" class="filter__link filter__link--number"
                            href="#">Description</a></div>
                    <div class="header__item"><a id="draws" class="filter__link filter__link--number"
                            href="#">Priority</a></div>
                    <div class="header__item"><a id="losses" class="filter__link filter__link--number"
                            href="#">Owner</a></div>
                </div>
                <div class="table-content">
                    <div class="table-row" v-for="task in tasks">
                        <div class="table-data">{{ task.todo_id }}</div>
                        <div class="table-data">{{ task.description }}</div>
                        <div class="table-data" v-if="task.priority === 1">High</div>
                        <div class="table-data" v-else-if="task.priority === 2">Medium</div>
                        <div class="table-data" v-else-if="task.priority === 3">Low</div>
                        <div class="table-data">{{ task.user_name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import navHeader from './header.vue'
export default {

    components: {
        'nav-header': navHeader
    },
    data() {
        return {
            tasks: {}
        }

    },

    beforeCreate() {
        if ('1' !== this.$session.get('userid')) {
            this.$http.delete('http://localhost:3000/auth/logout', {
            }).then(function (data) {
                this.$session.destroy();
                location.replace('/error');
            })
        } else {
            this.$http.get('http://localhost:3000/task/all', {
                headers: {
                    authorization: 'Bearer ' + this.$session.get('token')
                }
            }).then(
                function (data) {
                    this.tasks = data.body;
                }
            )
        }

    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');


*,
*:before,
*:after {
    box-sizing: border-box;
}

body {
    padding: 24px;
    font-family: 'Source Sans Pro', sans-serif;
    margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 24px;
}

.container {
    max-width: 1000px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;

}

.table {
    width: 100%;
    border: 1px solid #EEEEEE;
}

.table-header {
    display: flex;
    width: 100%;
    background: rgb(5, 99, 55);
    padding: (12px * 1.5) 0;
}

.table-row {
    display: flex;
    width: 100%;
    background: rgba(5, 99, 55, 0.226);
    padding: (12px * 1.5) 0;
}

.table-row:nth-of-type(odd) {
    background: white;
}


.table-data,
.header__item {
    flex: 1 1 20%;
    text-align: center;
}

.header__item {
    text-transform: uppercase;
}

.filter__link {
    color: white;
    text-decoration: none;
    position: relative;
    display: inline-block;
    padding-left: 24px;
    padding-right: 24px;
}
</style>