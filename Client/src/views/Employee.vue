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
            <v-form v-model="valid">
              <v-row align="center" align-content="left" justify="left">
                <v-col cols="9">
                  <v-row justify="center" align="center" align-content="center">
                    <v-col cols="3" class="text-right mt-n3">
                      <h3 class="black--text">Nombre</h3>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        class="mb-n3"
                        v-model="nombre"
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
                        v-model="direccion"
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
                        v-model="correo"
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
                        v-model="Telefono"
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
                        v-model="file"
                        prepend-icon="mdi-camera"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-col>

               

                <v-col cols="2">
                  <v-row justify="center">
                    <v-col cols="10">
                      <v-btn v-on:click="submit()" class="px-30" color="accent" rounded>Agregar</v-btn>
                    </v-col>
                  </v-row>
                </v-col>

              </v-row>
            </v-form>
          </template>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "Employee",

  components: {},
  methods: {
      submit(){
          let data={mro_nombre:this.nombre};
          console.log(data);
      }
  }
};
</script>
