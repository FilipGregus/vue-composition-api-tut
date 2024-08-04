<template>
  <main class="flex min-h-screen bg-purple-500 lg:bg-gradient-to-r from-red-400 to-pink-400">
    <transition-group
        name="list"
        tag="div"
        class="sm:flex items-start w-screen px-4 py-10 overflow-x-auto"
    >
      <div
          id="overlay"
          class="bg-black bg-opacity-70 fixed top-0 left-0 w-full h-screen z-10"
          key="-1"
          v-if="overlay"
      ></div>
      <List
          v-for="list in lists"
          :id="list.id"
          :title="list.title"
          :cards="list.cards"
          :key="list.id"/>
      <ListCreateForm @create-list="addNewList($event,lists)" key="0"/>
    </transition-group>
  </main>
</template>

<script>
//imports
import {ref, onMounted, watch} from 'vue'
import {data} from '@/data.js'

//functions
import {addNerCard, editCardText,deleteCard} from '@/cards.js'
import {addNewList, editListTitle} from '@/lists.js'

import List from '@/components/List.vue'  // @ is an alias to /src
import ListCreateForm from '@/components/ListCreateForm.vue'

import { MainStore } from '@/store.js';

export default {
  components: {
    List,
    ListCreateForm,
  },

  setup() {

    const lists = ref(data)
    const overlay = ref(false)

    const store = MainStore();

    //events
    onMounted(() => {
      window.eventBus.on('add-card', (newCard) => {
        addNerCard(newCard, lists.value)
      })

      window.eventBus.on('edit-list', (editedList) => {
        editListTitle(editedList, lists.value)
      })

      // window.eventBus.on('toggle-overlay', (value) => {
      //   overlay.value = value
      // })

      watch(() => store.overlay, (value) => {
        overlay.value = value
        console.log('overlay', overlay.value)
      })

      window.eventBus.on('delete-card', (card) => {
        deleteCard(card, lists.value)
      })

      window.eventBus.on('edit-card-text', (card) => {
        editCardText(card, lists.value)
      })
    })


    return {
      lists,
      addNewList,
      overlay
    }
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.15s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.75);
}

#overlay{
  transform: scale(1);
}
</style>