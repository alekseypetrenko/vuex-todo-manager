import Axios from "axios";

const state = {
    todos: []
}

const actions = {
    async fetchAllTodos({commit}){
        const response = await Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
        commit('setTodos', response.data);
    },

    async addNewTodo({commit}, {title, completed, id}){
        const response = await Axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed, id});
        commit('newTodo', response.data)
    },

    async deleteTodo({commit}, id){
        await Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit('removeTodo', id)
    },

    async filterTodos({commit}, e){
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        const response = await Axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        commit('setTodos', response.data)
    },

    async updateTodo({commit}, updatedTodo){
        const response = await Axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);
        console.log(response.data);
        commit('updateTodo', response.data)
    }

};

const mutations = {
    setTodos: (state, todos) => state.todos = todos,
    newTodo: (state, todo) => state.todos = [...state.todos, todo],
    removeTodo: (state, id) => state.todos = state.todos.filter(el => el.id !== id),
    updateTodo: (state, updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id);
        if(index !== -1) {
            state.todos.splice(index, 1, updTodo)
        }
        console.log(updTodo);
    }
};

const getters = {
    allTodos: state => state.todos
};

export default {
    state,
    actions,
    mutations,
    getters
}