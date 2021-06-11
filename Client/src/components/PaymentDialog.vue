<template>
  <v-card>
    <v-toolbar dark color="primary" >
      <v-btn icon dark @click="dialog = false" >
        <v-icon>fas fa-times</v-icon>
      </v-btn>

      <v-toolbar-title>
        <h2>Pago de cuenta</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <template>

      <v-card color="grey lighten-4" flat tile>
        <v-toolbar flat dense color="primary" dark>
          <v-toolbar-title>mmmm</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text>
          <template>
            <v-data-table
              :headers="headers"
              :items="payments"
              :items-per-page="5"
              class="elevation-1"
            >
            </v-data-table>

          </template>
        </v-card-text>
      </v-card>
      


    </template>

  </v-card>
</template>

<script>
  export default {
    name: "PaymentDialog",

    data () {
      return {
        headers: [
          { text: "Orden",         align: "center", value: "pag_ord_id"     },
          { text: "Subtotal",      align: "center", value: "pag_subtotal"   },
          { text: "Total (IVA)",   align: "center", value: "pag_total"      },
          { text: "Propina",       align: "center", value: "pag_propina"    },
          { text: "Tipo de pago",  align: "center", value: "pag_tipo_pago"  },
          { text: "Fecha de pago", align: "center", value: "pag_fecha_pago" },
        ],

        payments: [],
        
        newPayment: {            
          pag_ord_id:         '',
          pag_subtotal:       '',
          pag_total:          '',
          pag_propina:        '',
          pag_tipo_pago:      '',
          pag_pag_fecha_pago: '',
        },
      }

    },

    created() {
      this.showPayments();
    },

    methods: {
      async showPayments() {
        const apiData = await this.axios.get('/payment/showAllPayments/');
        console.log(apiData.data);
        this.payments = apiData.data;
      },

      async insertPayment(item) {
        const body = { pag_ord_id: item.pag_ord_id, pag_propina: item.pag_propina, pag_tipo_pago: item.pag_tipo_pago };
        await this.axios.post('/payment/insertPayment', body);
      },
    }
  }
</script>