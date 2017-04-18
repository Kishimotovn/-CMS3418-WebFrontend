<template>
  <v-card>
    <v-card-row :img="car.thumb" height="300px"></v-card-row>
    <v-card-text class="primary white--text">
      <div class="columns is-mobile mb-0">
        <div class="column">
          <h1 class="title is-4 white--text">{{car.model}} - <small>{{car.make}}</small></h1>
          <h3 class="subtitle is-6 white--text mb-0">
            {{car.location}}
          </h3>
        </div>
        <div class="column is-narrow text-xs-right">
          <h1 class="title is-4 green--text">{{car.price}} ppw</h1>
        </div>
      </div>
      <div>
        <h3 class="subtitle is-6 white--text mb-0">
          {{car.description}}
        </h3>
      </div>
    </v-card-text>
    <v-card-row actions class="blue-grey darken-1 mt-0">
      <v-btn flat class="white--text" @click.native="goToCar">Details</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click.native="goToCar" icon>
        <v-icon class="white--text">info</v-icon>
      </v-btn>
    </v-card-row>
  </v-card>
</template>

<script>
export default {
  props: ['car'],
  methods: {
    goToCar () {
      console.log('going to car with id:', this.car.id)
      const path = '/cars/' + this.car.id
      this.$router.push(path)
    }
  }
}
</script>
