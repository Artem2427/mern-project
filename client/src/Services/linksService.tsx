import { api } from "./api";

const linksService: LinksService = {
  async createLink(body) {
    const res = await api.post("/link/generate", body);

    return res.data;
  },

  async fetchAllLinks() {
    const res = await api.get(`/link/all`);

    return res.data;
  },

  async getLinkById(linkId) {
    const res = await api.get(`/link/${linkId}`);

    return res.data;
  },
};

export default linksService;
