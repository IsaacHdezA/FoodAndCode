<template>
  <v-app>
    <NavigationDrawer />
    <v-main class="application">
      <router-view />
    </v-main>
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
