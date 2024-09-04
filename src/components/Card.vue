<template>
  <li @contextmenu.prevent="doPop" class="card relative" :class="{'z-20':state.isPopped}">
    <CardImage :image="props.card.image"/>

    <div class="p-3">
      <CardLabels :labels="props.card.labels"/>
      <p ref="cardText"
         @keydown.enter="saveText"
         @keydown.esc="stopEditing"
         :contenteditable="state.isEditing"
         :class="{'shadow-outline': state.isEditing}"
         class="outline-none"
      >
        {{ props.card.text }}
      </p>

      <CardTags :tags="props.card.tags"/>
    </div>
    <transition name="pop">
      <CardPopup v-if="state.isPopped" :card="props.card" :listId="props.listId" @close-popup="undoPop"
                 @start-edit="startEditing"/>
    </transition>
  </li>

</template>

<script setup>
import CardTags from "@/components/CardTags.vue";
import CardPopup from "@/components/CardPopup.vue";
import CardImage from "@/components/CardImage.vue";
import CardLabels from "@/components/CardLabels.vue";

import {reactive, ref} from "vue";
import {MainStore} from '@/store.js';

const props = defineProps({card: Object, listId: String})


const cardText = ref(null)
const store = MainStore();
const state = reactive({
  isPopped: false,
  isEditing: false,
  lastText: ''
})

const doPop = () => {
  state.isPopped = true
  store.toggleOverlayTrue();
  // window.eventBus.emit('toggle-overlay', true)
}

const undoPop = () => {
  state.isPopped = false
  state.isEditing = false
  store.toggleOverlayFalse();
  // window.eventBus.emit('toggle-overlay', false)
}

const startEditing = () => {
  state.isEditing = true
  state.lastText = cardText.value.textContent
  setTimeout(() => {
    cardText.value.focus()
  }, 0)
}

const stopEditing = () => {
  state.isEditing = false
  cardText.value.textContent = state.lastText
  undoPop()
}

const saveText = () => {
  state.isEditing = false

  window.eventBus.emit('edit-card-text', {
    cardId: props.card.id,
    listId: props.listId,
    newText: cardText.value.textContent
  })
  undoPop()
}


</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.1s ease-in;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateX(-25%);
}
</style>