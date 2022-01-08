import { CrudApiService } from "./api.service";

export class AddressesApiService extends CrudApiService {
  constructor() {
    super("addresses");
  }
}
