export const state = () => ({
  shopGoodsTitle: {
  },
  shopGoods: [],
  list: []
})

export const actions = {
  async fetch ({ commit }) {
    const shopGoods = await this.$axios.$get('https://frontend-test.idaproject.com/api/product-category');
    commit('setShopGoodsTitle', shopGoods);
  },

  downloadShopGoods: async function ({commit}, goods) {
    commit('setShopGoods', goods);
  },

  addGoodInCart: function ({commit, state}, good) {
    //обновляем статус товара
    commit('updateGoodInCart', good);
    //добавляем или удаляем товар из корзины
    let index = state.list.findIndex(listItem => listItem.id === good.id);
    if( index !== -1){
      commit("remove", [good, index]);
    } else {
      commit("add", good)
    }
  },

  clearCart({commit}) {
    commit("clearCart");
  },

  changeSortType: function ({commit}, [style, category]) {
    commit('sortBy', [category, style]);
  }
}

export const mutations = {
  setShopGoodsTitle: function (state, shopGoods) {
    state.shopGoodsTitle = shopGoods;
  },

  setShopGoods: function (state, shopGoods) {
    let id = shopGoods[0].category;
    state.shopGoods[id] = shopGoods;
  },

  sortBy: function (state, [category, style]) {
    state.shopGoods[category].sort((a, b) => {
      return a[style] > b[style] ? 1 : -1;
    }).reverse()
  },

  add (state, item) {
    // вносим новый товар в корзину
    state.list.push(item)
    // кешируем обновлённую корзину
    window.localStorage.setItem("list", JSON.stringify(state.list));
  },

  remove (state, [item, index]) {
    state.list.splice( index,1);
  },

  clearCart (state) {
    state.list = []
  },

  updateGoodInCart: function (state, good) {
    //находим индекс нужного товара
    let stateGood = state.shopGoods[good.category].findIndex(shopGood => shopGood.id === good.id);
    state.shopGoods[good.category][stateGood].inCart = !state.shopGoods[good.category][stateGood].inCart;
  },
}

export const getters = {
  getShopGoodsTitle: state => {
    return state.shopGoodsTitle;
  },

  getList: state => {
    return state.list;
  },

  getShopGoods: state => id => {
    return state.shopGoods[id];
  },

  getGoodStatus: state => id => {
    return state.list.findIndex(list => list.id === id) > -1;
  }
}
