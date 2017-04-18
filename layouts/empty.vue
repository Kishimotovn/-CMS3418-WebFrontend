<template>
  <v-app>
    <section class="hero is-fullheight hero-image is-light">
      <!-- <header class="hero-header primary">
        <v-toolbar primary>
          <v-btn dark icon :router=true href="/">
            <figure class="image is-24x24">
              <img src="~static/GimmeCarLogoWhite.png">
            </figure>
          </v-btn>
          <v-toolbar-title>GimmeCar Club</v-toolbar-title>
        </v-toolbar>
      </header> -->
      <nuxt></nuxt>
    </section>
  </v-app>
</template>

<style lang="scss">
@import '~bulma';

.hero-image {
  background-image: url('https://static.pexels.com/photos/24353/pexels-photo.jpg');
  background-position: center;
}

.gcLogo {
  margin-top: 9px;
  margin-left: 20px;
}

</style>
