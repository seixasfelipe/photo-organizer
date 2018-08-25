<template>
  <div class="container">
    <!-- <section class="photo-selected">
      <img :src="getCurrent().path">
    </section> -->
    <!-- <photo-list :photos="getPhotos()" :next="next" :previous="previous"></photo-list> -->

    <section class="main-photo" v-on:keyup.d="deletePhoto">
      <div class="nav-button" @click="previous()">&#8249;</div>
      <img :src="resolveUrl(selected().id, 800, 600)">
      <div class="nav-button" @click="next()">&#8250;</div>
    </section>
    <aside class="photo-list">
      <ul>
        <li v-for="photo in photos" :key="photo.id" :class="{deleted:isDeleted(photo.id), selected:isSelected(photo.id)}">
          <img :src="resolveUrl(photo.id, 120, 90)">
        </li>
      </ul>
    </aside>
    <section class="debug">
      <p>{{ currentIndex }} | {{ isDeleted(selected().id) }}</p>
    </section>
  </div>
</template>

<script>

import PhotoList from './components/PhotoList.vue';

export default {
  name: 'app',

  components: {
    PhotoList
  },

  data () {
    return {
      currentIndex: 0,
      next() {
        this.currentIndex = Math.min(this.currentIndex + 1, this.photos.length - 1);
      },
      previous() {
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
      },
      deletePhoto() {
        this.photos[this.currentIndex].deleted = !this.photos[this.currentIndex].deleted;
        this.next();
      },
      isDeleted(id) {
        return this.photos.find(function(e) { return e.id === id && e.deleted});
      },
      isSelected(id) {
        return this.selected().id === id;
      },
      selected() {
          return this.photos[this.currentIndex];
      },
      photos: [
        {id:524},
        {id:525},
        {id:526},
        {id:527},
        {id:528},
        {id:529},
        {id:530},
        {id:531},
        {id:532},
        {id:533},
        {id:534},
        {id:535},
        {id:536},
        {id:537},
        {id:538},
        {id:539}
      ],
    }
  },

  mounted() {
    window.addEventListener('keydown', (e) => {
      var key = e.which || e.keyCode;
      if (key === 39) { // RIGHT
        this.next();
      } else if (key === 37) { // LEFT
        this.previous();
      } else if (key === 68) { // D
        this.deletePhoto();
      }
    });
  },

  methods: {
    resolveUrl(id, width, height) {
      return `https://picsum.photos/${width}/${height}/?image=${id}`;
    }
  }
}
</script>

<style>
/*--------------------------------------------------------------
CSS Reset
--------------------------------------------------------------*/
html {
	font-family: sans-serif;
	-webkit-text-size-adjust: 100%;
	-ms-text-size-adjust:     100%;
}

body {
	margin: 0;
  height: 100%
}

img {
	display: block;
	border: 0;
	width: 100%;
	height: auto;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}



/*--------------------------------------------------------------
CSS App
--------------------------------------------------------------*/
ul {
  padding: 0.5em;
  /* display: inline-flex; */
}

li {
  padding: 0.5em;
  width: 5em;
  display: inline-block;
}

li.deleted img {
  box-sizing: border-box;
  border: 2px solid #F00;
}

li.selected {
  background-color: #A3A3A3;
}

/* .container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
} */

.main-photo {
  padding: 3em 1.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #E6E6E6;
  border-bottom: 1px solid #A3A3A3;
}

.main-photo img {
  width: 800px;
  height: 600px;
  /* -webkit-box-shadow: 3px 3px 15px 1px rgba(0,0,0,0.3);
  -moz-box-shadow: 3px 3px 15px 1px rgba(0,0,0,0.3); */
  box-shadow: 3px 3px 15px 1px rgba(0,0,0,0.3);
}

.nav-button {
  padding: 0.2em 0.6em;
  background-color: #F0F0F0;
  color: #A3A3A3;
  font-size: 15pt;
  border-radius: 5%;
}

.photo-list {
  background-color: #F0F0F0;
}

</style>
