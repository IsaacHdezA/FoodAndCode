<template>
  <v-container>
    <h1>Comida</h1>

    <template>
      <v-card
          color="grey lighten-4"
          flat
          tile
          >
          <v-toolbar flat dense color="primary" dark>
            <v-toolbar-title>Agregar comida</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <template>
              <v-form v-model="valid">
                <v-row>
                  <v-col cols="5">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                            class="mb-n3"
                            v-model="firstname"
                            :rules="nameRules"
                            label="Nombre"
                            background-color="white"
                            outlined
                            dense
                            required
                            ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-combobox
                            class="my-n4"
                            v-model="select"
                            :items="items"
                            label="Categoria"
                            background-color="white"
                            outlined
                            dense
                            ></v-combobox>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                            class="mt-n3 mb-n6 pb-n6"
                            v-model="firstname"
                            :rules="nameRules"
                            label="Precio"
                            background-color="white"
                            outlined
                            dense
                            required
                            ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="5">
                    <v-textarea
                        outlined
                        rows="5"
                        label="Descripción"
                        value="Axe that the tree was soon chopped nearly through."
                        background-color="white"
                        class="mb-n6 pb-n6"
                        no-resize
                        ></v-textarea>
                  </v-col>

                  <v-col cols="2" align-self="center">
                    <v-btn color="accent2" rounded>Agregar</v-btn>
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
  name: "Food",
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    select: 'Vuetify',
    items: [
      'Programming',
      'Design',
      'Vue',
      'Vuetify',
    ],
  }),
  components: {},
};
</script>
