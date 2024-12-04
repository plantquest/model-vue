<template>
  <v-navigation-drawer app class="vxg-side" :style="drawerStyle">
    
    <v-sheet class="d-flex flex-column h-100">
      <!-- Header -->
      <div class="d-flex justify-space-between "
       style="background:#27324A" >
        <div v-html="logo"></div>
        
        <v-icon v-once large @click="openDrawer" class="drawer-toggle"  style="color: white ;font-size: 29px;">
          mdi-chevron-left-circle-outline
        </v-icon>
       
      </div>


      <template
  v-if="'standard' === menuView.mode"
  v-for="item in menu">
  <component :is="item.component">
    <!-- Your component content here -->
  </component>
</template>
      
      <v-combobox
        ref="search"
        v-model="search"
        @keydown="changeSearch($event)"
        @click:clear="changeSearch($event)"
        :items="tag_items"
        flat
        hide-details
        outlined
        dense
        clearable
        placeholder="Search Point"
        :append-icon="filterIcon?'mdi-tune':undefined"
        @click:append="filter"
        :filter="customFilter"
        >
       
      </v-combobox> 
      <v-combobox
        ref="search2"
        v-model="search2"
        @keydown="changeSearch2($event)"
        @click:clear="changeSearch2($event)"
        :items="tag_items2"
        flat
        hide-details
        outlined
        dense
        clearable
        placeholder="Search Destination"
        :append-icon="filterIcon?'mdi-tune':undefined"
        @click:append="filter"
        :filter="customFilter"
        >
        
      </v-combobox> 
     
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
import {  mapActions } from 'vuex';
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

function tag_alias(asset) {
  if (null != asset.custom12) {
    return asset.tag + '(' + asset.custom12 + ')'
  }
  return asset.tag
}

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
      search: '',
      search2:'',
      tag_items:[],
      tag_items2:[],
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
    
    let tool = {}

    let load_assets = setInterval(async ()=>{
      await this.$store.dispatch('vxg_get_assets', tool)
      this.items = tool.assets
      this.items2 = [...tool.assets]
      if(this.items.length != 0) {
        // this.tag_items = this.items.map(v => v.tag+(''==v.custom12?'':' ('+v.custom12+')'))
        this.tag_items = this.items.map(tag_alias)
        this.tag_items2 = this.items2.map(tag_alias)
        this.setupMiniSearch(this.items)
        this.setupMiniSearch(this.items2)
        clearInterval(load_assets)
      } 
    }, 111)
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
    '$store.state.trigger.search.a' (term) {
      if(term == '' && this.$refs.search) {
        this.$refs.search.reset()
        // this.tag_items = this.items.map(v => v.tag)
        this.tag_items = this.items.map(tag_alias)
        console.log('search is being triggerecd')
      }
    },

    '$store.state.trigger.search.b' (term) {
      if(term == '' && this.$refs.search2) {
        this.$refs.search2.reset()
        // this.tag_items = this.items.map(v => v.tag)
        this.tag_items2 = this.items2.map(tag_alias)
      }
    },
    search (val) {
      let term = val || ''
      term.trim()
     
      this.$store.dispatch('trigger_search', {a: term})
    },
    search2 (val) {
      let term = val || ''
      term.trim()
    
      this.$store.dispatch('trigger_search', {b: term})
    },
    select () {
      this.$store.dispatch('trigger_select', {value:this.select})
    },
    '$store.state.trigger.select.value' (val) {
      this.select = val
    },
    '$store.vxg.cmp.BasicHead.allow.add': {
      handler() {
        this.$forceUpdate()
      }
    },
    '$store.vxg.cmp.BasicHead.allow.remove': {
      handler() {
        this.$forceUpdate()
      }
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
    filterDisabled () {
      return this.$store.state.trigger.filter_disabled.value
    },

    prependIcon() {
      return this.showIcon ? 'mdi-magnify magnifierIcon' : ''; // Conditionally bind the icon
    },


    menu () {
      if (this.menuView.mode !== 'standard') return [];

      const { items, order } = this.menuView.menu;
      return order.split(/\s*,\s*/).map(code => ({
        ...items[code],
        code,
        klass: { 'vxg-router-link': true }
      }));
    },

    filterIcon (){
      return this.$store.state.vxg.cmp.BasicHead.show.filter
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
    tool() {
      // TODO: better if main.app.web.parts.head was provided directly
      let headtool = this.$model.main.app.web.parts.head.tool
      let viewtool = this.view.tool
      let tool = this.$main.seneca.util.deep(headtool, viewtool)
      return tool
    },

    search_config() {
      return this.$model.main.ux.custom.search_config
    }
  },

  methods: {
 
    moveRoute(menuView) {
      const path = this.$route.name;
      const targetPath = menuView.mode === 'standard' ? menuView.menu.default : menuView.name;
      
      if (path !== targetPath) {
        this.$router.push(`/${targetPath}`);
      }
    },

    async setupMiniSearch(items) {
      for(const item of items) {
        // item = {...item}
        this.$seneca.post('sys:search, cmd:add', { doc: item, })
      }
    },

      // bypass default combobox filter
      customFilter (item, queryText, itemText) {
        return 1
      },

    changeSearch(event) {

      setTimeout(async ()=> { // wait for input
        let term
        term = event.target ? event.target._value : null
        if(term) {
          let out = await this.$seneca.post('sys:search, cmd:search', 
            { query: term, params: this.search_config }
          )
         
          // this.tag_items = out.data.hits.map(v => v.id)
          this.tag_items = out.data.hits.map(v=>tag_alias(v.doc))
          console.log('tag items are ', this.tag_items)
        }
        else {
          // this.tag_items = this.items.map(v => v.tag)
          if(this.items != undefined)
          this.tag_items = this.items.map(tag_alias)
        }
       
        
      }, 11)
      
    },
    changeSearch2(event) {

    setTimeout(async ()=> { // wait for input
      let term
      term = event.target ? event.target._value : null
      if(term) {
        let out = await this.$seneca.post('sys:search, cmd:search', 
          { query: term, params: this.search_config }
        )
      
      
        this.tag_items2 = out.data.hits.map(v=>tag_alias(v.doc))
        console.log('tag items are ', this.tag_items2)
      }
      else {
       
        if(this.items2 != undefined)
        this.tag_items2 = this.items2.map(tag_alias)
      }
    
      
    }, 11)

    },
    filter() {
      this.$store.dispatch('trigger_toggle_filter')
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
    },
  }

}

