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
          class="sheet address-form"
          v-for="(address, i) in addresses"
          :key="address.id"
          data-test="user-address"
        >
          <div class="address-form__header">
            <b>Адрес №{{ i + 1 }}. {{ address.name }}</b>
            <div class="address-form__edit">
              <button type="button" class="icon" @click="editAddress(address)">
                <span class="visually-hidden">Изменить адрес</span>
              </button>
            </div>
          </div>
          <p>{{ formattedAddress(address) }}</p>
          <small>{{ address.comment }}</small>
        </div>
      </div>

      <div
        data-test="form-address"
        class="layout__address"
        v-if="isFormAddress"
      >
        <form
          @submit.prevent="addAddress"
          class="address-form address-form--opened sheet"
        >
          <div class="address-form__header">
            <b>Адрес №{{ indexAddress }}</b>
          </div>

          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Название адреса*</span>
                <input
                  type="text"
                  name="addr-name"
                  placeholder="Введите название адреса"
                  v-model="address.name"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--normal">
              <label class="input">
                <span>Улица*</span>
                <input
                  type="text"
                  name="addr-street"
                  placeholder="Введите название улицы"
                  v-model="address.street"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Дом*</span>
                <input
                  type="text"
                  name="addr-house"
                  placeholder="Введите номер дома"
                  v-model="address.building"
                  required
                />
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Квартира</span>
                <input
                  type="text"
                  name="addr-apartment"
                  placeholder="Введите № квартиры"
                  v-model="address.flat"
                />
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Комментарий</span>
                <input
                  type="text"
                  name="addr-comment"
                  placeholder="Введите комментарий"
                  v-model="address.comment"
                />
              </label>
            </div>
          </div>

          <div class="address-form__buttons">
            <button
              type="button"
              class="button button--transparent"
              v-if="address.id"
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
          @click="isFormAddress = true"
          data-test="add-address"
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
        if (this.address.id !== null) {
          this.$store.dispatch("Auth/changeAddress", this.address);
        } else {
          this.$store.dispatch("Auth/addAddress", this.address);
        }
        this.resetAddress();
      }
    },
  },
  created() {
    this.$store.dispatch("Auth/getAddresses");
  },
};
</script>
