<template>
  <v-container class="container-inside">
    <h1 class="toolbar-title">Comida</h1>

    <template>
      <v-card color="grey lighten-4">
        <v-toolbar dense color="primary" dark>
          <v-toolbar-title class="toolbar-title">Agregar comida</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <template>
            <v-form v-model="valid">
              <v-row align="center" align-content="center" justify="center">
                <v-col cols="5">
                  <v-row justify="center" align="center" align-content="center">
                    <v-col cols="3" class="text-right mt-n3">
                      <h3 class="black--text">Nombre</h3>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        class="mb-n3"
                        v-model="new_food.com_nombre"
                        background-color="white"
                        label="Nombre"
                        solo
                        outlined
                        dense
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="text-right mt-n6">
                      <h3 class="black--text">Categoría</h3>
                    </v-col>
                    <v-col cols="9">
                      <v-select
                        class="my-n4"
                        v-model="new_food.com_cat_id"
                        :items="categories"
                        label="Seleccionar categoria"
                        solo
                        background-color="white"
                        outlined
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="3" class="text-right mt-n6">
                      <h3 class="black--text">Precio</h3>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        class="mt-n3 mb-n6 pb-n6"
                        v-model="new_food.com_precio"
                        :rules="precio_rules"
                        prefix="$"
                        label="Precio de la comida"
                        solo
                        background-color="white"
                        outlined
                        dense
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="5">
                  <v-row>
                    <v-col cols="4" class="text-right mt-3">
                      <h3 class="black--text">Descripción</h3>
                    </v-col>
                    <v-col cols="8">
                      <v-textarea
                        outlined
                        rows="5"
                        label="Descripción"
                        solo
                        v-model="new_food.com_descripcion"
                        background-color="white"
                        class="mb-n6 pb-n6"
                        no-resize
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="2">
                  <v-row justify="center">
                    <v-col cols="10">
                      <v-btn class="px-7 font-weight-black" color="accent" rounded @click="submit_form()">{{btn_text}}</v-btn>
                    </v-col>
                    <v-col v-if="edit_mode" cols="10">
                      <!-- Cambiar el color del botón --> 
                      <v-btn class="px-7 font-weight-black" color="accent" rounded @click="cancel_edit()">Cancelar</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </template>
        </v-card-text>
      </v-card>
    </template>

    <template>
      <v-card class="mt-5">
          <v-toolbar color="primary">
              <v-select
                  v-model="filters"
                  :items="categories"
                  label="Filtrar por categoria"
                  solo
                  dense
                  multiple
                  class="mb-n6"
                  >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0" dense>
                      <span>{{ item.text }}</span>
                    </v-chip>
                    <span
                        v-if="index === 1"
                        class="grey--text text-caption"
                        >
                        (+{{ filters.length - 1 }} más)
                    </span>
                  </template>
              </v-select>
            <v-spacer></v-spacer>
              <v-text-field
                  v-model="search"
                  append-icon="fa fa-search"
                  dense
                  label="Buscar"
                  single-line
                  dark
                  hide-details
                  ></v-text-field>

        </v-toolbar>

        <v-data-table
            :headers="headers"
            :items="filtered_food"
            :search="search"
            dense
            class="food_table"
            >
            <template v-slot:[`item.com_precio`]="{ item }">
              <span
                  class="d-inline-block text-truncate mr-n16"
                  style="max-width: 250px;"
                  >
                  $ {{ item.com_precio }}
              </span>
            </template>

          <template v-slot:[`item.com_descripcion`]="{ item }">
            <span
                class="d-inline-block text-truncate mr-n16"
                style="max-width: 250px;"
                >
                {{ item.com_descripcion }}
            </span>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-3" @click="edit_food(item)">
              fas fa-pen
            </v-icon>
            <v-icon small @click="delete_food(item)">
              fas fa-trash
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </template>

    <!--<template>
      <v-row justify="center">
      <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
      >
      <v-card color="primary">
      <v-card-title class="subheading font-weight-bold">
      ¿Eliminar?
      </v-card-title>
      <v-divider></v-divider>
      <v-list dense class="container-inside" color="grey lighten-4">
      <v-list-item>
      <v-list-item-content>Comida:</v-list-item-content>
      <v-list-item-content class="align-end">
      Mesero
      </v-list-item-content>
      </v-list-item>
      <v-list-item>
      <v-list-item-content>Precio</v-list-item-content>
      <v-list-item-content class="align-end">
      Fecha y hora
      </v-list-item-content>
      </v-list-item>
      </v-list>
      <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
      text
      @click="dialog = false"
      >
      Disagree
      </v-btn>
      <v-btn
      text
      @click="dialog = false"
      >
      Agree
      </v-btn>
      </v-card-actions>
      </v-card>
      </v-dialog>
      </v-row>
      </template> -->
  </v-container>
</template>

<script>
export default {
  name: "Food",
  data: () => ({
    valid: false,
    dialog: false,
    edit_mode: false,
    precio_rules: [
      (v) =>
      /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(v) ||
      "Cantidad incorrecta",
    ],
    search: "",
    headers: [
      // { text: "Categoria", value: "com_cat_id" },
      { text: "Categoria", value: "cat_nombre" },
      { text: "Nombre", value: "com_nombre" },
      { text: "Precio", value: "com_precio" },
      { text: "Descripción", value: "com_descripcion" },
      { text: "Acciones", value: "actions" },
    ],

    foods: [],
    filters: [],
    categories: [],
    new_food: {},
  }),
  created() {
    this.get_all_foods();
    this.get_all_categories();
  },
  methods: {
    async get_all_foods() {
      const api_data = await this.axios.get("/food/all_foods");
      this.foods = api_data.data;
    },
    async get_all_categories() {
      const api_data = await this.axios.get("/category/all_categories");
      api_data.data.forEach((item) => {
        this.categories.push({
          text: item.cat_nombre + (item.cat_plus18 == 'a' ? ' - 18+' : ''),
          value: item.cat_id
        });
      });
    },
    async delete_food(item) {
      const body = {
        com_id: item.com_id,
      };
      await this.axios.post("/food/delete_food", body);
      this.get_all_foods();
    },
    async save_food() {
      await this.axios.post("/food/new_food", this.new_food);
      this.get_all_foods();
      this.new_food = {};
      this.valid = true;
    },
    async update_food() {
      await this.axios.post("/food/update_food", this.new_food);
      this.get_all_foods();
      this.new_food = {};
      this.valid = true;
    },
    edit_food(item) {
      this.edit_mode = true;
      this.new_food = item;
    },
    cancel_edit() {
      this.edit_mode = false;
      this.new_food = {};
    },
    submit_form() {
      this.edit_mode ? this.update_food() : this.save_food();
    }
  },
  computed: {
    filtered_food: function() {
      return this.foods.filter(food => {
        let res = false;
        if (this.filters.length > 0) {
          this.filters.forEach((filter) => {
            if (filter == food.com_cat_id) {
              res = true;
            }
          });
        } else {
          res = true;
        }
        return res;
      });
    },
    btn_text: function() {
      return this.edit_mode ? 'Guardar' : 'Agregar';
    }
  },
  components: {},
};
</script>
