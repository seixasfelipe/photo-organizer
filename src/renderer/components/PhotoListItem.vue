<template>
  <li :class="{deleted:isDeleted, selected:isSelected}">
    <img :src="item.src">
  </li>
</template>

<script>

export default {
  props: ['item'],

  computed: {
    isSelected() {
      return this.item.selected;
    },

    isDeleted() {
      return this.item.deleted;
    },
  },
};
</script>
