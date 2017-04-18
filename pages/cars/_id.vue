<template>
  <div>
    <div v-if="!loading">
      <section class="section is-paddingless">
        <v-carousel icon="remove">
          <v-carousel-item
            v-for="image in car.images" :key="image.id"
            v-bind:src="image.url"
          />
        </v-carousel>
      </section>
      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-8">
              <h1 class="title is-2">{{car.model}}</h1>
              <h3 class="subtitle is-4">{{car.location}}</h3>
              <hr/>
              <h1 class="title is-4 grey--text">Vehicle Details</h1>
              <h3 class="subtitle is-4 mt-1">
                <span class="grey--text">Type:</span> {{car.type}}
                <br/>
                <span class="grey--text">Make:</span> {{car.make}}
                <br/>
                <span class="grey--text">Color:</span> {{carColor | capitalize}}
                <br/>
                <span class="grey--text">Description:</span> {{car.description}}
              </h3>
              <hr/>
              <h1 class="title is-4 grey--text">Owner Details</h1>
              <div class="columns is-mobile">
                <div class="column is-4 is-offset-4">
                  <member-thumb :member="member"></member-thumb>
                </div>
              </div>
              <hr/>
              <h1 class="title is-4 grey--text">Regular Availability</h1>
              <table class="table">
                <thead>
                  <tr>
                    <th>Week Date</th>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="availability in this.car.availabilities" :key="availability.id">
                    <th>{{availability.week_date}}</th>
                    <td v-text="toTimeString(availability.from_time)"></td>
                    <td v-text="toTimeString(availability.to_time)"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="column is-4">
              <h1 class="title is-4 grey--text">Feeds</h1>

              <h3 class="subtitle is-6 grey--text">This car has no feeds</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="hero-body" v-else>
      <h1 class="title is-1">Can't fetch car's information</h1>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import MemberThumb from '~components/MemberThumb'
import colors from 'hex-to-color-name'

Vue.filter('capitalize', value => {
  return value[0].toUpperCase() + value.slice(1)
})

export default {
  components: {
    MemberThumb
  },
  methods: {
    toTimeString (timeInterval) {
      var milisecs = timeInterval * 1000
      return new Date(milisecs).toLocaleTimeString()
    }
  },
  validate (context) {
    return /^\d+$/.test(context.params.id)
  },
  asyncData (context) {
    const carPath = '/cars/' + context.params.id
    return Vue.axios.get(carPath).then(response => {
      return {
        car: response.data.car,
        loading: false
      }
    }).catch(error => {
      console.log(error)
      context.error({
        statusCode: 404,
        message: 'Page Not Found'
      })
    })
  },
  data () {
    return {
      car: {},
      loading: true
    }
  },
  computed: {
    carColor () {
      if (this.car.color) {
        return colors(this.car.color)
      } else {
        return 'black'
      }
    },
    member () {
      if (this.car.owner_id) {
        return {
          firstname: this.car.owner_firstname,
          lastname: this.car.owner_lastname,
          avatar: this.car.owner_ava,
          city: this.car.owner_city,
          id: this.car.owner_id
        }
      } else {
        return {
          firstname: 'Kishimotovn',
          lastname: 'Tran',
          avatar: '',
          city: 'Hanoi',
          id: 0
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
