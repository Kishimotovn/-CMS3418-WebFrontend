<template>
  <v-app left-fixed-sidebar sidebar-under-toolbar>
    <v-toolbar primary>
      <v-toolbar-side-icon @click.native.stop="navbar = !navbar" />
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
    </v-toolbar>
    <main>
      <v-sidebar left fixed drawer v-model="navbar">
        <v-list>
          <v-list-item>
            <v-list-tile router nuxt href="/admin/members">
              <v-list-tile-title>Member Management</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-sidebar>
      <v-content>
        <nuxt/>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'admin',
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
