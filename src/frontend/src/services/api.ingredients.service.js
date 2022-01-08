import { ReadOnlyApiService } from "./api.service";
import { PIZZA_INGREDIENTS } from "../common/constants";

export class IngredientsApiService extends ReadOnlyApiService {
  constructor() {
    super("ingredients");
  }

  _formatIngredient(ingredient) {
    return {
      ...ingredient,
      value: PIZZA_INGREDIENTS.find(({ name }) => name === ingredient.name)
        .value,
      count: 0,
    };
  }

  async getList(config = {}) {
    const ingredients = await super.getList(config);
    return (Array.isArray(ingredients) ? ingredients : []).map(
      this._formatIngredient
    );
  }
}
