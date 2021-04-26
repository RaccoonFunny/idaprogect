<template>
  <div :class="$style.overlay">
    <Alert v-if="showAlert" @close="showAlert = false" :message-header="'Запрос отправлен'" :sub-message="'В ближайшее время вам перезвонят'"/>
    <div :class="$style.overlayBg" @click="closeOverlay"/>
    <div :class="$style.cart">
      <div :class="$style.header">
        <span>Корзина</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" @click="closeOverlay">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="black"/>
        </svg>
      </div>
      <div :class="$style.empty" v-if="cartItem.length === 0">
        <p>
          Пока что вы ничего не добавили в корзину.
        </p>
        <button @click="closeOverlay">
          Перейти к выбору
        </button>
      </div>
      <div v-if="cartItem.length > 0" :class="$style.catItem">
        <p>
          Товары в корзине
        </p>
        <div :class="$style.itemsScroll">
        <CartItem v-for="item in cartItem" :key="item.id" :good="item"/>
        </div>
        <div :class="$style.orderForm">
          <form @submit.prevent="sendForm">
            <label>
              Оформить заказ
            </label>
            <input required v-model="name" type="text" placeholder="Ваше имя">
            <input required v-model="tel" v-mask="'+7 ### ###-##-##'" type="tel" maxlength="20" @focus="telFocus" placeholder="Телефон">
            <input required v-model="address" type="text" placeholder="Адрес">
            <input type="submit" value="Отправить">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/components/CartItem"

export default {
name: "Cart",
  data(){
    return {
      name: "",
      tel: "",
      address: "",
      showAlert: false
    }
  },
  methods: {
    telFocus: function () {
      let e = document.querySelector('input[type = tel]');
      e.placeholder = "+7 ___ ___-__-__";
    },
    sendForm: function () {
      this.showAlert = true;
      //axios send req to server//
      this.$store.dispatch("shopGoods/clearCart");
    },
    closeOverlay: function () {
      this.$emit("close")
    }
  },
  computed: {
    cartItem: function () {
      return this.$store.getters["shopGoods/getList"];
    }
  }
}
</script>

<style module lang="scss">
.overlay {
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  .overlayBg {
    background: #FFFFFF;
    opacity: 80%;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .cart {
    width: 364px;
    padding: 0 48px;
    background: white;
    opacity: 100%;
    box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px 0 0 8px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 54px 0 24px 0;

      span {
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 41px;
        color: #000000;
      }

      svg {
        cursor: pointer;
      }
    }
    .empty {
      p {
        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 28px;
        color: #000000;
        margin-bottom: 24px;
      }

      button {
        display: block;
        margin: 0 auto;
        width: 100%;
        height: 50px;
        background: #1F1F1F;
        border-radius: 8px;
        color: #FFFFFF;
        border: none;
      }
    }
    .catItem {
      p {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 23px;
        color: #59606D;
      }

    }
    .itemsScroll {
      max-height: 384px;
      overflow-y: auto;
    }

    .orderForm {
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 23px;
      color: #59606D;

      input {
        width: 364px;
        height: 22px;
        background: #F8F8F8;
        border-radius: 8px;
        border: none;
        margin-top: 16px;
        padding: 14px;

        &[type = submit] {
          background: #1F1F1F;
          color: white;
          margin-top: 24px;
          height: 50px;

          &:hover {
            background: #59606D ;
          }
        }
      }
    }
  }
}

</style>
