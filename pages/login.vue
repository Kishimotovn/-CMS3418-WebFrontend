<template>
  <div class="hero-body transparent-bg">
    <div class="container">
      <div class="columns">
        <div class="column is-10 is-offset-1">
            <v-card>
              <v-card-row class="primary">
                <v-card-title>
                  <span class="white--text">Login</span>
                  <v-spacer></v-spacer>
                </v-card-title>
              </v-card-row>
              <v-card-text class="secondary white--text">
                <div>
                  With your social account:
                </div>
              </v-card-text>
              <v-card-row>
                <v-spacer/>
                <v-col md4>
                  <v-btn block class="blue darken-4 mt-3 mb-3" dark>Facebook</v-btn>
                </v-col>
                <v-spacer/>
                <v-col md4>
                  <v-btn block class="red darken-2" dark>Google</v-btn>
                </v-col>
                <v-spacer/>
              </v-card-row>
              <v-card-text class="secondary white--text">
                <div>
                  Or with your email:
                </div>
              </v-card-text>
              <v-card-row>
                <v-container class="mt-3 mb-3">
                  <v-text-field
                    name="input-1"
                    label="Username"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    name="input-2"
                    label="Password"
                    hint="At least 8 characters"
                    min="8"
                    v-model="password"
                    append-icon="visibility_off"
                    type="password"
                  ></v-text-field>
                  <v-btn block class="primary" dark @click.native="login">Login</v-btn>
                  <a href="/resetpassword">Forgot your password?</a>
                </v-container>
              </v-card-row>
              <v-card-row actions class="primary mt-0">
                <v-btn flat class="white--text" router href="/signup">Signup</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon class="white--text">info</v-icon>
                </v-btn>
              </v-card-row>
            </v-card>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      username: '',
      password: '',
      errors: {},
      loading: false
    }
  },
  methods: {
    clearError (field) {
      if (this.errors[field]) {
        delete (this.errors[field])
      }
      if (this.errors['message']) {
        delete (this.errors['message'])
      }
    },
    login () {
      const creds = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('login', creds).then(response => {
        if (response.data.is_admin) {
          this.$router.push('/admin')
        } else {
          this.$router.push('/me')
        }
      }).catch(error => {
        console.log('signin err', error)
        this.errors = error.response.data
      })
    }
  }
}
</script>

<style scoped>
.transparent-bg {
  background: transparent;
}
</style>
