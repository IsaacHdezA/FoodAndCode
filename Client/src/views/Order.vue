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
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar dark color="blue darken-3" class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
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
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="blue" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn large depressed color="blue" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>
        <template>
          <v-row>
            <v-col
              v-for="order in orders"
              :key="order.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  {{ order.name }}
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Calories:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ order.calories }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>Fat:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ order.fat }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span
              class="mr-4
            grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
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
    itemsPerPageArray: [4, 8, 12],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: "name",
    keys: ["Name", "Calories", "Fat"],

    orders: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
      },
    ],
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
