<template>
  <v-app>
    <section class="hero is-light">
      <header class="hero-header primary">
        <v-toolbar primary>
          <v-btn dark icon :router=true href="/">
            <figure class="image is-24x24">
              <img src="~static/GimmeCarLogoWhite.png">
            </figure>
          </v-btn>
          <v-toolbar-title>GimmeCar Club</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark v-if="isAuthenticated">
            <v-icon>message</v-icon>
          </v-btn>
          <v-menu bottom left offset-y origin="top right" transition="v-slide-y-transition" v-if="isAuthenticated">
            <v-btn icon dark slot="activator">
              <v-icon>account_circle</v-icon>
            </v-btn>
            <v-list>
              <v-list-item>
                <v-list-tile>
                  <v-list-tile-title>View Profile</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title @click="logout">Logout</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn dark v-else router href="/login">
            Sign in
          </v-btn>
        </v-toolbar>
      </header>
    </section>
    <nuxt></nuxt>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted () {
    console.log(this.loggedUser)
  },
  data () {
    return {
      username: 'default username'
    }
  },
  computed: mapGetters([
    'isAuthenticated',
    'loggedUser'
  ]),
  methods: {
    logout () {
      this.$store.dispatch('logout').then(response => {
        this.$router.push('/')
      }).catch(error => {
        console.log('logout error', error)
      })
    }
  }
}
</script>
