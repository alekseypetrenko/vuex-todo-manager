import Axios from "axios";

const state = {
    isTimeClockEnabled: true,
    todos: []
};

const getters = {
    allTodos: state => state.todos   
};

const actions = {
    async fetchTodos({commit}){
        const response = await Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
        commit('setTodos', response.data)
    },

    async addTodo({commit}, title){
        const id = Math.random()
        const response = await Axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false, id});

        commit('newTodo', response.data)

    }

};


const mutations = {
    setTodos: (state, todos) => state.todos = todos,
    newTodo: (state, todo) =>  state.todos = [...state.todos, todo]
};

export default {
    state,
    getters,
    actions,
    mutations
}