<template>
  <div class="box columns is-mobile mt-3 mb-3 z-depth-1 pa-2">
    <div class="column is-narrow">
      <figure class="image is-64x64">
        <img :src="member.avatar" style="border-radius: 50%"/>
      </figure>
    </div>
    <div class="column is-6">
      <h1 class="title is-4" v-if="member.firstname && car.owner_firstname">{{member.firstname | capitalize}} <small class="subtitle is-6">@{{car.owner_firstname | capitalize}}'s {{car.model}}</small></h1>
      <h3 class="subtitle is-6 mb-2">{{comment.content}}</h3>
      <h3 class="subtitle is-6 mb-2 grey--text">{{dateString}}</h3>
    </div>
    <div class="column">
      <figure class="image is-16x9">
        <img :src="car.thumb"/>
      </figure>
    </div>
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
  props: ['comment'],
  computed: {
    dateString () {
      var d = new Date(this.comment.created_at * 1000)
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
    }
  },
  data () {
    return {
      member: {},
      car: {}
    }
  },
  mounted () {
    const memberPath = '/members/' + this.comment.member_id
    Vue.axios.get(memberPath).then(response => {
      this.member = response.data.member
    }).catch(error => {
      console.log('member error', error)
    })

    const carPath = '/cars/' + this.comment.car_id
    Vue.axios.get(carPath).then(response => {
      this.car = response.data.car
    }).catch(error => {
      console.log('owner error', error)
    })
  }
}
</script>

<style>
</style>
