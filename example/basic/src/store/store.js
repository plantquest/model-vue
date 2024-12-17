import Vuex from 'vuex'


function makeStore(Vue) {
  Vue.use(Vuex)
  
  return new Vuex.Store({
    state: {
      // mapIndex: 0,

      vxg: {
        ent: {
          meta: {
            name: 'Item'
          }
        },
        cmp: {
          BasicSide: {
            show: true
          },
          BasicHead: {
            allow: {
              add: true
            },
            show: {
              add: true
            },
          }
        }
      },
      trigger: {
        led: {
          add: 0
        },
        search: {
          term: '',
          a: '',
          b: ''
        },
      },

    },
    
    mutations: {
      // SET_MAP_INDEX(state, index) {
      //   state.mapIndex = index;
      // },
    },
    actions: {
      // setMapIndex({ commit }, index) {
      //   commit('SET_MAP_INDEX', index);
      // },
      // getMapIndex({ state }) {
      //   return state.mapIndex;
      // },
    },
    modules: {
    }
  })
}

export {
  makeStore
}
