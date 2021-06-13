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
      <v-alert
        :value="alertNewOrder"
        icon="fas fa-check-circle"
        transition="scale-transition"
        class="mt-2"
        type="success"
      >
        Se añadió a las órdenes pendientes
      </v-alert>
      <v-alert
        :value="alertEmptyNewOrder"
        icon="fas fa-exclamation-circle"
        transition="scale-transition"
        class="mt-2"
        type="error"
      >
        Debes seleccionar el mesero a cargo y la mesa.
      </v-alert>
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

                  <!-- Abrir el diálogo de pago -->
                  <v-btn icon color="black" @click="openPaymentDialog(order)">
                    <v-icon size="21">fas fa-money-bill-alt</v-icon>
                  </v-btn>
                  <!-- Abrir el diálogo de pago -->
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
                    <v-list-item-content>Cuenta:</v-list-item-content>
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
                  <v-btn icon color="black" @click="openCDeleteDialog(order)">
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

      <!-- Diseño diálogo de pago -->
      <v-dialog
        v-model="pDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary" class="toolbar-title">
            <v-btn icon dark9 @click="pDialog = false">
              <v-icon>fas fa-times</v-icon>
            </v-btn>

            <v-toolbar-title>
              <h3>Pago de cuenta</h3>
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-container>
            <v-row>
              <!-- Tabla suborden -->
              <v-col cols="8">
                <v-card
                  height="100%"
                  color="#E5E5E5"
                  elevation="0"
                  class="pa-3"
                >
                  <v-toolbar dense color="primary" dark>
                    <v-toolbar-title class="toolbar-title">
                      Pedidos de la mesa {{ this.idTable }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>

                  <v-data-table
                    :headers="headers"
                    :items="subOrders"
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card>
              </v-col>
              <!-- Tabla suborden -->

              <!-- Ticket -->
              <v-col>
                <div class="container-ticket">
                  <div class="header-ticket">
                    <h2>Food And Code</h2>
                    Accesibilidad, proactividad y alimentación.
                    _________________________________________________
                  </div>
                  <div class="content-ticket">
                    TABLA con lo mismo de los pedidos
                  </div>
                  <div class="footer-ticket">
                    _________________________________________________
                    <br />
                    GRACIAS POR CONSUMIR CON NOSOTROS
                  </div>
                </div>
              </v-col>
              <!-- Ticket -->
            </v-row>
          </v-container>

          <!-- Subtotal y pago -->
          <v-container>
            <v-row no-gutters>
              <v-col cols="8">
                <v-card color="#F5F5F5" elevation="0" class="pa-3">
                  <v-card-text>
                    <v-row>
                      <h3>Subtotal:</h3>
                      <v-spacer></v-spacer>
                      <h3>${{ this.subtotal }}</h3>
                    </v-row>
                    <v-row>
                      <h2>Total (10% IVA):</h2>
                      <v-spacer></v-spacer>
                      <h2>${{ this.total }}</h2>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="4">
                <v-card color="third" elevation="0" class="pa-3" height="100%">
                  <v-btn
                    class="px-7 font-weight-black"
                    color="accent"
                    rounded
                    width="100%"
                    height="100%"
                  >
                    Imprimir ticket y pagar
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!-- Subtotal y pago -->
        </v-card>
      </v-dialog>
      <!-- Diseño diálogo de pago -->

      <v-dialog v-model="cDeleteDialog" max-width="300">
        <v-card>
          <v-card-title class="text-h5">
            ¿Estás seguro?
          </v-card-title>
          <v-card-text>
            Esta acción es irreversible.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="cancelDeleteOrder()">
              Cancelar
            </v-btn>
            <v-btn color="red darken-1" text @click="deleteOrder()">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    order: [],
    activeOrders: [],
    waitingOrders: [],
    employees: [],
    tables: [],
    newOrder: {
      mro_id: "",
      mes_id: "",
    },
    pDialog: false,
    cDeleteDialog: false,
    alertNewOrder: false,
    alertEmptyNewOrder: false,
    loader: null,
    loadingAddOrder: false,
    // PAYMENTS
    headers: [
      { text: "Comida", align: "center", value: "com_nombre" },
      { text: "Cantidad", align: "center", value: "cant_total_comida" },
      { text: "Total", align: "center", value: "total_neto" },
    ],
    subOrders: [],
    subtotal: "",
    total: "",
    idTable: "",
    newPayment: {
      pag_ord_id: "",
      pag_subtotal: "",
      pag_total: "",
      pag_propina: "",
      pag_tipo_pago: "",
    },
  }),

  watch: {
    // ORDERS
    alertNewOrder(value) {
      if (!value) return;

      setTimeout(() => (this.alertNewOrder = false), 3000);
    },

    alertEmptyNewOrder(value) {
      if (!value) return;

      setTimeout(() => (this.alertEmptyNewOrder = false), 3000);
    },

    cDeleteDialog(isOpen) {
      if (!isOpen) this.order = [];
    },

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

      if (
        typeof this.newOrder.mro_id !== "undefined" &&
        typeof this.newOrder.mes_id !== "undefined"
      ) {
        await this.axios.post("order/addOrder/", this.newOrder);
        this.alertNewOrder = true;
        this.cancelAddOrder();
      } else this.alertEmptyNewOrder = true;

      this.tables = [];
      this.getWaitingOrders();
      this.getActiveOrders();
      this.getActiveTables();
      this.loader = null;
      this.loadingAddOrder = false;
    },

    async deleteOrder() {
      await this.axios.post("order/deleteOrder/", this.order);

      this.tables = [];
      this.getWaitingOrders();
      this.getActiveOrders();
      this.getActiveTables();
      this.cancelDeleteOrder();
      this.cancelAddOrder();
    },

    cancelAddOrder() {
      this.newOrder = {};
    },

    cancelDeleteOrder() {
      this.order = [];
      this.cDeleteDialog = false;
    },

    openCDeleteDialog(order) {
      this.order = order;
      this.cDeleteDialog = true;
    },

    // PAYMENTS
    async showOrdersPerTable(idOrder) {
      const apiData = await this.axios.get(
        "/payment/showOrdersPerTable/" + idOrder.toString()
      );

      this.subOrders = apiData.data;
    },

    async showOrderTotal(idOrder) {
      const apiData = await this.axios.get(
        "/payment/orderTotal/" + idOrder.toString()
      );
      this.subtotal = apiData.data[0].total_orden;
    },

    async showOrderTotalIVA(idOrder) {
      const apiData = await this.axios.get(
        "/payment/orderTotalIVA/" + idOrder.toString()
      );
      this.total = apiData.data[0].total_orden;
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
      this.showOrderTotal(order.ord_id);
      this.showOrderTotalIVA(order.ord_id);
      this.idTable = order.mes_id;
      this.pDialog = true;
    },
  },

  components: {},
};
</script>
