<template>
  <v-container>
    <h1>Estadísticas</h1>
    <v-container>
      <div class="container-grid">
        <div class="block container-earned-today">
          <v-container>
            <v-row>
              <v-col>
                <h1>Hoy</h1>
                <h1 class="today subtitle-statistic">
                  ${{ this.todayProfit }}
                </h1>
                <h2 class="subtitle-statistic">ganado</h2>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div class="block container-profits">
          <v-container>
            <v-row>
              <v-col>
                <h1>Ganancias</h1>
                <br />
                <v-sheet
                  v-if="thereProfits"
                  color="third"
                  class="container-inside"
                >
                  <v-sparkline
                    :value="monthProfits"
                    :labels="months"
                    color="primary"
                    height="90"
                    padding="10"
                    stroke-linecap="round"
                    smooth
                    auto-draw
                  >
                  </v-sparkline>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div class="block container-orders-date">
          <v-container>
            <v-row>
              <v-col>
                <h1 class="medium-title">Órdenes por fecha</h1>
                <v-row
                  class="mt-1 container-inside"
                  justify="center"
                  align="center"
                  align-content="center"
                >
                  <v-col cols="10" class="container-inside">
                    <v-menu
                      v-model="menuOrdersDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="orderDate"
                          label="Fecha"
                          prepend-icon="fas fa-calendar-day"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          background-color="grey lighten-2"
                          flat
                          solo
                          hide-details
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="orderDate"
                        @input="menuOrdersDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-btn icon color="primary" @click="openOrdersDialog()">
                      <v-icon>fas fa-check</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-alert type="error" class="mt-1" :value="alertErrorOrdersPerDate">
            <v-row align="center" justify="center" align-content="center">
              <v-col class="grow">
                Debes seleccionar una fecha
              </v-col>
            </v-row>
          </v-alert>
        </div>
        <div class="block container-sales-date">
          <v-container>
            <v-row>
              <v-col>
                <h1 class="medium-title">Ventas por fecha</h1>
                <v-row
                  class="mt-1 container-inside"
                  justify="center"
                  align="center"
                  align-content="center"
                >
                  <v-col cols="10">
                    <v-menu
                      v-model="menuSalesDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="saleDate"
                          label="Fecha"
                          prepend-icon="fas fa-calendar-day"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          background-color="grey lighten-2"
                          flat
                          solo
                          hide-details
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="saleDate"
                        @input="menuSalesDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-btn icon color="primary" @click="getCountSalesPerDate()">
                      <v-icon>fas fa-check</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-alert type="info" class="mt-1" :value="alertCountSalesPerDate">
            <v-row align="center" justify="center" align-content="center">
              <v-col class="grow">
                El número de ventas de esa fecha fue de:
                <b>{{ this.countSalesPerDate }}</b>
              </v-col>
            </v-row>
          </v-alert>
          <v-alert
            type="error"
            class="mt-1"
            :value="alertErrorCountSalesPerDate"
          >
            <v-row align="center" justify="center" align-content="center">
              <v-col class="grow">
                Debes seleccionar una fecha
              </v-col>
            </v-row>
          </v-alert>
        </div>
        <div class="block container-orders-table">
          <v-container>
            <v-row>
              <v-col>
                <h1 class="large-title">Órdenes por mesero</h1>
                <v-row
                  class="mt-1 container-inside"
                  justify="center"
                  align="center"
                  align-content="center"
                >
                  <v-col cols="6">
                    <v-select
                      flat
                      solo-inverted
                      hide-details
                      :items="employees"
                      v-model="idEmployee"
                      label="Mesero"
                      background-color="grey lighten-2"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-menu
                      v-model="menuOrdersEmployeeDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="employeeDate"
                          label="Fecha"
                          prepend-inner-icon="fas fa-calendar-day"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          background-color="grey lighten-2"
                          flat
                          solo
                          hide-details
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="employeeDate"
                        @input="menuOrdersEmployeeDate = false"
                        color="primary"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      icon
                      color="primary"
                      @click="getCountOrdersPerEmployee()"
                    >
                      <v-icon>fas fa-check</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-alert
            type="info"
            class="mt-1"
            :value="alertCountOrdersPerEmployee"
          >
            <v-row align="center" justify="center" align-content="center">
              <v-col class="grow">
                El número de órdenes del mesero fue de:
                <b>{{ this.countOrdersPerEmployee }}</b>
              </v-col>
              <v-col v-if="this.countOrdersPerEmployee !== 0">
                <v-btn
                  color="primary"
                  depressed
                  @click="openOrdersEmployeeDialog()"
                >
                  Ver órdenes
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
          <v-alert
            type="error"
            class="mt-1"
            :value="alertErrorCountOrdersPerEmployee"
          >
            <v-row align="center" justify="center" align-content="center">
              <v-col class="grow">
                Debes seleccionar un mesero y una fecha
              </v-col>
            </v-row>
          </v-alert>
        </div>
        <div class="block container-orders-employee">
          <v-container>
            <v-row>
              <v-col>
                <h1 class="large-title">Órdenes por mesa</h1>
                <v-row
                  class="mt-1 container-inside"
                  justify="center"
                  align="center"
                  align-content="center"
                >
                  <v-col cols="4">
                    <v-select
                      flat
                      solo-inverted
                      hide-details
                      :items="tables"
                      v-model="idTable"
                      label="Mesa"
                      background-color="grey lighten-2"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      v-model="menuOrdersTableDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="tableDate"
                          label="Fecha"
                          prepend-inner-icon="fas fa-calendar-day"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          background-color="grey lighten-2"
                          flat
                          solo
                          hide-details
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="tableDate"
                        @input="menuOrdersTableDate = false"
                        color="primary"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      icon
                      color="primary"
                      @click="getCountOrdersPerTable()"
                    >
                      <v-icon>fas fa-check</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-alert type="info" class="mt-1" :value="alertCountOrdersPerTable">
            <v-row align="center" justify="center" align-content="center">
              <v-col class="grow">
                El número de órdenes de la mesa fue de:
                <b>{{ this.countOrdersPerTable }}</b>
              </v-col>
              <v-col v-if="this.countOrdersPerTable !== 0">
                <v-btn
                  color="primary"
                  depressed
                  @click="openOrdersTableDialog()"
                >
                  Ver órdenes
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
          <v-alert
            type="error"
            class="mt-1"
            :value="alertErrorCountOrdersPerTable"
          >
            <v-row align="center" justify="center" align-content="center">
              <v-col class="grow">
                Debes seleccionar una mesa y una fecha
              </v-col>
            </v-row>
          </v-alert>
        </div>
      </div>
    </v-container>
    <v-dialog class="toolbar-subtitle" v-model="oDialog" max-width="600">
      <v-card>
        <v-toolbar dark class="toolbar-title" color="primary">
          <v-toolbar-title>
            Ordenes de la fecha {{ this.orderDate }}
          </v-toolbar-title>
        </v-toolbar>
        <v-data-table
          :headers="headersOrdersDate"
          :items="ordersPerDate"
          :sort-by="['mes_id', 'mro_nombre', 'ord_estado']"
          :sort-desc="[false, true]"
          class="container-inside"
        ></v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="closeOrdersDialog()">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog class="toolbar-subtitle" v-model="otDialog" max-width="600">
      <v-card>
        <v-toolbar dark class="toolbar-title" color="primary">
          <v-toolbar-title>
            Ordenes de la mesa {{ this.idTable }}
          </v-toolbar-title>
        </v-toolbar>
        <v-data-table
          :headers="headersOrdersTable"
          :items="ordersPerTable"
          :sort-by="['mro_nombre', 'ord_fecha_hora', 'ord_estado']"
          :sort-desc="[false, true]"
          class="container-inside"
        ></v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="closeOrdersTableDialog()"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog class="toolbar-subtitle" v-model="oeDialog" max-width="600">
      <v-card>
        <v-toolbar dark class="toolbar-title" color="primary">
          <v-toolbar-title>
            Ordenes de
            {{
              typeof ordersPerEmployee[0] !== "undefined"
                ? ordersPerEmployee[0].mro_nombre
                : ""
            }}
          </v-toolbar-title>
        </v-toolbar>
        <v-data-table
          :headers="headersOrdersEmployee"
          :items="ordersPerEmployee"
          :sort-by="['mes_id', 'ord_fecha_hora', 'ord_estado']"
          :sort-desc="[false, true]"
          class="container-inside"
        ></v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="closeOrdersEmployeeDialog()"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style lang="css">
