<template>
<div v-if="allow('list')">
  <v-data-table
    v-if="show.table"
    dense
    :headers="headers"
    :items="items"
    :items-per-page="25"
    x-custom-filter="customFilter"
    :footer-props="{
                   itemsPerPageOptions:[25,50,75,100,-1]
                   }"
    :loading="loading"
    @click:row="openItem"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :search="search"
    >

    <template v-slot:loading>
      <div style="text-align:left;padding: 5vh;">
        <v-progress-linear indeterminate color="blue darken-2"></v-progress-linear>
      </div>
    </template>
    
    <div style="text-align:left;padding: 5vh;" v-if="loadState=='error'">
      <span> error - no results </span>
    </div>

    <template
      v-for="header in headers"
      v-slot:[itemslot(header)]="{ item }">
      <div :key="header.value">
        <span v-if="'status'===header.type">
          <v-chip
            small
            xclass="ma-2"
            :color="'outofdate'===item[header.value]?'red':'suspended'===item[header.value]?'orange':'blue'"
            style="font-weight:bold;color:white;"
            >
            {{ (header.kind[item[header.value]]||{}).title }}
          </v-chip>
        </span>
        <span v-else-if="'datetime'===header.type">
          {{ new Date(item[header.value]) }}
        </span>
        <span v-else>{{ item[header.value] }}</span>
      </div>
    </template>
    
  </v-data-table>
  <div v-if="show.item">
    <v-toolbar flat v-if="showEditToolbar">
<!--
      <v-btn outlined @click="customAction('user_reset_password')">Reset Password</v-btn>
-->
      <v-spacer />
    </v-toolbar>

    <div style="box-sizing: border-box; display: flex;flex-flow: row wrap;">
      <div
        v-for="(field,fI) in fields"
        :key="fI"
        class="vxg-form-field"
        :style="fieldstyle(field,fI)"
        >

        <a v-if="field.popup" @click="activatePopup(field.popup)" style="text-decoration: underline;"> 
          {{ field.popup.spec.title }} 
        </a>
        <a v-else> &zwnj; </a>
       
        <v-text-field
          v-if="'string'===field.type"
          :label="field.title"
          v-model="item[field.name]"
          outlined
          :disabled="field.readonly || !allow('edit', field)"
          :rules="field.rules"
          ></v-text-field>
          
        
        <v-dialog v-if="field.popup"
          :height="field.popup.height"
          :width="field.popup.width"
          v-model="popup_dialogs[field.popup.name]"
        >
            <component
              :v-if="field.popup.active"
              :is="field.popup.cmp"
              :spec="field.popup.spec"
            >
            </component>
        </v-dialog>
    

        <!--
        <v-select
          v-if="'status'===field.type"
          :items="selection(field)"
          :label="field.title"
          v-model="item[field.name]"
          outlined
          :disabled="field.readonly || !allow('edit')"
          ></v-select>
        -->

        <vxg-basic-field-pick
          v-if="'status'===field.type"
          :field="field"
          :param="{item:item}"
          ></vxg-basic-field-pick>

        
        <v-text-field
          v-if="'datetime'===field.type"
          :label="field.title"
          v-model="readitem[field.name]"
          outlined
          disabled
          ></v-text-field>

        <vxg-basic-led
          v-if="'basicled'===field.type"
          :spec="field.spec"
          :param="{item:item}"
          ></vxg-basic-led>

        <div
          v-if="'changes'===field.type"
          class="changes"
          >
          <h3>Changes</h3>
          <table border=0 cellpadding=0 cellspacing=0>
            <tr><th>Field</th><th>Old</th><th>New</th></tr>
            <tr v-for="change in changes(item.changes)" :key="change.title">
              <td>{{ change.title }}</td>
              <td>{{ change.old }}</td>
              <td>{{ change.new }}</td>
            </tr>
          </table>
        </div>
        
        
      </div>
      
    <v-dialog width="500" v-model="remove.dialog"  @keydown.esc="removeItemCancel">
      <v-card >
        <v-toolbar dense flat>
          <v-toolbar-title > {{ 'Remove ' + this.spec.ent.primary.name||'Item' }} </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-4"> Confirm you would like to remove: {{ getName(this.item) }} </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn outlined @click="removeItemCancel">Cancel</v-btn>
            <v-btn outlined @click="removeItem">Remove</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  
    </div>
    <v-toolbar flat>
      <v-btn outlined @click="closeItem">Cancel</v-btn>
      <v-spacer />
      <v-btn outlined @click="remove.dialog = true" v-if="allow('edit')">Remove</v-btn>
      <div style="padding: 5px;"></div>
      <v-btn outlined @click="saveItem" v-if="allow('edit')">Save</v-btn>
    </v-toolbar>
  </div>
