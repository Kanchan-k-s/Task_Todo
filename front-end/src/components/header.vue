

<template>
    <nav class="navbar navbar-expand-lg sticky-top  " style="background-color: rgba(80, 139, 252, 0.5);">
        <div class="container-md">

            <a class="navbar-brand" href="user/dashboard/1">
                <img src="https://cdn4.iconfinder.com/data/icons/universal-web-vol-2/256/57-512.png" alt="Logo"
                    width="50" height="50" class="d-inline-block align-text-top">
                <figcaption class="text-center" style="font-size:10px">Add Task</figcaption>
            </a>


            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item ">
                        <router-link to='/dashboard' class="nav-link">
                            ADMIN</router-link>
                    </li>

                    <li class="nav-item ">
                        <router-link to='/allUser' class="nav-link">
                            LIST OF USERS</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link to='/allTask' class="nav-link">LIST OF
                            TASKS</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link to='/deletedUser' class="nav-link">
                            LIST OF DELETED USERS</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link to='/setting/1' class="nav-link">SETTINGS</router-link>
                    </li>

                </ul>
                <form class="d-flex" role="search">
                    <button v-on:click.prevent="loggedout" class="btn btn-outline-success">
                        Logout</button>
                </form>
            </div>
        </div>
    </nav>

</template>
<script >
export default {
    components: {
    },
    data() {
        return {

        }
    },
    methods: {
        loggedout: function () {
            this.$http.delete('http://localhost:3000/auth/logout', {
            }).then(function (data) {
                location.replace('/login')
                this.$session.destroy();
            })
        }

    },
    beforeUpdate() {
        if ('1' !== this.$session.get('userid')) {
            this.$http.delete('http://localhost:3000/auth/logout', {
            }).then(function (data) {
                this.$session.destroy();
                location.replace('/error');
            })
        }
    },
    computed: {

    }
}
</script>


<style scoped>

</style>