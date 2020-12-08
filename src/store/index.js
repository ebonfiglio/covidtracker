import Vue from "vue";
import Vuex from "vuex";

import covidService from "../services/CovidService";
import {
  GET_CONTINENTS,
  GET_COUNTRIES,
  GET_TOTAL,
  GET_COUNTRY,
} from "./mutation-types";

Vue.use(Vuex);

const state = () => ({
  total: {
    cases: 0,
    deaths: 0,
    active: 0,
    recovered: 0,
  },
  continents: [],
  countries: [],
  country: {},
});

const mutations = {
  [GET_TOTAL](state, total) {
    state.total = total;
  },
  [GET_CONTINENTS](state, continents) {
    state.continents = continents;
  },
  [GET_COUNTRIES](state, countries) {
    state.countries = countries;
  },
  [GET_COUNTRY](state, country) {
    state.country = country;
  },
};

const actions = {
  async getTotalAction({ commit }) {
    const total = await covidService.getTotal();
    commit(GET_TOTAL, total);
  },
  async getContinentsAction({ commit }) {
    const continents = await covidService.getContinents();
    commit(GET_CONTINENTS, continents);
  },
  async getCountriesAction({ commit }) {
    const countries = await covidService.getCountries();
    commit(GET_COUNTRIES, countries);
  },
  async getCountryAction({ commit }, name) {
    const country = await covidService.getCountry(name);
    country.name = name;
    commit(GET_COUNTRY, country);
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
