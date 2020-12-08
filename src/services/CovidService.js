/* eslint-disable class-methods-use-this */
import Axios from "axios";

class CovidService {
  async getTotal() {
    try {
      const response = await Axios.get("https://corona.lmao.ninja/v2/all");
      if (response.status === 200) {
        response.data.name = "Worldwide";
        return response.data;
      }
      throw new Error("Error getting data from server.");
    } catch (error) {
      return null;
    }
  }

  async getContinents() {
    try {
      const response = await Axios.get(
        "https://corona.lmao.ninja/v2/continents"
      );
      if (response.status === 200) return response.data;
      throw new Error("Error getting data from server.");
    } catch (error) {
      return null;
    }
  }

  async getCountries() {
    try {
      const response = await Axios.get(
        "https://corona.lmao.ninja/v2/countries"
      );
      if (response.status === 200) return response.data;
      throw new Error("Error getting data from server.");
    } catch (error) {
      return null;
    }
  }

  async getCountry(country) {
    try {
      const response = await Axios.get(
        `https://corona.lmao.ninja/v2/countries/${country}`
      );
      if (response.status === 200) return response.data;
      throw new Error("Error getting data from server.");
    } catch (error) {
      return null;
    }
  }
}
export default new CovidService();
