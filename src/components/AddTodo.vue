<template>
  <div>
      <form @submit="onSubmit">
          <input type="text" v-model="title" placeholder="Add Todo">
          <input type="submit" value="Submit">
      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "AddTodo",
    data(){
        return {
            title: ""
        }
    },
    methods: {
        ...mapActions(['addNewTodo']),
        onSubmit(e){
            e.preventDefault()
            const newTodo = {
                id: Math.random(),
                title: this.title,
                completed: false
            }
            this.addNewTodo(newTodo);
            this.title = ""
        }
    }
}
</script>

<style>

</style>