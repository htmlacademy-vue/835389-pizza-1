import axios from "@/plugins/axios";

export class ReadOnlyApiService {
  #resource;
  constructor(resource) {
    this.#resource = resource;
  }

  async getList(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async getById(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource) {
    super(resource);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}
