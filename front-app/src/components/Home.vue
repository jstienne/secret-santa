<template>
  <div>
    <div v-if="!isUsersSaved">
      <ListUser />
      <AddUser />
      <b-button v-if="users.length" variant="primary" @click="saveUsers"
        >Save users</b-button
      >
    </div>
    <div v-if="isUsersSaved && !items.length">
      <div>TODO : Add multiselect blacklist</div>
      <b-button variant="primary" @click="getGiftTransfers"
        >Draw</b-button
      >
    </div>
    <div v-if="items.length">
      <b-table striped hover :items="items"></b-table>
      <b-button variant="primary" @click="reset"
        >Reset</b-button
      >
    </div>
  </div>
</template>

<script>
import ListUser from "./ListUser";
import AddUser from "./AddUser";
import Vuex from "vuex";

export default {
  name: "Home",
  components: {
    ListUser,
    AddUser,
  },
  computed: {
    ...Vuex.mapGetters({ users: "users", isUsersSaved: "isUsersSaved" }),
    items() {
      return this.$store.getters.giftTransfers.map((giftTransfers) => ({
        supplier: giftTransfers.supplier.name,
        receiver: giftTransfers.receiver.name,
      }));
    },
  },
  methods: {
    saveUsers() {
      this.$store.dispatch("saveUsers", {});
    },
    getGiftTransfers() {
      this.$store.dispatch("getGiftTransfers", {});
    },
    reset() {
      this.$store.dispatch("reset", {});
    },
  },
};
</script>