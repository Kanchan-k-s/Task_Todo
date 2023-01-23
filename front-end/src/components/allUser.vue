
<template>
    <div>
        <nav-header></nav-header>
        <h2 class="text-center">LIST OF ACTIVE USERS</h2>
        <p class="text-center">Click on the User name to See the Active Tasks of the user</p>
        <div class="container">
            <div class="table">
                <div class="table-header">

                    <div class="header__item"><a id="name" class="filter__link" href="#">USER_ID</a></div>
                    <div class="header__item"><a id="wins" class="filter__link filter__link--number"
                            href="#">USERNAME</a></div>
                    <div class="header__item"><a id="draws" class="filter__link filter__link--number"
                            href="#">USERTYPE</a></div>
                    <div class="header__item"><a id="draws" class="filter__link filter__link--number"
                            href="#">ACTION</a></div>

                </div>
                <div class="table-content">
                    <div class="table-row" v-for="user in users">
                        <div class="table-data">{{ user.user_id }}</div>
                        <router-link v-bind:to="'/user/' + user.user_id" class="table-data"
                            style="text-decoration: none; color: inherit;">
                            <div class="table-data link">{{ user.user_name }}</div>
                        </router-link>

                        <div class="table-data ">{{ user.user_type }}</div>
                        <button class="btn table-data" v-if="user.user_type !== 1"
                            v-on:click="deleteUser(user.user_id)">DELETE</button>
                        <div class="table-data" v-if="user.user_type === 1">Cannot delete admin </div>
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
            users: {}
        }

    },
    methods: {
        deleteUser: function (id) {
            this.$http.delete('http://localhost:3000/user/' + id, {
                headers: {
                    authorization: 'Bearer ' + this.$session.get('token')
                }
            }).then(
                function (data) {
                    this.users = this.users.filter(item => item.user_id != id)
                }
            )
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
            this.$http.get('http://localhost:3000/user/', {
                headers: {
                    authorization: 'Bearer ' + this.$session.get('token')
                }
            }).then(
                function (data) {
                    this.users = data.body;
                }
            )
        }

    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');

.link {
    color: black;
}

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
    padding: (12px * 1.5) 0;
}

.table-row:nth-of-type(odd) {
    background: rgba(5, 99, 55, 0.226);
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