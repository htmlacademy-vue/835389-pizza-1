<template>
  <main class="layout">
    <AppLayoutSidebar data-test="sidebar" />

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <img
          data-test="avatar"
          :src="user.avatar"
          :alt="user.name"
          width="72"
          height="72"
        />
        <div class="user__name">
          <span data-test="user-name">{{ user.name }}</span>
        </div>
        <p class="user__phone">
          Контактный телефон:
          <span data-test="user-phone">{{ user.phone }}</span>
        </p>
      </div>

      <div class="layout__address">
        <div
          v-for="(item_address, i) in addresses"
          :key="item_address.id"
          class="sheet address-form"
          data-test="user-address"
        >
          <div class="address-form__header">
            <b>Адрес №{{ i + 1 }}. {{ item_address.name }}</b>
            <div class="address-form__edit">
              <button
                type="button"
                class="icon"
                data-test="change-address"
                @click="editAddress(item_address)"
              >
                <span class="visually-hidden">Изменить адрес</span>
              </button>
            </div>
          </div>
          <p>{{ formattedAddress(item_address) }}</p>
          <small>{{ item_address.comment }}</small>
        </div>
      </div>

      <div
        v-if="isFormAddress"
        data-test="form-address"
        class="layout__address"
      >
        <form
          data-test="form"
          class="address-form address-form--opened sheet"
          @submit.prevent="addAddress"
        >
          <div class="address-form__header">
            <b data-test="index-address">Адрес №{{ indexAddress }}</b>
          </div>

          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Название адреса*</span>
                <input
                  v-model="address.name"
                  type="text"
                  name="addr-name"
                  placeholder="Введите название адреса"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--normal">
              <label class="input">
                <span>Улица*</span>
                <input
                  v-model="address.street"
                  type="text"
                  name="addr-street"
                  placeholder="Введите название улицы"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Дом*</span>
                <input
                  v-model="address.building"
                  type="text"
                  name="addr-house"
                  placeholder="Введите номер дома"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Квартира</span>
                <input
                  v-model="address.flat"
                  type="text"
                  name="addr-apartment"
                  placeholder="Введите № квартиры"
                />
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Комментарий</span>
                <input
                  v-model="address.comment"
                  type="text"
                  name="addr-comment"
                  placeholder="Введите комментарий"
                />
              </label>
            </div>
          </div>

          <div class="address-form__buttons">
            <button
              v-if="address.id"
              type="button"
              class="button button--transparent"
              data-test="delete-address"
              @click="deleteAddress"
            >
              Удалить
            </button>
            <button type="submit" class="button" data-test="submit-address">
              Сохранить
            </button>
          </div>
        </form>
      </div>

      <div class="layout__button">
        <button
          type="button"
          class="button button--border"
          data-test="add-address"
          @click="isFormAddress = true"
        >
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import AppLayoutSidebar from "../layouts/AppLayoutSidebar";

export default {
  name: "Profile",

  components: { AppLayoutSidebar },

  data() {
    return {
      isFormAddress: false,
      address: {
        id: null,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
    };
  },

  computed: {
    ...mapState("Auth", {
      user: "user",
      addresses: "addresses",
    }),

    isValidAddress() {
      return this.address.name && this.address.street && this.address.building;
    },

    indexAddress() {
      if (this.address.id !== null) {
        return (
          this.addresses.findIndex((item) => item.id === this.address.id) + 1
        );
      } else {
        return this.addresses.length + 1;
      }
    },
  },

  created() {
    this.$store.dispatch("Auth/getAddresses");
  },

  methods: {
    formattedAddress(address) {
      return `${address.street}, д. ${address.building},
      ${address.flat ? "кв. " + address.flat : ""}`;
    },

    resetAddress() {
      this.address = {
        id: null,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
      this.isFormAddress = false;
    },

    deleteAddress() {
      this.$store.dispatch("Auth/deleteAddress", this.address.id);
      this.resetAddress();
    },

    editAddress(address) {
      this.isFormAddress = true;
      this.address = address;
    },

    addAddress() {
      if (this.isValidAddress) {
        if (this.address.id) {
          this.$store.dispatch("Auth/changeAddress", this.address);
        } else {
          this.$store.dispatch("Auth/addAddress", this.address);
        }
        this.resetAddress();
      }
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/address-form";
@import "~@/assets/scss/blocks/user";
@import "~@/assets/scss/blocks/icon";
@import "~@/assets/scss/blocks/input";
</style>
