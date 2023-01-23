
<template>
    <div>
        <nav-header></nav-header>
        <h2 class="text-center">LIST OF INACTIVE USERS</h2>
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

                        <div class="table-data link">{{ user.user_name }}</div>


                        <div class="table-data ">{{ user.user_type }}</div>
                        <button class="btn table-data" v-on:click="deleteUser(user.user_id)">ADD TO ACTIVE</button>

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
            this.$http.delete('http://localhost:3000/user/deleteUser/' + id, {
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
            this.$http.get('http://localhost:3000/user/deleteUser', {
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
    background: rgb(133, 3, 31);
    padding: (12px * 1.5) 0;
}

.table-row {
    display: flex;
    width: 100%;
    padding: (12px * 1.5) 0;
}

.table-row:nth-of-type(odd) {
    background: rgba(133, 3, 31, 0.286);
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