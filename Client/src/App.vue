<template>
  <v-app>
    <NavigationDrawer />
    <v-content class="application">
      <router-view />
    </v-content>
  </v-app>
</template>

<style lang="css">
@import "./styles/app.css";
</style>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";

export default {
  name: "App",

  data() {
    return {};
  },

  components: {
    NavigationDrawer,
  },
};
</script>
