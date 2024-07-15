<template>
  <section class="list">
    <header>
      <h3 class="p-1 font-bold leading-none text-gray-900">{{title}}</h3>
    </header>

    <transition-group name="card" tag="ul">
      <Card v-for="card in cards" :card='card' :key="card.id" />
    </transition-group>

    <CardCreateFrom :listId="id"/>
  </section>


</template>

<script>
import Card from './Card.vue'
import CardCreateFrom from "@/components/CardCreateFrom.vue";

export default {
  components: {
    Card,
    CardCreateFrom,
  },

  props: {
    title: {
      type: String,
    },
    id: {
      type: Number,
    },
    cards: {
      type: Array,
    }
  },

  setup() {

  }
}
</script>

<style scoped>
  .card-enter-active,
  .card-leave-active {
    transition: all 0.15s;
  }

  .card-enter-from,
  .card-leave-to {
    opacity: 0;
    transform: scale(0.75);
  }
</style>
