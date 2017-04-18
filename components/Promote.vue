<template>
  <div class="has-text-centered">
    <div class="columns is-mobile">
      <div class="column is-4 is-offset-4">
        <figure class="image is-square">
          <img :src="img">
        </figure>
      </div>
    </div>
    <h1 class="title is-5">
      {{title}}
    </h1>
    <h3 class="subtitle is-6">
      {{subtitle}}
    </h3>
  </div>
</template>

<script>
export default {
  props: ['title', 'subtitle', 'img']
}
</script>
