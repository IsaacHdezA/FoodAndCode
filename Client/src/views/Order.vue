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
                  label="Mesa"
                >
                </v-select>
              </v-col>
              <v-col cols="1">
                <v-btn color="accent" @click="addOrder()">
                  Agregar
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

    /* valid: false,
    com_nombre: "",
    com_precio: "",
    reglas_precio: [
      (v) =>
        /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(v) ||
        "Cantidad incorrecta",
    ],
    com_cat_id: "",
    categorias: ["Programming", "Design", "Vue", "Vuetify"],
    com_descripcion: "",

    search: "",
    encabezados: [
      { text: "Categoria", value: "com_cat_id" },
      { text: "Nombre", value: "com_nombre" },
      { text: "Precio", value: "com_precio" },
      { text: "Descripción", value: "com_descripcion" },
      { text: "Acciones", value: "actions" },
    ],
    platillos: [],
    nuevo_platillo: [], */
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
      await this.axios.post("orders/addOrder/", this.newOrder);

      // actualizar a mesa no disponible

      this.getOrders();
      this.cancelAddOrder();
    },

    cancelAddOrder() {
      this.newOrder = {};
    },
  },

  components: {},
};
</script>
