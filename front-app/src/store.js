import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    users: [],
    isUsersSaved: false,
    giftTransfers: []
};

const getters = {
    users: state => state.users,
    isUsersSaved: state => state.isUsersSaved,
    giftTransfers: state => state.giftTransfers
};

const mutations = {
    ADD_USER: (state, user) => {
        state.users.push(user);
    },
    DELETE_USER: (state, user) => {
        state.users = state.users.filter(stateUser => stateUser.name !== user.name);
    },
    SET_IS_USERS_SAVED: (state, isUsersSaved) => {
        state.isUsersSaved = isUsersSaved;
    },
    SET_GIFT_TRANSFERS: (state, giftTransfers) => {
        state.giftTransfers = giftTransfers;
    },
    RESET: () => {
        state.users = [];
        state.isUsersSaved = false;
        state.giftTransfers = [];
    }
};

const actions = {
    addUser: (store, user) => {
        store.commit('ADD_USER', user)
    },
    deleteUser: (store, user) => {
        store.commit('DELETE_USER', user)
    },
    saveUsers: (store) => {
        fetch("http://localhost:3000/users",
            {
                method: "POST",
                body: JSON.stringify(store.state.users.map(user => user.name)),
                headers: { "Content-Type": "application/json" }
            })
            .then(() => store.commit('SET_IS_USERS_SAVED', true))
            .catch(err => console.log(err));
    },
    getGiftTransfers: (store) => {
        fetch("http://localhost:3000/gift-transfers",
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(res => store.commit('SET_GIFT_TRANSFERS', res))
    },
    reset: (store) => {
        store.commit('RESET')
    },
};

const store = new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
});

export default store;