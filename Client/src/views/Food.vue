<template>
  <v-container>
    <h1>Comida</h1>

    <template>
      <v-card color="grey lighten-4" flat tile>
        <v-toolbar flat dense color="primary" dark>
          <v-toolbar-title>Agregar comida</v-toolbar-title>
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
                        v-model="com_nombre"
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
                      <v-combobox
                        class="my-n4"
                        v-model="com_cat_id"
                        :items="categorias"
                        label="Seleccionar categoria"
                        solo
                        background-color="white"
                        outlined
                        dense
                      ></v-combobox>
                    </v-col>
                    <v-col cols="3" class="text-right mt-n6">
                      <h3 class="black--text">Precio</h3>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        class="mt-n3 mb-n6 pb-n6"
                        v-model="com_precio"
                        :rules="reglas_precio"
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
                        v-model="com_descripcion"
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
                      <v-btn class="px-7" color="accent" rounded>Agregar</v-btn>
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
        <!--<v-card-title>                   
          Nutrition
          <v-spacer></v-spacer>
          <v-text-field
          v-model="search"
          append-icon="fa fa-search"
          label="Buscar"
          single-line
          hide-details
          ></v-text-field>
          </v-card-title>-->
        <v-data-table
          :headers="encabezados"
          :items="platillos"
          :search="search"
          dense
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
            <v-icon small class="mr-3" @click="editar_platillo(item)">
              fas fa-pen
            </v-icon>
            <v-icon small @click="eliminar_platillo(item)">
              fas fa-trash
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "Food",
  data: () => ({
    valid: false,
    com_nombre: "",
    com_precio: "",
    reglas_precio: [
      (v) =>
        /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(v) ||
        "Cantidad incorrecta",
    ],
    com_cat_id: "",
    categorias: ["Programming", "Design", "Vue", "Vuetify"],
    com_descripcion: "",

    search: "",
    encabezados: [
      { text: "Categoria", value: "com_cat_id" },
      { text: "Nombre", value: "com_nombre" },
      { text: "Precio", value: "com_precio" },
      { text: "Descripción", value: "com_descripcion" },
      { text: "Acciones", value: "actions" },
    ],
    platillos: [],
    nuevo_platillo: [],
  }),
  created() {
    this.llenar_platillos();
  },
  methods: {
    async llenar_platillos() {
      const api_data = await this.axios.get("/food/all_food");
      this.platillos = api_data.data;
    },
    async eliminar_platillo(item) {
      const body = {
        com_id: item.com_id,
      };
      await this.axios.post("/food/delete_food", body);
      this.llenar_platillos();
    },
    async guardar_platillo() {
      await this.axios.post("/food/new_food", this.nuevo_platillo);
      this.llenar_platillos();
    },
  },
  components: {},
};
</script>

<style>
th span {
  color: black;
}
tbody {
  background-color: #fbfaf1;
}
.v-data-table-header,
.v-data-footer {
  background-color: #f5f5f5;
}
</style>
