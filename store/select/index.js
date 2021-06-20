export const state = () => ({
  id:"",
  name:"",
  price:"",
  header:"",
  description:"",
  url: ""
  
})

export const  mutations = {
  getSelected(state,payload) {
    state.id = payload.id;
    state.name = payload.name;
    state.price = payload.price;
    state.header = payload.header;
    state.description = payload.description;
    state.url = payload.url;
  }
}

export const getters = {
  setProducts({ commit }, candidateProducts) {
    commit("getSelected",candidateProducts )
  }
}

export const actions = {
  select({ commit }, selectedProducts) {
    commit("getSelected", selectedProducts[0]);
  }
}