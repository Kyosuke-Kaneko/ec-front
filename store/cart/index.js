export const state = () => ({
  cartsLineUp:[],
  totalPrice:"",
})

export const  mutations = {
  pushToCart(state, payload) {
    state.cartsLineUp.push({
      id: payload.selectedPro.id,
      name: payload.selectedPro.name,
      price: payload.selectedPro.price,
      amount: payload.amount,
      url: payload.selectedPro.url,
    })
  },
  increamentAmount(state,payload) {
    payload.cartItem.amount = payload.total;
  },
  pushToTotalPrice(state,payload) {
    state.totalPrice = payload.totalPrice;
  },
  changeAmount(state, { currentAmo,id}) {
    const sameItemId = state.cartsLineUp.find(
      item => item.id === id
    )
    sameItemId.amount = currentAmo; 
  },
  deleteProduct(state,id) {
    const leftProducts = state.cartsLineUp.filter(value => {
      return value.id !== id 
    })
    state.cartsLineUp = leftProducts;
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
  addProductToCart({ commit, rootState, state }, amount) {
    const selectedPro = rootState.select;
    const cartItem = state.cartsLineUp.find(
      item => item.id === selectedPro.id
    )
    if (!cartItem) {
      commit('pushToCart', { rootState, selectedPro , amount })
    } else {
      let total =  parseInt(cartItem.amount) + parseInt(amount);
      commit('increamentAmount', { rootState, cartItem ,total})
    }
  },
  calTotalPrice({ commit, rootState, state }) {
    const cartItem = state.cartsLineUp;
    const totalPrice = cartItem.reduce((prev,current) => {
     return prev + current.amount * current.price;
    },0);
    commit('pushToTotalPrice',{rootState, totalPrice});
  } ,
}