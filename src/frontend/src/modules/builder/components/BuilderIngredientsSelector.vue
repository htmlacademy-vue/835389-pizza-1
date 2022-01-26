<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in pizza.sauces"
            :key="`sauce-${sauce.id}`"
            :input="sauce"
            :class-name="'radio ingredients__input'"
            name="sauce"
            @change="changeSauce"
            :checked="sauce.id === currentPizza.sauces.id"
            data-test="sauce-radio-button"
          />
        </div>
        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              v-for="ingredient in pizza.ingredients"
              :key="`ingredient-${ingredient.id}`"
              class="ingredients__item"
            >
              <SelectorItem :item="ingredient" data-test="selector-item" />
              <ItemCounter
                :count="ingredient.count"
                :id="ingredient.id"
                @change-count="changeIngredient"
                data-test="item-counter"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState("Builder", {
      pizza: "pizza",
      currentPizza: "currentPizza",
    }),
  },
  methods: {
    changeSauce(id) {
      this.$store.dispatch("Builder/changePizza", { name: "sauces", id });
    },
    changeIngredient(id, count) {
      this.$store.dispatch("Builder/changeIngredients", { id, count });
    },
  },
};
</script>
