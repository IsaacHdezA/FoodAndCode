<template>
  <v-container>
    <h1>Órdenes</h1>
    <br />
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar flat dense color="primary" dark>
          <v-toolbar-title>Agregar orden</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="container-inside">
          <template>
            <v-row justify="center" align="center" align-content="center">
              <v-col cols="6">
                <v-select
                  :items="employees"
                  v-model="newOrder.mro_id"
                  label="Mesero a cargo"
                >
                </v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="tables"
                  v-model="newOrder.mes_id"
                  label="Mesas disponibles"
                >
                </v-select>
              </v-col>
              <v-col cols="1">
                <v-btn
                  class="ma-2"
                  :loading="loadingAddOrder"
                  :disabled="loadingAddOrder"
                  color="accent"
                  @click="addOrder()"
                >
                  Agregar
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>fas fa-sync-alt</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-card-text>
      </v-card>
    </template>
    <br />
    <template>
      <v-card> </v-card>
    </template>
  </v-container>
</template>

<style lang="css">
@import "../styles/app.css";
</style>

<script>
export default {
  name: "Order",

  data: () => ({
    orders: [],
    employees: [],
    tables: [],
    newOrder: {
      mro_id: "",
      mes_id: "",
    },
    pDialog: false,
    tDialog: false,
    loader: null,
    loadingAddOrder: false,
  }),

  watch: {
    /* nlDialog(isOpen) {
      !isOpen ? (this.newLoan = {}) : this.getUsers();
    },

    nldDialog(isOpen) {
      !isOpen ? (this.lDetails = {}) : this.getBooks();
    }, */
  },

  created() {
    this.getOrders();
    this.getEmployees();
    this.getTables();
    this.cancelAddOrder();
  },

  methods: {
    async getOrders() {
      const apiData = await this.axios.get("orders/allOrders/");

      this.orders = apiData.data;
    },

    async getEmployees() {
      const apiData = await this.axios.get("orders/allEmployees/");
      apiData.data.forEach((employee) =>
        this.employees.push({
          text: employee.mro_nombre,
          value: employee.mro_id,
        })
      );
    },

    async getTables() {
      const apiData = await this.axios.get("orders/allTables/");
      apiData.data.forEach((table) =>
        this.tables.push({
          text: table.mes_id,
          value: table.mes_id,
        })
      );
    },

    async addOrder() {
      this.loader = "loadingAddOrder";
      this.loadingAddOrder = true;
      await this.axios.post("orders/addOrder/", this.newOrder);

      // actualizar a mesa no disponible

      this.getOrders();
      this.cancelAddOrder();
      this.loader = null;
      this.loadingAddOrder = false;
    },

    cancelAddOrder() {
      this.newOrder = {};
    },
  },

  components: {},
};
</script>
