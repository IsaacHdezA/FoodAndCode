<template>
  <v-container>
    <h1>Empleados</h1>
    <template>
      <v-card color="grey lighten-4" flat tile>
        <v-toolbar flat dense color="primary" dark>
          <v-toolbar-title>Agregar empleado</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <template>
            <v-row>
              <v-col cols="9">
                <v-row>
                  <v-col cols="3" class="text-right mt-n3">
                    <h3 class="black--text">Nombre</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n3"
                      v-model="nuevo_mesero.mro_nombre"
                      background-color="white"
                      label="Nombre"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-n3">
                    <h3 class="black--text">Dirección</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n3"
                      v-model="nuevo_mesero.mro_direccion"
                      background-color="white"
                      label="Direccion"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-n3">
                    <h3 class="black--text">Correo</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n3"
                      v-model="nuevo_mesero.mro_correo"
                      background-color="white"
                      label="Correo"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-n3">
                    <h3 class="black--text">Telefono</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n3"
                      v-model="nuevo_mesero.mro_telefono"
                      background-color="white"
                      label="Telefono"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-n3">
                    <h3 class="black--text">Foto</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-file-input
                      label="File input"
                      filled
                      v-model="nuevo_mesero.mro_foto"
                      prepend-icon="fas fa-camera"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="2">
                <v-row justify="center">
                  <v-col cols="10">
                    <v-btn
                      v-on:click="submit()"
                      class="px-30"
                      color="accent"
                      rounded
                      >Agregar</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "Employee",

  data: () => ({
    nuevo_mesero: {
      mro_nombre: "",
      mro_direccion: "",
      mro_correo: "",
      mro_telefono: "",
      mro_foto: [],
    },
  }),

  methods: {
    submit() {
      let data = { mro_nombre: this.nuevo_mesero.mro_nombre };
      console.log(data);
    },
  },
  components: {},
};
</script>
