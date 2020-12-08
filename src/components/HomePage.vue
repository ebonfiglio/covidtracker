<template>
  <v-container fluid>
    <v-row>
      <v-col md="6" xl="4">
        <TotalsCard :totals="total" :loading="totalLoading" />
      </v-col>
      <v-col md="6" xl="4">
        <v-card elevation="8" tile :loading="continentLoading">
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
      </v-col>
      <v-col md="6" xl="4">
        <v-card elevation="8" tile :loading="totalLoading">
          <v-card-text>
            <v-data-table
              dense
              :headers="countryHeaders"
              :items="countries"
              item-key="country"
              class="elevation-1 justify-center"
              :loading="countryLoading"
              loading-text="Loading... Please wait"
              :search="countrySearch"
              :custom-filter="filterText"
            >
              <template v-slot:[`item.country`]="{ item }">
                <router-link
                  :to="{
                    name: 'CountryPage',
                    params: { countryName: item.country },
                  }"
                  >{{ item.country }}</router-link
                >
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TotalsCard from "./TotalsCard.vue";

const headers = [
  { text: "Cases", value: "cases" },
  { text: "Active", value: "active" },
  { text: "Cases Per Million", value: "casesPerOneMillion" },
  { text: "Deaths", value: "deaths" },
  { text: "Deaths Per Million", value: "deathsPerOneMillion" },
  { text: "Recovered", value: "recovered" },
];

export default {
  name: "HomePage",
  components: {
    TotalsCard,
  },
  data() {
    return {
      totalLoading: true,
      continentLoading: true,
      countryLoading: true,
      continentSearch: "",
      countrySearch: "",
    };
  },
  mounted() {
    this.getTotal();
    this.getContinents();
    this.getCountries();
  },
  computed: {
    ...mapState(["total", "continents", "countries"]),
    continentHeaders() {
      const customHeaders = [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "continent",
        },
        ...headers,
      ];
      return customHeaders;
    },
    countryHeaders() {
      const customHeaders = [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "country",
        },
        ...headers,
      ];
      return customHeaders;
    },
  },
  methods: {
    ...mapActions([
      "getTotalAction",
      "getContinentsAction",
      "getCountriesAction",
    ]),
    async getTotal() {
      await this.getTotalAction().finally(() => {
        this.totalLoading = false;
      });
    },
    async getContinents() {
      await this.getContinentsAction().finally(() => {
        this.continentLoading = false;
      });
    },
    async getCountries() {
      await this.getCountriesAction().finally(() => {
        this.countryLoading = false;
      });
    },
    filterText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().indexOf(search) !== -1
      );
    },
  },
};
</script>

<style></style>
