<template>
  <v-container fluid>
    <v-row>
      <v-col md="6" xl="4">
        <TotalsCard :totals="country" :loading="totalLoading" />
      </v-col>
      <!-- <v-col md="6" xl="4">
        <v-card elevation="8" tile :loading="statesLoading">
          <v-card-text>
            <v-data-table
              dense
              :headers="continentHeaders"
              :items="continents"
              item-key="continent"
              class="elevation-1 justify-center"
              :loading="continentLoading"
              loading-text="Loading... Please wait"
              :search="continentSearch"
              :custom-filter="filterText"
              hide-default-footer
            >
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TotalsCard from "./TotalsCard.vue";

export default {
  name: "CountryPage",
  components: {
    TotalsCard,
  },
  data() {
    return {
      totalLoading: true,
      statesLoading: true,
    };
  },
  props: {
    countryName: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.getCountry(this.countryName);
  },
  computed: {
    ...mapState(["country"]),
  },
  methods: {
    ...mapActions(["getCountryAction"]),
    async getCountry(countryName) {
      await this.getCountryAction(countryName).finally(() => {
        this.totalLoading = false;
      });
    },
  },
};
</script>

<style></style>
