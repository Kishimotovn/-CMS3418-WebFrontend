<template>
  <div>
    <div class="hero-body pt-0 pb-0">
      <div class="container chatbox">
        <chat-bubble v-for="message in messages" :message="message"/>
      </div>
    </div>
    <div class="hero-foot">
      <div class="container">
        <div class="columns is-mobile">
          <div class="column is-8">
            <v-text-field
              label="Type here"
              class="ma-0"
              v-model="typingMessage"
              light/>
          </div>
          <div class="column is-4">
            <v-btn @click.native="send" round primary block class="ma-0">Send</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import ChatBubble from '~components/ChatBubble'

export default {
  components: {
    ChatBubble
  },
  computed: mapGetters(['loggedUser']),
  validate (context) {
    return /^\d+$/.test(context.params.id)
  },
  middleware: 'authenticated',
  layout: 'chat',
  asyncData (context) {
    const conversationPath = '/conversations/' + context.params.id
    return Vue.axios.get(conversationPath).then(response => {
      return {
        conversation: response.data.conversation,
        messages: response.data.messages
      }
    }).catch(error => {
      console.log('message error', error)
      context.error({
        statusCode: 500,
        message: 'Server error'
      })
    })
  },
  data () {
    return {
      ws: {},
      typingMessage: '',
      conversation: {},
      messages: []
    }
  },
  mounted () {
    const host = '0.0.0.0:8080/chat/' + this.conversation.id

    this.ws = new WebSocket('ws://' + host)
    var that = this

    this.ws.onopen = function () {
      const message = JSON.stringify({
        'userid': that.loggedUser.member_id
      })
      that.ws.send(message)
    }

    this.ws.onmessage = function (event) {
      var message = JSON.parse(event.data)
      // console.log('[' + name + '] ' + message)
      this.messages.push(message)
    }
  },
  methods: {
    send () {
      if (this.typingMessage.length > 0) {
        this.ws.send(JSON.stringify({
          'message': this.typingMessage
        }))
        const currentTime = new Date()
        this.messages.push({
          member_id: this.loggedUser.member_id,
          content: this.typingMessage,
          created_at: (currentTime.getTime() / 1000)
        })
        this.typingMessage = ''
      }
    }
  }
}
</script>
<style scoped>

.chatbox {
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
