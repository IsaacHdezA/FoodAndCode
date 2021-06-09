<template>
  <v-app>
    <NavigationDrawer />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

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
