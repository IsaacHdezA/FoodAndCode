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
                  flat
                  solo-inverted
                  hide-details
                  :items="employees"
                  v-model="newOrder.mro_id"
                  label="Mesero a cargo"
                >
                </v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  flat
                  solo-inverted
                  hide-details
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
                      <v-icon size="18">fas fa-sync-alt</v-icon>
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
      <v-data-iterator
        :items="orders"
        :sort-by="sortBy.toLowerCase()"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar dark color="primary" class="mb-1 container-inside">
            <template>
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
            </template>
          </v-toolbar>
        </template>
        <template>
          <v-row>
            <v-col
              v-for="order in orders"
              :key="order.ord_id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  Mesa {{ order.mes_id }}
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense class="container-inside">
                  <v-list-item>
                    <v-list-item-content>Mesero a cargo:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ order.mro_nombre }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Fecha y hora:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ order.ord_fecha_hora }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Estado:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      Activa
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Precio:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      ${{ order.ord_precio }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
      <v-btn @click="pDialog = true">open dialog</v-btn>
      <v-dialog v-model="pDialog" max-width="500px">
        <PaymentDialog />
      </v-dialog>
    </template>
  </v-container>
</template>

<style lang="css">
@import "../styles/app.css";
</style>

<script>
import PaymentDialog from "@/components/PaymentDialog";

export default {
  name: "Order",

  data: () => ({
    filter: {},
    sortBy: "name",
    keys: ["Name", "Calories", "Fat"],

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
    this.getActiveEmployees();
    this.getActiveTables();
    this.cancelAddOrder();
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.orders.length / this.itemsPerPage);
    },

    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },

  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },

    async getOrders() {
      const apiData = await this.axios.get("order/allOrders/");

      this.orders = apiData.data;
    },

    async getActiveEmployees() {
      const apiData = await this.axios.get("order/allActiveEmployees/");
      apiData.data.forEach((employee) =>
        this.employees.push({
          text: employee.mro_nombre,
          value: employee.mro_id,
        })
      );
    },

    async getActiveTables() {
      const apiData = await this.axios.get("order/allActiveTables/");
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
      await this.axios.post("order/addOrder/", this.newOrder);

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

  components: {
    PaymentDialog,
  },
};
</script>
