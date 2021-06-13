<template>
  <v-container>
    <h1>Estadísticas</h1>
    <br />
    <v-container>
      <div class="container-grid">
        <div class="block container-earned-today">
          <v-container>
            <v-row>
              <h1>Hoy</h1>
            </v-row>
          </v-container>
        </div>
        <div class="block container-profits">
          <v-container>
            <v-row>
              <h1>Ganancias</h1>
            </v-row>
          </v-container>
        </div>
        <div class="block container-orders-date">
          <v-container>
            <v-row>
              <h1>Órdenes por fecha</h1>
            </v-row>
          </v-container>
        </div>
        <div class="block container-sales-date">
          <v-container>
            <v-row>
              <h1>Ventas por fecha</h1>
            </v-row>
          </v-container>
        </div>
        <div class="block container-orders-table">
          <v-container>
            <v-row>
              <h1>Órdenes por mesa</h1>
            </v-row>
          </v-container>
        </div>
        <div class="block container-orders-employee">
          <v-container>
            <v-row>
              <h1>Órdenes por mesero</h1>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-container>
  </v-container>
</template>

<style lang="css">
@import "../styles/app.css";
</style>

<script>
export default {
  name: "Statistic",

  data: () => ({}),

  created() {},

  methods: {},

  components: {},
};
</script>
