

<template>

    <div>

        <goto-login v-on:success="success($event)"></goto-login>

    </div>

</template>
<script >

import gotoLogin from './login.vue'

export default {
    components: {
        'goto-login': gotoLogin,
    },
    methods: {
        success: function (user) {

            if (user.user_type === 1) {
                location.replace('/dashboard')
            }
            if (user.user_type !== 1) {
                location.replace('/user/dashboard/' + user.user_id)
            }

        }
    }
}
</script>

<style scoped>

</style>