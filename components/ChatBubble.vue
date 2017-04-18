<template>
  <div>
    <div class="columns is-mobile mb-0">
      <div class="column" v-if="isCurrentMember"/>
      <div class="column is-narrow">
        <div :class="['bubble', 'z-depth-1', 'pt-1', 'pb-1', isCurrentMember ? '' : 'has-text-right']">
          <h1 class="subtitle is-6 ml-3 mr-3 pt-1 pb-1 mb-0">{{message.content}}</h1>
        </div>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column is-narrow" v-if="!isCurrentMember">
        <figure class="image is-24x24">
          <img :src="member.avatar" style="border-radius: 50%"/>
        </figure>
      </div>
      <div class="column pl-0" v-if="!isCurrentMember">
        <h5 class="subtitle is-6 grey--text">{{dateString}}</h5>
      </div>
      <div class="column pr-0" v-if="isCurrentMember">
        <h5 class="subtitle is-6 grey--text has-text-right">{{dateString}}</h5>
      </div>
      <div class="column is-narrow" v-if="isCurrentMember">
        <figure class="image is-24x24">
          <img :src="member.avatar" style="border-radius: 50%"/>
        </figure>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'

export default {
  props: ['message'],
  data () {
    return {
      member: {}
    }
  },
  mounted () {
    const memberPath = '/members/' + this.message.member_id
    Vue.axios.get(memberPath).then(request => {
      this.member = request.data.member
    }).catch(error => {
      console.log('bubble error', error)
    })
  },
  computed: {
    ...mapGetters(['loggedUser']),
    isCurrentMember () {
      return this.loggedUser.member_id === this.message.member_id
    },
    dateString () {
      var d = new Date(this.message.created_at * 1000)
      return d.getHours() + ':' + d.getMinutes() + ' - ' + d.getDate() + '/' + (d.getMonth() + 1)
    }
  }
}
</script>
<style scoped>
.bubble {
  border-radius: 8px;
  background: white;
}
</style>