@import "../styles/app.css";
</style>

<script>
export default {
  name: "Statistic",

  data: () => ({
    headersOrdersDate: [
      { text: "Mesa", align: "center", value: "mes_id" },
      { text: "Mesero a cargo", align: "center", value: "mro_nombre" },
      { text: "Estado", align: "center", value: "ord_estado" },
    ],
    headersOrdersTable: [
      { text: "Mesero a cargo", align: "center", value: "mro_nombre" },
      { text: "Hora", align: "center", value: "ord_fecha_hora" },
      { text: "Estado", align: "center", value: "ord_estado" },
    ],
    headersOrdersEmployee: [
      { text: "Mesa", align: "center", value: "mes_id" },
      { text: "Hora", align: "center", value: "ord_fecha_hora" },
      { text: "Estado", align: "center", value: "ord_estado" },
      { text: "Propina", align: "center", value: "pag_propina" },
    ],
    months: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],

    monthProfits: [],
    tables: [],
    employees: [],
    ordersPerDate: [],
    ordersPerTable: [],
    ordersPerEmployee: [],

    todayProfit: "",
    salesPerDate: "",
    orderDate: "",
    saleDate: "",
    tableDate: "",
    employeeDate: "",
    idTable: "",
    idEmployee: "",
    countOrdersPerTable: "",
    countOrdersPerEmployee: "",
    countSalesPerDate: "",

    menuOrdersDate: false,
    menuSalesDate: false,
    menuOrdersTableDate: false,
    menuOrdersEmployeeDate: false,
    createSpark: false,
    thereProfits: false,
    oDialog: false,
    otDialog: false,
    oeDialog: false,
    alertErrorOrdersPerDate: false,
    alertCountOrdersPerTable: false,
    alertCountOrdersPerEmployee: false,
    alertCountSalesPerDate: false,
    alertErrorCountOrdersPerTable: false,
    alertErrorCountOrdersPerEmployee: false,
    alertErrorCountSalesPerDate: false,
  }),

  created() {
    this.getTodayProfit();
    this.getMonthProfits();
    this.getTables();
    this.getEmployees();
  },

  watch: {
    alertCountOrdersPerTable(value) {
      if (!value) return;

      setTimeout(() => (this.alertCountOrdersPerTable = false), 5000);
    },

    alertErrorCountOrdersPerTable(value) {
      if (!value) return;

      setTimeout(() => (this.alertErrorCountOrdersPerTable = false), 3000);
    },

    alertCountOrdersPerEmployee(value) {
      if (!value) return;

      setTimeout(() => (this.alertCountOrdersPerEmployee = false), 5000);
    },

    alertErrorCountOrdersPerEmployee(value) {
      if (!value) return;

      setTimeout(() => (this.alertErrorCountOrdersPerEmployee = false), 3000);
    },

    alertCountSalesPerDate(value) {
      if (!value) return;

      setTimeout(() => (this.alertCountSalesPerDate = false), 5000);
    },

    alertErrorCountSalesPerDate(value) {
      if (!value) return;

      setTimeout(() => (this.alertErrorCountSalesPerDate = false), 3000);
    },

    alertErrorOrdersPerDate(value) {
      if (!value) return;

      setTimeout(() => (this.alertErrorOrdersPerDate = false), 3000);
    },
  },

  methods: {
    async getTodayProfit() {
      let dateJS = new Date(),
        date =
          dateJS.getFullYear() +
          "-" +
          ("0" + (dateJS.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + dateJS.getDate()).slice(-2);
      const apiData = await this.axios.get(
        "statistic/todayProfit/" + date.toString()
      );

      this.todayProfit = apiData.data[0].pag_ganancia;
    },

    async getMonthProfits() {
      const apiData = await this.axios.get("statistic/monthProfits/");

      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < Object.keys(apiData.data).length; j++)
          if (i == parseInt(apiData.data[j]["pag_ganancia_mes"]) - 1)
            this.monthProfits[i] = parseFloat(apiData.data[j]["pag_ganancia"]);
        if (typeof this.monthProfits[i] === "undefined")
          this.monthProfits[i] = 0;
      }
      this.thereProfits = true;
    },

    async getAllOrdersPerDate() {
      const apiData = await this.axios.get(
        "statistic/allOrdersPerDate/" + this.orderDate.toString()
      );

      for (let i = 0; i < apiData.data.length; i++) {
        if (apiData.data[i].ord_estado == "a")
          apiData.data[i].ord_estado = "Activa";
        else if (apiData.data[i].ord_estado == "i")
          apiData.data[i].ord_estado = "Pagada";
        else apiData.data[i].ord_estado = "Pendiente";
      }

      this.ordersPerDate = apiData.data;
    },

    async getOrdersPerTable() {
      const apiData = await this.axios.get(
        "statistic/allOrdersPerTable/" +
          this.idTable.toString() +
          "/" +
          this.tableDate.toString()
      );

      for (let i = 0; i < apiData.data.length; i++) {
        if (apiData.data[i].ord_estado == "a")
          apiData.data[i].ord_estado = "Activa";
        else if (apiData.data[i].ord_estado == "i")
          apiData.data[i].ord_estado = "Pagada";
        else apiData.data[i].ord_estado = "Pendiente";
      }

      this.ordersPerTable = apiData.data;
    },

    async getOrdersPerEmployee() {
      const apiData = await this.axios.get(
        "statistic/allOrdersPerEmployee/" +
          this.idEmployee.toString() +
          "/" +
          this.employeeDate.toString()
      );

      for (let i = 0; i < apiData.data.length; i++) {
        if (apiData.data[i].ord_estado == "a")
          apiData.data[i].ord_estado = "Activa";
        else if (apiData.data[i].ord_estado == "i")
          apiData.data[i].ord_estado = "Pagada";
        else apiData.data[i].ord_estado = "Pendiente";
      }

      this.ordersPerEmployee = apiData.data;
    },

    async getCountOrdersPerTable() {
      if (this.idTable && this.tableDate) {
        const apiData = await this.axios.get(
          "statistic/countOrdersPerTable/" +
            this.idTable.toString() +
            "/" +
            this.tableDate.toString()
        );

        this.countOrdersPerTable = apiData.data[0].nOrdersPerTable;
        this.alertCountOrdersPerTable = true;
      } else this.alertErrorCountOrdersPerTable = true;
    },

    async getCountOrdersPerEmployee() {
      if (this.idEmployee && this.employeeDate) {
        const apiData = await this.axios.get(
          "statistic/countOrdersPerEmployee/" +
            this.idEmployee.toString() +
            "/" +
            this.employeeDate.toString()
        );

        this.countOrdersPerEmployee = apiData.data[0].nOrdersPerEmployee;
        this.alertCountOrdersPerEmployee = true;
      } else this.alertErrorCountOrdersPerEmployee = true;
    },

    async getCountSalesPerDate() {
      if (this.saleDate) {
        const apiData = await this.axios.get(
          "statistic/countSalesPerDate/" + this.saleDate.toString()
        );

        this.countSalesPerDate = apiData.data[0].nSalesPerDate;
        this.alertCountSalesPerDate = true;
      } else this.alertErrorCountSalesPerDate = true;
    },

    async getEmployees() {
      const apiData = await this.axios.get("statistic/allEmployees/");

      apiData.data.forEach((employee) =>
        this.employees.push({
          text: employee.mro_nombre,
          value: employee.mro_id,
        })
      );
    },

    async getTables() {
      const apiData = await this.axios.get("statistic/allTables/");

      apiData.data.forEach((table) =>
        this.tables.push({
          text: table.mes_id,
          value: table.mes_id,
        })
      );
    },

    openOrdersDialog() {
      if (this.orderDate) {
        this.getAllOrdersPerDate();
        this.oDialog = true;
      } else this.alertErrorOrdersPerDate = true;
    },

    closeOrdersDialog() {
      this.orderDate = "";
      this.ordersPerDate = [];
      this.oDialog = false;
    },

    openOrdersTableDialog() {
      if (this.idTable && this.tableDate) {
        this.getOrdersPerTable();
        this.otDialog = true;
      }
    },

    closeOrdersTableDialog() {
      (this.idTable = ""), (this.tableDate = "");
      this.ordersPerTable = [];
      this.otDialog = false;
    },

    openOrdersEmployeeDialog() {
      if (this.idEmployee && this.employeeDate) {
        this.getOrdersPerEmployee();
        this.oeDialog = true;
      }
    },

    closeOrdersEmployeeDialog() {
      (this.idEmployee = ""), (this.employeeDate = "");
      this.ordersPerEmployee = [];
      this.oeDialog = false;
    },
  },

  components: {},
};
</script>
