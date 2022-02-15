<template>
  <div>
    <div v-for="user in users" :key="user.name">
      {{ user.name }}
      <b-button @click="deleteUser(user)">Delete</b-button>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";
export default {
  name: "ListUser",
  computed: {
    ...Vuex.mapGetters({ users: "users" }),
  },
  methods: {
    deleteUser(user) {
      this.$store.dispatch("deleteUser", user);
    },
  },
};
</script>