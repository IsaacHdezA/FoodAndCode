<template>
  <v-container>
    <h1>Mesas Misa</h1>  
      
    <v-container >
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="ad_dialog=true">Ajustes 
          <v-icon class="ml-3">
            fa fa-sliders-h
          </v-icon>
        </v-btn>
      </v-row>
      
      <v-spacer></v-spacer>
      <v-row>
        
          <v-col cols='4'>
            <v-btn
              class="mx-15"
              fab
              color="primary"
              height="200px"
              width="200px"
              :disabled="viewActivityTables(1, tables)"
              @click="sub_dialog=true"
            >
              Mesa 1 <br>
              <!--{{spaces[0].value}}-->/8 
            </v-btn>
          </v-col>

          <v-col cols='4'>   
            <v-row>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(2, tables)"
                  @click="sub_dialog=true"
                >
                  Mesa 2 <br>
              <!--{{spaces[1].value}}-->/4 
                </v-btn>
              </v-col>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(3, tables)"
                   @click="sub_dialog=true"
                >
                  Mesa 3 <br>
              <!--{{spaces[2].value}}-->/4 
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(4, tables)"
                   @click="sub_dialog=true"
                >
                  Mesa 4 <br>
              <!--{{spaces[3].value}}-->/4
                </v-btn>
              </v-col>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(5, tables)"
                  @click="sub_dialog=true"
                >
                  Mesa 5 <br>
              <!--{{spaces[4].value}}-->/4 
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols='4'>
            <v-btn
              class="mx-15"
              fab
              color="primary"
              height="200px"
              width="200px"
              :disabled="viewActivityTables(6, tables)"
              @click="sub_dialog=true"
            >
              Mesa 6 <br>
              <!--{{spaces[5].value}}-->/8 
            </v-btn>
          </v-col>
      </v-row>

      <v-row>
          <v-col cols='4'>   
            <v-row>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(7, tables)"
                  @click="sub_dialog=true"
                >
                  Mesa 7 <br>
              <!--{{spaces[6].value}}-->/4 
                </v-btn>
              </v-col>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(8, tables)"
                   @click="sub_dialog=true"
                >
                  Mesa 8 <br>
              <!--{{spaces[7].value}}-->/4 
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(9, tables)"
                  @click="sub_dialog=true"
                >
                  Mesa 9 <br>
              <!--{{spaces[8].value}}-->/4 
                </v-btn>
              </v-col>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(10, tables)"
                  @click="sub_dialog=true"
                >
                  Mesa 10 <br>
              <!--{{spaces[9].value}}-->/4 
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols='4'>
            <v-btn
              class="mx-15"
              fab
              color="primary"
              height="200px"
              width="200px"
              :disabled="viewActivityTables(11, tables)"
              @click="sub_dialog=true"
            >
              Mesa 11 <br>
              <!--{{spaces[10].value}}-->/8 
            </v-btn>
          </v-col>

          <v-col cols='4'>   
            <v-row>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(12, tables)"
                  @click="sub_dialog=true"
                >
                  Mesa 12 <br>
              <!--{{spaces[11].value}}-->/4
                </v-btn>
              </v-col>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(13, tables)"
                   @click="sub_dialog=true"
                >
                  Mesa 13 <br>
              <!--{{spaces[12].value}}-->/4
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(14, tables)"
                  @click="sub_dialog=true"
                >
                  Mesa 14 <br>
              <!--{{spaces[13].value}}-->/4 
                </v-btn>
              </v-col>
              <v-col cols='6'>
                <v-btn
                  class="mx-3"
                  fab
                  color="primary"
                  height="100px"
                  width="100px"
                  :disabled="viewActivityTables(15, tables)"
                  @click="sub_dialog=true"
                >
                  Mesa 15 <br>
              <!--{{spaces[14].value}}-->/4 
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

      </v-row>
      
    </v-container>
    <v-dialog v-model='sub_dialog' max-width=500px>
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
                
              </v-data-table>            
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="agregar_suborden()">Agregar Suborden </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model='ad_dialog' max-width=500px>
      <v-card>
        <v-card-title>
            Ajustes Mesas
        </v-card-title>
        <v-card-text>
            <v-container>             
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="cambiar_estado()">Aceptar</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Table",

  data () {
    return {

      headers: [
            { text: 'Asiento', align: 'start', sortable: false, value: 'sub_asiento',},
            { text: 'Comida', value: 'com_nombre' },
            { text: 'Cantidad', value: 'sub_cant' },
            { text: 'Costo', value: 'costo' },
            { text: 'Acciones', value: 'actions' }, 
            ],

      tables: [],
      spaces: [],
      suborders: [],
      sub_dialog: false,
      ad_dialog: false,
      
     
    }
  },
    
  created(){
    this.getActiveTables();
    this.getSpacesTables();
    this.getSuborders();
  },

  methods: {

    async getActiveTables() {
      const apiData = await this.axios.get("order/allActiveTables/");
      apiData.data.sort((a, b) => a - b);

      apiData.data.forEach((table) =>
        this.tables.push({
          text: table.mes_id,
          value: table.mes_id,
        })
      );
    },

    async getSpacesTables() {
      const apiData = await this.axios.get("table/filledSpacesTables/");
      apiData.data.sort((a, b) => a - b);

      apiData.data.forEach((table) =>
        this.espacios.push({
          text: espacios.mes_id,
          value: espacios.cupo,
        })
      );
      
    },

    async getSuborders() {
      const apiData = await this.axios.get("table/allSuborders/");
      this.suborders = apiData.data;
    },

    viewActivityTables(i,t){
      for(let step=0; step<t.length; step++){
        if (i == t[step].value){
          return false
        }
      }
      return true;
    },
    
  },

  components: {

  },

};
</script>
