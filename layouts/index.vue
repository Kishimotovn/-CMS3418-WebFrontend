<template>
  <v-app>
    <section class="hero is-light wrapper">
      <header class="hero-header">
        <v-toolbar class="transparent-bg z-depth-0">
          <v-btn dark icon :router=true href="/">
            <figure class="image is-24x24">
              <img src="~static/GimmeCarLogo.png">
            </figure>
          </v-btn>
          <v-toolbar-title class="black--text">GimmeCar Club</v-toolbar-title>
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
          <v-btn class="red white--text" v-else router href="/login">
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

<style scoped>
.wrapper {
  background-color: white;
}

.wrapper .hero-header {
  background: transparent;
}

.transparent-bg {
  background: transparent;
}

</style>
