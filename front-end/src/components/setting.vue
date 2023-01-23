

<template>
    <div>
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-3 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                        <a class="navbar-brand" v-bind:href="this.goto">
                            <img class="rounded-circle mt-5" width="150px"
                                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                        </a>

                        <span class="font-weight-bold">USERNAME : {{ this.user.user_name }}</span>
                        <span class="font-weight-bold">USER ID : {{ this.user.user_id }}</span>
                        <span class="text-black-50">Click On the avatar to go back</span>
                    </div>
                </div>
                <div id="block" class="col-md-5 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Profile Settings</h4>
                        </div>

                        <div class="row mt-3">
                            <div class="col-md-12"><label class="labels">NEW USERNAME</label><input type="text"
                                    class="form-control" v-bind:placeholder=user.user_name v-model="new_user.user_name">
                            </div>
                            <div class="col-md-12"><label class="labels">NEW PASSWORD</label><input type="text"
                                    class="form-control" placeholder="PASSWORD" v-model="new_user.user_password"></div>
                        </div>


                        <div class="mt-5 text-center"><button class="btn btn-primary profile-button"
                                v-on:click.prevent="updateUser">Save
                                Profile</button></div>
                        <span v-show="msg">Enter Something</span>
                        <div class="mt-5 text-center" v-if="user.user_type !== 1"><button class="btn btn-danger"
                                v-on:click.prevent="deleteUser(user.user_id)">Delete
                                Profile</button></div>
                    </div>
                </div>

            </div>
        </div>
    </div>


</template>
<script >



export default {

    props: {

    }
    ,
    components: {

    },
    data() {
        return {
            user: {},
            new_user: {},
            goto: '',
            msg: false
        }
    },
    methods: {
        updateUser: function () {
            if (this.new_user.user_name == null && this.new_user.user_password == null) {
                this.msg = true
            } else {
                this.msg = false
                this.$http.put('http://localhost:3000/user/' + this.user.user_id, {
                    user_name: this.new_user.user_name,
                    user_password: this.new_user.user_password,
                }).then(function (data) {
                    location.replace(this.goto)
                })
            }
        },
        deleteUser: function (id) {
            this.$http.delete('http://localhost:3000/user/' + id, {
                headers: {
                    authorization: 'Bearer ' + this.$session.get('token')
                }
            }).then(function (data) {
                this.$http.delete('http://localhost:3000/auth/logout', {
                }).then(function (data) {
                    this.$session.destroy();
                    location.replace('/login')
                })
            })
        }
    },
    computed: {

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
            }).then(
                function (data) {
                    this.user = data.body;
                    if (this.user.user_id === '1') {
                        this.goto = '/dashboard';
                    }
                    else {
                        this.goto = '/user/dashboard/' + this.user.user_id;
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
body {
    background: rgb(99, 39, 120);
    margin-top: 0;
}

#block {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 2px solid rgb(99, 39, 120);
    margin: 5%;
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    padding: 2%;
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #682773
}

.profile-button:focus {
    background: #682773;
    box-shadow: none
}

.profile-button:active {
    background: #682773;
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}

.labels {
    font-size: 11px
}

.add-experience:hover {
    background: #BA68C8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #BA68C8
}
</style>