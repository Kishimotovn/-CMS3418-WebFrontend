<template>
  <div @click="goToMember">
    <figure class="image is-square">
      <img :src="member.avatar"/>
    </figure>
    <h1 class="title is-5 has-text-centered mt-3">{{member.firstname | capitalize}} {{member.lastname | capitalize}}</h1>
    <h3 class="subtitle is-6 has-text-centered">{{member.city | capitalize}}</h3>
  </div>
</template>
<script>
import Vue from 'vue'

Vue.filter('capitalize', value => {
  if (value.length >= 2) {
    return value[0].toUpperCase() + value.slice(1)
  } else {
    return value
  }
})

export default {
  props: ['member'],
  methods: {
    goToMember () {
      console.log('going to member with id:', this.member.id)
      const path = '/members/' + this.member.id
      this.$router.push(path)
    }
  }
}
</script>
<style scoped>
img {
  border-radius: 50%;
}
</style>
