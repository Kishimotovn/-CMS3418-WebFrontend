<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title is-4">Admin</h1>
        <hr/>
        <div class="columns is-multiline is-mobile">
          <div class="column is-4" v-for="admin in admins">
            <member-thumb :member="admin"/>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h1 class="title is-4">Members</h1>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <v-btn class="primary" @click.native="generateMember">Generate Member</v-btn>
            </div>
          </div>
        </div>
        <hr/>
        <div class="columns is-multiline is-mobile">
          <div class="column is-one-quarter-desktop is-one-third-mobile" v-for="member in members">
            <member-thumb :member="member"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import MemberThumb from '~components/MemberThumb'

export default {
  layout: 'admin',
  components: {
    MemberThumb
  },
  asyncData () {
    return Vue.axios.get('/members').then(response => {
      return {
        members: response.data.members,
        admins: response.data.admin
      }
    })
  },
  data () {
    return {
      members: [],
      admins: []
    }
  },
  methods: {
    generateMember () {
      Vue.axios.post('/members/generate').then(response => {
        this.members.push(response.data.new_member)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style>
</style>
