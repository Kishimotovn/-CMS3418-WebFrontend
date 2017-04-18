<template>
  <div>
    <div v-if="!loading">
      <section class="section grey lighten-3 pb-3">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-narrow">
              <figure class="image is-128x128 member-avatar">
                <img :src="member.avatar"/>
              </figure>
            </div>
            <div class="column mt-4">
              <h1 class="title is-4">{{member.firstname | capitalize}} {{member.lastname | capitalize}}</h1>
              <h3 class="subtitle is-6">
                {{member.city | capitalize}} - {{member.nationality}}
                <br/>
                {{member.username}}
              </h3>
            </div>
          </div>
          <hr/>
          <div class="columns is-mobile">
            <div class="column has-text-centered">
              <v-btn block round primary dark @click.native="getConversation">Chat</v-btn>
            </div>
            <div class="column has-text-centered">
              <v-btn block round primary dark>Email</v-btn>
            </div>
          </div>
        </div>
      </section>
      <div class="tabs is-centered is-medium">
        <ul>
          <li :class="[showingActivities ? 'is-active' : '']"><a @click="showingActivities=true">Activities</a></li>
          <li :class="[!showingActivities ? 'is-active' : '']"><a @click="showingActivities=false">Cars</a></li>
        </ul>
      </div>
      <section class="section pt-0" v-if="showingActivities">
        <div class="container">
          <div class="columns" v-if="hasActivities">
            <div class="column is-6" v-if="member.rents">
              <h1 class="title is-4 grey--text">Customers</h1>
              <rent-thumb v-for="rent in member.rents" :key="rent.id" :rent="rent"/>
            </div>
            <div class="column is-6" v-if="member.comments && member.comments.length > 0">
              <h1 class="title is-4 grey--text">Comments</h1>
              <comment-thumb v-for="comment in member.comments" :key="comment.id" :comment="comment"/>
            </div>
          </div>
          <h1 class="title is-4 has-text-centered" v-else>This member has no activity yet!</h1>
        </div>
      </section>
      <section class="section pt-2" v-else>
        <div class="container">
          <h1 class="title is-4 has-text-centered" v-if="member.cars.length == 0">This member has no cars!</h1>
          <div class="columns is-multiline" v-else>
            <div class="column is-6" v-for="car in member.cars" :key="car.id">
              <car-thumb :car="car"/>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="hero-body" v-else>
      <h1 class="title is-1">Can't fetch member's information</h1>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CarThumb from '~components/CarThumb'
import RentThumb from '~components/RentThumb'
import CommentThumb from '~components/CommentThumb'
import jwtDecode from 'jwt-decode'

Vue.filter('capitalize', value => {
  return value[0].toUpperCase() + value.slice(1)
})

export default {
  components: {
    CarThumb,
    RentThumb,
    CommentThumb
  },
  validate (context) {
    return /^\d+$/.test(context.params.id)
  },
  middleware: 'authenticated',
  asyncData (context) {
    console.log(context.store.state)
    const token = context.store.state.token
    console.log('valid token failed', token)
    if (token) {
      console.log('has token now')
      console.log('params', context.params.id)
      console.log('member_id', jwtDecode(token).member_id)

      if (context.params.id - jwtDecode(token).member_id === 0) {
        console.log('gonna redirect')
        context.redirect('/me')
      }
    }
    const memberPath = '/members/' + context.params.id
    return Vue.axios.get(memberPath).then(response => {
      return {
        member: response.data.member,
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
      member: {},
      loading: true,
      showingActivities: true
    }
  },
  computed: {
    hasActivities () {
      return this.member.rents || this.member.comments
    }
  },
  methods: {
    getConversation () {
      var that = this
      Vue.axios.post('/conversations/', {
        to: that.member.id
      }).then(response => {
        console.log('received conversation:', response.data.conversation)
        const conversationPath = '/message/' + response.data.conversation.id
        this.$router.push(conversationPath)
      }).catch(error => {
        console.log('create conversation error:', error)
      })
    }
  }
}
</script>
<style scoped>
.member-avatar img {
  border-radius: 50%;
}

</style>
