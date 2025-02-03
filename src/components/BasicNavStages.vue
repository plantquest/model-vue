<template>
    <div v-if="routeMessages.length > 1" class="basic-nav-stages"   style="position: absolute;z-index:99; height:300px;left:7px;top: 250px;max-width: calc(100% - 11px);">
        <v-expansion-panels class="mb-12" v-model="isExpanded" >
      <v-expansion-panel class="nav-panel" v-model="isExpanded" >
        <v-expansion-panel-header 
          @click="toggleIcon" 
        >
          <template v-slot:actions>
            <img 
              :src="`${publicPath}${iconSrc}`" 
              :alt="isExpanded ? 'Collapse Icon' : 'Expand Icon'" 
              class="nav-icon"
            />
          </template>
          <img 
            :src="`${publicPath}Layers.svg`" 
            alt="Layers" 
            class="layers-icon" 
          />
          <h4 class="level-header">THIS ROUTE CONTAINS MULTIPLE LEVELS</h4>
        </v-expansion-panel-header>
        
        <v-expansion-panel-content style="padding-bottom: 10px;"  >
            <div v-for="(message, index) in routeMessages" :key="index" class="stage" style="background-color:white;"
            @click="selectStage(message.map, index)"
              v-bind:class="{ 'activated': activeStage == index }">
              <h3>STAGE {{ index+1 }}</h3>
              <p>{{ message.msg }}</p>
        
            </div>
        </v-expansion-panel-content>

       
      </v-expansion-panel>
    </v-expansion-panels>
    
    </div>
    
    
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'BasicNavStages',
    data() {
        return {
            showNav: true,
            isExpanded: false,
            iconSrc: 'nav_in.svg', // Initial icon
            publicPath: process.env.BASE_URL || '/',
            pathData: null ,// Add a data property to store the pathData
            parsedPathData: null,
            pathArray: null,
            mapValues: [],
            routeMessages: [],
            selectedStage : 0,
            activeStage: 0,
            levelNames : [
                        'Level 1',
                        'Level 1 Mezz & Intersticial',
                        'Level 2',
                        'Level 2 Roof & Intersticial',
                        'Level 3',
                        'Basement',
                    ],
        };
    },
    computed: {
    ...mapState({
      pathData: state => state.pathData,
      activeStage: state => state.activeStage, 
    }),
  },
    watch: {

    //   activeStage(newVal) {
      
    //   console.log('__activeStage updated:', 0);
     
    // },
    
      // Watch for changes in trigger.select.value
      '$store.state.trigger.select.value': function (value) {
        console.log('__value', value);
        this.activeStage = this.$store.state.activeStage 

        const stageIndex = this.routeMessages.findIndex(stage => stage.map == value);
        if (stageIndex !== -1) {
          this.activeStage = stageIndex;
          console.log('__activeStage', this.activeStage, stageIndex);
        } else {
          this.activeStage = 0;
        }

      },

    


    isExpanded() {
      this.toggleIcon();
    },
    // create a watcher for changes in pathData
    '$store.state.pathData': {
    async handler(data) {
      if (!data || !data.asset123) {
        console.warn("PathData is undefined or missing asset123");
        this.routeMessages = []; // Clear stages if data is invalid
        return;
      }

      this.pathData = data.asset123; 
      console.log('this.pathData', this.pathData);

      try {
        const parsedData = JSON.parse(this.pathData);
        if (!Array.isArray(parsedData) || parsedData.length === 0) {
          console.warn("Invalid or empty pathData");
          this.routeMessages = []; // Clear stages if data is invalid
          return;
        }

        this.pathArray = parsedData[0]; 
        let parsedLines = this.parseLines(this.pathArray); 

        // Map the parsedLines array to get map values
        this.mapValues = parsedLines.map(line => line.map);

        let stages = await this.getRouteSteps(parsedLines); 
        this.routeMessages = stages; 
        console.log('stages', stages); 

      } catch (error) {
        console.error("Error parsing pathData:", error);
        this.routeMessages = []; // Clear stages on error
      }

      // Dispatch the action (optional)
      this.$store.dispatch('set_path_data', { pathDetails: data.asset123 })
        .then(result => {
          console.log('Dispatch result:', result);
        })
        .catch(error => {
          console.error('Dispatch error:', error);
        });
    },
    deep: true // Watch for changes within nested objects 
  }
},
    

  methods: {


    getselectedStage() {
     console.log('selectedStage', this.selectedStage);
      return this.selectedStage;
     
    },
    selectStage(mapIndex, stageIndex) {
        this.selectedStage = mapIndex;
        this.activeStage = stageIndex;
        
        // Emit both the map index and stage data for parent components
        this.$emit('stageSelected', {
            mapIndex,
            stageIndex,
            stageData: this.routeMessages[stageIndex]
        });

        // Trigger route redraw via Vuex
        this.$store.dispatch('trigger_select', { 
            value: mapIndex,
            redrawRoute: true  // Add flag to indicate route should be redrawn
        });

        // Optional: Force route recalculation
        this.$store.dispatch('recalculateRoute', {
            level: mapIndex,
            path: this.pathArray
        });
    },

     parseLine(line){
            // line exmple : [47be48,Standard,,8832,4720]
           
            
             let lineData = line.split(',');

            let id = lineData[0];
            let type = lineData[1];

            let result = {
        id,
        type
      };
            console.log('Parsed Line:', result);
            return result;
        },
        parseLines(data){
          if (data)
            return data.map(lineData => {
                console.log(lineData.detail)
                let data = lineData.detail.split(',')
                return {
                    id : data[0],
                    type : data[1],
                    map : lineData.index
                }
            })
          else return [];
           
        },



        async getRouteSteps(routeData){
            let steps = routeData;

            let messages = [];

            for(var i=0; i<steps.length-2; i++){
                if(steps[i].type == "Connector"){
                    // first node type connector (i)
                    let msg = `Follow route to stairs and proceed to `;
                    var j = i;
                    while(steps[j].type == "Connector"){
                        j++;
                    }
                    // first node type Standar (j)
                    if(j < steps.length-3){
                        msg += `${this.levelNames[steps[j].map]}`
                        messages.push({msg, map: steps[i].map});
                    }
                    i=j;
                }
            }

            if(messages.length > 0){
              messages.push({
                 msg : `Proceed to your destination.`,
                  map : steps[steps.length-1].map,
                
                })

              }
              
            console.log('Steps:', steps);

              //         if(levels.length > 0){
              //   levels.push({
              //     msg : `Proceed to your destination.`,
              //     map : steps[steps.length-1].map,
              //     endIndex : steps.length-1,
              //     startIndex : startIndex
              //   })
              // }else {
              //   levels.push({
              //     msg : `Proceed to your destination.`,
              //     map : steps[steps.length-1].map,
              //     endIndex : steps.length-1,
              //     startIndex : 0
              //   })
              // }
              // return levels;

            return messages;
        },
    
   
    
    toggleIcon() {
      
      this.iconSrc = this.isExpanded ? 'nav_in.svg' : 'nav_out.svg';
      
    },
    clearState() {
      this.isExpanded = false;
      this.iconSrc = 'nav_in.svg';
    },
    toggleshowNav() {
          this.showNav = !this.showNav;
        },

  },
  mounted() {
   // this.parseLines(this.test); // Call parseLines with the test data
    this.$root.$on('clear-nav-stages', this.toggleshowNav);
    
    // Automatically select Stage 1 after the stages are rendered
    this.$nextTick(() => {
      if (this.routeMessages.length > 0) {
        this.selectStage(0, 0); // Select Stage 1 (index 0)
        this.$store.dispatch('trigger_select', { value: 0 }); // Ensure the map updates
      }
    });
  },
  beforeDestroy() {
    this.$root.$off('clear-nav-stages', this.toggleshowNav);
  },
    computed: {
        // Your computed properties go here
    }
};
</script>

<style lang="scss">

.basic-nav-stages {
  position: absolute;
  z-index: 99;
  height: 300px;
  left: 7px;
  top: 250px;
  max-width: calc(100% - 11px);

  .nav-panel {
    background-color: #DCEEEF;
  }

  .nav-icon {
    margin-left: 45px;
  }

  .layers-icon {
    margin-left: -16px;
    width: 30px;
  }

  .level-header {
    width: 300px;
    font-size: 10px;
  }

  .v-expansion-panel-header {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .v-expansion-panel-content__wrap {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .stage {
    width: 95%;
    height: 85px;
    margin: 0 4px 0 7px;
    background-color: white;

    &.activated {
      background-color: #C0E28B !important;
    }

    h3 {
      position: relative;
      font-family: "Gill Sans", sans-serif;
      top: 4px;
      left: 13px;
    }

    p {
      position: relative;
      font-family: "Gill Sans", sans-serif;
      font-size: 15px;
      width: 94%;
      top: 1px;
      left: 13px;
    }
  }

  .v-divider {
    border-color: rgb(var(--vxg-ct2)) !important;
    margin: 16px 8px;
    height: 22px;
  }
}



</style>
