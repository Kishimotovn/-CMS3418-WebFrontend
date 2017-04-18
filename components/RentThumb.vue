<template>
  <div class="box columns is-mobile mt-3 mb-3 z-depth-1 pa-2">
    <div class="column is-narrow">
      <figure class="image is-64x64">
        <img :src="customer.avatar" style="border-radius: 50%"/>
      </figure>
    </div>
    <div class="column is-6">
      <h1 class="title is-4" v-if="customer.firstname">{{customer.firstname | capitalize}}</h1>
      <h3 class="subtitle is-6 mb-2" v-if="owner.firstname">Rented {{owner.firstname | capitalize}}'s {{car.model}}</h3>
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
  props: ['rent'],
  computed: {
    dateString () {
      var d = new Date(this.rent.updated_at * 1000)
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
    }
  },
  data () {
    return {
      owner: {},
      customer: {},
      car: {}
    }
  },
  mounted () {
    const ownerPath = '/members/' + this.rent.owner_id
    Vue.axios.get(ownerPath).then(response => {
      this.owner = response.data.member
    }).catch(error => {
      console.log('owner error', error)
    })

    const customerPath = '/members/' + this.rent.customer_id
    Vue.axios.get(customerPath).then(response => {
      this.customer = response.data.member
    }).catch(error => {
      console.log('owner error', error)
    })

    const carPath = '/cars/' + this.rent.car_id
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
