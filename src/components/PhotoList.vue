<template>
  <section class="photo-list">
    <ul>
      <photo-list-item v-for="photo in photos" :item="photo" :key="photo.id"></photo-list-item>
    </ul>
  </section>
</template>

<script>

import PhotoListItem from './PhotoListItem.vue';

export default {
  props: ['photos'],

  components: {
    PhotoListItem
  }
}

</script>
