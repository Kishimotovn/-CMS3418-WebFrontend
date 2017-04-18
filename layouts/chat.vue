<template>
  <v-app>
    <div class="hero is-fullheight" style="background-color: whitesmoke;">
      <header class="hero-header">
        <div class="container">
          <h1 class="title is-4 mt-3">Chatting with user id: {{loggedUser.member_id}}</h1>
          <hr/>
        </div>
      </header>
      <nuxt/>
    </div>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  // middleware: 'admin',
  data () {
    return {
      navbar: false
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

<style>
</style>
