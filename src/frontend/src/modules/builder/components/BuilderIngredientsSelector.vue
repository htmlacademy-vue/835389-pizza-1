<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="(sauce, i) in sauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <input
              type="radio"
              name="sauce"
              :value="sauce.value"
              :checked="i === 0"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>
        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <SelectorItem :item="ingredient" />
              <ItemCounter :count="ingredient.count" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "../../../common/components/ItemCounter";
import SelectorItem from "../../../common/components/SelectorItem";
export default {
  name: "BuilderIngredientsSelector",
  components: {
    SelectorItem,
    ItemCounter,
  },
  props: {
    sauces: {
      type: Array,
      default() {
        return [];
      },
    },
    ingredients: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
