<template>
  <section class="photo-list">
    <ul>
      <photo-list-item v-for="photo in photos" :key="photo.id" :resolveUrl="resolveUrl" :item="photo"></photo-list-item>
    </ul>
  </section>
</template>

<script>

import PhotoListItem from './PhotoListItem.vue';

export default {
  props: ['resolveUrl'],

  components: {
    PhotoListItem
  },

  data () {
    return {
      currentIndex:0,

      photos: [
        {id:524, selected:false, deleted:false},
        {id:525, selected:false, deleted:false},
        {id:526, selected:false, deleted:false},
        {id:527, selected:false, deleted:false},
        {id:528, selected:false, deleted:false},
        {id:529, selected:false, deleted:false},
        {id:530, selected:false, deleted:false},
        {id:531, selected:false, deleted:false},
        {id:532, selected:false, deleted:false},
        {id:533, selected:false, deleted:false},
        {id:534, selected:false, deleted:false},
        {id:535, selected:false, deleted:false},
        {id:536, selected:false, deleted:false},
        {id:537, selected:false, deleted:false},
        {id:538, selected:false, deleted:false},
        {id:539, selected:false, deleted:false}
      ]
    }
  },

  created() {
    window.addEventListener('keydown', (e) => {
      var key = e.which || e.keyCode;
      if (key === 39) { // RIGHT
        this.next();
      } else if (key === 37) { // LEFT
        this.previous();
      } else if (key === 68) { // D
        this.markToDelete();
      }
    });

    this.select(0);
  },

  methods: {
    next () {
      this.unselect(this.currentIndex);
      this.currentIndex = Math.min(this.currentIndex + 1, this.photos.length - 1);
      this.select(this.currentIndex);
    },

    previous () {
      this.unselect(this.currentIndex);
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
      this.select(this.currentIndex);
    },

    markToDelete () {
      this.photos[this.currentIndex].deleted = !this.photos[this.currentIndex].deleted;
    },

    unselect(index) {
      this.photos[index].selected = false;
    },

    select(index) {
      console.log(this.photos[index].id);
      this.photos[index].selected = true;
      this.$emit('photo-selected', this.photos[index].id);
    }
  }
}

</script>
