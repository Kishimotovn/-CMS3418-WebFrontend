<template>
  <div class="hero-body is-paddingless">
    <div class="container mt-4">
      <v-card class="mb-2 mt-2">
        <v-card-row class="primary">
          <v-card-title>
            <span class="white--text">Find a car</span>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card-row>
        <v-card-row>
          <v-btn-dropdown
            class="ml-3 mr-2 mt-4 mb-0"
            label="Type"
            v-model="filterFormData.type"
            :options="filterFormData.types"
            max-height="auto"
            style="width: 100px;"
          ></v-btn-dropdown>
          <v-text-field
            label="Price"
            v-model="filterFormData.price"
            class="ml-2 mr-3 mt-4 mb-0"
          ></v-text-field>
        </v-card-row>
        <v-card-row>
          <v-text-field
            label="Location"
            v-model="filterFormData.location"
            class="ml-3 mr-3 mt-0 mb-0"
          ></v-text-field>
        </v-card-row>
        <v-card-row>
          <v-text-field
            label="Pickup Time"
            v-model="filterFormData.pickupTime"
            class="ml-3 mr-2 mt-0 mb-0"
          ></v-text-field>
          <v-text-field
            label="Drop Time"
            v-model="filterFormData.dropTime"
            class="ml-2 mr-3 mt-0 mb-0"
          ></v-text-field>
        </v-card-row>
        <v-card-row v-if="advancedFilter">
          <v-text-field
            label="Make"
            v-model="filterFormData.make"
            class="ml-3 mr-2 mt-0 mb-0"
          ></v-text-field>
          <v-text-field
            label="Model"
            v-model="filterFormData.model"
            class="ml-2 mr-3 mt-0 mb-0"
          ></v-text-field>
        </v-card-row>
        <v-card-row>
          <v-btn primary @click.native="search">Search</v-btn>
          <v-spacer></v-spacer>
          <v-btn small primary icon @click.native="toggleAdvanceFilter">
            <v-icon small>settings</v-icon>
          </v-btn>
        </v-card-row>
      </v-card>
      <div class="columns is-multiline mt-3">
        <div class="column is-6" v-for="car in cars">
          <car-thumb :car="car"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import CarThumb from '~components/CarThumb'

export default {
  layout: 'default',
  components: {
    CarThumb
  },
  data () {
    return {
      cars: [],
      filterFormData: {
        type: '',
        types: [
          { text: 'Sedan' }
        ],
        price: '',
        location: '',
        pickupTime: '',
        dropTime: '',
        make: '',
        model: ''
      },
      advancedFilter: false
    }
  },
  asyncData () {
    return Vue.axios.get('cars').then(response => {
      return {
        cars: response.data.cars
      }
    }).catch(error => {
      this.error = error.response.data
    })
  },
  computed: mapGetters([
    'isAuthenticated',
    'loggedUser'
  ]),
  methods: {
    toggleAdvanceFilter () {
      console.log('pressing hard af')
      this.advancedFilter = !this.advancedFilter
    },
    search () {
      this.advancedFilter = false
    }
  }
}
</script>

<style>



</style>
