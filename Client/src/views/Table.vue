<template>
  <v-container>
    <h1>Mesas</h1>
    <v-container>
      {{ orden_correct[0]["value"] }}
      <v-spacer></v-spacer>

      <!-- Primer renglón mesas -->
      <v-row>
        <!-- Primera columna, renglón 1: Mesa 1 -->
        <v-col cols="4">
          <v-btn
            class="mx-15 ma-3"
            fab
            color="primary"
            height="100%"
            width="75%"
            :disabled="viewActivityTables(1, this.tables)"
            @click="
              (sub_dialog = true),
                getSuborders(1),
                (nueva_suborden.sub_ord_id = orden_correct[0]['value'])
            "
          >
            Mesa 1 <br />
            {{
              typeof this.spaces[0] !== "undefined"
                ? this.spaces[0]["value"]
                : "0"
            }}/8
          </v-btn>
        </v-col>
        <!-- Primera columna, renglón 1: Mesa 1 -->

        <!-- Segunda columna, renglón 1: Mesas 2-5 -->
        <v-col cols="4">
          <!-- Primer renglón segunda columna -->
          <v-row>
            <!---->
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="75%"
                :disabled="viewActivityTables(2, this.tables)"
                @click="
                  (sub_dialog = true),
                    getSuborders(2),
                    (nueva_suborden.sub_ord_id = orden_correct[1]['value'])
                "
              >
                Mesa 2 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[1]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <!---->
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="75%"
                :disabled="viewActivityTables(3, this.tables)"
                @click="
                  getSuborders(3),
                    (sub_dialog = true),
                    (nueva_suborden.sub_ord_id = orden_correct[2]['value'])
                "
              >
                Mesa 3 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[2]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="75%"
                :disabled="viewActivityTables(4, this.tables)"
                @click="
                  (sub_dialog = true),
                    getSuborders(4),
                    (nueva_suborden.sub_ord_id = orden_correct[3]['value'])
                "
              >
                Mesa 4 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[3]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="75%"
                :disabled="viewActivityTables(5, this.tables)"
                @click="
                  (sub_dialog = true),
                    getSuborders(5),
                    (nueva_suborden.sub_ord_id = orden_correct[4]['value'])
                "
              >
                Mesa 5 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[4]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="4">
          <v-btn
            class="mx-15"
            fab
            color="primary"
            height="100%"
            width="75%"
            :disabled="viewActivityTables(6, this.tables)"
            @click="
              (sub_dialog = true),
                getSuborders(6),
                (nueva_suborden.sub_ord_id = orden_correct[5]['value'])
            "
          >
            Mesa 6 <br />
            {{
              typeof this.spaces[0] !== "undefined"
                ? this.spaces[5]["value"]
                : "0"
            }}/8
          </v-btn>
        </v-col>
      </v-row>

      <v-row max-height="50%">
        <v-col cols="4">
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(7, this.tables)"
                @click="
                  (sub_dialog = true),
                    getSuborders(7),
                    (nueva_suborden.sub_ord_id = orden_correct[6]['value'])
                "
              >
                Mesa 7 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[6]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(8, this.tables)"
                @click="
                  getSuborders(8),
                    (nueva_suborden.sub_ord_id = orden_correct[7]['value'])
                "
              >
                Mesa 8 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[7]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(9, this.tables)"
                @click="
                  (sub_dialog = true),
                    getSuborders(9),
                    (nueva_suborden.sub_ord_id = orden_correct[8]['value'])
                "
              >
                Mesa 9 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[8]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(10, this.tables)"
                @click="
                  (sub_dialog = true),
                    getSuborders(10),
                    (nueva_suborden.sub_ord_id = orden_correct[9]['value'])
                "
              >
                Mesa 10 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[9]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="4">
          <v-btn
            class="mx-15"
            fab
            color="primary"
            height="100%"
            width="75%"
            :disabled="viewActivityTables(11, this.tables)"
            @click="
              (sub_dialog = true),
                getSuborders(11),
                (nueva_suborden.sub_ord_id = orden_correct[10]['value'])
            "
          >
            Mesa 11 <br />
            {{
              typeof this.spaces[0] !== "undefined"
                ? this.spaces[10]["value"]
                : "0"
            }}/8
          </v-btn>
        </v-col>

        <v-col cols="4">
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(12, this.tables)"
                @click="
                  (sub_dialog = true),
                    getSuborders(12),
                    (nueva_suborden.sub_ord_id = orden_correct[11]['value'])
                "
              >
                Mesa 12 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[11]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(13, this.tables)"
                @click="
                  (sub_dialog = true),
                    getSuborders(13),
                    (nueva_suborden.sub_ord_id = orden_correct[12]['value'])
                "
              >
                Mesa 13 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[12]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(14, this.tables)"
                @click="
                  (sub_dialog = true),
                    getSuborders(14),
                    (nueva_suborden.sub_ord_id = orden_correct[13]['value'])
                "
              >
                Mesa 14 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[13]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="200px"
                :disabled="viewActivityTables(15, this.tables)"
                @click="
                  (sub_dialog = true),
                    getSuborders(15),
                    (nueva_suborden.sub_ord_id = orden_correct[14]['value'])
                "
              >
                Mesa 15 <br />
                {{
                  typeof this.spaces[0] !== "undefined"
                    ? this.spaces[14]["value"]
                    : "0"
                }}/4
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="sub_dialog" max-width="50%">
      <v-card>
        <v-card-title>
          Mesa
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-data-table
              :headers="headers"
              :items="suborders"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Usuarios</v-toolbar-title>
                </v-toolbar>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon @click="eliminar_Suborden(item)" small>
                  fas fa-trash
                </v-icon>
              </template>
            </v-data-table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="new_dialog = true"
            >Agregar Suborden</v-btn
          >
          <v-btn color="error" @click="cancelar()">Cancelar </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="new_dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Nueva Suborden
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-select :items="asientosTotales" label="Asientos"> </v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="comidas"
                  label="Comida"
                  v-model="nueva_suborden.sub_com_id"
                >
                </v-select>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="nueva_suborden.sub_cant"
                  label="Cantidad"
                  type="Number"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="agregar_suborden()"
            >Agregar Suborden
          </v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Table",

  data() {
    return {
      headers: [
        { text: "Indice", align: "start", sortable: false, value: "sub_id" },
        { text: "Asiento", value: "sub_asiento" },
        { text: "Comida", value: "com_nombre" },
        { text: "Cantidad", value: "sub_cant" },
        { text: "Costo", value: "costo" },
        { text: "Acciones", value: "actions" },
      ],

      asientos: [],
      asientosTotales: [],
      posicion: "0",
      nueva_suborden: {
        sub_ord_id: "",
        sub_com_id: "",
        sub_asiento: "",
        sub_cant: "",
      },

      tables: [],
      spaces: [],
      suborders: [],
      comidas: [],
      orden_correct: [],

      sub_dialog: false,
      ad_dialog: false,
      new_dialog: false,
    };
  },

  created() {
    this.getSpacesTables();
    this.getActiveTables();
    this.readFood();
    this.orden_correcta();
  },

  methods: {
    async getActiveTables() {
      const apiData = await this.axios.get("table/allActiveTables/");

      apiData.data.forEach((table) =>
        this.tables.push({
          text: table.mes_id,
          value: table.mes_id,
        })
      );
    },

    async getSeats(mes_id) {
      const apiData = await this.axios.get(
        "table/getSeats/" + mes_id.toString()
      );

      console.log(apiData.data);
    },

    async getSpacesTables() {
      const apiData = await this.axios.get("table/filledSpacesTables/");

      apiData.data.forEach((space) =>
        this.spaces.push({
          text: space.mes_id,
          value: space.cupo,
        })
      );
    },

    async getSuborders(mes_id) {
      this.sub_dialog = true;
      const apiData = await this.axios.get(
        "table/allSuborders/" + mes_id.toString()
      );
      this.suborders = apiData.data;

      if (mes_id === 1 || mes_id === 6 || mes_id === 11)
        this.asientosTotales = [1, 2, 3, 4, 5, 6, 7, 8];
      else this.asientosTotales = [1, 2, 3, 4];
    },

    viewActivityTables(i, t) {
      for (let step = 0; step < t.length; step++) {
        if (i == t[step]["value"]) {
          return false;
        }
      }
      return true;
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

    async agregar_suborden() {
      await this.axios.post("table/addSuborder/", this.nueva_suborden);
      this.new_dialog = false;
      this.nueva_suborden = {};
    },

    cancelar() {
      this.nueva_suborden = {};
      this.new_dialog = false;
      this.sub_dialog = false;
      this.ad_dialog = false;
    },

    async orden_correcta() {
      const apiData = await this.axios.get("table/ordenTable/");

      apiData.data.forEach((orden_c) =>
        this.orden_correct.push({
          text: orden_c.mes_id,
          value: orden_c.ord_id,
        })
      );
      // console.log(this.orden_correct);
    },

    async eliminarSuborden(item) {
      await this.axios("table/deleteSuborder", item.sub_id);
    },
  },

  components: {},
};
</script>
