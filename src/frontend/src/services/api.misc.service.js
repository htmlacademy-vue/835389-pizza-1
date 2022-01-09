import { ReadOnlyApiService } from "./api.service";

export class MiscApiService extends ReadOnlyApiService {
  constructor() {
    super("misc");
  }

  _formatMisc(misc) {
    return {
      ...misc,
      qty: 0,
    };
  }

  async getList(config = {}) {
    const misc = await super.getList(config);
    return (Array.isArray(misc) ? misc : []).map(this._formatMisc);
  }
}
