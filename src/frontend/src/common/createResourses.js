import resources from "./resourses";
import { AuthApiService } from "@/services/api.auth.service";
import { DoughApiService } from "@/services/api.dough.service";
import { IngredientsApiService } from "@/services/api.ingredients.service";
import { SizesApiService } from "@/services/api.sizes.service";
import { SaucesApiService } from "@/services/api.sauces.service";
import { MiscApiService } from "@/services/api.misc.service";
import { AddressesApiService } from "@/services/api.addresses.service";
import { OrdersApiService } from "@/services/api.orders.service";

export const createResources = () => ({
  [resources.AUTH]: new AuthApiService(),
  [resources.DOUGH_TYPES]: new DoughApiService(),
  [resources.INGREDIENTS]: new IngredientsApiService(),
  [resources.SIZES]: new SizesApiService(),
  [resources.SAUCES]: new SaucesApiService(),
  [resources.MISC]: new MiscApiService(),
  [resources.ADDRESSES]: new AddressesApiService(),
  [resources.ORDERS]: new OrdersApiService(),
});
