<template>
  <div class="hero-body transparent-bg">
    <div class="container">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <v-card>
            <v-card-row class="primary">
              <v-card-title>
                <span class="white--text">Register</span>
                <v-spacer></v-spacer>
              </v-card-title>
            </v-card-row>
          </v-card>
          <v-stepper v-model="signinStep" class="white">
            <v-stepper-header>
              <v-stepper-step step="1" v-bind:complete="signinStep > 1">Signin Information</v-stepper-step>
              <v-divider />
              <v-stepper-step step="2" v-bind:complete="signinStep > 2">Personal Information</v-stepper-step>
              <v-divider />
              <v-stepper-step step="3">Contact Information</v-stepper-step>
            </v-stepper-header>
            <v-stepper-content step="1">
              <v-card class="mb-2 mt-2 z-depth-0">
                <v-card-row>
                  <v-text-field
                    label="Username/Email"
                    v-model="step1Data.username"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-text-field
                      label="Password"
                      hint="At least 8 characters"
                      min="8"
                      v-model="step1Data.password"
                      append-icon="visibility_off"
                      type="password"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-text-field
                    label="Confirm Password"
                    append-icon="visibility_off"
                    type="password"
                  ></v-text-field>
                </v-card-row>
              </v-card>
              <v-btn primary @click.native="signinStep = 2">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card class="mb-2 mt-2 z-depth-0">
                <v-card-row height="100px" class="grey">
                  <dropzone width="200px" height="80px" id="myVueDropzone" url="https://httpbin.org/post">
                    <v-btn>Upload</v-btn>
                  </dropzone>
                </v-card-row>
                <v-card-row>
                  <v-text-field
                    label="First name"
                    v-model="step2Data.firstname"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-text-field
                    label="Last name"
                    v-model="step2Data.lastname"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-text-field
                    label="DOB"
                    type="date"
                    v-model="step2Data.dob"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-btn-dropdown
                    label="Gender"
                    v-model="step2Data.gender"
                    :options="step2Data.genderOptions"
                    max-height="auto"
                  ></v-btn-dropdown>
                </v-card-row>
              </v-card>
              <v-btn primary @click.native="signinStep = 3">Continue</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card class="mb-2 mt-2 z-depth-0">
                <v-card-row>
                  <v-text-field
                    label="Phone number"
                    v-model="step3Data.phoneNumber"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-text-field
                    label="Address Line 1"
                    v-model="step3Data.add1"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-text-field
                    label="Address Line 2"
                    v-model="step3Data.add2"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-text-field
                    label="City"
                    v-model="step3Data.city"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-text-field
                    label="State"
                    v-model="step3Data.state"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-text-field
                    label="Postcode"
                    v-model="step3Data.postcode"
                  ></v-text-field>
                </v-card-row>
                <v-card-row>
                  <v-btn-dropdown
                    label="Nationality"
                    v-model="step3Data.nationality"
                    :options="step3Data.nationalityOptions"
                    max-height="auto"
                  ></v-btn-dropdown>
                </v-card-row>
              </v-card>
              <v-btn primary @click.native="signinStep = 1">Complete</v-btn>
              <v-btn flat>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper>
          <v-card>
            <v-card-row actions class="primary mt-0">
              <v-btn flat class="white--text" router href="/login">Already have an account? Login</v-btn>
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
      step1Data: {
        username: '',
        password: ''
      },
      step2Data: {
        firstname: '',
        lastname: '',
        dob: {},
        gender: {},
        genderOptions: [
          { text: 'Male' },
          { text: 'Female' }
        ]
      },
      step3Data: {
        phoneNumber: '',
        add1: '',
        add2: '',
        city: '',
        state: '',
        postcode: '',
        nationality: {},
        nationalityOptions: [
          { text: 'GB' },
          { text: 'VN' }
        ]
      },
      errors: {},
      signinStep: 1,
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
        console.log('success login')
        this.$router.push('/me')
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
