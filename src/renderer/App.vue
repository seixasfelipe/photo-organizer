<template>
  <div class="container">
    <section v-if="hasPhotos">
      <div class="main-photo">
        <div class="nav-button" @click="previous()">&#8249;</div>
        <img :src="currentPhotoUrl">
        <div class="nav-button" @click="next()">&#8250;</div>
      </div>
      <photo-list @photo-selected="onPhotoSelected" ref="photoList" :photos="photos"></photo-list>
    </section>
    <section class="no-photos" v-if="!hasPhotos">
      <button @click="openDialog()">Search photos</button>
    </section>
  </div>
</template>

<script>

import { ipcRenderer } from 'electron'; // eslint-disable-line
import PhotoList from './components/PhotoList.vue';

export default {
  name: 'app',

  components: {
    PhotoList,
  },

  data() {
    return {
      currentPhotoUrl: '',
      photos: [],
    };
  },

  computed: {
    hasPhotos() {
      return this.photos.length > 0;
    },
  },

  methods: {
    next() {
      this.$refs.photoList.next();
    },

    previous() {
      this.$refs.photoList.previous();
    },

    onPhotoSelected(url) {
      this.currentPhotoUrl = url;
    },

    openDialog() {
      const response = ipcRenderer.sendSync('select-folder');
      if (response.length > 0) {
        this.photos = response;
      }
    },
  },
};
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
.no-photos {
  /* background-color: #E6E6E6; */
  margin-top: 250px;
}

.no-photos button {
  text-decoration: none;
  color: #fff;
  background-color: #26a69a;
  text-align: center;
  letter-spacing: .5px;
  font-size: 14px;
  outline: 0;
  border: none;
  border-radius: 2px;
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  text-transform: uppercase;
}

ul {
  padding: 0.5em;
  /* display: inline-flex; */
}

li {
  padding: 0.5em;
  width: 5em;
  display: inline-block;
}

li img {
  height: 60px;
}

li.deleted img {
  box-sizing: border-box;
  border: 2px solid #F00;
}

li.selected {
  background-color: #A3A3A3;
}

.container {
  display: flex;
  flex-direction: center;
  justify-content: center;
}

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
