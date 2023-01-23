
<template>
  <div>
    <!-- <index></index> -->
    <router-view></router-view>
  </div>

</template>

<script >

import getAll from './components/getAll.vue'
import index from './components/index.vue'
import register from './components/register.vue'
import taskOne from './components/alltask.vue'

export default {
  components: {
    'index': index,
    'register': register,
    'getAll': getAll,
    'taskOne': taskOne
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