const DRAWER_STYLE = Object.freeze({ width: "282px"});


</script>


<style lang="scss">

.v-navigation-drawer{
  background: #141B2D;
}



.v-navigation-drawer__content{
  overflow-y: hidden;
  
}
nav.vxg-side {
    background-color: #141B2D !important;

    .v-sheet {
        background-color: #141B2D !important;
    }

    .v-divider {
        border-color: rgb(var(--vxg-ct2)) !important;
        margin: 16px 8px;
        height: 22px;
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

.magnifierIcon {
  margin: 3px 0 0 40px;
  font-size: large;
 
  color: #141b2d;
}


img{
  &.clip-path-group {
    width: 20px;
  }
  &.Layer_5 {
    width: 20px;
  }
  &.catppuccin-search{
    width: 20px;
  }





}
.font-size-13 {
  font-size: 13px;
}

.searchIcons hr {
  margin: 0 5px !important;
}

.searchIcons svg{
  width: 20px;
  height: 20px;
}
.v-input__control {
    background: white;
    margin-top: auto;
    margin-left: 4px;
    margin-right: 4px;
}
.comboxSearch  .v-select__slot {
    margin-left: 25px;
    margin-bottom: 4px;
}

.comboxSearch .v-input__slot{
  
  width: calc(100% - 30px);
}

.comboxSearch fieldset {
  border: none !important;
}

.catppuccin-search {
  width: 24px; /* Adjust size as needed */
  height: 24px; /* Adjust size as needed */
}
.comboxSearch .v-input__icon{
  position: absolute;
  margin-left: 187px;
}
.v-text-field{
  padding: 0 34px;
}
</style>
