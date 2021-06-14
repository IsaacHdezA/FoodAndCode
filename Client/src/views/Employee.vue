<style lang="css">
@import "../styles/app.css";
</style>

<template>
  <v-container class="container-inside">
    <h1 class="toolbar-title">Empleados</h1>
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar dense color="primary" dark>
          <v-toolbar-title class="toolbar-title"
            >Agregar empleado
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <template>
            <v-row>
              <v-col cols="10">
                <v-row>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Nombre</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="nuevo_mesero.mro_nombre"
                      background-color="white"
                      label="Nombre"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Dirección</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="nuevo_mesero.mro_direccion"
                      background-color="white"
                      label="Direccion"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Correo electrónico</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="nuevo_mesero.mro_correo"
                      background-color="white"
                      label="Correo"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Numéro de teléfono</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="nuevo_mesero.mro_telefono"
                      background-color="white"
                      label="Telefono"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Sueldo</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="nuevo_mesero.mro_sueldo"
                      background-color="white"
                      label="0.00"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Foto</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-file-input
                      class="mb-n5"
                      label="Seleccione su archivo"
                      filled
                      v-model="nuevo_mesero.mro_foto"
                      prepend-icon="fas fa-camera"
                      dense
                      solo
                      outlined
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="2" align-self="center">
                <v-row justify="center">
                  <v-col cols="10">
                    <v-btn
                      v-on:click="submit()"
                      class="px-30 font-weight-black"
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
    <template>
      <v-container fluid>
        <v-data-iterator :items="meseros" item-key="mro_id" hide-default-footer>
          <template v-slot:header>
            <v-toolbar dark color="primary" class="mb-1">
              <v-select
                v-model="filtro"
                flat
                solo-inverted
                hide-details
                :items="keys"
                @change="cambio"
                prepend-inner-icon="mdi-magnify"
              ></v-select>
            </v-toolbar>
          </template>
          <template>
            <v-row>
              <v-col
                v-for="item in meseros"
                :key="item.mro_id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card align="center" align-content="center" justify="center">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="ma-1 "
                      v-on:click="lanzarEditable(item)"
                      white
                      icon
                      color="dark"
                    >
                      <v-icon dark>
                        fas fa-pencil-alt
                      </v-icon>
                    </v-btn>
                  </v-card-actions>

                  <v-card-text align="center" justify="center">
                    <p align-self="center">
                      <v-avatar
                        class="hgcursor"
                        align-self="center"
                        size="200"
                        v-on:click="moreinformation(item)"
                      >
                        <img
                          v-bind:src="'http://localhost:3000/' + item.mro_foto"
                        />
                      </v-avatar>
                    </p>
                    <h4>{{ item.mro_nombre }}</h4>
                    <p>{{ item.mro_telefono }}</p>

                    <h3 class="green--text" v-if="item.mro_estado === 'a'">
                      Activo
                    </h3>
                    <h3 v-else class="red--text">Inactivo</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
      <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Cargando...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>

    <v-dialog v-model="dialogo_editar" max-width="800">
      <v-card>
        <v-toolbar dark class="mb-2 text-h5" color="primary">
          <v-toolbar-title>Editar empleado</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <template>
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Nombre</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="empleado_actualizar.mro_nombre"
                      background-color="white"
                      label="Nombre"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Dirección</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="empleado_actualizar.mro_direccion"
                      background-color="white"
                      label="Direccion"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Correo electrónico</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="empleado_actualizar.mro_correo"
                      background-color="white"
                      label="Correo"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Numéro de teléfono</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="empleado_actualizar.mro_telefono"
                      background-color="white"
                      label="Telefono"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Sueldo</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      class="mb-n8"
                      v-model="empleado_actualizar.mro_sueldo"
                      background-color="white"
                      label="0.00"
                      solo
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="text-right mt-3">
                    <h3 class="black--text">Foto</h3>
                  </v-col>
                  <v-col cols="9">
                    <v-file-input
                      class="mb-n5"
                      label="Seleccione su archivo"
                      filled
                      v-model="empleado_actualizar.file"
                      prepend-icon="fas fa-camera"
                      dense
                      solo
                      outlined
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-switch
            v-model="editar_activo"
            label="Activo"
            key="editar"
            color="success"
            hide-details
          >
          </v-switch>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            class="l-14"
            v-on:click="actualizarEmpleado()"
            color="primary"
          >
            Guardar informacion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogmore" max-width="300" max-height="300">
      <v-card align="center" align-content="center" justify="center">
        <v-toolbar dark class="mb-2 text-h5" color="primary">
          <v-toolbar-title>{{ empleado_selected.mro_nombre }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text align-self="center">
          <p>
            <v-avatar color="grey" size="200" align-self="center">
              <img v-bind:src="empleado_selected.mro_foto" />
            </v-avatar>
          </p>
          <p class="font-weight-black">
            {{ empleado_selected.mro_direccion }}
          </p>
          <a href="mailto:`${empleado_selected.mro_correo}`" target="_blank">
            {{ empleado_selected.mro_correo }}
          </a>
          <p class="font-weight-black">
            {{ empleado_selected.mro_telefono }}
          </p>
          <p>
            {{ "$ " + empleado_selected.mro_sueldo }}
          </p>
          <p>
            <v-switch
              v-model="activo_inactivo"
              label="Activo"
              color="success"
              hide-details
              @click="cambiarEstado"
            >
            </v-switch>
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogmore = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "Employee",

  data: () => ({
    meseros: [],
    nuevo_mesero: {
      mro_nombre: "",
      mro_direccion: "",
      mro_correo: "",
      mro_telefono: "",
      mro_foto: [],
      mro_sueldo: 0.0,
    },
    empleado_selected: {
      mro_nombre: "",
      mro_direccion: "",
      mro_correo: "",
      mro_telefono: "",
      mro_foto: "",
      mro_sueldo: 0.0,
    },
    empleado_actualizar: {
      mro_nombre: "",
      mro_direccion: "",
      mro_correo: "",
      mro_telefono: "",
      file: undefined,
      mro_foto: "",
      mro_sueldo: 0.0,
    },
    dialog: false,
    dialogmore: false,
    activo_inactivo: true,
    dialogo_editar: false,
    editar_activo: true,
    filtro: "Todos",
    keys: ["Todos", "Activos", "Inactivos"],
  }),

  created() {
    this.getMeseros();
  },
  methods: {
    cambio(event) {
      this.getMeseros();
    },
    moreinformation(empleado) {
      this.empleado_selected.mro_nombre = empleado.mro_nombre;
      this.empleado_selected.mro_telefono = empleado.mro_telefono;
      this.empleado_selected.mro_correo = empleado.mro_correo;
      this.empleado_selected.mro_estado = empleado.mro_estado;
      this.empleado_selected.mro_direccion = empleado.mro_domicilio;
      this.empleado_selected.mro_sueldo = empleado.mro_sueldo;
      this.empleado_selected.mro_id = empleado.mro_id;
      this.empleado_selected.mro_foto =
        "http://localhost:3000/" + empleado.mro_foto;
      if (this.empleado_selected.mro_estado == "a") {
        this.activo_inactivo = true;
      } else {
        this.activo_inactivo = false;
      }
      this.dialogmore = true;
    },
    limpiarEmpeladoSe() {
      this.empleado_selected.mro_nombre = "";
      this.empleado_selected.mro_telefono = "";
      this.empleado_selected.mro_correo = "";
      this.empleado_selected.mro_estado = "";
      this.empleado_selected.mro_domicilio = "";
      this.empleado_selected.mro_sueldo = "";
      this.empleado_selected.mro_id = "";
      this.empleado_selected.mro_foto = "";
    },
    cambiarEstado() {
      let estado = "";
      if (this.empleado_selected.mro_estado == "a") {
        estado = "i";
      } else {
        estado = "a";
      }

      this.axios
        .put("/mesero/cambiarEstado", {
          mro_id: this.empleado_selected.mro_id,
          mro_estado: estado,
        })
        .then((response) => {
          this.getMeseros();
          this.dialogmore = false;
        })
        .catch((e) => {
          this.dialogmore = false;
        });
    },
    lanzarEditable(empleado) {
      this.empleado_actualizar.mro_nombre = empleado.mro_nombre;
      this.empleado_actualizar.mro_telefono = empleado.mro_telefono;
      this.empleado_actualizar.mro_correo = empleado.mro_correo;
      this.empleado_actualizar.mro_estado = empleado.mro_estado;
      this.empleado_actualizar.mro_direccion = empleado.mro_domicilio;
      this.empleado_actualizar.mro_sueldo = empleado.mro_sueldo;
      this.empleado_actualizar.mro_id = empleado.mro_id;
      this.empleado_actualizar.mro_foto = empleado.mro_foto;
      if (this.empleado_actualizar.mro_estado == "a") {
        this.editar_activo = true;
      } else {
        this.editar_activo = false;
      }
      this.dialogo_editar = true;
    },
    async actualizarEmpleado() {
      this.dialog = true;
      if (this.editar_activo) {
        this.empleado_actualizar.mro_estado = "a";
      } else {
        this.empleado_actualizar.mro_estado = "i";
      }

      if (this.empleado_actualizar.file != undefined) {
        let form1 = new FormData();
        form1.append("mro_nombre", this.empleado_actualizar.mro_nombre);
        form1.append("mro_domicilio", this.empleado_actualizar.mro_direccion);
        form1.append("mro_correo", this.empleado_actualizar.mro_correo);
        form1.append("mro_telefono", this.empleado_actualizar.mro_telefono);
        form1.append("mro_sueldo", this.empleado_actualizar.mro_sueldo);
        form1.append("mro_estado", this.empleado_actualizar.mro_estado);
        form1.append("mro_foto", this.empleado_actualizar.mro_foto);
        form1.append("file", this.empleado_actualizar.file);
        form1.append("mro_id", this.empleado_actualizar.mro_id);
        await this.axios
          .put("/mesero/actualizar", form1, {
            headers: {"Content-Type": "multipart/form-data"},
          })
          .then((response) => {
            this.getMeseros();
            this.dialog = false;
            this.dialogo_editar = false;
          })
          .catch((e) => {
            this.dialog = false;
            this.dialogo_editar = false;
          });
      } else {
        await this.axios
          .put("/mesero/actualizars", {
            mro_nombre: this.empleado_actualizar.mro_nombre,
            mro_domicilio: this.empleado_actualizar.mro_direccion,
            mro_correo: this.empleado_actualizar.mro_correo,
            mro_telefono: this.empleado_actualizar.mro_telefono,
            mro_estado: this.empleado_actualizar.mro_estado,
            mro_sueldo: this.empleado_actualizar.mro_sueldo,
            mro_foto: this.empleado_actualizar.mro_foto,
            mro_id: this.empleado_actualizar.mro_id,
          })
          .then((response) => {
            this.getMeseros();
            this.dialog = false;
            this.dialogo_editar = false;
          })
          .catch((e) => {
            this.dialog = false;
            this.dialogo_editar = false;
          });
      }
    },

    async getMeseros() {
      let apiData;
      if (this.filtro == "Todos") {
        apiData = await this.axios.get("/mesero/seleccionarTodos");
        this.meseros = apiData.data;
      } else if (this.filtro == "Activos") {
        apiData = await this.axios.get("/mesero/activos");
        this.meseros = apiData.data;
      } else {
        apiData = await this.axios.get("/mesero/inactivos");
        this.meseros = apiData.data;
      }
    },

    async submit() {
      this.dialog = true;

      const form = new FormData();
      form.append("mro_nombre", this.nuevo_mesero.mro_nombre);
      form.append("mro_domicilio", this.nuevo_mesero.mro_direccion);
      form.append("mro_correo", this.nuevo_mesero.mro_correo);
      form.append("mro_telefono", this.nuevo_mesero.mro_telefono);
      form.append("mro_sueldo", this.nuevo_mesero.mro_sueldo);
      form.append("file", this.nuevo_mesero.mro_foto);

      await this.axios
        .post("/mesero/nuevo", form, {
          headers: {"Content-Type": "multipart/form-data"},
        })
        .then((response) => {
          this.getMeseros();
          this.dialog = false;
        })
        .catch((e) => {
          console.log(e);
          this.dialog = false;
        });
    },
  },
  components: {},
};
</script>
