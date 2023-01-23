
<template>
    <div>
        <nav-header></nav-header>

        <h2 class="text-center">
            <router-link to='/allUser' style="text-decoration: none; color: inherit;">{{ user.user_name }}</router-link>
        </h2>
        <p class="text-center">Click on the User name to go back</p>
        <div class="container">
            <div class="table">
                <div class="table-header">
                    <div class="header__item"><a id="name" class="filter__link" href="#">TASK_ID</a></div>
                    <div class="header__item"><a id="wins" class="filter__link filter__link--number"
                            href="#">DESCRIPTION</a></div>
                    <div class="header__item"><a id="draws" class="filter__link filter__link--number"
                            href="#">PRIORITY</a>
                    </div>

                </div>
                <div class="table-content">
                    <div class="table-row" v-for="task in tasks">
                        <div class="table-data">{{ task.todo_id }}</div>
                        <div class="table-data">{{ task.description }}</div>

                        <div class="table-data" v-if="task.priority === 1">High</div>
                        <div class="table-data" v-else-if="task.priority === 2">Medium</div>
                        <div class="table-data" v-else-if="task.priority === 3">Low</div>

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
            user: {},
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
            this.$http.get('http://localhost:3000/user/' + this.$route.params.id, {
                headers: {
                    authorization: 'Bearer ' + this.$session.get('token')
                }
            }).then(
                function (data) {
                    this.user = data.body;
                }
            )
            this.$http.get('http://localhost:3000/task/get/' + this.$route.params.id, {
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
    background: #000;
    padding: (12px * 1.5) 0;
}

.table-row {
    display: flex;
    width: 100%;
    padding: (12px * 1.5) 0;
}

.table-row:nth-of-type(odd) {
    background: #EEEEEE;
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