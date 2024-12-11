<template>
  <div class="pqs-oneview">
    <v-card
      v-if="filterActive"
      :style="cardStyle"
      >
  
      <div class="pl-2 mb-1"
        style="display:flex; justify-content: space-between;"
      >
        <button class="filters" style="font-family:Roboto,sans-serif;font-size:16px;font-weight:bold;color: white;">
          Filter Results 
        </button>

        <v-btn class="ml-4 filterCloseBtn" style="color: #1f2f54; background-color: white;" icon @click="toggleFilter">
          <v-icon style="font-size: 18px;font-weight: 700;" small>mdi-close</v-icon>
        </v-btn>
        <!-- <button
          @click="clearFilter"
          style="color:#8e99ac">
          Clear
        </button> -->

      </div>


      <v-autocomplete
          v-for="filter in filters"
          :key="filter.name"
          :ref="filter.name"
          @change="changeSelect($event, filter.name)"
          v-if="filter.show"
          style="width: 100%; display: inline-block; margin: 5px 0;"
          :items="filter.items"
          :label="filter.title"
          v-model="filter.value"
          @click="clickSelect($event, filter.name)"
          clearable
          tile
          outlined
          hide-details
          dense
          append-icon="mdi-menu-swap"
        >
        </v-autocomplete>
  
     
  
      
      
      <div class="d-flex justify-center items-center mt-2">
        <v-btn
        style="width: 82px;max-height: 35px;color: white !important;background-color: #a7a7a7 !important;"
        class="rounded-pill border-0 text-capitalize"
        @click="clearFilter"
        >Clear</v-btn>

        <v-btn
        style="width: 82px;max-height: 35px;color: white !important;background-color: #578ef2 !important;"
        class="rounded-pill border-0 ml-2"
        :disabled="filterDisabled"
        @click="filterAssets"
        >Go</v-btn>
      </div>
  
      <v-menu offset-y v-if="feature.ui_map_filter_result_counter.active">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            outlined
            style="margin-left: 2px;"
            :disabled="pinsShown == 0"
          >
            {{pinsLimit.toString() + '/' + pinsShown.toString()}}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in dividy()"
            :key="index"
          >
            <v-list-item-title @click="selectNumber(item)">{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
    </v-card>

    <v-card  class="pqs-side-info w-auto h-auto rounded-lg pa-2"
              v-if="isSideInfoCardVisible == 0 || isSideInfoCardVisible && isSideInfoCardVisible !== null"
              style="margin-left:33px;margin-top:113px;position:absolute;z-index:11; background-color: #2a2f4d;
                 
                 "
    >
            
              <div style="height: fit-content;padding: 3px 7px;margin: 0px 1px 1px 1px;">
              <span class="d-flex align-center justify-space-between mb-2" style="color: white;font-size: 24px;">
                <strong>{{selectedAsset.tag }}</strong> 
                <v-btn class="ml-4" style="color: #1f2f54; background-color: white; width: 20px; height: 20px;" icon @click="closeSideInfoCard">
                  <v-icon style="font-size: 18px;font-weight: 700;" small>mdi-close</v-icon>
                </v-btn>
              </span>
              <v-divider></v-divider>
                   <div class="selectedAsset_container d-flex align-center justify-between rounded-lg" style="background-color: white;width: 100%;padding: 10px 17px; ">
                    <div class="asset-card-info-header px-4 rounded-lg">
                      <div v-for="field in fields" :key="field.name" class="my-2" style="text-align: left;">
                
                          <div v-if="selectedAsset[field.name]"  class="selectedAsset_grid">
                          <div class="selectedAsset_item"><strong>{{ field.title }}</strong></div> 
                        </div>  
                      </div>
                    </div>
                    <div class="mx-4">
                      <div v-for="field in fields" :key="field.name" class="my-2" style="text-align: left;">

                        <div v-if="selectedAsset[field.name]"  class="">
                          <div class="selectedAsset_item"> {{selectedAsset[field.name] }}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <img style="width: 250px;" class="mr-0" src="../assets/image_not_found.svg" alt="">
                    </div>
             </div>
            </div>
           

            
            <!-- <div style=" background-color: #f5f3ef;height: 416px;padding: 7px;margin: 6px 1px 1px 1px;">
                   
                   <span style="color: #1f2f54;font-size: 28px;"><strong>{{$route.meta.asset.tag }}</strong></span>
              <v-divider></v-divider>
                   <div class="selectedAsset_container" style="text-align: left;width: 100%;padding: 17px; ">
                    <div v-for="field in fields" :key="field.name" style="text-align: left;">
                
                    <div v-if="selectedAsset[field.name]"  class="selectedAsset_grid">
                     <div class="selectedAsset_item"><strong>{{ field.title }}:</strong></div> 
                     <div class="selectedAsset_item"> {{$route.meta.asset[field.name] }}</div>
                    </div>
                     </div>
              
             </div>
            </div> -->
 
    </v-card>
  
    <v-dialog
      v-model="load"
      max-width="550px"
      height="300px"
    >
      <v-card style="
    padding: 10px;
    ">
        <v-card-title>
          <v-icon color="black" style="padding-right: 10px">
            mdi-folder-upload-outline
          </v-icon>
          <span>LOAD WORK PACK</span>
  
        </v-card-title>
  
        <v-container class="collectionContainer" style="overflow-y: auto;">
        <v-card-actions>
        <v-list dense flat outlined class="collectionList">
          <v-list-item v-for="item in collectionAssets" :key="item.id" style="background-color: #27324a;">
  
              <v-btn elevation="0" small style="background-color: #27324a;" @click="removeCollection(item)">
                <v-icon color="white">
                  mdi-minus-circle-outline
                </v-icon>
              </v-btn>
  
            <v-hover v-slot="{ hover }">
              <v-list-item-content @click="clickLoad(item)" :class="hover ? 'loadContentOver' : 'loadContentLeave'">
                <div :style="'font-size: 15px;color:white;padding: 10px;'">
                  
                  <span> {{item.id}} </span>
                  <!--
                  <span style="color: transparent;">dddd</span>
                  <span> {{item.date}} </span>
                  <span style="color: transparent;">dd</span>
                  <span> {{item.name ? item.name : 'undefined'}} </span>
                  -->
                  
                </div>
                
              </v-list-item-content>
       </v-hover>
          </v-list-item>
        </v-list>
        </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  
        <v-form v-model="formValid" style="display: flex;">
    <v-dialog
      v-model="save"
      max-width="500px"
    >
  
      <v-card height="170px">
        <v-card-title style="padding-left: 100px">
          <v-icon color="black" style="padding-right: 10px">
            mdi-folder-plus-outline
          </v-icon>
          <span>SAVE WORK PACK</span>
  
        </v-card-title>
        <v-spacer></v-spacer>
  
  
        <v-card-actions>
          <span style="padding: 10px;">Save As</span>
  
          <v-text-field
            ref="saveColl"
            :color="saveColor"
            v-model="saveInput"
            id="saveCollect"
            label="ID"
            style="max-height: 35px;"
            outlined
            dense
       hide-details="auto"
            :rules="rules['tag']"
          ></v-text-field>
  
        </v-card-actions>
  
        <v-spacer></v-spacer>
  
        <v-card-actions style="padding-left: 340px;">
        <v-btn elevation="0" style="background-color: white;" class="text-capitalize" @click="save = false">
          CANCEL
        </v-btn>
        <v-btn elevation="0" style="background-color: white;" class="text-capitalize" 
          :disabled="disableSave"
          @click="saveAsCollect()">
          SAVE
        </v-btn>
        </v-card-actions>
  
  
      </v-card>
  
    </v-dialog>
        </v-form>
  
    <v-dialog
          persistent
          hide-overlay
          no-click-animation
          v-model="collect"
          max-width="550px"
    >
      <v-card height="485px">
        <v-card-title class="collectionCard">
          <v-icon color="white" style="padding-right: 10px;">
            mdi-folder-plus-outline
          </v-icon>
          <span class="unselectable">Work Pack</span>
          <v-spacer></v-spacer>
  
          <v-btn style="background-color: #141B2D;" @click="closeCollect()">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
  
        </v-card-title>
  
        <v-card-actions>
  
          <v-spacer></v-spacer>
          <v-btn elevation="0" style="background-color: white;" class="text-capitalize"
            @click="assetCollectionLoad()"
          >
            <v-icon>
              mdi-folder-upload-outline
            </v-icon>
              load
          </v-btn>
  
          <v-btn elevation="0" style="background-color: white;" class="text-capitalize" 
            @click="save = true">
            <v-icon>
              mdi-folder-arrow-right-outline
            </v-icon>
              save as
          </v-btn>
  
          <v-btn elevation="0" style="background-color: white;" class="text-capitalize" 
            @click="simpleSave()">
            <v-icon>
              mdi-folder-plus-outline
            </v-icon>
              save
          </v-btn>
  
        </v-card-actions>
  
        <v-container class="collectionContainer">
  
          <div
    style="padding-left:15px;padding-top: 5px; padding-bottom: 5px; padding-right: 15px;">
          <span 
          > {{viewasset.id}} </span>
          </div>
  
          <v-list dense flat outlined class="collectionList">
            <v-list-item v-for="asset in assetCollection" :key="asset.tag" style="background-color: #27324a;padding:0;">
  
              <v-btn elevation="0" small style="background-color: #27324a;" @click="removeCollectItem(asset)">
                <v-icon color="white">
                  mdi-minus-circle-outline
                </v-icon>
              </v-btn>
  
              <v-list-item-content>
                <h1 style="font-size: 15px;color:white;">{{asset.tag}}</h1>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>
  
        <v-card-actions>
          <v-btn elevation="0" style="background-color: white;" class="text-capitalize" @click="clearCollection()">
            <v-icon>
              mdi-folder-minus-outline
            </v-icon>
            Clear
          </v-btn>
          <v-btn elevation="0" style="background-color: white;" class="text-capitalize" @click="addAll()">
            <v-icon>
              mdi-map-marker-plus
            </v-icon>
            Add All
          </v-btn>
          
          <v-spacer></v-spacer>
          <v-btn style="background-color: #277bd2; color: white;" @click="updateMap()" :disabled="enableUpdate">
            update map
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="map_buttons" 
    style="
    display: flex;
    height: 100px;
    position: absolute;
    width: 77px;
    top: 12px;
    right: 40px;
    margin-right: 69px;
    z-index: 9;">

<v-tooltip bottom v-if="show('bookmark')" v-once>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          light
          v-bind="attrs"
          v-on="on"
         @click="callprint()"
         class="custom-tooltip"
         style="opacity: 0;"
        >
        <v-icon  class="vxg-icon">mdi-bookmark-minus-outline</v-icon>
        </v-btn>
      </template>
      <span style="color: white;">PRINT</span>
    </v-tooltip>

    <v-tooltip bottom v-if="show('bookmark')" v-once>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          light
          v-bind="attrs"
          v-on="on"
         @click="showTags()"
         class="custom-tooltip"
         
        >
        <v-icon  class="vxg-icon">mdi-bookmark-minus-outline</v-icon>
        </v-btn>
      </template>
      <span style="color: white;">{{ (bookmark ? 'HIDE' : 'SHOW') + ' TAGS' }}</span>
    </v-tooltip>

    <v-tooltip bottom v-if="show('collect')" v-once class="custom-tooltip">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          dark
          v-bind="attrs"
          v-on="on"
         @click="collectAssets()"
         class="custom-tooltip"
         
        >
        <v-icon  class="vxg-icon">mdi-folder-open-outline</v-icon>
        </v-btn>
      </template>
      <span style="color: white;" >{{ 'WORK PACKS' }}</span>
    </v-tooltip>

    <v-tooltip bottom v-if="show('collect')" v-once class="custom-tooltip">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          dark
          v-bind="attrs"
          v-on="on"
         @click="callLayers()"
         class="custom-tooltip"
         style="opacity: 0;"
        >
        <v-icon  class="vxg-icon">mdi-folder-open-outline</v-icon>
        </v-btn>
      </template>
      <span style="color: white;" >LAYERS</span>
    </v-tooltip>

    <!-- <button >
      <v-icon  class="vxg-icon" >mdi-bookmark-minus-outline</v-icon>
    </button>
    <button>
      <v-icon  class="vxg-icon">mdi-folder-open-outline</v-icon>
    </button> -->
    <!-- <div class="btns" style="
    display: flex;
    justify-content: center;
    background-color: #ff000047;
    width: 350px;
    height: 100px;
    margin-top: 72px;">
   
   

    
    </div> -->
   

     </div>
    <l-map
      ref="map"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :crs="crs"
      :zoom="zoom"
      :center="center"
      :style="mapStyle"
      :options="{scrollWheelZoom:true,attributionControl:false,zoomDelta: 0.5,zoomSnap: 0,maxZoom: 1 }"
      >
      
      <l-marker
        ref="marker"
        v-if="assetMarker && asset && showPin"
        :lat-lng="assetMarker.loc"
        class="asset-marker"
        :icon="pinIcon(asset)"
        @click="clickHalo(asset)"
        >
        <l-popup :options="{autoClose: false}" :content="assetMarker.tag" />
      </l-marker>
      <l-marker ref="marker2" v-if="assetMarker2 && asset2 && showPin" :lat-lng="assetMarker2.loc" class="asset-marker"
        :icon="pinIcon(asset)" @click="clickHalo(asset)">
        <l-popup :options="{ autoClose: false }" :content="assetMarker2.tag" />
      </l-marker>
      <l-polyline v-for="(route, index) in route2" :key="index" :lat-lngs="route" :color="'red'"></l-polyline>
      <!-- <l-polyline :lat-lngs="route2" :color="'brown'"></l-polyline> -->
      <l-polygon v-if="showRoom && room" :lat-lngs="room.poly" :color="('Void' === asset.atype || 'Room/Area' === asset.atype) ? polyColor : 'red'" :options="{weight: 2}"></l-polygon>
  
      <!--
      <l-polygon
        v-for="room in showRoomList"
        :key="room.id"
        :lat-lngs="room.poly"
        :color="getShowRoomColor(room)"
        :options="{weight: 4}">
      </l-polygon>
      -->
      <!-- <l-marker :lat-lng="markerLatLng" ></l-marker>
      <l-polyline :lat-lngs="transformedCoordinates" :color="'blue'"/> -->
      <l-image-overlay
        :url="url"
        :bounds="bounds"
        />
      
    </l-map>
     <!-- Include the popover component -->
     <PqsNavvisView />
  </div>
  </template>
  
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import axios from 'axios';
  import pointInPolygon from 'point-in-polygon';
  import PqsNavvisView from './PqsNavvisView.vue'; // Adjust the path as necessary

  
  
  import { CRS, Icon, latLng, icon } from "leaflet";
  
  import { LMap, LImageOverlay, LMarker, LPopup, LPolyline, LPolygon, LCircle, LLayerGroup, LIcon } from "vue2-leaflet";
  
  
  const T = true
  const F = false
  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: '/green-pin.png',
    iconUrl: '/green-pin.png',
    shadowUrl: '/marker-shadow.png',
  })
  
  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: require('/public/green-pin.png'),
    iconUrl: require('/public/green-pin.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });
  
  
  function pinch(ks,item) {
    return ks.split(/~/g).map(k=>item[k]).join('~')
  }
  
  
  let poly = null
  let showRooms = false
  let roomLookup = {}
  
  
  let map = null
  let self = null
  
  
  function overRoom(self, map) {
    let mapopts = self.$main.opts.map
    
    map.on('mousemove', (ev)=>{
      // NOTE: room.poly is in map coords
      let xco = self.hover.loc.xco = Math.floor(ev.latlng.lng)
      let yco = self.hover.loc.yco = Math.floor(ev.latlng.lat)
      
      let rooms = self.$store.state.main_room
      
      let inside = false
      
      if(rooms) {
        for(let room of rooms) {
          if(inside) {
            break
          }
          if( (''+self.pos.map) === (''+room.map) ) {
            inside = room.poly && pointInPolygon([yco,xco], room.poly)
            if(inside) {
              if(self.hover.last.room != room.room) {
                
                if(self.hover.poly) {
                  self.hover.poly.remove(map)
                }
                self.hover.poly = window.L.polygon(room.poly, {
                  color: 'blue',
                  weight: 2,
                }).addTo(map)
                
                let roomName = room.room
                
                
                // ROOM CLICK
                self.hover.poly.on('click', (event)=>{
                  self.$store.commit('clear_found_assets',{})
                  
                  
                  self.polyColor = 'green' // select color
                  if(self.preSearch != roomName) { // if previous search not equal to the current search
                    self.assetMarker = null
                    self.doSearch(roomName, false, true)
                    self.preSearch = roomName
                    mix_panel_track('polygon_selection', { building: room.building, 
                                                           map: room.map,
                                                           username: self.user_name
                                                         })
                    
                  }
                  
                  self.polyColor = 'green' // select color
                  
                  self.$store.dispatch('trigger_search', {term:''})
                  self.clearOnMove = true
                  self.search = ''
                  
                  self.showPin = false
                  self.assetSelected = true
                  
                  setTimeout(()=>{ // wait
                    if(self.activeAssets.length == 0) {
                      self.$store.state.trigger.bookmark.visible = false
                    }
                  }, 0)
                  
                })
                
                self.hover.last.room = room.room
              }
            }
          }
        }
      }
      
      if(!inside && self.hover.poly) {
        self.hover.poly.remove(map)
      }
      
    })
  }
  
  
  const PIN_ICONS = {
    'Emergency Exit': icon({
      iconUrl:  "/mapicon22.png",
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      popupAnchor: [-3, -37],
    }),
  
    'De-Fibrilator': icon({
      iconUrl:  "/mapicon12.png",
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      popupAnchor: [-3, -37],
    }),
  
    'Muster Point': icon({
      iconUrl:  "/mapicon42.png",
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      popupAnchor: [-3, -37],
    }),
  }
  
  
  
  export default {
    name: 'PqsOneView',
    components: {
      LMap,
      LImageOverlay,
      LMarker,
      LPopup,
      LPolyline,
      LPolygon,
      LCircle,
      LLayerGroup,
      PqsNavvisView,
    },
    
    props: {
    },
    
    data () {

      
      
      let mapopts = this.$main.opts.map
      
      
      return {
        view: {
        tool: {}
      },
        notificationCount: 5,
        isCardVisible: false,
        
        previousAsset: null,
        mapActive: {},
        cutTo: 50,
        cutFrom: 0,
       
        fields: [
          {name:'tag', title:'Asset Tag', },        
          {name:'atype', title:'Asset Type',},
          {name:'discipline1', title:'Discipline',},
          {name:'description', title:'Description', },        
          {name:'manufacturer', title:'Manufacturer', },
          {name:'model', title:'Model', },
          {name:'serial', title:'Serial Number', },
          {name:'building', title:'Building'  },
          {name:'level', title:'Level' },        
          {name:'room', title:'Room Number', },        
          {name:'drawing1', title:'Drawing 1', },
          {name:'drawing2', title:'Owner', },        
          {name:'system', title:'System', },        
          {name:'subsys', title:'Subsystem', },
          {name:'custom12', title:'Room Alias', },
        ],
        numericCoordinates: [],
        transformedCoordinates: [],
        VUE_APP_CLOUDFRONT_DISTRIBUTION : process.env.VUE_APP_CLOUDFRONT_DISTRIBUTION,
        map: null,
        hover: {
          capture: false,
          loc: { xco: -1, yco: -1 },
          last: { room: null },
        },
        
        filters: [],
        preSearch: '',
        search: '',
        search2: '',
        route2: [], //
        coordinates3:{},
        attribute_data:{},
        transformedCoordinates2: [],
        extractedCoordinates: null,
        mapValue:null,
        showRoom: false,
        showPin: true,
        filterLevel: false,
        viewasset: {id: ''},
        asset: null,
        asset2: null,
        assets: null,
        room: null,
        polyColor: 'blue',
        
        showRoomList: [],
        showRoomColor: {
          data8:  '#FFD700', // 'Meeting Room',
          data9:  '#808080', // 'Plant Room',   				
          data10: '#FF0000', // 'ATEX Area',
          data11: '#FFA500', // 'Noise >80db',
          data12: '#0077CC', // 'Production Area', 
          data13: '#800080', // 'PPE Required',
        },
        
        mapUpdated: false,
        save: false,
        disableSave: true,
        saveInput: '',
        saveColor: 'black',
        formValid: false,
        load: false,
        filterColl: false,
        pinsShown: 0,
        pinsLimit: 50,
        popUpPins: false,
        
        greenPin: icon({
          iconUrl:  "/green-pin.png",
          iconSize: [32, 37],
          iconAnchor: [16, 37],
          popupAnchor: [-3, -37],
        }),
        
        navyPin: icon({
          iconUrl:  "/navy-pin.png",
          iconSize: [32, 37],
          iconAnchor: [16, 37],
          popupAnchor: [-3, -37],
        }),
        
        clearOnMove: false,
        assetMarker: {
          tag: null,
          loc:[0,0],
        },
        assetMarker2: {
          tag: null,
          loc:[0,0],
        },
        markerLatLng: [3300,3300],
        markers: [],
        markerGroup: {},
        filtering: [],
        assetCollWatchers: [],
        haloRadius: 100,
        showPopUps: function(event) {
          let layer = event.layer
          
          if (layer instanceof L.Marker && !(layer instanceof L.MarkerCluster)) {
            let marker = layer
            layer.openPopup()
          }
        },
        
        rules: {
          tag: [
            
            /*
              v => {
              
              if(!!Boolean(v)){ // bug?
              
              if(this.collectionAssets.map(asset=>asset.id).find(id=>id === v)) {
              // console.log('v:: ', v)
              this.formValid = false
              this.disableSave = true
              this.saveColor = 'red'
              console.log('saveee Color: ', this.saveColor)
              console.log(this.$refs.saveColl._props.color)
              return true
              }
              else{
              this.saveColor = 'black'
              // this.saveColor = 'blue'
              this.formValid = true
              this.disableSave = false
              }
              
              return !!v
              }
        else{
              // this.formValid = true
              // this.disableSave = true
              this.saveColor = 'red'
              // console.log('required bool: ', this.disableSave)
              console.log('saveee Color: ', this.saveColor)
              return 'REQUIRED!'
              }
              },
            */
            v => { // alert class not working with rules - Vuetify bug
              
              if(this.collectionAssets.map(asset=>asset.id).find(id=>id === v)) {
                this.formValid = false
                this.disableSave = true
                
                this.saveColor = 'red'
                let div = document.createElement('div')
                div.className = `v-text-field__details`
                div.innerHTML = `<div class="v-messages theme--light error--text" role="alert"><div class="v-messages__wrapper"><div class="v-messages__message" style="color: red; padding: 5px;">Asset collection name currently in use</div></div></div>`
                
                if(this.$refs.saveColl.$el.firstChild.lastChild.className == 'v-text-field__details'){
                  this.$refs.saveColl.$el.firstChild.lastChild.remove()
                }
                this.$refs.saveColl.$el.firstChild.append(div)
                
                return true
                return 'Asset collection name currently in use' // not working
              }
              else{
                setTimeout(()=>{
                  if(this.$refs.saveColl.$el.firstChild.lastChild.className == 'v-text-field__details'){
                    this.$refs.saveColl.$el.firstChild.lastChild.remove()
                  }
                }, 0)
                this.saveColor = 'black'
                this.formValid = true
                this.disableSave = false
                return !!v
              }
            }
          ],
        },
        
        matches: [],
        
        items: [],
        
        bounds: [[0, 0], [mapopts.height, mapopts.width]],
        minZoom: null == mapopts.minZoom ? -3 : mapopts.minZoom,
        maxZoom: null == mapopts.maxZoom ? +2 : mapopts.maxZoom,
        crs: CRS.Simple,
        
        pos: {
          map: 1,
        },
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        zoom: -1.7,
        center: [3300, 3300],
        
        sideOpen: true,
        
        // TODO: define in model, get from model
        // See: PqsEditAsset
        filters: this.$main.opts.custom.filters,
      }
    },
    
    watch: {

      route2(newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log('route2 changed from', oldVal, 'to', newVal);
        // Perform any additional actions when route2 changes
      }
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

      selectedAsset: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          //this.showSideInfoCard();
        }
      },
      deep: true,
    },
    
      showRoomList (list, oldlist) {
      },
    
      '$store.state.trigger.select.value': function(newVal, oldVal) { },
  

  current_levels2(newcurrent_levels2, oldcurrent_levels2) {
      if (!this.filterDisabled) {
        console.log('filter disabled works mate');
        if (newcurrent_levels2 !== oldcurrent_levels2) {
          console.log(`We have ${newcurrent_levels2} level now, yay!`);
          this.filterAssets();
          // Additional logic if needed
        }
      }
    },
      'activeAssets.length' (val) {
        if(val) {
          this.$store.state.trigger.bookmark.visible = true
        }
        else {
          this.$store.state.trigger.bookmark.visible = false
          this.$store.state.trigger.bookmark.value = false
        }
      },
      
      activeHalos(val) {
        let circle, latlng
        this.CirclesOnMap().forEach(c=>c.remove())      
      },
      
      assetMarker(val) {
        let circle, latlng
        if(val) {
          latlng = this.assetMarker.loc
          circle = L.circle(latlng, {radius: 50, fillOpacity: 0.5,
                                     weight: 0, radius: 50, color: '#38a2d3'})
    if(this.assetCollection.find(v=>v.tag == this.assetMarker.tag)) {
            circle.addTo(this.map.mapObject)
          }
        }
      },
      
      assetCollection(val){
        let circle, latlng, index, markers
        
        this.CirclesOnMap().forEach(c=>c.remove())
        if(this.assetMarker) {
          latlng = this.assetMarker.loc
          circle = L.circle(latlng, {fillOpacity: 0.5,
                                     weight: 0, radius: 50, color: '#38a2d3'})
          if(this.assetCollection.find(v=>v.tag == this.assetMarker.tag)) {
            circle.addTo(this.map.mapObject)
          }
        }
        
        
        for(let asset of this.assetCollection) {
          if(this.activeAssets.find(v=>v.tag == asset.tag) !== undefined) {
            latlng = this.assetLoc(asset)
            let currentZoom = this.map.mapObject.getZoom()
            let radius
            let zoomLevels = {'-2': 50, '-1': 50, 0: 30, 1: 30, 2: 20, }
            radius = zoomLevels[currentZoom] ? zoomLevels[currentZoom] : 50
            
            circle = L.circle(latlng, {fillOpacity: 0.5,
                                       weight: 0, color: '#38a2d3'})
            circle.setRadius(radius)
            
            markers = this.MarkersOnMap() 
            index = markers.findIndex(v=>v._latlng.lat == latlng[0] && v._latlng.lng == latlng[1])
            
            if(index !== -1) {
              circle.addTo(this.map.mapObject)
            }
          }
        }      
      },
      
      activeAssets: {
        deep: true,
        immediate: false,
        handler(val) {
          this.clusterfy(val)
        },
      },
      
      mapValue: {
        deep: true,
        handler(val) {
          //this.checkAssetlevel() 
          //this.checkAssetlevel2()
        }
      },
      center(val) {
        // use val
      },
      items() {
        let i = 0
        for(let asset of this.items) {
          for(let filter of this.filters) {
            let filterName = filter.name
          //  console.log('filterName', filterName)
            let hasFilterItem =
                filter.items.find(entry=>entry.value===asset[filterName])
            if(!hasFilterItem && asset[filterName]) {
              filter.items.push({
                text: asset[filterName],
                value: asset[filterName],
              })
            }
            
          }
        }
      },
      
      
      '$store.state.show_photos.asset' (asset) {
        if(null!=asset && 0 < (asset.photos||[]).length) {
          if(this.lig) {
            this.lig.remove()
          }

          const cloudfrontDistribution = process.env.VUE_APP_CLOUDFRONT_DISTRIBUTION;

          if (!cloudfrontDistribution) {
              console.error('VUE_APP_CLOUDFRONT_DISTRIBUTION is not defined');
              return;
          }
          
          this.lig = L.leafletImageGallery({
            closeCollect: ()=>{
              this.lig.remove()
              this.lig = null
            },
            img: asset.photos.map(f=> cloudfrontDistribution+'/'+f),
          })
          
          this.lig.addTo(this.$refs.map.mapObject)
        }
      },
      
      
      '$store.state.trigger.go.value' (val) {
        this.filterAssets()
      },
      '$store.state.trigger.clear.value' (val) {
        this.clearFilterAssets()
      },
      
      '$store.state.trigger.bookmark.value' (val) {
        if(val){ // this.map.mapObject.getZoom()
          this.map.mapObject.on('layeradd', this.showPopUps)
        }else {
          this.map.mapObject.off('layeradd', this.showPopUps)
        }
        
        if(val) {
          mix_panel_track('show_tags', { })
        }
        
        if(this.showPin) { // enable single marker popup - when there is a single pin
          if(val) {
            this.$refs.marker.mapObject.openPopup()
          }
          else {
            this.$refs.marker.mapObject.closePopup()
          }
          
        }
        
        if(val) {
          
          for(let marker of this.markers) {
            marker.openPopup()
          }
          
          
        }
        else {
          for(let marker of this.markers) {
            marker.closePopup()
          }
          
          
          this.MarkerClustersOnMap().forEach(v => {
            if(v._popup) {
              v._popup.remove()
            }
          })
          
          
        }
      },
      
      
      '$store.state.found_rooms' (rooms) {
        let last_attr = this.$store.state.last_group_value.roomattr
        
        let room = null
        // this.showRoomList.length = 0
        while(room = this.showRoomList.pop()) {
          room.poly$ && room.poly$.remove()
        }
        for(room of rooms) {
          if(room.show$) {
            this.showRoomList.push(room)
            
            room.poly$ = L.polygon(
              room.poly, {
                color:  this.getShowRoomColor(room,last_attr),
                weight: 2,
              })
            
            room.poly$.addTo(this.map.mapObject)
          }
        }
      },
      
      
      '$store.state.trigger.print.value' (val) {
        let browserPrint = L.browserPrint(this.map.mapObject, 
                                          {title: 'Print map', printModes: ["Landscape"], closePopupsOnPrint: false})
        browserPrint.print(L.BrowserPrint.Mode.Landscape('A4', {zoom: this.$refs.map.mapObject.getZoom()}))
      },
      
      '$store.state.trigger.select.value' (val) {
        if(null == val) {
          return
        }
        
        this.resetToolbar(val)
        
        
        if(this.filterColl){
          this.filterCollection(false, false)
        }
        
        if(this.filterLevel) {
          this.filterAssets(false, false)
        }
        
        this.pos.map = val
        
        
        // "doSearch" marker removing on floor change
        // this.assetMarker = null
        
        let current_levels = this.map_levels[val]
        console.log('current_levels', current_levels)
        console.log('select level', {assetMarker: this.assetMarker, assetMarker2: this.assetMarker2})
        console.log('this.assetSelected', this.assetSelected)
        
        if(this.assetMarker && current_levels) {
          if (current_levels.find(level => level == this.assetMarker.level)) {
            let asset = this.$store.state.main_asset.find(asset=>asset.tag == this.assetMarker.tag)
            if(!this.assetSelected) {
              this.showPin = true
            }
            console.log('this.showPin', this.showPin)
            this.showRoom = true
            this.room = this.getRoom(this.asset, this.assetMarker.tag)
            this.asset = asset
            this.$route.meta.asset = asset
          }
          else {
            if(!this.assetSelected) {
              this.showPin = false
            }
            this.showRoom = false
            this.$store.commit('set_found_assets',{assets: [], whence:'A'})
            this.$route.meta.asset = {}
          }
        }
        if(this.assetMarker2 && current_levels) {
          if (current_levels.find(level => level == this.assetMarker2.level)) {
            let asset = this.$store.state.main_asset.find(asset=>asset.tag == this.assetMarker2.tag)
            if(!this.assetSelected) {
              this.showPin = true
            }
            this.showRoom = true
            this.room = this.getRoom(this.asset2, this.assetMarker2.tag)
            this.asset2 = asset
            this.$route.meta.asset = asset
          }
          else {
            if(!this.assetSelected) {
              this.showPin = false
            }
            this.showRoom = false
            this.$store.commit('set_found_assets',{assets: [], whence:'A'})
            this.$route.meta.asset = {}
          }
        }
        
        this.showAssetGroups(this.$store.state.group.asset, {mapChange:true})
        this.showRoomAttrs(this.$store.state.group.roomattr)
        this.mapValue= val;
        console.log('mapValue from triggier: ', val);
        this.handleMapValueChange();
      },
      
      
      '$store.state.trigger.search.a' (term) {
        if(term !== null) {
          this.doSearch(term)
          mix_panel_track('PQView_search', {
            atype: this.assetMarker && this.assetMarker.atype, 
            username: this.user_name, 
          })
          
        }
        else { // when "combobox is reset or cleared - the term is null
         // if(!this.clearOnMove) {
          //  this.unselectFoundAssets()
            //this.showRoom = false
            //this.showPin = false
            this.assetMarker = null
            this.asset = {}
           // this.$store.commit('set_found_assets',{assets:[],whence:'B'})
          //}
        }
      },
      '$store.state.trigger.search.b' (term) {
        if(term) {
          this.doSearch2(term)
          mix_panel_track('PQView_search', {
            atype: this.assetMarker2 && this.assetMarker2.atype, 
            username: this.user_name, 
          })
          
        }
        else { 
            this.assetMarker2 = null
            this.asset2 = {}
        }
      },
      
      
      '$store.state.group.asset': {
        deep: true,
        handler: 'showAssetGroups',
      },
      
      
      '$store.state.group.roomattr': {
        deep: true,
        handler: 'showRoomAttrs'
      },
      
      
      '$store.state.vxg.cmp.BasicSide.show'(val) {
        this.sideOpen = val
        setTimeout(()=>{
          let w = document.querySelector('#freshworks-container')
          if(w) {
            if(!val) {
              Object.assign(w.style, {'display': 'none'})
            }else {
              Object.assign(w.style, {'display': 'block'})
            }
          }
        }, 11)
      },
      
    },
    
    computed: {
      tool() {
      // TODO: better if main.app.web.parts.head was provided directly
      let headtool = this.$model.main.app.web.parts.head.tool
      let viewtool = this.view.tool
      let tool = this.$main.seneca.util.deep(headtool, viewtool)
      return tool
    },
    bookmarkVisible() {
      return this.$store.state.trigger.bookmark.visible
    },
    bookmark () {
      return this.$store.state.trigger.bookmark.value
    },




      ...mapState({
      isSideInfoCardVisible: state => state.isSideInfoCardVisible,
       }),
       filterIcon (){
      return this.$store.state.vxg.cmp.BasicHead.show.filter
    },


      haloAssets() {
        return this.$store.state.halo_assets
      },

      selectedAsset() {
        return this.$store.state.selected_assets
      },
      
    //   filterDisabled() { 
    //     console.log('filter is disabled')
    //     return this.$store.state.filter_disabled;
     
    // },
    
      
      current_levels2() {
      let val = this.$store.state.trigger.select.value; // or however you get the current value
    
      return this.map_levels[val];
      
    },

      user_name () {
        let name = this.$main.store.state.current_user.attributes.name
        return name ? name : 'Alice'
      },
      
      map_levels() {
        let levels = {}
        //console.log('levelis',levels)
        let pc_maps = Object.entries(this.$main.opts.td.deps.pc['map~level']).reduce((v, i) => {
          let [map, level] = i[0].split('~')
          if(v[map]) {
            v[map].push(level)
          }
          else {
            v[map] = [level]
          }
          return v
        }, {})
        
        return pc_maps
      },
      
      feature () {
        return this.$model.main.feature
      },
      
      collect () {
        return this.$store.state.trigger.collect.value
      },
      url () {
        let map = this.$main.opts.map
        return '/'+map.prefix+this.pos.map+map.suffix
        // return '/map'+this.pos.map+'.png'
      },
      
      locationStyle() {
        return {
          width: '100%',
          overflow: 'scroll',
        }
      },
      editStyle() {
        return {
          overflow: 'scroll',
          padding: '32px 0px',
          maxWidth: '300px',
          minWidth: '300px',//'40%',
          maxHeight: (this.innerHeight-64)+'px',
          display: this.editExpand ? 'block' : 'none',
        }
      },
      
      mapStyle: {
        cache: false,
        get() {
          let style = {
            'height': (this.innerHeight - (this.filterActive ? 134 : 64))+'px',
            'width': (this.innerWidth - (this.sideOpen ? 280 : 20))+'px',
            'z-index': 0,
            'margin-left': '25px',
            'background-color': '#D1D8A6'
          }
          if(this.pos.map != '1') {
            style['background-color'] = '#f0f4de'
          }
          return style
        }
      },
      
      cardStyle(){
        return {'padding': '12px 17px 13px 8px',
        'width': '300px',
        'border-radius': '12px',
        'flex-direction': 'column',
        'background-color': '#2a2f4d',
        'display': 'flex',
        'position': 'absolute',
        'top': '106px',
        'left': '30px',
        'z-index': '15'}
      }, 
      
   

      filterActive() {
        const isActive = this.$store.state.trigger.filter.active;
        console.log('Filter Active:', isActive);
        return isActive;
      },
      
      foundAssets() {
        return this.$store.state.found_assets
      },
      
      activeHalos() {
        return this.$store.state.halo_assets
      },
      
      assetCollection() {
        return this.$store.state.asset_collection
      },
      collectionAssets() {
        return this.$store.state.collection_assets
      },
      
      activeAssets: {
        cache: false,
        get() {
          let assets = this.$store.state.found_assets
          assets = assets.filter(asset=>asset.active$)
          return assets
        }
      },
      
      filterDisabled() {
        for(let filter of this.filters) {
          if(filter.value) {
            this.$store.commit("set_filter_disabled", false)
            return false
          }
        }
        this.$store.commit("set_filter_disabled", true)
        return true
      },
      
      enableUpdate() {
        return this.mapUpdated || this.assetCollection.length == 0
      }
      
    },
    
    mounted() {
      this.$store.state.side_asset = this.$route.meta
      this.fetchPath()
      this.$refs.map.mapObject.on('zoom', ev=>{
        let currentZoom = ev.sourceTarget.getZoom() // this.map.mapObject.getZoom()
        let radius
        let zoomLevels = {'-2': 50, '-1': 50, 0: 30, 1: 30, 2: 20, }
        
        setTimeout(()=>{ // wait for the circles
          this.CirclesOnMap().forEach(circle=>{
            if(zoomLevels[currentZoom]) {
              circle.setRadius(zoomLevels[currentZoom])
            }
          })
        }, 0)
        
      })
      
      this.makeDialogsDraggable()
      
      this.$store.dispatch('trigger_search', {term:''})
      
      // L.control.browserPrint({
        
      // title: 'printMap',
      // closePopupsOnPrint: false,
      // //printModes: [L.control.browserPrint.mode.custom("Vertical", "A4"),]
      //  printModes:[L.BrowserPrint.Mode.Custom("A4",{top: 5.2, left: 4.5, right: 4.5, bottom: 5.5,})], 
      
      //  //printModes:[L.BrowserPrint.Mode.Custom("Vertical", "A4"), L.BrowserPrint.Mode.Custom("Horizontal", "A4", "landscape")],
      //  // printModes:[L.BrowserPrint.Mode.Auto()]
      // //L.control.browserPrint.mode.auto("Automatico", "B4"),
      // //printModes: [L.control.browserPrint.mode.auto("Automatico", "B4"),]

      // // printModes: [
      // //   L.control.browserPrint.mode.custom("A4")
      // //   //L.control.browserPrint.mode.custom("A4 Landscape", "A4", "landscape")
      // // ]


    
      // }).addTo(this.$refs.map.mapObject)

      L.control.browserPrint({
      title: 'printMap',
      closePopupsOnPrint: false,
      // printModes: [
      //   L.control.browserPrint.mode.custom("A4 Portrait", "A4", "portrait", {
      //     //zoom: 14, // Set the desired zoom level for portrait mode
      //    // printLayer: this.$refs.map.mapObject // Ensure the map layer is printed
      //   }),
      //   // L.control.browserPrint.mode.custom("A4 Landscape", "A4", "landscape", {
      //   //   zoom: 14, // Set the desired zoom level for landscape mode
      //   //   printLayer: this.$refs.map.mapObject // Ensure the map layer is printed
      //   // })
      // ],
      printModes: [
      L.BrowserPrint.Mode.Custom("A4 portrait", "A4", "portrait",{zoom: 0, printLayer: this.$refs.map.mapObject}),
      // L.BrowserPrint.Mode.Custom("A4 portrait",{
      //     title: "A4 Portrait",
      //     pageSize: "A4",
      //     orientation: "portrait",
      //     zoom : 14,
      //     printLayer: this.$refs.map.mapObject}),
      ],
     // printModes: [ L.control.browserPrint.mode.custom("A4 Portrait", "A4", "portrait")],
      manualMode: false, // Ensure manual mode is off to fit content automatically
      documentTitle: "Map Print", // Optional: Set a title for the printed document
      closePopupsOnPrint: false // Optional: Close popups before printing
    }).addTo(this.$refs.map.mapObject);
     






     // L.popup (layer._group.options).addTo(this.$refs.map.mapObject)

        
      
      //L.popup (layer._group.options).addTo(this.$refs.map.mapObject)
      
      L.BrowserPrint.Utils.registerLayer(
        // Actual typeof object to compare with
        L.MarkerClusterGroup,
        // Any string you would like for current function for print events
        'L.MarkerClusterGroup',
        function (layer, utils) {
    // We need to recreate cluster object with available options
    // Here we use function, but we can use object aswell,
    // example: new L.MarkerClusterGroup(layer._group.options);
    var cluster = L.markerClusterGroup(layer._group.options);
          
    // And we clone all inner layers to our new cluster
    // to properly recalculate/recreate position for print map
          
    cluster.addLayers(utils.cloneInnerLayers(layer._group));
          
    return cluster;
        });
     // L.Control.BrowserPrint.Utils.registerLayer(L.markerClusterGroup, "L.markerClusterGroup", function(layer) { return new L.markerClusterGroup(layer._key, layer.options); } );
      
      this.plantquestGroupSelect = L.plantquestGroupSelect({
        position: 'topright',
        asset: {
          atypes: [
            'Emergency Exit',
            'De-Fibrilator',
            'Muster Point',
          ]
        },
        room: {
          attr: {
            data8:  'Meeting Room',
            data9:  'Plant Room',   				
            data10: 'ATEX Area',
            data11: 'Noise >80db',
            data12: 'Production Area',
            data13: 'PPE Required',
          }
        },
        toggleGroup: (kind, value)=>{
          this.$store.commit('toggle_group', {kind,value})
        }
      })
      
      this.plantquestGroupSelect.addTo(this.$refs.map.mapObject)
      
      
      
      this.$store.dispatch(
        'set_cmp_flags',
        {name: 'BasicHead', flags: {
          show: {
            add: false, 
            addmobile: false,
            remove: false, 
            search: true, 
            filter: true,
            go: true,
            clear: true,
            select: true, 
            print: true, 
            bookmark: true, 
            collect: true}}})
    }, 
    
    async created() {
      let tool = {}




      // load up the asset collection items
      this.$store.dispatch("list_collection_assets")
      console.log()

      // TODO: maybe refactor out as used in PqsViewAsset too
      this.items = this.$store.state.main_asset
      this.values = this.$store.state.values
      
      if(0 === this.items.length) {
        this.$store.dispatch('list_main_asset', {
          vitems:this.items,
          values:this.values,
        })
      }
      
      let load_assets = setInterval(()=>{
        if(0 !== this.items.length) {
          this.map.mapObject.spin(false)
          clearInterval(load_assets)
        } 
      }, 33)
      
      self = this
      
      
      let waitForMap = setTimeout(()=>{
        if(this.$refs.map) {
          this.map = this.$refs.map
          clearInterval(waitForMap)
          overRoom(this,this.$refs.map.mapObject)
          this.enableCustomEvents()
          this.map.mapObject.spin(true, {lines: 13, length: 20})
          
          let levelActions = [];
          
          // mounting toolbar
          // ['1', 'GF']
          ([...(Object.keys(this.map_levels).reverse()), 'bar_icon']).forEach((map,index)=>{
            levelActions.push(
              L.Toolbar2.Action.extend({
                options: {
                  toolbarIcon: {
                    html: 'M' + map,
                    // tooltip: '',
                  },
                },
                
                addHooks: function (event) {
                  // self.showMap(index)
                }
              })
            )
          })
          
          
          let toolbar = new L.Toolbar2.Control({position : 'bottomleft', actions: levelActions, });
          
          toolbar.addTo(this.$refs.map.mapObject)
          toolbar._container.id = 'toolbar2'
          
          
          let options = toolbar._container.firstChild.children
          this.levelOptions = options
          
          Object.assign(toolbar._container.firstChild.style, {"border": "none", "padding": "0", "padding-bottom": "10px",})
          for(let li of this.levelOptions) {
            Object.assign(li.firstChild.style, {'width': '40px'})
            li.firstChild.id = li.firstChild.textContent.slice(1) + "L"
            let key = li.firstChild.textContent.slice(1) // 'Mn' -> 'n'
            if(key === 'bar_icon') {
              // don't overwrite the previous classes with "className"
              li.firstChild.classList.add('toolbar-style') 
              Object.assign(li.firstChild.style, {'color': 'transparent'})
            }
      if(key !== 'bar_icon') { // attack a click if it's not the bar icon
              li.addEventListener('click', event=>{
                let map = key
                let layer = event.target
                this.layer = layer
                
                this.$store.dispatch('trigger_select', {value: map})
        })
            }
          }
          
          
          // default level
          let default_level = document.getElementById('1'+ "L")
          Object.assign(default_level.style, {'background-color': '#c0e28b'})
          this.$store.dispatch('trigger_select', {value: '1'}) // this.$model...initial
          
          // mounting toolbar
          
          
        }
      },22)
      
    },
    
    beforeCreate() {
    },
    
    beforeDestroy() {
    },
    
    
    methods: {
      callprint() {
        const printElement = document.querySelector(".leaflet-control-browser-print");
        if (printElement) {
          printElement.click();
        } else {
          console.error("Print element not found!");
        }
      },
      callLayers(){
        const layerElement = document.querySelector(".pqs-map-control-group-activate");
        if (layerElement) {
          layerElement.click();
        } else {
          console.error("Layer element not found!");
        }
      },
      defaults () {
      if(this.tool.select.active) {
        this.select = this.tool.select.initial
      }
    },
    showTags() {
      this.$store.dispatch('adjust_trigger_bookmark')
    },
    collect_data () {
      this.$store.dispatch('vxg_trigger_collect')
    },
    collectAssets () {
      this.$store.dispatch('vxg_trigger_collect')
    },

      show(action) {
      return this.allow(action) &&
        this.$store.state.vxg.cmp.BasicHead.show[action] 
    },
    allow(action) {
      let allowed = this.$store.state.vxg.cmp.BasicHead.allow[action]
      return null == allowed ? true : allowed
    },
      
      toggleFilter(event) {
      // aaaaaaaaaaaa
        this.$store.dispatch('trigger_toggle_filter');
    
      },

      async fetchPath() {
      try {
        const response = await axios.get('http://localhost:3000/pathfinder');
        console.log('response', response.data.numericCoordinates);
        //console.log(typeof(response.data));
        this.numericCoordinates = response.data.numericCoordinates;
        // // Process the path details as needed
        console.log('numeric coordinates are',this.numericCoordinates);
         this.transformAllCoordinates();
         console.log('Transformed coordinates are', this.transformedCoordinates);
        // Process the path details as needed
        //console.log('path deitals', this.pathDetails);
      } catch (error) {
        console.error('Error fetching path:', error);
      }
    },
    handleMapValueChange() {
      const mapValue = this.mapValue;
      //console.log('mapValue from the store is: ', mapValue);
      //console.log(typeof this.coordinates3);
     
      const parsed_data = JSON.parse(this.coordinates3)
      const map_key = this.mapValue;
      this.route2 = {};
      for (const key in parsed_data){
        if (key.startsWith(`m${map_key}`)) {
           console.log('key is:', key);
           //this.route2.push(JSON.parse(JSON.stringify({ [key]: test5[key] })));
           this.route2[key]=parsed_data[key];
      }
      }
    
      console.log('Filtered routes:', this.route2);

      // if (mapValue === '1') {
           
      //     //this.route2 = this.coordinates3.m1
      //     this.route2 = JSON.stringify(this.coordinates3) ? JSON.parse(this.coordinates3).m1 : [];
      //     //const route_len = JSON.stringify(this.coordinates3) ? JSON.parse(this.coordinates3) : [];
      //    // console.log('level one data is',JSON.parse(JSON.stringify(this.coordinates3)));
        
      //     // if (Object.keys(route_len).length > 1) {  
      //     //   const lastPoint = this.route2[this.route2.length - 1];
      //     //   console.log('Last point is: ', lastPoint);
      //     //    this.markerPosition = [lastPoint[0], lastPoint[1]]; 
      //     // }
      //     // else {
      //     //   this.markerPosition = null;
      //     // }
     
      // }
      // if (mapValue === '2') {
      //   // if (JSON.stringify(this.coordinates3) ? JSON.parse(this.coordinates3).m2 : []){
      //   //   console.log('coordinate values are',this.coordinates3 ? JSON.parse(this.coordinates3).m2 : [])
       
      //   this.route2 = JSON.stringify(this.coordinates3) ? JSON.parse(this.coordinates3).m2 : [];
      //   // if (this.route2.length > 1){
      //   //   const lastPoint = this.route2[0];
      //   //   console.log('Last point is: ', lastPoint);
      //   //   this.markerPosition = [lastPoint[0], lastPoint[1]];
      //   // }

      // //   else {
      // //     this.markerPosition = null;

      // //   }
      // //   }
      // //   else {
      // //     this.route2 = [];
      // //     this.markerPosition = null;
      //    }
        
      // // }
      // if (mapValue === '3') {
      //   // if (JSON.stringify(this.coordinates3) ? JSON.parse(this.coordinates3).m3 : []){
      //   //   console.log('coordinate values are',this.coordinates3 ? JSON.parse(this.coordinates3).m3 : [])

      //   this.route2 = JSON.stringify(this.coordinates3) ? JSON.parse(this.coordinates3).m3 : [];
      //  // }
      //   // else {
      //   //   this.route2 = [];
      //   }
        
      // // }
      // if (mapValue === '4') {
      //   // if (JSON.stringify(this.coordinates3) ? JSON.parse(this.coordinates3).m4 : []){
      //   //   console.log('coordinate values are',this.coordinates3 ? JSON.parse(this.coordinates3).m4 : [])
       
      //   this.route2 = JSON.stringify(this.coordinates3) ? JSON.parse(this.coordinates3).m4 : [];
      //   //}
      // //   else {
      // //     this.route2 = [];
      // //   }
        
      //  }
      // if (mapValue === '3') {
      //   console.log('coordinate values are',this.coordinates3 ? JSON.parse(this.coordinates3).m3 : [])
      //   this.route2 = this.coordinates3 ? JSON.parse(this.coordinates3).m3 : [];
      //   // console.log('mapValue from the store is: ', mapValue);
      //   // console.log('coordinate values are',JSON.parse(this.coordinates3).m3)
      //   // this.route2 = JSON.parse(this.coordinates3).m3;
      // }
      // if (mapValue === '4') {
      //   console.log('coordinate values are',this.coordinates3 ? JSON.parse(this.coordinates3).m4 : [])
      //   this.route2 = this.coordinates3 ? JSON.parse(this.coordinates3).m4 : [];
      //   // console.log('mapValue from the store is: ', mapValue);
      //   // console.log('coordinate values are',JSON.parse(this.coordinates3).m4)
      //   // this.route2 = JSON.parse(this.coordinates3).m4;
      // }
      // if (mapValue === '5') {
      //   //console.log('coordinate values are',this.coordinates3 ? JSON.parse(this.coordinates3).m5 : [])
      //   this.route2 = this.coordinates3 ? JSON.parse(this.coordinates3).m5 : [];
      //   // console.log('mapValue from the store is: ', mapValue);
      //   // console.log('coordinate values are',JSON.parse(this.coordinates3).m5)
      //   // this.route2 = JSON.parse(this.coordinates3).m5;
      // }
      // if (mapValue === '6') {
      //  // console.log('coordinate values are',this.coordinates3 ? JSON.parse(this.coordinates3).m5 : [])
      //   this.route2 = this.coordinates3 ? JSON.parse(this.coordinates3).m6 : [];
      //   // console.log('mapValue from the store is: ', mapValue);
      //   // console.log('coordinate values are',JSON.parse(this.coordinates3).m6)
      //   // this.route2 = JSON.parse(this.coordinates3).m6;
      // }
    },
    transformCoordinates(x, y, widthA, heightA, widthB, heightB) {
      // Translate the origin
      const translatedX = x;
      const translatedY = heightA - y;

      // Rotate 90 degrees clockwise
      const transformedX = translatedY;
      const transformedY = translatedX;

      return { x: transformedX, y: transformedY };
    },
    transformAllCoordinates() {
      const widthA = 8192;
      const heightA = 6144;
      const widthB = 8192;
      const heightB = 6144;

      this.transformedCoordinates = this.numericCoordinates.map(coord => {
        const transformedCoord = this.transformCoordinates(coord[0], coord[1], widthA, heightA, widthB, heightB);
        return [transformedCoord.x, transformedCoord.y];
      });

      // Log the transformed coordinates after the transformation is complete
      console.log('Transformed coordinates are', this.transformedCoordinates);
    },
      pinIcon (asset) {
        return asset ? (PIN_ICONS[asset.atype] || this.greenPin) : this.greenPin
      },
      
      showRoomAttrs(roomAttrs) {
        let self = this
        let current_map = this.$store.state.trigger.select.value
        let last_attr = this.$store.state.last_group_value.roomattr
        
        let count = 0
        let rooms = self.$store.state.main_room
        
        let matches = rooms.filter(room=>{
          room.show$ = false
          for(let attrField in roomAttrs) {
            if(
              roomAttrs[attrField] && 
                '1' == room[attrField]
              // current map and current levels
                && current_map == room.map
            ) {
              room.show$ = true
            }
          }
          
          if(room.show$) {
            count++
            return true
          }
        })
        
        this.$store.commit('set_found_rooms',{rooms: matches, last_attr})
      },
      
      
      showAssetGroups(assetGroups, flags) {
        flags = flags || {}
        // let current_map = this.$store.state.trigger.select.value
        let current_map = this.pos.map
        let count = 0
        let matches = this.items.filter(asset=>{
          if(
            assetGroups[asset.atype]
            // current map and current levels
              && current_map == asset.map
          ) {
            asset.active$ = true
            count++
            return true
          }
          else {
            asset.active$ = false
          }
        })
        
        if(flags.mapChange) {
          matches = matches.concat(this.$store.state.found_assets)
        }
        else {
          this.$route.meta.asset = {tag: "Assets", atype: 'Room/Area'}
        }
        
        this.$store.commit('set_found_assets',{assets: matches, whence:'C'})
      },
      
      
      getShowRoomColor(room, last_attr) {
        return Object.entries(this.showRoomColor)
          .reduce((c,en)=>{
            if('1'==room[en[0]]) {
              if(last_attr && '1' == room[last_attr]) {
                return this.showRoomColor[last_attr]
              }
              return en[1]
            }
            return c
          },this.polyColor)
      },
      
      addAll() {
        for(let asset of this.activeAssets) {
          this.clickHalo(asset)
        }
      },
      
      animate(elem_id, type, timeout = 1000) {
        let elem = document.querySelector("#" + elem_id)
        elem.classList.add(type)
        setTimeout(()=>{
          elem.classList.remove(type)
        }, timeout)
      },
      
      clusterfy(val) {
        if(this.map === null) {
          return
        }
        
        if(this.markers.length != 0){
          while(this.markers.length != 0) {
            this.markers.shift().remove()
          }
          this.markerGroup.remove()
        }
        while(this.assetCollWatchers.length != 0) {
          clearInterval(this.assetCollWatchers.shift())
        }
        
        this.markerGroup = L.markerClusterGroup({
          spiderfyOnMaxZoom: false,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: true,
          // singleMarkerMode: true,
          // spiderfyDistanceMultiplier: -100,
          maxClusterRadius: 40,
          chunkedLoading: true,
          
          spiderLegPolylineOptions: { weight: 1.5, color: 'black', opacity: 2.5 },
          
          spiderfyLinear: false,
          spiderfyLinearDistance: 30,
          spiderfyLinearSeparation: 45, 
          _generatePointsLine: function(count, centerPt) { // spread around the spiderfy
            
            /*
              var distanceFromCenter = this._group.options.spiderfyLinearDistance,
              markerDistance = this._group.options.spiderfyLinearSeparation,
              lineLength = markerDistance * (count - 1),
              lineStart = centerPt.y - lineLength / 2,
              res = [],
              i
              
              res.length = count
              
              for(i = count - 1; i >= 0; i--) {
              res[i] = new L.Point(centerPt.x + distanceFromCenter, lineStart + markerDistance * i)
              }
              
              return res
            */
          }
          
        })
        
        
        for(let asset of this.activeAssets) { // similar to "v-for" but dinamically written
          let marker, marker_options, popup
          
          marker_options = {
            'ref': asset.tag,
            // 'icon': this.changeIcon(asset) ? this.navyPin : this.greenPin,
            'icon': PIN_ICONS[asset.atype] || this.greenPin
            // 'class': 'asset-marker',
          }
          
          if (null == asset.xco || null == asset.yco) {
            continue
          }
          marker = L.marker(L.latLng(...this.assetLoc(asset)), marker_options)
          popup = marker.bindPopup(asset.tag, {autoClose: false, autoPan: false, closeOnClick: false,})
          
          
          
          
          this.markerGroup.addLayer(marker)
          this.markers.push(marker)
          
          marker.on('click', (e)=>{ // @click
            this.clickHalo(asset)
          })
        }
        
        
        this.map.mapObject.addLayer(this.markerGroup);
        // this.map.mapObject.fitBounds(this.markerGroup.getBounds());
        
        
        
        // spiderfy popup
        const MAX_ZOOM = 2
        function getLng(el) {
          return [el._latlng.lat, el._latlng.lng]
        }
        
        // use popup to mimic a container
        let popup
        const BLUE = '#7ec0d9', WHITE = '#f4f6fc'
        let watcher_c = 0
        
        this.markerGroup.on('clusterclick', c => {
          
          // only show when clusterfying n >= 2 assets
          if (c.layer._markers.length > 1) {
            
            mix_panel_track('cluster_tags')
            
            var marker = c.layer.getAllChildMarkers()[0]
            let markers = c.layer.getAllChildMarkers()
            var content = marker._popup._content
            var cluster = c.target.getVisibleParent(marker)
            
            if(cluster._popup) {
              cluster._popup.remove()
            }
            
            cluster.bindPopup(
              markers.map(c => c._popup._content).join('<br>'), // print hack
              {
                autoClose: false, 
                autoPan: false, 
                closeOnClick: false,
                offset: L.point(0, -10),
              }
            ).openPopup()
            
            Object.assign(cluster._popup._contentNode.style, {display: 'none',}) // print hack
            
            
            setTimeout(()=>{ // wait for it
              let main_div = cluster._popup._contentNode.parentNode
              // reopen on click
              main_div.parentNode.addEventListener('click', e => {
                cluster.closePopup()
                cluster.openPopup(
                  // [marker._latlng.lat, marker._latlng.lng]
                )
              })
              Object.assign(main_div.style, {
                'text-align': 'center',
                'width': 'max-content', // adjust to content
              })
              
              
              for(let index in markers) {
                let marker = markers[index]
                let _div = document.createElement('div')
                let assetId = _div.textContent = marker._popup._content
                let asset = this.$store.state.main_asset.find(asset => asset.tag == assetId)
                
                // _div.classList.add('leaflet-popup-content')
                
                Object.assign(_div.style, { cursor: 'default',} ) // hand-cursor -> 'pointer'
                
                
                
                main_div.append(_div)
                
                Object.assign(_div.style, {
                  'padding': '4px 17px 4px 17px',
                })
                
                let watcherId = setInterval( () => { // make it dynamic with the assetCollection - watcher
                  if(this.collect) {
                    let collectFound = this.assetCollection.find(v => v.tag == assetId)
                    // to check if an interval is cleared 'log'
                    if(collectFound) {
                      Object.assign(_div.style, {'background-color': BLUE,})
                      _div.haloed = true
                    }else {
                      Object.assign(_div.style, {'background-color': WHITE,})
                      _div.haloed = false
                    }
                  }
                  
                }, 11)
                this.assetCollWatchers.push(watcherId)
                
                _div.addEventListener('click', e => {
                  let target = e.target
                  
                  if(!target.haloed && this.collect) {
                    Object.assign(_div.style, {
                      'background-color': BLUE,
                      // 'text-align': 'center',
                    })
                    this.clickHalo(asset)
                  }
                  
                })
                
                if(index == 0) {
                  Object.assign(_div.style, {
                    'border-top-right-radius': '10px',
                    'border-top-left-radius': '10px',
                  })
                  
                }
                if(index == markers.length - 1) {
                  Object.assign(_div.style, {
                    'border-bottom-right-radius': '10px',
                    'border-bottom-left-radius': '10px',
                  })
                }
                
              }
              
              
            }, 11)
            
            
            
            
          } 
          else {
  
          }
          
          
        })
        
        
      },
      
      getMapByLevel(level) {
        let found = null
        for(let map in this.map_levels) {
          if(this.map_levels[map].includes(level)) {
            found = map
            break
          }
        }
        return found
      },
      
      enableCustomEvents() { // circle removal and addition to asset clustering
        
        this.map.mapObject.on('layerremove', event=>{ // zoom-out
          
          
          
          let layer = event.layer, circle, latlng, index, asset, assetName
          let layers = []
          
          if(this.isMarker(layer)) {
            
            if(layer._popup){
              assetName = layer._popup._content
              latlng = [layer._latlng.lat, layer._latlng.lng]
              asset = this.activeHalos.find(v=>v.tag==assetName)
            }
            if(asset) {
              let asset_loc = this.assetLoc(asset)
              this.CirclesOnMap()
                .filter(v=>v._latlng.lat == asset_loc[0] && v._latlng.lng == asset_loc[1]) 
              // filter out and remove from the map
                .forEach(c=>c.remove())
            }
          }
        })
        
        this.map.mapObject.on('layeradd', event=> { // zoom-in
          let layer = event.layer // , circle, latlng, index, asset, arr, assetName
          
          
          // this.circles = []
          if(this.isMarker(layer)) {
            
            let marker = layer
            marker.openPopup(), marker.closePopup() // make _contentNode
            if(marker._popup && marker._popup._contentNode) { // enable popup forwarding
        marker._popup._contentNode.parentNode.addEventListener('click', e=>{
                marker.closePopup()
                marker.openPopup(
                  // [marker._latlng.lat, marker._latlng.lng]
           )
              })
            }
            
            setTimeout(()=> {
              let circle, latlng, index, asset, circles, assetName
              latlng = [layer._latlng.lat, layer._latlng.lng]
              assetName = layer.options.ref
              asset = this.activeAssets.find(v=>v.tag==assetName)
              if(asset !== undefined) {
                index = this.activeHalos.findIndex(v=>v.tag==asset.tag)
                if(index !== -1) {
                  latlng = this.assetLoc(asset)
                  let zoomLevels = {'-2': 50, '-1': 50, 0: 30, 1: 30, 2: 20, }
                  let currentZoom = this.map.mapObject.getZoom()
                  let radius
                  radius = zoomLevels[currentZoom] ? zoomLevels[currentZoom] : 50
                  
                  circle = L.circle(latlng, {fillOpacity: 0.5,
                                             weight: 0, color: '#38a2d3'})
                  circle.setRadius(radius)
                  
                  
                  circles = this.CirclesOnMap()
                  index = circles.findIndex(v=>v._latlng.lat == latlng[0] && v._latlng.lng == latlng[1]) // prevent duplicates
                  
                  if(index === -1) {
                    circle.addTo(this.map.mapObject)
                  }
                }
              }
              
            }, 0)
            
          }
        })
        
      },
      
      removeCollection(asset) {
        this.$store.dispatch('remove_collection_asset', {id: asset.id,})
        this.assetCollectionLoad() // refresh
      },
      
      clickLoad(asset) {
        let assets = Array.from(asset.asset) // prevent the caching - list copy
        this.clearHalos()
        this.$store.commit('set_asset_collection', {assets,})
        this.load = false
        this.mapUpdated = false
        this.viewasset = asset
        mix_panel_track('work_pack_load', { username: this.user_name } )
        
      },
      
      assetCollectionLoad() {
        this.collectLoaded = true // enable simple save
        this.load = true
        this.$store.dispatch("list_collection_assets") // .then(()=>{
      },
      
      changeIcon(asset) {
        return this.mapUpdated && this.assetCollection.find(v=>v.tag == asset.tag)
      },
      
      removeCollectItem (asset) {
        this.mapUpdated = false
        let mapped_collection = this.assetCollection.filter(v=>v.tag != asset.tag)
        let mapped_halos = this.activeHalos.filter(v=>v.tag != asset.tag)
        
        this.$store.commit('set_halo_assets', {assets: mapped_halos})
        this.$store.commit('set_asset_collection', {assets: mapped_collection})
        
      },
      
      simpleSave() {
        if(!this.collectLoaded) {
          this.save = true // saveAs if a collection is not loaded
        }
        else {
          let {id} = this.viewasset
    // overwrite
    if(id) {
            this.$store.dispatch("save_collection_asset", {id, asset: this.assetCollection}) 
    }
        }
        mix_panel_track('work_pack_save', { username: this.user_name } )
        
      },
      
      saveAsCollect() {
        let id = this.saveInput
        this.$store.dispatch("save_collection_asset", {id, asset: this.assetCollection})
        this.$store.dispatch("list_collection_assets") // .then(()=>{
  
        mix_panel_track('work_pack_save', { username: this.user_name } )
        this.save = false
        this.viewasset = {id,}
        this.collectLoaded = true // make sure to enable it here
      },
      
      clearCollection() {
        this.collectLoaded = false // disable simple save
        this.mapUpdated = false
        this.$store.commit('set_halo_assets',{assets:[]})
        this.$store.commit('set_asset_collection',{assets:[]})
        this.viewasset = {id: ''}
      },
      
      filterCollection(shake = true, switchMap = true){
        let current_map = this.$store.state.trigger.select.value
        // let filter_level = Array.from(this.filters).find(filter => filter.title == 'Level').value
        let maps = this.map_levels
        let assets = {}
        this.unselectFoundAssets()
        this.assetCollection.forEach(asset=>{ // unselect all the collection assets
          asset.active$ = false
        })
        
        for(let map in maps) {
          let levels = maps[map]
          for(let level of levels) {
            assets[level] = this.assetCollection.filter(asset => asset.level == level)
          }
        }
        
        let matches = []
        let current_levels = []
        
        for(let level in assets) {
          let c_map = this.getMapByLevel(level)
          if(c_map == current_map) {
            matches.push(...assets[level].map(asset => {
              asset.active$ = true
              return asset
            }))
            current_levels.push(level)
          }
        }
        
        if( switchMap && this.MapFoundAssets(current_map, assets) ) {
          return
        }
        
        // don't forget to set the found assets
        this.$store.commit('set_found_assets', {assets: matches,whence:'D'})
        
        // toolbar
        
        let selected_ids = []
        for(let level in assets) { // check the other levels
          let map = this.getMapByLevel(level)
          if(map != current_map) {
      let id = map + "L"
            let mark_map = document.getElementById(id)
            
            if(assets[level].length != 0) {
              Object.assign(mark_map.style, {'background-color': '#e5f3d0',})
              !selected_ids.includes(id) ? selected_ids.push(id) : null
            }else{
              if(!selected_ids.includes(id)) { // we could have "{'map': ['level1', 'level2']}"
                Object.assign(mark_map.style, {'background-color': '',})
              }
            }
          }
        }
        // toolbar
        
        // toolbar animation
        if(shake) {
          if(matches.length != 0 && selected_ids.length > 0) {
            this.animate('bar_iconL', 'skew-shake-x', 6000)
          }
          else if(selected_ids.length > 1) {
            this.animate('bar_iconL', 'skew-shake-x', 6000)
          }
          else if(matches.length == 0 && selected_ids.length != 0) {
            this.animate('bar_iconL', 'skew-shake-x', 6000)
          }
        }
        
      },
      
      updateMap() {
        // this.save = true
        this.clearFilterAssets() // clear filters
        
        setTimeout(()=>{ // wait
          this.$store.state.trigger.bookmark.visible = true
        }, 0)
        
        this.filterColl = true // enable collection filtering on level change
        
        this.filterCollection()
        this.clearOnMove = true
        
        
        this.mapUpdated = !this.mapUpdated
        this.clearHalos()
        
        
        setTimeout(()=>{ // clear all circles from 'layeradd'
          this.CirclesOnMap().forEach(c => c.remove() )
        }, 11)
        
        
        this.$route.meta.asset = {tag: "Assets", atype: 'Room/Area'}
        this.$store.commit('set_found_assets', { assets: this.assetCollection, whence:'E' } )
        
        // disable "doSearch" marker
        this.showPin = false
        this.showRoom = false
        // reset center and zoomLevel on applying a filter
        this.map.mapObject.setView([3300, 4700], this.minZoom+0.5)
        
      },
      
      closeCollect() {
        this.$store.dispatch('vxg_trigger_collect')
      },
      
      clickHalo(asset) {
        if(this.collect) {
          let haloFound = this.activeHalos.find(v=>v.tag==asset.tag)
          let collectFound = this.assetCollection.find(v=>v.tag==asset.tag)
          let index;
          if(!haloFound && !collectFound) {
            this.activeHalos.push(asset)
            this.assetCollection.push(asset)
          }
        }
      },
      
      clearHalos() {
        this.$store.commit('set_halo_assets',{assets:[]})
      },
      
      unselectFoundAssets() {
        this.clearHalos()
        this.foundAssets.forEach(v=>v.active$ = false) // reset all foundAssets to false
      },
      
      makeDraggable(map, popup) {
        if(popup._latlng !== null){
          let pos = map.latLngToLayerPoint(popup.getLatLng())
          L.DomUtil.setPosition(popup._wrapper.parentNode, pos)
          let draggable = new L.Draggable(popup._container, popup._wrapper)
          draggable.enable();
          
          draggable.on('dragend', function() {
            let pos = map.layerPointToLatLng(this._newPos)
            popup.setLatLng(pos)
          });
        }      
      },
      
      makeDialogsDraggable() {
        const d = {}
        document.addEventListener("mousedown", e => {
          const closestDialog = e.target.closest(".v-dialog.v-dialog--active")
          if (e.button === 0 && closestDialog != null && e.target.classList.contains("v-card__title")) { 
      // element which can be used to move element
            d.el = closestDialog
            d.mouseStartX = e.clientX
            d.mouseStartY = e.clientY
            d.elStartX = d.el.getBoundingClientRect().left
            d.elStartY = d.el.getBoundingClientRect().top
            d.el.style.position = "fixed"
            d.el.style.margin = 0
            d.oldTransition = d.el.style.transition
            d.el.style.transition = "none"
          }
        })
        
        document.addEventListener("mousemove", e => {
          if (d.el === undefined) return
          d.el.style.left = Math.min(
            Math.max(d.elStartX + e.clientX - d.mouseStartX, 0),
            window.innerWidth - d.el.getBoundingClientRect().width
          ) + "px"
          d.el.style.top = Math.min(
            Math.max(d.elStartY + e.clientY - d.mouseStartY, 0),
            window.innerHeight - d.el.getBoundingClientRect().height
          ) + "px"
        })
        
        document.addEventListener("mouseup", () => {
          if (d.el === undefined) return
          d.el.style.transition = d.oldTransition
          d.el = undefined
        })
        setInterval(() => { // prevent out of bounds
          const dialog = document.querySelector(".v-dialog.v-dialog--active");
          if (dialog === null) return
          dialog.style.left = Math.min(parseInt(dialog.style.left), 
                                       window.innerWidth - dialog.getBoundingClientRect().width) + "px"
          dialog.style.top = Math.min(parseInt(dialog.style.top), 
                                      window.innerHeight - dialog.getBoundingClientRect().height) + "px"
        }, 100)
      },
     
      
      getAssets(room, term) {
        return this.$store.state.main_asset.filter(asset=>asset.room===(typeof room == "string" ? room : room.room)
                                                   && asset.atype !== 'Room/Area' && asset.tag != term)
      },
      getRoute() {
      // const coordinates = [
      //     { nodeX: asset['xco'], nodeY: asset['yco'] },
      //     { nodeX: asset2['xco'], nodeY: asset2['yco'] }
      //   ];
      const coordinates = [
          { nodeX: this.asset['xco'], nodeY: this.asset['yco'],map:this.asset['map'] },
          { nodeX: this.asset2['xco'], nodeY: this.asset2['yco'], map:this.asset2['map'] }
        ];


      console.log('coordinates are', coordinates)
      //console.log('asset1 map is',typeof(asset['map']));
      const widthA = 8192;
      const heightA = 6144;
      const widthB = 8192;
      const heightB = 6144;

     //'http://localhost:3000/coordinates

       axios.post('http://localhost:9204/api/coordinates', { coordinates })
        .then(response => {
         
          this.coordinates3 = response.data.coordinates;
          //console.log('coordinates from the backend on system demo:', this.coordinates3);
          const pop_up = response.data.attribute_data;
          this.attributeData = pop_up;
          console.log('atrribute data is:', this.attributeData);
          const test = response.data.pathDetails;
          this.$store.dispatch('set_path_details', JSON.parse(test))
          console.log('path details are:', test);

      
          //const test4 =JSON.parse(this.coordinates3);
         
      
      const parsed_data = JSON.parse(this.coordinates3)
      const map_key = this.$store.state.trigger.select.value;
      this.route2 = {};
      for (const key in parsed_data){
        if (key.startsWith(`m${map_key}`)) {
           console.log('key is:', key);
           //this.route2.push(JSON.parse(JSON.stringify({ [key]: test5[key] })));
           this.route2[key]=parsed_data[key];
      }
      }
    
         console.log('Filtered routes:', this.route2);

     
          return axios.get('http://localhost:3000/numeric-coordinates');
          
        })
    
    },
      
      getRoom(asset, term) {
        let assets
        // Temporary fix for ticket PQPDEV-46
        // We need to manually add the mobile assets to the founded_assets because they don't have the property "room" initially.
        // Thus, they aren't assigned to the founded_assets state, and their metadata aren't rendered in the SideOneView component.
        // To-do: improve getRoom logic so mobile assets can also be assigned to a room and added to founded_assets
        const foundedAssets = this.$store.state.main_asset.filter((asset) => asset.tag == term)
        const isMobileAsset = foundedAssets[0].data7 === "Mobile Asset"
  
        if (isMobileAsset) {
          assets = foundedAssets
          this.assets = assets
          this.$store.commit('set_found_assets',{assets, whence:'F'})
          return
       }
  
        // let mapopts = this.$main.opts.map
        if(asset.room) {
          // TODO: use Array.find
          let room =
              this.$store.state.main_room.filter(room=>room.room == this.asset.room)[0]
  
          if(asset.room != null) {
            assets = this.getAssets(asset.room, term)
            this.assets = assets
            if(assets.length != 0) {
              this.$store.commit('set_found_assets',{assets, whence:'F'})
            }else {
              if(this.asset.atype !== 'Room/Area') {
                this.$store.commit('set_found_assets',{assets: [asset],whence:'G'})
              } else {
                this.$store.commit('set_found_assets',{assets: [asset], whence:'H'})
              }
            }
            
            this.showRoom = true
            
            return room
          }
          this.showRoom = false
          this.center = [3300, 3300] // should reset back to default center?
        }
      },
      
      doSearch(term, recenter, select) {
        if(!select && term !== '') {
          this.assetSelected = false
          this.preSearch = '' // reset preSearch for room selection 
        }
        if(select) {
          this.polyColor = 'green' // select color
        }
        else {
          this.polyColor = 'blue' // search color
        }
        
        recenter = null === recenter ? true : recenter
        
        if(term !== this.search) {
          this.search = term
          let mapopts = this.$main.opts.map
          let found =
              this.$store.state.main_asset.find(asset => asset.tag === this.search)
              console.log('found', found)
              console.log('search', this.search)
          
          this.asset = found
          if(this.asset) {
            if(this.lig) {
              this.lig.remove()
              this.lig = null
            }
  
            
            this.unselectFoundAssets()
            this.room = this.getRoom(this.asset, this.search)
  
            this.$refs.map.mapObject.panTo([ // panTo, setView
              (mapopts.height-this.asset.yco),
              this.asset.xco
            ], this.$refs.map.mapObject.getZoom(), {
        "animate": true,
          "pan": {
              "duration": 1
          }
      })
  
            
      this.$route.meta.asset = this.asset
      this.$store.commit('trigger_search_select')
      
            this.assetMarker = {
              tag: this.asset.tag,
              loc: [
                (mapopts.height-this.asset.yco),
                this.asset.xco
              ],
              level: this.asset.level,
              atype: this.asset.atype,
            }
          
  
      // disable the other filters on level change
            this.filterLevel = false
            this.filterColl = false
  
            let maps = this.map_levels
            let map
            map = this.getMapByLevel(this.asset.level) || this.asset.map
            this.$store.dispatch('trigger_select', {value: map})
            this.resetToolbar(map)
            this.search = ''
  
            this.clearOnMove = false
            this.showPin = true
            this.mapUpdated = false
            setTimeout(()=>{ // wait
              this.$store.state.trigger.bookmark.visible = true
            }, 0)
  
  
          } else {
            this.asset = {}
          }
        }else {
          self.polyColor = 'green' // select color
        }
        if(Object.keys(this.asset).length > 0 && Object.keys(this.asset2).length > 0) {
          this.getRoute()
         console.log({method: 'dosearch', asset: this.asset, asset2: this.asset2})
      
        } else {
          console.log({method: 'dosearch else', asset: this.asset, asset2: this.asset2})
        }
        //this.checkAssetlevel();
      },
      checkAssetlevel() {

      
let mapopts = this.$main.opts.map
console.log('mapopts:', this.$main.opts);
const mapValue = this.$store.state.trigger.select.value;
console.log('map value from check assets:', mapValue);
const asset_level = this.asset.map;
if (asset_level === mapValue) {
  console.log('asset level is equal to mapValue');

  
this.assetMarker = {
  tag: this.asset.tag,
  loc: [
    (mapopts.height- this.asset.yco),
    this.asset.xco
  ],
  level: this.asset.level,
  atype: this.asset.atype,
}

console.log('asset marker is:', this.assetMarker);
console.log(typeof(this.asset.yco))

} else {
//this.assetMarker= null;



console.log('asset level is not equal to mapValue');

}


},
  
      doSearch2(term, recenter, select) {
        if (!select && term !== '') {
          this.assetSelected = false
          this.preSearch = '' // reset preSearch for room selection 
        }
        if (select) {
          this.polyColor = 'green' // select color
        }
        else {
          this.polyColor = 'blue' // search color
        }

        recenter = null === recenter ? true : recenter

        if (term !== this.search2) {
          this.search2 = term
          let mapopts = this.$main.opts.map
          let found =
            this.$store.state.main_asset.find(asset => asset.tag === this.search2)
          console.log('found', found)
          console.log('search2', this.search2)

          this.asset2 = found
          if (this.asset2) {
            // remove if there is a side effect
            if (this.lig) {
              this.lig.remove()
              this.lig = null
            }


            // this.unselectFoundAssets()
            //this.room = this.getRoom(this.asset2, this.search2)

            this.$refs.map.mapObject.panTo([ // panTo, setView
              (mapopts.height - this.asset2.yco),
              this.asset2.xco
            ], this.$refs.map.mapObject.getZoom(), {
              "animate": true,
              "pan": {
                "duration": 1
              }
            })


            // this.$route.meta.asset = this.asset
            this.$store.commit('trigger_search_select')

            this.assetMarker2 = {
              tag: this.asset2.tag,
              loc: [
                (mapopts.height - this.asset2.yco),
                this.asset2.xco
              ],
              level: this.asset2.level,
              atype: this.asset2.atype,
            }

            // disable the other filters on level change
            this.filterLevel = false
            this.filterColl = false

            let maps = this.map_levels
            let map
            map = this.getMapByLevel(this.asset2.level) || this.asset2.map
            this.$store.dispatch('trigger_select', { value: map })
            this.resetToolbar(map)
            this.search2 = ''

            this.clearOnMove = false
            this.showPin = true
            this.mapUpdated = false
            setTimeout(() => { // wait
              this.$store.state.trigger.bookmark.visible = true
            }, 0)


          } else {
            this.asset2 = {}
          }
        } else {
          self.polyColor = 'green' // select color
        }
        
        if(Object.keys(this.asset).length > 0 && Object.keys(this.asset2).length > 0) {
          this.getRoute()
         console.log({method: 'dosearch2', asset: this.asset, asset2: this.asset2})
         // this.getRoute(this.asset, this.asset2)
        } else {
          console.log({method: 'dosearch2 else', asset: this.asset, asset2: this.asset2})
        }
       // this.checkAssetlevel2();
      },
      checkAssetlevel2() {
      
            let mapopts = this.$main.opts.map
            console.log('mapopts:', this.$main.opts);
            const mapValue = this.$store.state.trigger.select.value;
            const asset_level = this.asset2.map;
            if (asset_level === mapValue) {
              console.log('asset level2 is equal to mapValue');
          //console.log('asset marker is:', this.assetMarker);
         // let mapopts = this.$main.opts.map
          this.assetMarker2 = {
              tag: this.asset2.tag,
              loc: [
                (mapopts.height- this.asset2.yco),
                this.asset2.xco
              ],
              level: this.asset2.level,
              atype: this.asset2.atype,
            }
        } else {
         // this.assetMarker2= null;
        
          
          console.log('asset level2 is not equal to mapValue');
        
            }
          
      },

      activateFocus(filter) {
        if(filter) {
          this.$refs[filter.name][0].focus()
        }
      },
      findNextFilter(name) {
        for(let i in this.filters) {
          let filter = this.filters[i]
          if(filter.name == name) {
            return parseInt(i)
          }
        }
        return -1
      },
      
      clickSelect(input, ref) { // single selection filter
        let rest = []
        let pc = []
        let look = {}
        // pc = this.$main.opts.td.deps.pc['building']
        // let match = true
        // let start = Date.now()
        
        for(let filter of this.filters) {
          if(filter.value && filter.name !== ref) {
            look[filter.name] = filter.value
          }
          else {
            rest.push(filter.name)
          }
        }
        
        for(let asset of this.$store.state.main_asset) {
          let match = true
          for(let l in look) {
            match &&= asset[l] == look[l]
          }
          if(match) {
            for(let field of rest) {
              // hash lookup
              if(pc[field]) {
                !pc[field][asset[field]] ? pc[field][asset[field]] = {text: asset[field]} : null
              }
              else {
                if(asset[field]) {
                  pc[field] = {[asset[field]]: {text: asset[field]}}
                }
                else {
                  pc[field] = {}
                }
              }
            }
          }
        }
        
        for(let filter of this.filters) {
          if(pc[filter.name]) {
            filter.items = Object.values(pc[filter.name]).filter(v=>v.text).sort((a, b) => {
              if (a.text < b.text) {
                return -1
              }
              if (b.text < a.text) {
                return 1
              }
              return 0
            })
          }
        }
      
      //  this.filterAssets();
      },
      changeSelect(input, ref) {
        let index, name, current, current_filter
  
        index = this.findNextFilter(ref)
        if(this.filters[index]) {
          current = this.$refs[this.filters[index].name][0]
          current.blur()
          
          current_filter = this.filters[index]
            
          // clear the rest from the selected on
          for(let i = index + 1; i < this.filters.length; i++) {
            this.$refs[this.filters[i].name][0].reset()
          }
          if(input !== null) {
            this.activateFocus(this.filters[index+1])
          }
        }
       // this.filterAssets();
      },
      
      CirclesOnMap() { 
        // the currently visible circles on the map due to asset-clustering
        return Object.entries(this.map.mapObject._layers)
          .map(v=>v[1])
          .filter(v=>v instanceof L.Circle)
      },
  
      MarkersOnMap() { 
        // the currently visible markers on the map due to asset-clustering
        return Object.entries(this.map.mapObject._layers)
          .map(v=>v[1])
          .filter(v=>v instanceof L.Marker && !(v instanceof L.MarkerCluster))
      },
  
      MarkerClustersOnMap () {
        return Object.entries(this.map.mapObject._layers)
          .map(v => v[1])
          .filter(v => v instanceof L.MarkerCluster)
  
      },
  
      isMarker(layer) {
             return layer instanceof L.Marker && !(layer instanceof L.MarkerCluster)
      },
  
      filterAssets(shake = true, switchMap = true) {
        if(shake && switchMap) {
          let obj_track = { username: this.user_name }
          for(let filter of this.filters) {
            if(filter.value !== null) {
              obj_track[filter.name] = filter.value
            }
          }
          mix_panel_track('Go_filter', obj_track )
        }
        
        let kept_halos // for keeping the selected halos from the asset collection
  
        this.filterLevel = true
  
        let current_map = this.$store.state.trigger.select.value
        let current_levels = this.map_levels[current_map]
        
        this.unselectFoundAssets()
  
        
        // this.$store.commit('set_halo_assets', {assets: Array.from(this.assetCollection)}) 
  
        // set off the other flags
        this.assetMarker = null
        this.assetMarker2 = null
        this.mapUpdated = false
        this.filterColl = false
        this.$store.dispatch('trigger_search', { term:'', })
        this.search = ''
        this.clearOnMove = true
        
  
  
        // this.$store.dispatch('trigger_select', {value:current_level.level})
  
        let level_matches = {}
        console.log('level match is', level_matches)
        for(let map in this.map_levels) {
          let current_levels = this.map_levels[map]
          console.log('current level is', current_levels)
      for(let level of current_levels) {
      let matches = this.items.filter(asset=>{
        let match = true
              
        for(let filter of this.filters) {
          let filterName = filter.name
          match &&= ((null == filter.value || '' == filter.value) ||
                  (asset[filterName] === filter.value)) 
                match &&= asset.level == level
        }
              
        return match
      })
      level_matches[level] = matches
         }
        }
        
        if( switchMap && this.MapFoundAssets(current_map, level_matches) ) {
          //this.filterAssets();
        // console.log('layer changed')
          return // stop further execution as we are moving on to the next map
        }
        
        let filter_level = ''
        if(Array.from(this.filters).find(filter => filter.title == 'Level')) {
          filter_level = Array.from(this.filters).find(filter => filter.title == 'Level').value
        }
  
        // Only show first 50 as per client
        // this.pinsLimit === 50
        // pinsShown: 0,
        // pinsLimit: 50,
  
        if(this.feature.ui_map_filter_result_counter.active) { // asset result counter feature enabled
          let matches = level_matches[current_level]
          this.pinsLimit = 50 
          this.pinsShown = matches.length
          this.matches = Array.from(matches)
        }
  
        
        let matches = []
        if(this.feature.ui_map_filter_result_counter.active) {
          matches = level_matches[current_level.floor].slice(0, this.pinsLimit).map(v=>{
            v.active$ = true
            return v
          })
        }
        else {
          if(filter_level) {
            let c_map = this.getMapByLevel(filter_level) // to compare with current map
            if(current_map == c_map) {
              matches = level_matches[filter_level].map(v => {
                v.active$ = true
                return v
              })
            }else {
              filter_level = ''
            }
          }
          else {
            for(let level in level_matches) {
              let c_map = this.getMapByLevel(level) // to compare with current map
              if(current_map == c_map) {
                matches.push(...level_matches[level].map(v => {
                  v.active$ = true
                  return v
                }))
              }
            }
          }
  
        }
        
  
        // toolbar
  
        let selected_ids = []
        for(let level in level_matches) { // check the other levels
          let map = this.getMapByLevel(level)
          if(map != current_map) {
      let id = map + "L"
            let mark_map = document.getElementById(id)
  
            if(level_matches[level].length != 0) {
              Object.assign(mark_map.style, {'background-color': '#e5f3d0',})
              !selected_ids.includes(id) ? selected_ids.push(id) : null
            }else{
              if(!selected_ids.includes(id)) {
                Object.assign(mark_map.style, {'background-color': '',})
              }
            }
          }
        }
        // toolbar
        
        // toolbar animation
        if(shake) {
          if(matches.length != 0 && selected_ids.length > 0) {
            this.animate('bar_iconL', 'skew-shake-x', 6000)
          }
          else if(selected_ids.length > 1) {
            this.animate('bar_iconL', 'skew-shake-x', 6000)
          }
          else if(matches.length == 0 && selected_ids.length != 0) {
            this.animate('bar_iconL', 'skew-shake-x', 6000)
          }
        }
  
        // reset center and zoomLevel on applying a filter
        this.map.mapObject.setView([3300, 4700], this.minZoom+0.5)
  
        self.showPin = false
  
        self.showRoom = false
  
        // keeping the selected halos
        kept_halos = matches.filter(v=>
          this.assetCollection.find(asset=>asset.tag==v.tag))
  
  
        
        
        this.$route.meta.asset = {tag: "Assets", atype: 'Room/Area'}
        this.$store.commit('set_found_assets',{assets: matches, whence:'I'})
  
        this.$store.commit('set_halo_assets', {assets: kept_halos}) 
        this.$store.commit('trigger_search_select')
      

       //filter all levels 
     //  let allMatches = []; // Initialize an empty array to store matches from all levels

         this.filterLevel = true;
       
    
      //     // Iterate over all levels
      // for (let level in this.map_levels) {
      //   let current_levels = this.map_levels[level];

      //   // Filter assets for the current level
      //   let matches = this.filterAssetsForLevel(current_levels);

      //   // Add matches to the allMatches array
      //   allMatches = allMatches.concat(matches);
      //   console.log("all matches are", allMatches)
      // }
      // return allMatches;  
      
      this.toggleFilter()
      },

      filterAssetsForLevel(levels) {
      // Implement the logic to filter assets for a given level
      // This is a placeholder function and should be replaced with actual filtering logic
      let matches = [];
      console.log("matches are", matches)
      // ... filtering logic here
      return matches;
    },

  
      dividy() {
        let arr = []
        let len = this.matches.length
        let current = 50
        while(1) {
          if(len > current) {
            arr.push(current)
            current += 50
          }
          else {
            arr.push(len)
            break
          }
        }
        return arr
      },
  
      selectNumber(num) {
        // {{pinsLimit.toString() + '/' + pinsShown.toString()}}
        this.pinsLimit = num
        let matches = this.matches.slice(0, num).map(v=>{
          v.active$ = true
          return v
        }), kept_halos = []
  
        self.showPin = false
  
        self.showRoom = false
  
        // keeping the selected halos
        kept_halos = matches.filter(v=>
          this.assetCollection.findIndex(asset=>asset.tag==v.tag) != -1)
  
        
        this.$route.meta.asset = {tag: "Assets", atype: 'Room'}
        this.$store.commit('set_found_assets',{assets:matches,whence:'J'})
  
        this.$store.commit('set_halo_assets', {assets: kept_halos})
        
        
      
      },

      clearFilter(){
        this.assetMarker = null
        this.assetMarker2 = null
        this.pinsLimit = 50
        this.pinsShown = 0
  
        this.unselectFoundAssets()
  
        // turning off every flag
        // reseting everyting
        this.mapUpdated = false
        this.filterLevel = false
        this.filterColl = false
        this.showPin = false
        this.preSearch = ''
        this.$store.commit('trigger_search_select')
        this.$store.dispatch('trigger_search', {term:''})
        // this.search = ''
        setTimeout(()=>{ // wait
          this.$store.state.trigger.bookmark.visible = false
        }, 0)
  
        for(let filter of this.filters) {
          filter.value = null
        }
        this.$store.state.found_assets.forEach(v=>{
          v.active$ = false
        })
  
        // toolbar
        let current_map = this.$store.state.trigger.select.value
        let maps = this.map_levels
        for(let map in maps) { // check the other levels
          if(map != current_map) {
            let id = map + "L"
            let mark_level = document.getElementById(id)
  
            Object.assign(mark_level.style, {'background-color': '',})
          }    
        }    
        // toolbar
  
        this.$store.commit('clear_groups')
  
        this.plantquestGroupSelect.clear()
      },
      
      clearFilterAssets() {
        this.assetMarker = null
        this.assetMarker2 = null  
        this.pinsLimit = 50
        this.pinsShown = 0
  
        this.unselectFoundAssets()
  
        // turning off every flag
        // reseting everyting
        this.mapUpdated = false
        this.filterLevel = false
        this.filterColl = false
        this.showPin = false
        this.showRoom = false
        this.preSearch = ''
        this.$store.commit('trigger_search_select')
        this.$store.dispatch('trigger_search', {term:''})
        // this.search = ''
        this.$route.meta.asset = {}
        setTimeout(()=>{ // wait
          this.$store.state.trigger.bookmark.visible = false
        }, 0)
  
        for(let filter of this.filters) {
          filter.value = null
        }
        this.$store.state.found_assets.forEach(v=>{
          v.active$ = false
        })
        this.$store.commit('set_found_assets',{assets:[],whence:'K'})
  
        // toolbar
        let current_map = this.$store.state.trigger.select.value
        let maps = this.map_levels
        for(let map in maps) { // check the other levels
          if(map != current_map) {
            let id = map + "L"
            let mark_level = document.getElementById(id)
  
            Object.assign(mark_level.style, {'background-color': '',})
          }    
        }    
        // toolbar
  
        this.$store.commit('clear_groups')
  
        this.plantquestGroupSelect.clear()
      },
      
      assetLoc(asset, halo = false) {
        let mapopts = this.$main.opts.map
        if(halo) {
          return [
            (parseInt(mapopts.height-asset.yco) + 20),
            parseInt(asset.xco)
          ]
        } else {
          return [
            parseInt(mapopts.height-asset.yco),
            parseInt(asset.xco)
          ]
        }
  
      },
      
      resetToolbar(val) {
        // toolbar
        let id = val
  
        this.layer = document.getElementById(id + "L")
        if(this.layer) {
          Object.assign(this.layer.style, {'background-color': '#c0e28b'})
        
          Array.from(this.levelOptions).forEach(el=>{
            if (el.firstChild.id != this.layer.id) {
              Object.assign(el.firstChild.style, {'background-color': ''})
            }
          })
        }
      },
      
      MapFoundAssets(current_map, level_matches) {
        let maps = {}
        function get_next_map() {
          for(let map in maps) {
            if(maps[map] != 0) {
              return map
            }
          }
          return null
        }
        for(let level in level_matches) {
          let map = this.getMapByLevel(level)
          if(map) {
            maps[map] !== undefined ? 
                        maps[map] += level_matches[level].length : 
                        maps[map] = level_matches[level].length
          }
        }
        if(maps[current_map] !== 0) {
          return false
        }
        delete maps[current_map]
        let moveToMap = get_next_map()
        if(moveToMap) {
          this.$store.state.trigger.select.value = moveToMap
          return true
        }
        
        return false
      },



      ...mapActions(['toggleSideInfoCardVisibility']),
      
      handleHeaderClick() {
      if (this.$route.meta.asset.tag !== 'Assets') {
        this.showSideInfoCard();
      }
    },


      assetStyle(asset) {
        let base = {color: 'black', 
                    'pointer-events': 'All',
                    'padding-left': '10px',
                }
        if(asset.active$) {
          base['background-color'] = '#daecf8'
          base['font-weight'] = 'bold'
        }
        else {
          base['background-color'] = 'white'
          base['font-weight'] = 'normal'
        }
        if(this.haloActive(asset)) {
          base['background-color'] = '#38a2d3'
        }
        return base
      },
    
      haloActive(asset) {
        return this.haloAssets.find(v => v.tag == asset.tag)
      },


      closeSideInfoCard() {
        this.toggleSideInfoCardVisibility(null);
      },
      showSideInfoCard() {
        if (this.$route.meta.asset.tag !== 'Assets') {
          this.toggleSideInfoCardVisibility(0);
      }
    },







      capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    getField(fieldName) {
      const field = this.fields.find(f => f.name === fieldName);
      return field ? field.title : '';
    },
      adjustTextArea(text, wider) {
        // console.log('text: ', [text, wider])
        let row = wider ? 29 : 29
        let one_line = wider ? 21 : 20
        let style = {
          'color': 'black',
          'resize': 'none',
          'font-size': '12px',
          'background-color': 'white',
          'overflow': 'hidden',
          'padding-left': '10px',
          'padding-right': '5px',
          'padding-top': '5px',
          'padding-bottom': '5px',
          'width': '100%',
          'border-radius': '4px',
          'outline': 'none',
          'height': 'min-content',
          'margin-bottom': '2px',
        }
        
        
        if(text.length > 29) {
          let rows = Math.ceil(text.length / row)
          let content_height = (rows * one_line)
          // console.log('rows: ', rows)
          return Object.assign(style, { height: content_height + 'px', }) 
        }	
        return Object.assign(style, {height: 25 + 'px', })
        
      },
      numPhotos(asset) {
        return (asset && asset.photocount || 0)
      },
      
      processMeta(asset) {
        
        // ['tag', 'atype', 'discipline', 'description', 'manufacturer', 'model', 'serial number', 'drawing 1', 'drawing 2', 'system',      'subsystem']
        // data coming from 'save Asset'
        let newAssets = {}
         console.log('asset one: ', asset)
        
        for(let field of this.fields) {
          if(asset[field.name]) {
            newAssets[field.name] = asset[field.name]
          }
        }
         console.log('newAsset: ', newAssets)
        return newAssets
      },

      activateMeta(assetTag) {
        this.mapActive[assetTag] = !this.mapActive[assetTag]
      },
      makeRoomDesignation(asset) {
        let alias = ''
        console.log('asset: ', asset.custom12)
        if(asset.custom12 && (asset.custom12 != null) && (asset.custom12 != 'null') ) {
          alias = ' (' + asset.custom12 + ')'
        }
        
        return asset.tag + alias
      },

      dropHeader(asset) {
        let style = {'min-height': '0px',
              'cursor': 'pointer',
              'overflow': 'hidden',
              'text-overflow': 'ellipsis',
              'max-width': '250px',
        }
        if(this.isRoom(asset)) {
          style['padding'] = '0px 12px 0px 0px'
        }
        return style
      },
      
      isRoom(asset) {
        if(!asset) {
          return false
        }
        return asset.atype == 'Room/Area' && asset.tag != 'Assets'
      },


    },
    
      
  }
  
  /*
    1-0008 Meeting Room
    EHS-EFAX-1-001 Fire Axe
  */
  
  
  </script>
  
  
  <style leaflet-browser-print-content>
    .grid-print-container {
      grid-template: auto 1fr auto / 1fr;
      background-color: orange;
    }
    .grid-map-print {
      grid-row: 2;
    }
    .title {
      grid-row: 1;
      justify-self: center;
      color: white;
    }
    .sub-content {
      grid-row: 5;
      padding-left: 10px;
    }
  </style>
  
  <style lang="scss">
  
  .pqs-oneview {
      position: fixed;
      top: 0;
      z-index: 5;
      overflow: hidden;
      background-color: #f4f6fc !important;
      
      .v-expansion-panel.pqs-panel-error {
          border: 1px solid red;
          .v-expansion-panel-header {
              color: red;
          }
      }
  }
  .pqs-edit-dialog {
      align-self: flex-end;
  }
  .asset-marker {
      color: red;
  }
  
  .collectionCard {
          background-color: #141B2D; 
          color: white;
          padding: 10px;
  }       
  
  .collectionContainer {
          height: 300px;
          width: 90%;
          padding: 0px;
          border: 1px solid black;
    margin-top: 10px;
          overflow-y: auto; 
  }       
  
  .collectionList {
          max-height: 100%; 
          padding: 0;
  }

  .filterCloseBtn{
    width: 20px !important;
    height: 20px !important;
    border-radius: 50%;
  }

  .filterSelect label, .filterSelect .v-select__selections{
    font-size: 14px !important;
  }

  .loadContentOver {
    background-color: #3e485e;
    padding:0;
    width: 400px;
  }
  
  .loadContentLeave {
    background-color: #27324a;
    padding:0;
    width: 400px;
  }
  
  .leaflet-popup-content {
    margin: 6px 19px;
    line-height: 1.4;
  }
  
  .toolbar-style {
    background-image: url("/hdpi.png");
    background-size: 22px;
    background-position: center;
  }
  
  .rise-shake {
    animation: jump-shaking 0.83s infinite;
  }
  
  .skew-shake-x {
    animation: skew-x-shake 1.3s infinite;
  }
  
  @keyframes jump-shaking {
    0% { transform: translateX(0) }
    25% { transform: translateY(-9px) }
    35% { transform: translateY(-9px) rotate(17deg) }
    55% { transform: translateY(-9px) rotate(-17deg) }
    65% { transform: translateY(-9px) rotate(17deg) }
    75% { transform: translateY(-9px) rotate(-17deg) }
    100% { transform: translateY(0) rotate(0) }
  }
  
  @keyframes skew-x-shake {
    0% { transform: skewX(-15deg); }
    5% { transform: skewX(15deg); }
    10% { transform: skewX(-15deg); }
    15% { transform: skewX(15deg); }
    20% { transform: skewX(0deg); }
    100% { transform: skewX(0deg); }  
  }
  .unselectable {
     -moz-user-select: none;
     -khtml-user-select: none;
     -webkit-user-select: none;
     
     -ms-user-select: none;
     user-select: none;
  }
  
  
  .pqs-map-control-group {
      position: relative;
  }
  
  .pqs-map-control-group-activate {
      background-color: #FFF;
      position: absolute;
      top: 2px;
      right: 15px;
      width: 41px;
    height: 40px;
      border: 2px solid white;
  }
  
  .pqs-map-control-group-menu {
      position: absolute;
      top: 0px;
      right: 64px;
      width: 200px;
      border-radius: 4px;
      border: 2px solid rgba(0,0,0,0.2);
      background: #141B2D;
      color: white;
  }
  
  .pqs-map-control-group-active {
      background-color: #4798E9 !important;
      color: white !important;
  }
  
  li.pqs-map-control-group-menu-head {
    font-weight: bold;
    background: #141B2D !important;
  }
  
  .pqs-map-control-group-menu > ul {
      background-color: #141B2D;
      padding: 0;
      margin: 0;
  }
  
  .pqs-map-control-group-menu > ul > li {
      background-color: #000;
      color: white;
      padding: 4px;
      margin: 0;
      list-style-type: none;
      border-radius: 4px;
      margin: 3px 0;
  }
  
  .asset-card-info-header{
    background-color: #f5f3ef;
  }
  
  
  /* LIG */
  
  .leaflet-image-gallery {
    width: 100%;
    height: 100%;
    /*
    font-size: 10px;
    color: red;
  */
  }
  /* Slideshow container */
  .slideshow-container {
    width: 100%;
    height: 100%;
    padding: 60px 60px 60px 23px;
    margin: auto;
    display: flex;
    flex-direction: row;
    box-sizing:border-box;
  }
  .sidebar {
    flex: 0 0 10%;
    padding-top: 1%;
    padding-right: 10px;
    width: 100%;
    height: 100%;
    overflow: auto;
    
  }
  /*
  .sidebar:hover {
    overflow: auto;
  }
  */
  .sidebar::-webkit-scrollbar {
    width: .4em;
  }
   
  .sidebar::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
   
  .sidebar::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  /* Hide the images by default */
  .mySlides {
    display: none;
    width: 100%;
    height: 95%;
    image-rendering: pixelated;
    filter: blur(0);
    xoverflow: scroll;
  }
  .view {
    max-width: 100%;
    max-height: 100%;
    xborder-radius: 1%;
  }
  /* Next & previous buttons */
  .prev, .next {
    cursor: pointer;
    padding: 1%;
    color: white;
    transition: 0.6s ease;
    user-select: none;
    background-color: transparent;
    border: 0;
  }
  /* Position the "next button" to the right */
  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }
  /* On hover, add a black background color with a little bit see-through 
  .prev:hover, .next:hover {
    background-color: rgba(0,0,0,0.8);
  }
  */
  /* Caption text */
  .text {
    color: #f2f2f2;
    font-size: 15px;
    padding: 8px 12px;
    bottom: 8px;
    width: 100%;
    text-align: center;
  }
  /* Number text (1/3 etc) */
  .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    top: 0;
  }
  /* The dots/bullets/indicators */
  .dot {
    cursor: pointer;
    /*
    height: 25%;
    width: 25%;
    
    */
    width: 100%;
    height: 19%;
    
    display: inline-block;
    transition: border 0.1s ease;
    
    
    background-color: rgba(0, 0, 0, 0.85);
    margin: 3px;
    
    
  }
  .active, .dot:hover {
    border: 2px solid white;
  }
  /* Fading animation */
  .fade {
    animation-name: fade;
    animation-duration: .5s;
  }
  @keyframes fade {
    from {opacity: .4}
    to {opacity: 1}
  }
  /*
  width: 100%;height: 100%;object-fit: contain;
  */
  .imgd {
  /*
      width: 100%;
      height: 86px;
      object-fit: cover;
      object-position: bottom;
  */
  /*
    width: 100%;
    height: 100%;
    object-fit: contain;
  */
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-size: cover;
    
    /*
    max-width: 100%;
    max-height: 100%;
    */
    
  }
  #closeGallery {
    top: 0;
    left: 30px;
    position: absolute;
    padding:0%;
    background-color: transparent;
    border: 0;
    font-size: 29px;
  }


  .selectedAsset_grid {
    display: grid;
    grid-template-columns: 130px 1fr;
}printMap



  .map_buttons button {
    margin-top: 12px;
     width : 40px;
     height: 40px;
     background-color: white;
     
     cursor: pointer;
      
    
  }
  
  .map_buttons button i {
    padding: 2px;
    color:black !important;
  }

  .leaflet-top.leaflet-left {
    display: flex;
    justify-content: space-between;
    width: calc(100vw - 467px);
    margin-left:41px;}

    .leaflet-control-browser-print.leaflet-bar.leaflet-control {
      width: 39px;
      height: 47px;
      border: none;
      margin-top: 12px;
    }
    .leaflet-touch .leaflet-bar a.leaflet-browser-print  {
      height: 40px;
      width: 50px;
    }

    .leaflet-control-zoom.leaflet-bar.leaflet-control {
      margin-left: -33px !important;
    }


 .v-badge__badge {
    
    font-size: 9px !important;
    min-width: 12px !important;
    
 }


   
 span.v-badge__badge.error {
  width: 10px;
    height: 10px;
    inset: auto auto calc(100% - 17px) calc(100% - 13px) !important;
}

     span.v-badge__badge {
          background-color: red !important;
          color: white !important;
          line-height: 2px;
         padding: 4px 0px !important;
    
     }

          .vue2leaflet-map{
            height: 100vh !important;
          }


  

        .custom-tooltip {
          border-radius: 0 !important;
         

        }
        .v-btn:not(.v-btn--round).v-size--default  {
          height: 40px;
          min-width: 40px;
          box-shadow: none;
          padding: 0 6px;
        }

        .pqs-map-control-group-menu{
          top: 42px;
          right: 17px;

        }


    </style>