<template> 

  <v-container class="container-inside">
    <h1 class="toolbar-title">Empleados</h1>
    <template>
      <v-card color="grey lighten-4">
        <v-toolbar dense color="primary" dark>
          <v-toolbar-title class="toolbar-title">Agregar empleado</v-toolbar-title>
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
    
    <v-data-iterator
      :items="meseros"
      item-key="mro_id"
      :items-per-page="4"
      
    >
      <template >
        <v-row>
          <v-col
            v-for="item in meseros"
            :key="item.mro_id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title>
              <v-avatar 
                class="profile"
            color="grey"
            size="200"
            tile
              >
              
                <img  v-bind:src="'http://localhost:3000/'+item.mro_foto" onerror="http://localhost:3000/no_user.png" >
              </v-avatar>
              <v-card-text  
              align="center"
            justify="center" >
                 <h4 >{{ item.mro_nombre }}</h4>
                 <p >{{item.mro_telefono}}</p>
                 <p>
                    <h3 class="green--text" v-if="item.mro_estado === 'a'"> Activo</h3>
                    <h3 v-else class="red--text">Inactivo</h3>
                 </p>
              </v-card-text>
               
              </v-card-title>
              
            </v-card>
          </v-col>
        </v-row>

      </template>
    </v-data-iterator>
  </v-container>
  <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Creando mesero porfavor espere
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
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
      mro_sueldo: 0.0

    },
    dialog: false,
    
    
  }),

  created(){
    
    this.getMeseros();
  },
  methods: {

    getMeseros(){ 
       console.log("Hola");    
      this.axios.get("/mesero/seleccionarTodos").then(response=>{
        this.meseros=response.data;
        console.log(this.meseros);
      }).catch(e=>{
        console.log(e);
      })
       
    },
    async submit() {
      this.dialog=true;
      let data = { mro_nombre: this.nuevo_mesero.mro_nombre, mro_foto: this.nuevo_mesero.mro_foto };
      const form=new FormData();
      form.append('mro_nombre',this.nuevo_mesero.mro_nombre);
      form.append('mro_domicilio',this.nuevo_mesero.mro_direccion);
      form.append('mro_correo',this.nuevo_mesero.mro_correo);
      form.append('mro_telefono',this.nuevo_mesero.mro_telefono);
      form.append('mro_sueldo',this.nuevo_mesero.mro_sueldo);
      form.append('file',this.nuevo_mesero.mro_foto);
      
     await this.axios.post("/mesero/nuevo", form, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
        console.log(response.data);
        this.getMeseros();
         this.dialog=false;
        
      }).catch(e=>{
          console.log(e);
           this.dialog=false;
          
      });
     
      
    },
  },
  components: {},
   watch: {
      dialog (val) {
        return val;
      },
    },
};
</script>
