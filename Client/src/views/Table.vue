<template>
  <v-container>
    <h1>Mesas</h1>
    <v-container>
      <v-spacer></v-spacer>
      <v-row>
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
                (actualTable = 1),
                (actualOrder = orden_correct[0]['value']),
                getSuborders(1, orden_correct[0]['value']),
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
        <v-col cols="4">
          <v-row>
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
                    (actualTable = '2'),
                    (actualOrder = orden_correct[1]['value']),
                    getSuborders(2, orden_correct[1]['value']),
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
            <v-col cols="6">
              <v-btn
                class="mx-3"
                fab
                color="primary"
                height="200px"
                width="75%"
                :disabled="viewActivityTables(3, this.tables)"
                @click="
                  actualTable = '3';

                  (actualOrder = orden_correct[2]['value']),
                    getSuborders(3, orden_correct[2]['value']),
                    (sub_dialog = true),
                    (nueva_suborden.sub_ord_id = orden_correct[2]['value']);
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
                    (actualTable = '4'),
                    (actualOrder = orden_correct[3]['value']),
                    getSuborders(4, orden_correct[3]['value']),
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
                    (actualTable = '5'),
                    (actualOrder = orden_correct[4]['value']),
                    getSuborders(5, orden_correct[4]['value']),
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
              (sub_dialog = true), (actualTable = '6');

              (actualOrder = orden_correct[5]['value']),
                getSuborders(6, orden_correct[5]['value']),
                (nueva_suborden.sub_ord_id = orden_correct[5]['value']);
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
                    (actualTable = '7'),
                    (actualOrder = orden_correct[6]['value']),
                    getSuborders(7, orden_correct[6]['value']),
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
                  actualTable = '8';

                  (actualOrder = orden_correct[7]['value']),
                    getSuborders(8, orden_correct[7]['value']),
                    (nueva_suborden.sub_ord_id = orden_correct[7]['value']);
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
                    (actualTable = '9'),
                    (actualOrder = orden_correct[8]['value']),
                    getSuborders(9, orden_correct[8]['value']),
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
                    (actualTable = '10'),
                    (actualOrder = orden_correct[9]['value']),
                    getSuborders(10, orden_correct[9]['value']),
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
              (sub_dialog = true), (actualTable = '11');
              (actualOrder = orden_correct[10]['value']),
                getSuborders(11, orden_correct[10]['value']),
                (nueva_suborden.sub_ord_id = orden_correct[10]['value']);
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
                    (actualTable = '12'),
                    (actualOrder = orden_correct[11]['value']),
                    getSuborders(12, orden_correct[11]['value']),
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
                    (actualTable = '13'),
                    (actualOrder = orden_correct[12]['value']),
                    getSuborders(13, orden_correct[12]['value']),
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
                    (actualTable = '14'),
                    (actualOrder = orden_correct[13]['value']),
                    getSuborders(14, orden_correct[13]['value']),
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
                    (actualTable = '15'),
                    (actualOrder = orden_correct[14]['value']),
                    getSuborders(15, orden_correct[14]['value']),
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

    <v-dialog class="toolbar-subtitle" v-model="sub_dialog" max-width="1000">
      <v-card>
        <v-toolbar dark class="toolbar-title" color="primary">
          <v-toolbar-title> Mesa {{ this.actualTable }} </v-toolbar-title>
        </v-toolbar>
        <v-data-table
          class="container-inside"
          :headers="headers"
          :items="suborders"
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
          <v-btn color="green darken-1" text @click="new_dialog = true">
            Agregar Suborden
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog class="toolbar-subtitle" v-model="new_dialog" max-width="500">
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
                  v-model="nueva_suborden.sub_asiento"
                >
                </v-select>
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
  </v-container>
</template>

<style lang="css">
@import "../styles/app.css";
</style>

<script>
export default {
  name: "Table",

  data() {
    return {
      headers: [
        { text: "Asiento", value: "sub_asiento" },
        { text: "Comida", value: "com_nombre" },
        { text: "Cantidad", value: "sub_cant" },
        { text: "Costo", value: "sub_precio" },
        { text: "Acciones", value: "actions" },
      ],
      asientosTotales: [],
      posicion: "0",
      nueva_suborden: {
        sub_ord_id: "",
        sub_com_id: "",
        sub_asiento: "",
        sub_cant: "",
      },

      actualTable: "",
      actualOrder: "",

      tables: [],
      spaces: [],
      suborders: [],
      comidas: [],
      orden_correct: [],

      sub_dialog: false,
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

    async getSpacesTables() {
      this.spaces = [];
      const apiData = await this.axios.get("table/filledSpacesTables/");

      apiData.data.forEach((space) =>
        this.spaces.push({
          text: space.mes_id,
          value: space.cupo,
        })
      );
    },

    async getSuborders(mes_id, ord_id) {
      this.sub_dialog = true;
      const apiData = await this.axios.get(
        "table/allSuborders/" + mes_id.toString() + "/" + ord_id.toString()
      );

      if (mes_id === 1 || mes_id === 6 || mes_id === 11)
        this.asientosTotales = [1, 2, 3, 4, 5, 6, 7, 8];
      else this.asientosTotales = [1, 2, 3, 4];

      this.getSpacesTables();

      this.suborders = apiData.data;
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
      this.getSuborders(this.actualTable, this.actualOrder);
      this.getSpacesTables();
      this.newSubOrder = {
        sub_ord_id: "",
        sub_com_id: "",
        sub_asiento: "",
        sub_cant: "",
      };
    },

    cancelarAddSub() {
      this.new_dialog = false;
      this.getSpacesTables();
    },

    cancelarSuborders() {
      this.newSubOrder = {
        sub_ord_id: "",
        sub_com_id: "",
        sub_asiento: "",
        sub_cant: "",
      };
      this.sub_dialog = false;
      this.actualTable = "";
      this.actualOrder = "";
      this.getSpacesTables();
    },

    async orden_correcta() {
      const apiData = await this.axios.get("table/ordenTable/");

      apiData.data.forEach((orden_c) =>
        this.orden_correct.push({
          text: orden_c.mes_id,
          value: orden_c.ord_id,
        })
      );
    },

    async eliminarSuborden(item) {
      const data = {
        sub_id: item.sub_id,
      };
      await this.axios.post("table/deleteSuborder", data);
      this.getSuborders(this.actualTable, this.actualOrder);
      this.getSpacesTables();
    },
  },

  components: {},
};
</script>
