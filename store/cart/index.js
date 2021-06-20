export const state = () => ({
  cartsLineUp:[],
  totalPrice:"",
})

export const  mutations = {
  push_to_cart(state, payload) {//idかぶらないとき追加
    state.cartsLineUp.push({
      id: payload.selectedPro.id,
      name: payload.selectedPro.name,
      price: payload.selectedPro.price,
      amount: payload.amount,
      url: payload.selectedPro.url,
    })
  },
  increament_amount(state,payload) {//idかぶっている時個数増加
    payload.cartItem.amount = payload.total;
  },
  push_to_totalPrice(state,payload) {
    state.totalPrice = payload.totalPrice;
  },
  changeAmount(state, { currentAmo,id}) {
    const sameItemId = state.cartsLineUp.find(
      item => item.id === id
    )
    sameItemId.amount = currentAmo; 
  },
  deleteProduct(state,id) {
    console.log(state.cartsLineUp);
    const leftProducts = state.cartsLineUp.filter(value => {
      return value.id !== id 
    })
    state.cartsLineUp = leftProducts;
    console.log(state.cartsLineUp);
  },
  allDelete(state) {
    state.cartsLineUp = [];
  }
}


export const getters = {
  currentProducts: state => {
    return state.cartsLineUp;
  },
  totalPrice: state => {
    return state.totalPrice; 
  },
}

export const actions = {
  add_product_to_cart({ commit, rootState, state }, amount) {
    const selectedPro = rootState.select;
    const cartItem = state.cartsLineUp.find(
      item => item.id === selectedPro.id
    )
    if (!cartItem) {
      commit('push_to_cart', { rootState, selectedPro , amount })
    } else {
      let total =  parseInt(cartItem.amount) + parseInt(amount);
      commit('increament_amount', { rootState, cartItem ,total})
    }
  },
  calTotalPrice({ commit, rootState, state }) {
    const cartItem = state.cartsLineUp;
    const totalPrice = cartItem.reduce((prev,current) => {
      
     return prev + current.amount * current.price;
    },0);
    commit('push_to_totalPrice',{rootState, totalPrice});
  } ,
}