<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon>fas fa-utensils </v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Food and Code</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>fas fa-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense shaped>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="{ name: item.to }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
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
        { title: "Mesas", icon: "fas fa-table", to: "Table" },
        { title: "Ordenes", icon: "fas fa-align-left", to: "Order" },
        { title: "Comida", icon: "fas fa-utensils", to: "Food" },
        { title: "Empleados", icon: "fas fa-user", to: "Employee" },
      ],
      mini: true,
    };
  },
};
</script>
