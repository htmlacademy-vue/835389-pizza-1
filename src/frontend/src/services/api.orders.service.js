import { CrudApiService } from "./api.service";

export class OrdersApiService extends CrudApiService {
  constructor() {
    super("orders");
  }
}
