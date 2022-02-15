<template>
  <div>
    <input v-model="name" placeholder="Name" />
    <b-button variant="primary" @click="addUser">Add</b-button>
  </div>
</template>

<script>
export default {
  name: "AddUser",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    addUser() {
      this.$store.dispatch("addUser", { name: this.name });
      this.name = "";
    },
  },
};
</script>