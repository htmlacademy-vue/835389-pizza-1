<template>
  <main class="content">
    <form
      action="#"
      method="post"
    >
      <div class="content__wrapper">
        <h1 class="title title--big">
          Конструктор пиццы
        </h1>
        <BuilderDoughSelector data-test="builder-dough" />
        <BuilderSizeSelector data-test="builder-size" />
        <BuilderIngredientsSelector data-test="builder-ingredients" />
        <BuilderPizzaView data-test="builder-view" />
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";

export default {
  name: "Index",

  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
};
</script>
