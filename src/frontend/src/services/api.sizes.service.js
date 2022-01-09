import { ReadOnlyApiService } from "./api.service";
import { PIZZA_SIZES } from "../common/constants";

export class SizesApiService extends ReadOnlyApiService {
  constructor() {
    super("sizes");
  }

  _addSizeTypes(size) {
    return {
      ...size,
      value: PIZZA_SIZES.find(({ name }) => name === size.name).value,
    };
  }

  async getList(config = {}) {
    const sizes = await super.getList(config);
    return (Array.isArray(sizes) ? sizes : []).map(this._addSizeTypes);
  }
}
