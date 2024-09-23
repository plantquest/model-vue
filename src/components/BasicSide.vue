<template>
  <v-navigation-drawer app class="vxg-side" :style="drawerStyle">
    
    <v-sheet class="d-flex flex-column h-100">
      <!-- Header -->
      <div class="d-flex justify-space-between">
        <div v-html="logo"></div>
        <v-icon v-once large @click="closeDrawer" class="drawer-toggle" dark>mdi-chevron-left</v-icon>
      </div>

      <!-- Menu Toggle -->
      <v-btn-toggle v-model="menuViewIndex" mandatory class="vxg-toggle">
        <v-btn
          v-for="menuView in menuViewList"
          :key="menuView.name"
          @click="moveRoute(menuView)"
          outlined
          :ref="menuView.name"
          class="pa-4 text-center secondary text-no-wrap rounded-sm btn-style text-capitalize"
          :class="{ 'selected-btn': menuViewIndex === menuViewList.indexOf(menuView) }"
          color="white"
        >
          <div>
            
            <v-icon v-once color="white">
              {{ menuView.name === custom.special.view.name ? 'mdi-fit-to-screen-outline' : 'mdi-dots-square' }}
            </v-icon>
            <span class="d-block font-size-13 pt-2">{{ menuView.btnTitle }}</span>
          </div>
        </v-btn>
      </v-btn-toggle>

      <!-- Menu Items -->
      <template v-if="menuView.mode === 'standard'">
        <router-link
          v-for="item in menu"
          v-if="allow(item)"
          :key="item.code"
          :to="`/${item.code}`"
          :class="['vxg-router-link', item.klass]"
        >
          <v-icon v-once>mdi-{{ item.icon }}</v-icon> {{ item.title }}
        </router-link>
      </template>

      <component
        v-else-if="menuView.mode === 'custom'"
        :is="menuView.cmp"
        :spec="menuView.view.spec"
      />

      <v-spacer></v-spacer>
      <v-divider></v-divider>

      
      <!-- Footer -->
      <component
        v-if="spec.footer.active"
        :is="spec.footer.cmp"
        :spec="spec.footer.spec"
      />
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
      if (this.menuView.mode !== 'standard') return [];

      const { items, order } = this.menuView.menu;
      return order.split(/\s*,\s*/).map(code => ({
        ...items[code],
        code,
        klass: { 'vxg-router-link': true }
      }));
    },

    drawerStyle() {
      return DRAWER_STYLE;
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
      const path = this.$route.name;
      const targetPath = menuView.mode === 'standard' ? menuView.menu.default : menuView.name;
      
      if (path !== targetPath) {
        this.$router.push(`/${targetPath}`);
      }
    },
  
    defaultFound() {
      return this.menuView && this.menuView.menu && this.menuView.menu.default
    },
    
    findRouteName(name) {
     const specialRoutes = this.custom.special;
     for (let route in specialRoutes) {
       const currentRoute = specialRoutes[route];
       if (currentRoute.name === name) {
         return currentRoute;
       }
       if (currentRoute.sub && currentRoute.sub.includes(name)) {
         return currentRoute;
       }
     }
     return { index: 1 }; // default index
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

const DRAWER_STYLE = Object.freeze({ width: "282px" });


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
    background-color: rgb(40, 51, 72) !important;
    width: 141px;
    height: 281px;

    margin: 4px !important; // Added margin for spacing between buttons
    &.selected-btn {
        background-color: rgb(var(--vxg-cb1)) !important;
        color: rgb(var(--vxg-ct1)) !important;
        .v-icon {
            color: rgb(var(--vxg-ct1)) !important;
        }
    }
}

.vxg-toggle{
    background-color: rgb(var(--vxg-cb1)) !important;
    padding: 10px !important; // Added padding to the toggle container
    padding-bottom: 10px;
    padding-top: 10px;
    margin-right: 10px;

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

.drawer-toggle {
  width: 48px;
}

.font-size-13 {
  font-size: 13px;
}
</style>
