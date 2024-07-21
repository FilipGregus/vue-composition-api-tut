<template>
  <section class="list">
    <header>
      <h3
          ref="titleElement"
          @click="startEditing"

          @keydown.esc="stopEditing"
          @keydown.enter="saveTitle"
          :contenteditable="isEditing"
          :class="{'shadow-outline': isEditing}"
          class="p-1 font-bold leading-none text-gray-900 outline-none">{{ title }}</h3>
    </header>

    <transition-group name="card" tag="ul">
      <Card v-for="card in cards" :card='card' :listId="id" :key="card.id"/>
    </transition-group>

    <CardCreateFrom :listId="id"/>
  </section>


</template>

<script>
import Card from './Card.vue'
import CardCreateFrom from "@/components/CardCreateFrom.vue";

import {ref, toRefs, reactive} from 'vue'


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

  setup(props) {
    const titleElement = ref(null)

    const state = reactive({
      isEditing: false
    })

    const startEditing = () => {
      state.isEditing = true
      state.lastTitle = props.title
      setTimeout(() => {
        titleElement.value.focus()
      }, 0)

    }

    const stopEditing = () => {
      state.isEditing = false
      titleElement.value.textContent = props.title
    }

    const saveTitle = () => {
      state.isEditing = false

      window.eventBus.emit('edit-list', {id: props.id, title: titleElement.value.textContent})
    }

    return {
      ...toRefs(state),
      saveTitle,
      titleElement,
      startEditing,
      stopEditing
    }
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
