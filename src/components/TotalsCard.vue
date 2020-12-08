<template>
  <v-card elevation="8" tile :loading="loading">
    <v-card-title class="text-md-h3"> {{ totals.name }} Totals </v-card-title>
    <v-card-text class="text-md-h4">
      <div>Cases: {{ formattedTotals.cases }}</div>
      <div>Active: {{ formattedTotals.active }}</div>
      <div>Deaths: {{ formattedTotals.deaths }}</div>
      <div>Recovered: {{ formattedTotals.recovered }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default {
  name: "TotalsCard",
  props: {
    totals: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    formattedTotals() {
      return {
        cases: numberWithCommas(this.totals.cases),
        active: numberWithCommas(this.totals.active),
        deaths: numberWithCommas(this.totals.deaths),
        recovered: numberWithCommas(this.totals.recovered),
      };
    },
  },
};
</script>

<style></style>