</div>
</template>

<style lang="scss">
.vxg-form-field {
    text-align: right;
    padding: 0px 8px 0px 0px;
    box-sizing: border-box;
}
div.changes {
    width: 100%;
    color: rgba(0,0,0,0.26) !important;
    background-color: rgba(0,0,0,0) !important;
    table {
        width: 100%;
        background-color: #FFF !important;
        border-bottom: 0px;
        border-left: 0px;
        border-right: 1px solid rgba(0,0,0,0.26);
        border-top: 1px solid rgba(0,0,0,0.26);
    }
    th,td {
        background-color: #FFF !important;
        border-right: 0px; 
        border-top: 0px;
        border-left: 1px solid rgba(0,0,0,0.26);
        border-bottom: 1px solid rgba(0,0,0,0.26);
        padding: 4px;
    }
}

</style>

<script>

export default {
  props: {
    spec: {
      type: Object,
      required: true,
    },
    param: {
      type: Object,
      default: ()=>{}
    }
  },

  data () {
    return {
      item: null,
      readitem: null,
      show: {
        table: true,
        item: false,
      },
      sortBy: 'when',
      sortDesc: true,
      search: '',
      loadlen: 0,
      showprogress: true,
      loadingerror: false,
      // 'loading' | 'error' | 'done'
      loadState: 'loading',
      remove: {
        dialog: false,
      },
      
      popup_dialogs: {},
      
    }
  },

  mounted() {

  },

  async created () {
  
    this.popup_dialogs = this.fields
      .reduce(((acc, field) => (field.popup ? acc[field.popup.name] = false : null, acc)), {})
      
    try {
      await this.$store.dispatch('list_'+this.spec.ent.store_name)
      this.loadState = 'done'
    }catch(err) {
      this.loadState = 'error'
      console.error(err)
    }
  },

  watch: {
  
    '$store.state.trigger.led.add' () {
      this.openItem({
        last: Date.now()
      })
    },
    '$store.state.trigger.search.term' (term) {
      this.search = term
    },
    '$route': {
      immediate: true,
      handler() {
        this.$store.dispatch(
          'set_cmp_flags',
          {name:'BasicHead', flags:{
            show:{
              add:this.spec.edit.active,
              search:(this.spec.search && this.spec.search.active),
            },
            allow:{add:this.allow('edit')}}}
        )
        this.$store.dispatch('set_ent_meta',
                             {name:this.spec.ent.primary.name||'Item'})
      }
    }
  },
  
  computed: {

    loading() {
      return this.loadState == 'loading'
    },

    headers () {
      let headermap = {}
      Object.entries(this.spec.ent.primary.field)
        .forEach(([fn,fd])=>headermap[fn]={
          value:fn,
          text:fd.title,
          type:fd.type,
          kind:fd.kind||{},
        })

      let headers =
          (this.spec.list.layout.order ?
           this.spec.list.layout.order.split(/\s*,\s*/) :
           Object.keys(this.spec.ent.primary.field)
           )
          .map(fn=>headermap[fn])
          .filter(h=>null!=h)
      
      return headers
    },

    items () {
      let items = this.$store.state[this.spec.ent.store_name]

      // TODO: generalize
      if('user-by-role' === this.spec.name) {
        items = items.filter(item=>this.param.item.role===item.profile)
        //items = items.filter(item=>'op'===item.profile)
      }

      return items
    },

    fields () {
      try {
        let fds = []
        let fns = this.spec.edit.layout.order.split(/,/)
        for(let fn of fns) {
          // TODO: remove when model fixed
          // TODO: handle virtual/derived fields cleanly
          let fd = {...this.spec.ent.primary.field[fn]} || {}
          fd.name = fn
          
          //fd.size = this.spec.edit.layout.field[fn].size 
          fd = { ...fd, ...(this.spec.edit.layout.field[fn]||{}) }

          fd.custom = fd.custom || {}
          fd.custom.allow = fd.custom.allow || this.allow.bind(this)
          
          fds.push(fd)
        }
        return fds
      }
      catch(e) {
        // console.error(e)
      }
      return []
    },

    showEditToolbar() {
      if(this.allow('edit')) {
        let active = this.spec.edit.layout.toolbar.active
        if(true === active) {
          return active
        }
        else if(active && active.field) {
          let show = true
          for( let [name, criteria] of Object.entries(active.field)) {
            if('not-empty'===criteria) {
              show = show && (null != this.item[name])
            }
            else {
              show = false
            }
          }
          return show
        }
      }
      return false
    },

    customInfoFields() {
      return this.$model.main.ux.custom.info_fields
    },

  },


  methods: {

    itemslot (header) {
      return 'item.'+header.value
    },

    selection (field) {
      let kinds = field.kind && Object.entries(field.kind) 
      let selects = kinds ? kinds.map(([n,d])=>({text:d.title,value:n})) : []
      return selects
    },

    customAction (action) {
      this.$store.dispatch(action, this.item)
    },

    openItem (selitem) {
      if(false === this.spec.edit.active) { // || !this.allow('edit')) {
        return
      }
      
      this.item = selitem

      this.readitem = {...this.item}

      // TODO: from spec!
      this.readitem.last = this.formatdate(this.item.last)
      this.readitem.when = this.formatdate(this.item.when)
      
      this.show.table = false
      this.show.item = true
    },

    saveItem () {
      this.$store.dispatch('save_'+this.spec.ent.store_name, this.item)
      this.show.table = true
      this.show.item = false
    },

    removeItem() {
      this.$store.dispatch('remove_'+this.spec.ent.store_name, this.item)
      this.show.table = true
      this.show.item = false
      this.remove.dialog = false
    },
    
    removeItemCancel() {
      this.remove.dialog = false
    },

    closeItem () {
      this.show.table = true
      this.show.item = false
    },

    fieldstyle(field) {
      return {
        'flex-basis': (100*field.size/12)+'%',
      }
    },

    formatdate(time) {
      return new Date(time).toString()
    },


    customFilter (value,search,item) {
      return true
    },

    allow(action, field) {
      let out = true
      let match = this.spec[action] && this.spec[action].allow
      if(match) {
        out = this.$vxg.allow(match)
      }

      if(action == 'edit' && field && field.edit === false) {
        if(this.item.created) {
          out = false
        }
      }

      return out
    },

    changes(cmjson) {
      let cm = null == cmjson ? {} : JSON.parse(cmjson)
      let chs = Object.keys(cm)
        .filter(k=>'audit'!=k)
        .reduce((a,c)=>
                (a.push({title: c, field:c, old:cm[c][0],new:cm[c][1]}),a),[])

      if(this.customInfoFields) {
        chs = chs.filter(v => {
          let field
          // if there are no changes - don't show the field
          if(!v.old && !v.new) { 
            return 0
          }
          if(field = this.getInfoFieldByName(v.title)) {
            v.title = field.title
          }
          return 1
        })
      }

      return chs
    },

    getInfoFieldByName(name) {
      for(let field of this.customInfoFields) {
        if(field.name == name) {
          return field
        }
      }
      return null
    },
    
    getName(item) {
      // use 'ordered' fields and get the first key
      let key = Object.keys(this.spec.edit.layout.field)[0]
      return item[key]
    },
    
    activatePopup(popup) {
      this.popup_dialogs[popup.name] = true
    },

  }
}
</script>
