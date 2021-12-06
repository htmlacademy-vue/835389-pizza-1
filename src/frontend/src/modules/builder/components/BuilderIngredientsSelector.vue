<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="(sauce, i) in sauces"
            :key="sauce.id"
            :input="sauce"
            :class-name="'radio ingredients__input'"
            :name="'sauce'"
            @change="changeSauce"
            :checked="i === 0"
          />
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
              <ItemCounter
                :count="ingredient.count"
                :id="ingredient.id"
                @change-count="changeIngredient"
              />
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
import RadioButton from "../../../common/components/RadioButton";
export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
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
  methods: {
    changeSauce(id) {
      this.$emit("change-sauce", id);
    },
    changeIngredient(id, count) {
      this.$emit("change-ingredient", id, count);
    },
  },
};
</script>
