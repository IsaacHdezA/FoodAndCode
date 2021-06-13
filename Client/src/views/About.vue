<template>
  <v-container class="mt-2">
    <template>
      <v-row align="center" align-content="center" justify="center">
        <v-col cols="11" align="center" align-content="center" justify="center">
          <v-parallax src="../assets/bgbanner.jpg">
            <v-row align="center" justify="center">
              <v-col class="text-center text-black" cols="12">
                <h1 class="mb-4">
                  Food And Code
                </h1>
                <h3 class="subheading">
                  Accesibilidad, proactividad y alimentación.
                </h3>
              </v-col>
            </v-row>
          </v-parallax>
        </v-col>
      </v-row>
      <br />
      <v-row align="center" align-content="center" justify="center">
        <h1>Desarrolladores</h1>
      </v-row>
      <v-row align="center" align-content="center" justify="center">
        <v-col cols="12" sm="12" md="6" lg="2">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img height="250" src="../assets/aiha.jpg"></v-img>
              <v-card-title
                >Aldo Isaac <br />
                Hernández Antonio</v-card-title
              >
              <v-card-text>
                <div class="container-inside">
                  Si compila, está bien. Si arranca, es perfecto.
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="2">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img height="250" src="../assets/bjbb.jpg"></v-img>
              <v-card-title
                >Braulio José <br />
                Baca Barbosa</v-card-title
              >
              <v-card-text>
                <div class="container-inside">
                  Genio, millonario, playboy, filántropo.
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="2">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img height="250" src="../assets/daga.jpg"></v-img>
              <v-card-title
                >Diego Armando <br />
                Gutiérrez Ayala</v-card-title
              >
              <v-card-text>
                <div class="container-inside">
                  Para ganar a lo grande, a veces necesitas tomar grandes
                  riesgos.
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="2">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img height="250" src="../assets/hgm.jpg"></v-img>
              <v-card-title
                >Héctor <br />
                Guevara Mosqueda</v-card-title
              >
              <v-card-text>
                <div class="container-inside">
                  <strong>T O R C I D O <br /></strong>
                  <strong>T O R C I D O</strong>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="2">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
              <v-img height="250" src="../assets/mrr.jpg"></v-img>
              <v-card-title
                >Misael <br />
                Ramírez Ramírez</v-card-title
              >
              <v-card-text>
                <div class="container-inside">
                  Cuamndo yo la vi, dimje: "Si esa mumjer fueram para mí"
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
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
