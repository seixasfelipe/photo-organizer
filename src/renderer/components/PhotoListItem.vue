<template>
  <li :class="{deleted:isDeleted, selected:isSelected}">
    <img :src="resolveUrl(item.id, 120, 90)">
  </li>
</template>

<script>

export default {
  props: ['item', 'resolveUrl'],

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
