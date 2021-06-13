<template>
  <v-container>
    <h1>Acerca de</h1>
    <br />
    <template>
      <v-row align="center" align-content="center" justify="center">
        <v-col cols="12"></v-col>
      </v-row>
      <v-row align="center" align-content="center" justify="center">
        <v-col cols="12" sm="12" md="6" lg="2">
          <v-card>
            <v-img height="250" src="../assets/aiha.jpg"></v-img>
            <v-card-title
              >Aldo Isaac <br />
              Hernández Antonio</v-card-title
            >
            <v-card-text>
              <div class="container-inside">
                Si compila esta bien, si arranca es perfecto.
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="2">
          <v-card>
            <v-img height="250" src="../assets/bjbb.jpg"></v-img>
            <v-card-title
              >Braulio José <br />
              Baca Barbosa</v-card-title
            >
            <v-card-text>
              <div class="container-inside">
                Genio, millonario, playboy, filántropo
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="2">
          <v-card>
            <v-img height="250" src="../assets/daga.jpg"></v-img>
            <v-card-title
              >Diego Armando <br />
              Gutiérrez Ayala</v-card-title
            >
            <v-card-text>
              <div class="container-inside">
                Para ganar a lo grande, a veces necesitas tomar grandes riesgos.
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="2">
          <v-card>
            <v-img height="250" src="../assets/hgm.jpg"></v-img>
            <v-card-title
              >Héctor <br />
              Guevara Mosqueda</v-card-title
            >
            <v-card-text>
              <div class="container-inside">
                El riesgo más grande es no tomar ninguno.
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="2">
          <v-card>
            <v-img height="250" src="../assets/mrr.jpg"></v-img>
            <v-card-title
              >Misael <br />
              Ramírez Ramírez</v-card-title
            >
            <v-card-text>
              <div class="container-inside">
                Cuamndo yo la vi, dimje: "Si esa mumjer fueram para mi".
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<style lang="css">
@import "../styles/app.css";
</style>

<script>
export default {
  name: "About",

  data: () => ({}),

  watch: {},

  created() {},

  methods: {},

  components: {},
};
</script>
