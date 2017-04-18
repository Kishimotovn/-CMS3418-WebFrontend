<template>
  <div @click="goToMessage" class="z-depth-1 mb-3 columns is-mobile" style="border-radius: 3px">
    <div class="column is-narrow" v-if="targetingMember.firstname">
      <figure class="image is-64x64">
        <img :src="targetingMember.avatar" style="border-radius: 50%"/>
      </figure>
    </div>
    <div class="column">
      <h1 class="title is-4" v-if="targetingMember.firstname">{{targetingMember.firstname | capitalize}}</h1>
      <h3 class="subtitle is-6 mb-2 grey--text">{{dateString}}</h3>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

Vue.filter('capitalize', value => {
  if (value.length >= 2) {
    return value[0].toUpperCase() + value.slice(1)
  } else {
    return value
  }
})

export default {
  props: ['conversation', 'currentMemberId'],
  data () {
    return {
      targetingMember: {}
    }
  },
  mounted () {
    const otherMemberId = this.currentMemberId === this.conversation.a_id ? this.conversation.b_id : this.conversation.a_id
    const otherMemberPath = '/members/' + otherMemberId
    Vue.axios.get(otherMemberPath).then(response => {
      this.targetingMember = response.data.member
    }).catch(error => {
      console.log('message thumb error', error)
    })
  },
  methods: {
    goToMessage () {
      const messagePath = '/message/' + this.conversation.id
      this.$router.push(messagePath)
    }
  },
  computed: {
    dateString () {
      var d = new Date(this.conversation.updated_at * 1000)
      return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
    }
  }
}
</script>
<style>
</style>
