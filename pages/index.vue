<template>
  <div>
    <section class="section has-text-centered">
      <h1 class="title is-3">
        <strong>ENJOY YOUR JOURNEY</strong>
        <br/>
        <strong>WITH OUR COMFORTABLE CARS.</strong>
      </h1>
      <h3 class="subtitle is-5">
        Serving people from last 10 years with great success.
      </h3>
    </section>
    <section class="section">
      <div class="container">
        <figure class="image">
          <img src="~static/audi_index.png">
        </figure>
        <v-card class="search-form">
          <div style="height: 5px; width: 100%" class="red"/>
          <v-card-row class="ml-4 mt-3 mb-3">
            <v-icon class="grey--text">send</v-icon>
            <span class="ml-2">
              <strong>BOOK A CAR</strong>/<small>No Advance Payment</small>
            </span>
          </v-card-row>
          <v-card-row class="ml-4 mr-4">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <span class="select" style="width: 100%">
                      <select style="width: 100%">
                        <option value="" disabled selected>car type</option>
                        <option>Sedan</option>
                      </select>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                    <input class="input" type="text" placeholder="pick up location">
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                    <input class="input" type="date" placeholder="select a date">
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                    <input class="input" type="text" placeholder="hours of journey">
                  </p>
                </div>
              </div>
            </div>
          </v-card-row>
          <v-card-row class="ml-4 mr-4">
            <v-btn block class="red mb-3">Book</v-btn>
          </v-card-row>
        </v-card>
      </div>
    </section>
    <section class="section has-text-centered">
      <h1 class="subtitle is-4">
        Book a car and get tension free about your journey.
      </h1>
    </section>
    <section class="section is-paddingless">
      <div class="container">
        <div class="columns">
          <div class="column is-4 has-text-centered">
            <promote img="/index_comfortable.png" title="Comfortable Journey" subtitle="Lorem Ipsum Dolorie"/>
          </div>
          <div class="column is-4 has-text-centered">
            <promote img="/index_clock.png" title="Journey In Time" subtitle="Lorem Ipsum Dolorie"/>
          </div>
          <div class="column is-4 has-text-centered">
            <promote img="/index_freedom.png" title="Enjoy your freedom" subtitle="Lorem Ipsum Dolorie"/>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-hidden-mobile">
            <figure class="image">
              <img src="~static/audi_index_2.png">
            </figure>
          </div>
          <div class="column">
            <h1 class="title is-4 has-text-right red--text">
              <strong>WATCH OUR VIDEO</strong>
            </h1>
            <figure class="image" style="margin-top:-7%">
              <img src="~static/audi_index_3.png">
            </figure>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-offset-1">
            <h1 class="title is-4">
              People love our services since the last 10 years
            </h1>
            <v-spacer></v-spacer>
            <h3 class="subtitle is-6 ml-4">
              <i>"I hired a car from GimmeCar Club for my business journey. I was just amazed to see how easy it was. I was feeling like this is my own car."</i>
            </h3>
            <v-spacer></v-spacer>
            <h1 class="title is-5 ml-4">
              <strong>Joan Lu</strong>
            </h1>
            <h3 class="subtitle is-6 ml-4">
              <small>University Professor</small>
            </h3>
          </div>
          <div class="column is-3">
            <h1 class="title is-5">
              <span class="red--text">Cars,</span>
              We currently have to offer
            </h1>
            <div class="columns is-mobile is-multiline">
              <div class="column is-6">
                <figure class="image is-square">
                  <img src="~static/car_index_1.jpg">
                </figure>
              </div>
              <div class="column is-6">
                <figure class="image is-square">
                  <img src="~static/car_index_2.jpg">
                </figure>
              </div>
              <div class="column is-6">
                <figure class="image is-square">
                  <img src="~static/car_index_3.jpg">
                </figure>
              </div>
              <div class="column is-6">
                <figure class="image is-square">
                  <img src="~static/car_index_4.jpg">
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column ">
            <figure class="image">
              <img src="~static/tesla_index_1.png">
            </figure>
          </div>
          <div class="column hero-body has-text-centered">
            <h1 class="title is-4">
              Liked our service? Want to have a trip with family or friends?
            </h1>
            <h3 class="subtitle is-6">
              Don't make late to test our awesome cars. Feel like yours.
            </h3>
          </div>
          <div class="column hero-body has-text-centered">
            <v-btn large class="red">Book a car now</v-btn>
          </div>
        </div>
      </div>
    </section>
    <v-footer prime>
      <div>Copyright CC 2017. All Rights Reserved</div>
      <v-spacer></v-spacer>
    </v-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import CarThumb from '~components/CarThumb'
import Promote from '~components/Promote'

export default {
  layout: 'index',
  components: {
    CarThumb,
    Promote
  },
  data () {
    return {
      cars: [],
      filterFormData: {
        startTime: {
          time: ''
        },
        endtime: {
          time: ''
        },
        option: {
          type: 'day',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: 'YYYY-MM-DD',
          placeholder: 'when?',
          inputStyle: {
            'display': 'inline-block',
            'padding': '6px',
            'line-height': '22px',
            'font-size': '16px',
            'border': '2px solid #fff',
            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
            'border-radius': '2px',
            'color': '#5F5F5F'
          },
          limit: [{
            type: 'weekday',
            available: [1, 2, 3, 4, 5]
          },
          {
            type: 'fromto',
            from: '2016-02-01',
            to: '2016-02-20'
          }],
          color: {
            header: '#ccc',
            headerText: '#f00'
          },
          buttons: {
            ok: 'Ok',
            cancel: 'Cancel'
          },
          overlayOpacity: 0.5, // 0.5 as default
          dismissible: true // as true as default
        },
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
  computed: {
    featureCars () {
      return this.cars.slice(0, 5)
    },
    ...mapGetters([
      'isAuthenticated',
      'loggedUser'
    ])
  },
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

<style scoped>

.search-form {
  margin-top: -22%;
}

.search-form .is-horizontal {
  width: 100%;
}

</style>
