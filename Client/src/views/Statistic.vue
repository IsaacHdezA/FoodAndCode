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
                <v-sheet v-if="thereProfits" color="third" class="sheet">
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
                  class="mt-1"
                  justify="center"
                  align="center"
                  align-content="center"
                >
                  <v-col cols="10">
                    <v-menu
                      v-model="orderDate"
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
                        @input="orderDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-btn icon color="primary">
                      <v-icon>fas fa-check</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div class="block container-sales-date">
          <v-container>
            <v-row>
              <v-col>
                <h1 class="medium-title">Ventas por fecha</h1>
                <v-row
                  class="mt-1"
                  justify="center"
                  align="center"
                  align-content="center"
                >
                  <v-col cols="10">
                    <v-menu
                      v-model="salesDate"
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
                        @input="salesDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-btn icon color="primary">
                      <v-icon>fas fa-check</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div class="block container-orders-table">
          <v-container>
            <v-row>
              <v-col>
                <h1 class="large-title">Órdenes por mesero</h1>
                <v-row
                  class="mt-1"
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
                      v-model="ordersEmployeeDate"
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
                        @input="ordersEmployeeDate = false"
                        color="primary"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-btn icon color="primary">
                      <v-icon>fas fa-check</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div class="block container-orders-employee">
          <v-container>
            <v-row>
              <v-col>
                <h1 class="large-title">Órdenes por mesa</h1>
                <v-row
                  class="mt-1"
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
                      v-model="ordersTableDate"
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
                        @input="ordersTableDate = false"
                        color="primary"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-btn icon color="primary">
                      <v-icon>fas fa-check</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
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

  data: () => ({
    todayProfit: "",
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
    ordersPerTable: "",
    ordersPerEmployee: "",
    salesPerDate: "",
    orderDate: "",
    saleDate: "",
    tableDate: "",
    employeeDate: "",
    idTable: "",
    idEmployee: "",
    ordersDate: false,
    salesDate: false,
    ordersTableDate: false,
    ordersEmployeeDate: false,
    createSpark: false,
    thereProfits: false,
  }),

  created() {
    this.getTodayProfit();
    this.getMonthProfits();
    this.getActiveTables();
    this.getActiveEmployees();
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

    async getAllOrdersPerDate() {},

    async getCountOrdersPerTable() {},

    async getCountOrdersPerEmployee() {},

    async getCountSalesPerDate() {},

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
  },

  components: {},
};
</script>
