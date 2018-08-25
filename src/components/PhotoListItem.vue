<template>
  <li :class="{selected:item.selected}"><img :src="item.path"></li>
</template>

<script>

export default {
  props: ['item']
}

</script>
