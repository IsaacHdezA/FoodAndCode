<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      width="80"
      color="primary"
      permanent
      app
    >
      <v-list-item link :to="{ name: 'About' }" class="px-2">
        <v-spacer></v-spacer>
        <v-list-item-icon class="list-item-icon-top">
          <v-icon size="30">fas fa-code </v-icon>
        </v-list-item-icon>
        <v-spacer></v-spacer>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="{ name: item.to }"
          class="list-item"
        >
          <v-spacer></v-spacer>
          <v-list-item-icon class="list-item-icon">
            <v-icon size="30">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-spacer></v-spacer>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Mesas", icon: "fas fa-th", to: "Table" },
        { title: "Ordenes", icon: "fas fa-list-alt", to: "Order" },
        { title: "Comida", icon: "fas fa-utensils", to: "Food" },
        { title: "Empleados", icon: "fas fa-users", to: "Employee" },
        { title: "Estadísticas", icon: "fas fa-signal", to: "Statistic" },
      ],
      mini: true,
    };
  },
};
</script>
