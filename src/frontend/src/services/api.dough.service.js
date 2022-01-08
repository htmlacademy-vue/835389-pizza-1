import { ReadOnlyApiService } from "./api.service";
import { PIZZA_DOUGH } from "../common/constants";

export class DoughApiService extends ReadOnlyApiService {
  constructor() {
    super("dough");
  }

  _addDoughType(dough) {
    return {
      ...dough,
      value: PIZZA_DOUGH.find(({ name }) => name === dough.name).value,
    };
  }

  async getList(config = {}) {
    const doughTypes = await super.getList(config);
    return (Array.isArray(doughTypes) ? doughTypes : []).map(
      this._addDoughType
    );
  }
}
