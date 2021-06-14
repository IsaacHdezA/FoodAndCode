<template>
  <v-container>
    <h1>Órdenes</h1>
    <br />
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar dark flat dense color="primary">
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
          <v-toolbar dark class="mb-2" color="primary">
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
                  <v-toolbar dark flat color="primary">
                    <v-toolbar-title> Mesa {{ order.mes_id }} </v-toolbar-title>
                  </v-toolbar>
                  <v-spacer></v-spacer>
                  <v-btn icon color="white" @click="openSubOrderDialog(order)">
                    <v-icon>fas fa-eye</v-icon>
                  </v-btn>

                  <v-btn icon color="white" @click="openPaymentDialog(order)">
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
                    <v-list-item-content>Cuenta:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      ${{ parseFloat(order.ord_precio).toFixed(2) }}
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
                  <v-toolbar flat color="secondary">
                    <v-toolbar-title> Mesa {{ order.mes_id }} </v-toolbar-title>
                  </v-toolbar>
                  <v-spacer></v-spacer>
                  <v-btn icon color="black" @click="openSubOrderDialog(order)">
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

      <v-dialog
        class="toolbar-subtitle"
        v-model="subOrdersDialog"
        max-width="1000"
      >
        <v-card>
          <v-toolbar dark class="toolbar-title" color="primary">
            <v-toolbar-title> Mesa {{ this.order.mes_id }} </v-toolbar-title>
          </v-toolbar>
          <v-data-table
            class="container-inside"
            :headers="headersSubOrdersDialog"
            :items="subOrdersForDialog"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="eliminarSuborden(item)" small>
                fas fa-trash
              </v-icon>
            </template>
          </v-data-table>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="cancelarSuborders()">
              Cerrar
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="newSubOrderDialog = true"
            >
              Agregar Suborden
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        class="toolbar-subtitle"
        v-model="newSubOrderDialog"
        max-width="500"
      >
        <v-card>
          <v-toolbar dark class="toolbar-title" color="primary">
            <v-toolbar-title> Nuevo pedido </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-select
                    :items="asientosTotales"
                    label="Asiento"
                    v-model="newSubOrder.sub_asiento"
                  >
                  </v-select>
                </v-col>
                <v-col>
                  <v-select
                    :items="comidas"
                    label="Comida"
                    v-model="newSubOrder.sub_com_id"
                  >
                  </v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="newSubOrder.sub_cant"
                    label="Cantidad"
                    type="Number"
                    min="1"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="cancelarAddSub()">
              Cancelar
            </v-btn>
            <v-btn color="green darken-1" text @click="agregar_suborden()">
              Agregar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- PAYMENT -->
      <v-dialog
        v-model="pDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card class="container-content-payment">
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
              <v-col cols="8">
                <v-card
                  height="100%"
                  elevation="0"
                  class="pa-3"
                  style="background: transparent"
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
                    class="container-inside"
                  >
                  </v-data-table>
                  <v-container class="pt-3">
                    <v-row no-gutters>
                      <v-col cols="8">
                        <v-card color="#F5F5F5" elevation="0" class="pa-3">
                          <v-card-text class="container-inside">
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
                        <v-card
                          color="#F5F5F5"
                          elevation="0"
                          class="pa-3"
                          height="100%"
                        >
                          <v-btn
                            class="px-7 font-weight-black"
                            color="accent"
                            rounded
                            width="100%"
                            height="100%"
                            @click="openCPaymentDialog()"
                          >
                            Pagar e imprimir ticket
                          </v-btn>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
              <v-col>
                <div class="container-ticket" id="ticket">
                  <div class="header-ticket">
                    <v-icon size="40" color="black">fas fa-code</v-icon>
                    <h2>Food And Code</h2>
                    Accesibilidad, proactividad y alimentación.<br />
                    ------------------------------------------------- <br />
                    Atendido por: {{ this.employeeName }}
                  </div>
                  <div class="content-ticket">
                    <v-row>
                      <v-col>Cantidad</v-col>
                      <v-col>Item</v-col>
                      <v-col>Total</v-col>
                    </v-row>
                    <v-row
                      v-for="(suborder, index) in subOrders"
                      v-bind:key="index"
                    >
                      <v-col>{{ suborder.cant_total_comida }}</v-col>
                      <v-col>{{ suborder.com_nombre }}</v-col>
                      <v-col
                        >${{
                          parseFloat(suborder.total_neto).toFixed(2)
                        }}</v-col
                      >
                    </v-row>
                  </div>
                  <div class="footer-ticket">
                    -------------------------------------------------
                    <v-row>
                      <v-col>SUBTOTAL</v-col>
                      <v-spacer></v-spacer>
                      <v-col>${{ this.subtotal }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>TOTAL</v-col>
                      <v-spacer></v-spacer>
                      <v-col>${{ this.total }}</v-col>
                    </v-row>
                    <br />
                    GRACIAS POR CONSUMIR CON NOSOTROS
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="cPaymentDialog" max-width="300">
        <v-card>
          <v-card-title class="text-h5">
            Confirmar pago
          </v-card-title>
          <v-card-text>
            Selecciona un método de pago
          </v-card-text>
          <v-form>
            <v-text-field
              v-model="newPayment.pag_propina"
              :rule="propinaRules"
              label="Propina"
              placeholder="¿Hubo propina?"
              filled
              dense
              class="pl-3 pr-3"
              required
            ></v-text-field>
            <v-select
              v-model="newPayment.pag_tipo_pago"
              flat
              solo-inverted
              hide-details
              :items="paymentMethods"
              label="Método de pago"
              class="pl-3 pr-3 pb-3"
            >
            </v-select>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="cancelPayment()">
              Cancelar
            </v-btn>
            <v-btn color="success" text @click="confirmPayment()">
              Confirmar
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

    cDeleteDialog: false,
    alertNewOrder: false,
    alertEmptyNewOrder: false,
    loader: null,
    loadingAddOrder: false,

    // SUBORDERS
    headersSubOrdersDialog: [
      { text: "Asiento", value: "sub_asiento" },
      { text: "Comida", value: "com_nombre" },
      { text: "Cantidad", value: "sub_cant" },
      { text: "Costo", value: "sub_precio" },
      { text: "Acciones", value: "actions" },
    ],

    newSubOrder: {
      sub_ord_id: "",
      sub_com_id: "",
      sub_asiento: "",
      sub_cant: "",
    },
    comidas: [],
    asientosTotales: [],
    subOrdersForDialog: [],

    subOrdersDialog: false,
    newSubOrderDialog: false,

    // PAYMENTS
    headers: [
      { text: "Comida", align: "center", value: "com_nombre" },
      { text: "Cantidad", align: "center", value: "cant_total_comida" },
      { text: "Total", align: "center", value: "total_neto" },
    ],

    paymentMethods: [{ text: "Efectivo" }, { text: "Tarjeta" }],
    propinaRules: [
      (v) =>
        /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(v) ||
        "Introduce un número",
    ],

    pDialog: false,
    cPaymentDialog: false,
    subOrders: [],
    subtotal: "",
    total: "",
    idTable: "",
    idOrder: "",
    employeeName: "",
    newPayment: {
      pag_ord_id: "",
      pag_subtotal: "",
      pag_total: "",
      pag_propina: 0,
      pag_tipo_pago: "Efectivo",
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

    // SUBORDERS

    async getSuborders(mes_id, ord_id) {
      this.subOrdersDialog = true;
      const apiData = await this.axios.get(
        "table/allSuborders/" + mes_id.toString() + "/" + ord_id.toString()
      );

      if (mes_id === 1 || mes_id === 6 || mes_id === 11)
        this.asientosTotales = [1, 2, 3, 4, 5, 6, 7, 8];
      else this.asientosTotales = [1, 2, 3, 4];

      this.subOrdersForDialog = apiData.data;
    },

    async readFood() {
      const apiData = await this.axios.get("/food/all_foods");

      apiData.data.forEach((comida) =>
        this.comidas.push({
          text: comida.com_nombre,
          value: comida.com_id,
        })
      );
    },

    openSubOrderDialog(order) {
      this.order = order;
      this.subOrdersDialog = true;
      this.readFood();
      this.getSuborders(order.mes_id, order.ord_id);
    },

    cancelarAddSub() {
      this.getActiveOrders();
      this.getWaitingOrders();
      this.newSubOrderDialog = false;
    },

    cancelarSuborders() {
      this.newSubOrder = {
        sub_ord_id: "",
        sub_com_id: "",
        sub_asiento: "",
        sub_cant: "",
      };
      this.getActiveOrders();
      this.getWaitingOrders();
      this.subOrdersDialog = false;
    },

    async agregar_suborden() {
      this.newSubOrder.sub_ord_id = this.order.ord_id;
      await this.axios.post("table/addSuborder/", this.newSubOrder);
      this.getSuborders(this.order.mes_id, this.order.ord_id);
      this.newSubOrder = {
        sub_ord_id: "",
        sub_com_id: "",
        sub_asiento: "",
        sub_cant: "",
      };
      this.newSubOrderDialog = false;
    },

    async eliminarSuborden(item) {
      const data = {
        sub_id: item.sub_id,
      };
      await this.axios.post("table/deleteSuborder", data);
      this.getSuborders(this.order.mes_id, this.order.ord_id);
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
      this.idOrder = idOrder;
      this.subtotal = parseFloat(apiData.data[0].total_orden).toFixed(2);
    },

    async showOrderTotalIVA(idOrder) {
      const apiData = await this.axios.get(
        "/payment/orderTotalIVA/" + idOrder.toString()
      );
      this.idOrder = idOrder;
      this.total = parseFloat(apiData.data[0].total_orden).toFixed(2);
    },

    async insertPayment() {
      this.newPayment.pag_ord_id = this.idOrder;
      this.newPayment.pag_subtotal = this.subtotal;
      this.newPayment.pag_total = this.total;

      await this.axios.post("/payment/insertPayment", this.newPayment);

      this.newPayment = {
        pag_ord_id: "",
        pag_subtotal: "",
        pag_total: "",
        pag_propina: 0,
        pag_tipo_pago: "Efectivo",
      };
    },

    cancelPayment() {
      this.pDialog = false;
    },

    openPaymentDialog(order) {
      this.showOrdersPerTable(order.ord_id);
      this.showOrderTotal(order.ord_id);
      this.showOrderTotalIVA(order.ord_id);
      this.idTable = order.mes_id;
      this.employeeName = order.mro_nombre;
      this.pDialog = true;
    },

    printPageArea() {
      var printContent = document.getElementById("ticket");
      var WinPrint = window.open("", "", "width=900,height=650");
      WinPrint.document.write(printContent.innerHTML);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },

    openCPaymentDialog() {
      this.cPaymentDialog = true;
    },

    cancelPayment() {
      this.cPaymentDialog = false;
    },

    confirmPayment() {
      this.printPageArea();
      this.insertPayment();
      this.cPaymentDialog = false;
      this.pDialog = false;
      this.getWaitingOrders();
      this.getActiveOrders();
      this.getActiveTables();
    },
  },

  components: {},
};
</script>
