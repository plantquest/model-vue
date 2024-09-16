<template>
  <v-navigation-drawer
    app
    class="vxg-side"
    :style="drawerStyle"
    >
    <v-sheet style="display: flex; flex-direction: column; height:100%;">
      <div style="display: flex; justify-content: space-between;">
        <div style="" v-html="logo"></div>

        <v-icon
          large
          @click="closeDrawer"
          style="width:48px;"
          dark
          >mdi-chevron-left</v-icon>
      </div>

      <v-btn-toggle class="vxg-toggle" 
        v-model="menuViewIndex"
        mandatory
        >
        <v-btn
          v-for="menuView in menuViewList"
          :key="menuView.name"
          @click="moveRoute(menuView)"
          outlined 
          :ref="menuView.name"
          class="pa-4 text-center secondary text-no-wrap rounded-sm btn-style text-capitalize" color= "white"
          style="height: 70px;"
          >
          <div>
          <v-icon style='color: white;'>
            {{ menuView.name == custom.special.view.name ? 'mdi-fit-to-screen-outline' : 'mdi-dots-square'}}
          </v-icon>
          <span style="display: block;font-size: 13px; padding: 5px;"> {{ menuView.btnTitle }} </span>
          </div>
        </v-btn>
      </v-btn-toggle>

      <!--
      <h1 v-if="menuShowTitle">{{ menuView.title }} </h1>
      -->
      
      <template
        v-if="'standard' === menuView.mode"
        v-for="item in menu">
        <component
          v-if="allow(item)"
          :is="'router-link'"
          :to="'/'+item.code"
          :key="item.code"
          :class="item.klass"
          style="flex-grow:1;"
          >
          <v-icon>mdi-{{ item.icon }}</v-icon> {{ item.title }}
        </component>
      </template>

      <component
        v-if="'custom' === menuView.mode"
        :is="menuView.cmp"
        :spec="menuView.view.spec"
        >
      </component>

      
      <div style="flex-grow:100;"></div>
      <v-divider></v-divider>

      <component
        v-if="spec.footer.active"
        :is="spec.footer.cmp"
        :spec="spec.footer.spec"
        >
      </component>
      
           
    </v-sheet>
  </v-navigation-drawer>
</template>

<script>

import Nua from 'nua'
import { Gubu, Open, Required, Skip, Value } from 'gubu'


const SpecShape = Gubu({
  spec: Required(Open({
    footer: {
      active: false,
      cmp: Skip(String),
      spec: Open({}),
    },

    view: Value(Open({
      mode: String
    }),Open({}))
  })),
  logo: String,
})

export default {

  props: {
    spec: {
      type: Object,
      required: true,
    },
    logo: String,
  },
  
  data () {
    return {
      open: true,
      menuShowTitle: false,
      menuViewList: [],
      menuViewIndex: null,
      menuView: null,
      roomName: '',
    }
  },

  beforeCreate() {
    Nua(this.$options.propsData, SpecShape(this.$options.propsData))
  },
  
  created () {
    let menuViewList = []
    for(let name in this.spec.view) {
      let menuView = this.spec.view[name]
      menuView.name = name
      menuViewList.push(menuView)
    }
    this.menuViewList = menuViewList
    let route = this.findRouteName(this.$route.name) 

    this.menuView = this.menuViewList[route.index]
    this.menuViewIndex = route.index
    
  },


  watch: {
    menuViewIndex(index) {
      let pathname = null
      pathname = this.menuView.name
      /*
      if('custom' === this.menuView.mode) {
        pathname = this.menuView.name
      }
      else {
        if(this.$route.path == this.portal.path) {
          pathname = this.menuView.menu.default
        }
        else {
          pathname = this.$route.name
        }
      }

      if(pathname && pathname !== this.$route.name ) {
        this.$router.push(pathname)
      }
      */
    },
    '$route.name': {
      immediate: true,
      handler (val) {
        if(!val && this.defaultFound()) {
          this.$router.push(this.menuView.menu.default)
        }
        
        let route = this.findRouteName(val)
        
        this.menuView = this.menuViewList[route.index]
      } 
    },
  },
  
  
  computed: {
    menu () {
      let active_item_code = this.$route.meta.view

      let ux_items = []
      if('standard' === this.menuView.mode) {
        let menu = this.menuView.menu
        let spec_items = menu.items
        let ordered_codes = menu.order.split(/\s*,\s*/)
        ux_items =
          ordered_codes
          .reduce((a,c)=>(a.push(Object.assign({code:c},spec_items[c])),a),[])
          .map(item=>{
            item.klass = Object.assign({
              'vxg-router-link': true,
            })
            return item
          })
      }
      return ux_items
    },

    drawerStyle() {
      return {width: "282px"} // 250 px
    },
    custom () {
      return this.$model.main.ux.custom
    },

    view () {
      return this.custom.special.view
    },

    portal () {
      return this.custom.special.portal
    },
  },

  methods: {
    moveRoute(menuView) {
      let path = this.$route.name
      
      if(menuView.mode == 'standard') {
        if(path != menuView.menu.default) {
          this.$router.push('/'+menuView.menu.default)
        }
      }
      else if(menuView.mode == 'custom') {
        if(path != menuView.name) {
          this.$router.push('/'+menuView.name)
        }
      }
      
    },
  
    defaultFound() {
      return this.menuView && this.menuView.menu && this.menuView.menu.default
    },
    
    findRouteName(name) {
      let subroutes

      for(let route in this.custom.special) {

        if(this.custom.special[route].name == name) {
          return this.custom.special[route]
        }
        if(subroutes = this.custom.special[route].sub) {
          for(let sub of subroutes) {
            if(sub == name) {
              return this.custom.special[route]
            }
          }
        }

      }

      return {index: 1} // default index
    },
    allow(item) {
      let out = (item && item.allow) ? this.$vxg.allow( item.allow ) : true
      return out
    },
    openDrawer() {
      this.$store.dispatch('set_cmp_flags',{name:'BasicSide', flags:{show:true}})
    },
    closeDrawer() {
      this.$store.dispatch('set_cmp_flags',{name:'BasicSide', flags:{show:false}})
    },
    action(name) {
      this.$emit('action', name)
    }
  }

}
</script>


<style lang="scss">
nav.vxg-side {
    background-color: rgb(var(--vxg-cb1)) !important;

    .v-sheet {
        background-color: rgb(var(--vxg-cb1)) !important;
    }

    .v-divider {
        border-color: rgb(var(--vxg-ct2)) !important;
        margin: 16px 8px;
    }
}
.btn-style{
    background-color: rgb(0, 0, 26) !important;
    width: 141px;
}

.vxg-toggle{
    background-color: rgb(var(--vxg-cb1)) !important;
}

a.vxg-router-link {
    display: block;
    margin: 0px 8px;
    padding: 16px 8px;
    text-decoration: none !important;
    color: rgb(var(--vxg-ct1)) !important;
    border-radius: 8px;
    
    .v-icon {
        color: rgb(var(--vxg-ct2)) !important;
    }
    
    &.router-link-active {
        background-color: rgb(var(--vxg-cb2)) !important;
        color: rgb(var(--vxg-ct1)) !important;
        .v-icon {
            color: rgb(var(--vxg-ct1)) !important;
        }
    }

}
.vxg-side-open {
    width: 48px;
    height: 48px;
}
</style>
