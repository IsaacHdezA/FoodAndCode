<template>
  <v-card>
    <v-card-title>
      <h3>Payment</h3>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12"> </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="cancelPayment()">
        Cancelar
      </v-btn>
      <v-btn color="green darken-1" text @click="cancelPayment()">
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
