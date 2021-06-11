<template>
  <v-container>
    <h1>Órdenes</h1>
    <br />
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar flat dense color="primary">
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
      <v-data-iterator :items="activeOrders" hide-default-footer>
        <template v-slot:header>
          <v-toolbar class="mb-2" color="primary">
            <v-toolbar-title>Órdenes activas</v-toolbar-title>
          </v-toolbar>
        </template>
        <template>
          <v-row>
            <v-col
              v-for="(order, index) in activeOrders"
              v-bind:key="index"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <v-card dense color="primary">
                <v-card-title class="subheading font-weight-bold">
                  Mesa {{ order.mes_id }}
                  <v-spacer></v-spacer>
                  <v-btn icon color="black">
                    <v-icon>fas fa-eye</v-icon>
                  </v-btn>
                  <v-btn icon color="black" @click="openPaymentDialog(order)">
                    <v-icon size="21">fas fa-money-bill-alt</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense class="container-inside" color="grey lighten-4">
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
      <br />
      <v-data-iterator :items="waitingOrders" hide-default-footer>
        <template v-slot:header>
          <v-toolbar class="mb-2" color="secondary">
            <v-toolbar-title>Órdenes pendientes</v-toolbar-title>
          </v-toolbar>
        </template>
        <template>
          <v-row>
            <v-col
              v-for="(order, index) in waitingOrders"
              v-bind:key="index"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <v-card dense color="secondary">
                <v-card-title class="subheading font-weight-bold">
                  Mesa {{ order.mes_id }}
                  <v-spacer></v-spacer>
                  <v-btn icon color="black">
                    <v-icon>fas fa-eye</v-icon>
                  </v-btn>
                  <v-btn icon color="black" @click="deleteOrder(order)">
                    <v-icon size="21">fas fa-trash</v-icon>
                  </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense class="container-inside" color="grey lighten-4">
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
                      Pendiente
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
      <v-row justify="center">
        <v-dialog
          v-model="pDialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="pDialog = false">
                <v-icon>fas fa-times</v-icon>
              </v-btn>

              <v-toolbar-title>
                <h2>Pago de cuenta</h2>
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <template>
              <v-data-table
                :headers="headers"
                :items="subOrders"
                class="elevation-1"
              >
              </v-data-table>
            </template>
          </v-card>
        </v-dialog>
      </v-row>
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
    // ORDERS
    activeOrders: [],
    waitingOrders: [],
    employees: [],
    tables: [],
    newOrder: {
      mro_id: "",
      mes_id: "",
    },
    pDialog: false,
    loader: null,
    loadingAddOrder: false,

    // PAYMENTS
    headers: [
      { text: "Comida", align: "center", value: "com_nombre" },
      { text: "Cantidad", align: "center", value: "cant_total_comida" },
      { text: "Total", align: "center", value: "total_neto" },
    ],
    subOrders: [],
    newPayment: {
      pag_ord_id: "",
      pag_subtotal: "",
      pag_total: "",
      pag_propina: "",
      pag_tipo_pago: "",
      pag_pag_fecha_pago: "",
    },
  }),

  watch: {
    // PAYMENTS
    pDialog(isOpen) {
      if (!isOpen) {
        this.newPayment = {};
        this.subOrders = [];
      }
    },
  },

  created() {
    // ORDERS
    this.cancelAddOrder();
    this.getActiveEmployees();
    this.getActiveTables();
    this.getActiveOrders();
    this.getWaitingOrders();
  },

  methods: {
    // ORDERS
    async getActiveOrders() {
      const apiData = await this.axios.get("order/allActiveOrders/");

      this.activeOrders = apiData.data;
    },

    async getWaitingOrders() {
      const apiData = await this.axios.get("order/allWaitingOrders/");

      this.waitingOrders = apiData.data;
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
      apiData.data.sort((a, b) => a - b);

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

      this.tables = [];
      this.getWaitingOrders();
      this.getActiveOrders();
      this.getActiveTables();
      this.cancelAddOrder();

      this.loader = null;
      this.loadingAddOrder = false;
    },

    async deleteOrder(order) {
      await this.axios.post("order/deleteOrder/", order);

      this.tables = [];
      this.getWaitingOrders();
      this.getActiveOrders();
      this.getActiveTables();
      this.cancelAddOrder();
    },

    cancelAddOrder() {
      this.newOrder = {};
    },

    // PAYMENTS
    async showOrdersPerTable(idOrder) {
      const apiData = await this.axios.get(
        "/payment/showOrdersPerTable/" + idOrder.toString()
      );

      this.subOrders = apiData.data;
    },

    async insertPayment(item) {
      const body = {
        pag_ord_id: item.pag_ord_id,
        pag_propina: item.pag_propina,
        pag_tipo_pago: item.pag_tipo_pago,
      };
      await this.axios.post("/payment/insertPayment", body);
    },

    cancelPayment() {
      this.pDialog = false;
    },

    openPaymentDialog(order) {
      this.showOrdersPerTable(order.ord_id);
      this.pDialog = true;
    },
  },

  components: {},
};
</script>
