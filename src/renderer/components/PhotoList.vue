<template>
  <section class="photo-list">
    <ul>
      <photo-list-item v-for="photo in photos"
        :key="photo.id"
        :item="photo"
        @click.native="selectPhoto(photo.id)">
      </photo-list-item>
    </ul>
  </section>
</template>

<script>

import PhotoListItem from './PhotoListItem.vue';

export default {
  props: ['photos'],

  components: {
    PhotoListItem,
  },

  data() {
    return {
      currentIndex: 0,
    };
  },

  created() {
    window.addEventListener('keydown', (e) => {
      const key = e.which || e.keyCode;
      if (key === 39) { // RIGHT
        this.next();
      } else if (key === 37) { // LEFT
        this.previous();
      } else if (key === 68) { // D
        this.markAsDeleted();
      }
    });

    this.select(0);
  },

  methods: {
    next() {
      const newIndex = Math.min(this.currentIndex + 1, this.photos.length - 1);
      this.select(newIndex);
    },

    previous() {
      const newIndex = Math.max(this.currentIndex - 1, 0);
      this.select(newIndex);
    },

    markAsDeleted() {
      this.photos[this.currentIndex].deleted = !this.photos[this.currentIndex].deleted;
    },

    unselect(index) {
      this.photos[index].selected = false;
    },

    select(index) {
      this.unselect(this.currentIndex);
      this.currentIndex = index;

      this.photos[index].selected = true;
      this.$emit('photo-selected', this.photos[index].src);
    },

    selectPhoto(id) {
      if (this.photos.length > 0) {
        const index = this.photos.findIndex(p => p.id === id);
        this.select(index);
      }
    },
  },
};
</script>
