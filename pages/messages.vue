<template>
  <div>
    <section class="section" v-if="conversations.length == 0">
      <h1 class="title is-4 grey--text has-text-centered">
        You have no conversations
      </h1>
    </section>
    <section class="section" v-else>
      <div class="container">
        <div class="columns is-mobile is-multiline">
          <div class="column is-half-desktop">
            <message-thumb v-for="conversation in conversations" :key="conversation.id" :conversation="conversation" :currentMemberId="1"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import MessageThumb from '~components/MessageThumb'
import { mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  components: {
    MessageThumb
  },
  asyncData (context) {
    let messagePath = '/conversations/'
    return Vue.axios.get(messagePath).then(response => {
      return {
        conversations: response.data.conversations
      }
    }).catch(error => {
      console.log('message page', error)
    })
  },
  data () {
    return {
      conversations: []
    }
  },
  computed: mapGetters(['loggedUser']),
  mounted () {
    console.log(this.loggedUser)
  }
}
</script>
<style>
</style>
