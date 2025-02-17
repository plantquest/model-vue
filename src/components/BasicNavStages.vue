<template>
    <div v-if="routeMassages.length > 1" class="basic-nav-stages"   style="position: absolute;z-index:99; height:300px;left:7px;top: 250px;max-width: calc(100% - 11px);">
        <v-expansion-panels class="mb-12" v-model="isExpanded" >
      <v-expansion-panel v-model="isExpanded" style="background-color:#DCEEEF" >
        <v-expansion-panel-header 
          style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;" 
          @click="toggleIcon" 
        >
          <template v-slot:actions @click="toggleIcon" >
            <img v-if="isExpanded" :src="`${publicPath}${iconSrc}`" alt="Collapse Icon" style="margin-left: 45px;" />
            <img v-else :src="`${publicPath}${iconSrc}`" alt="Expand Icon" style="margin-left: 45px;" />
          </template>
          <img 
            :src="`${publicPath}Layers.svg`" 
            alt="Layers" 
            class="Layers" 
            style="margin-left: -16px; width: 30px;" 
          />
          <h4 style="width: 300px;font-size: 14px;padding-left: 2px;">THIS ROUTE CONTAINS MULTIPLE LEVELS</h4>
        </v-expansion-panel-header>
        
        <v-expansion-panel-content style="padding-bottom: 10px;"  >
            <div v-for="(message, index) in routeMassages" :key="index" class="stage" style="background-color:white;"
            @click="selectStage(message.map,index); activeStage = index"
              v-bind:class="{ 'activated': activeStage == index }">
              <h3 style="font-size: 13px;">STAGE {{ index+1}}</h3>
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
            routeMassages: [],
            selectedStage : 0,
            activeStage: this.$store.state.activeStage,
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

      '$store.state.trigger.select.value': function (value) {
    console.log('__value', value);

    if (this.$store.state.reverseTriggered) {
      this.activeStage = 0;
      this.$store.commit('clearReverseTrigger');
    } else {
      const stageIndex = this.routeMassages.findIndex(stage => stage.map == value);
      if (stageIndex !== -1) {
        this.activeStage = stageIndex;
        console.log('__activeStage', this.activeStage, stageIndex);
      } else {
        this.activeStage = 0;
      }
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
        this.routeMassages = []; 
        return;
      }

      try {
        const parsedData = JSON.parse(data.asset123);
        if (!Array.isArray(parsedData) || parsedData.length === 0) {
          console.warn("Invalid or empty pathData");
          this.routeMassages = [];
          return;
        }

        this.pathArray = parsedData[0];
        
        // Get unique stages with their corresponding maps from pathDetails
        const uniqueStages = this.pathArray.reduce((acc, curr) => {
          const key = `${curr.stage}`;
          if (!acc[key]) {
            acc[key] = {
              stage: curr.stage,
              map: curr.map,
              msg: `${acc.length === 0 ? 'Start' : 'Proceed'} your route on ${this.levelNames[curr.map - 1]} (Stage ${curr.stage})`
            };
          }
          return acc;
        }, {});

        this.routeMassages = Object.values(uniqueStages);
        console.log('stages', this.routeMassages);

      } catch (error) {
        console.error("Error parsing pathData:", error);
        this.routeMassages = [];
      }
    },
    deep: true
  }
},
    

  methods: {

    

    getselectedStage() {
     console.log('selectedStage', this.selectedStage);
      return this.selectedStage;
     
    },
    selectStage(map) {
      console.log('selectStage map:', map);
      this.selectedStage = map;
      this.$emit('stageSelected', map);
      this.$store.dispatch('trigger_select', { value: map });
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
        parseLines(data) {
          if (data) {
            let uniqueMaps = new Set();
            let parsedLines = data.map(lineData => {
              let data = lineData.detail.split(',')
              // Parse both map and stage from format "m{map}_{stage}"
              const matches = lineData.index.match(/m(\d+)_(\d+)/);
              if (matches) {
                const mapNumber = parseInt(matches[1]);
                const stageNumber = parseInt(matches[2]);
                uniqueMaps.add(mapNumber);
                return {
                  id: data[0],
                  type: data[1],
                  map: mapNumber,
                  stage: stageNumber,
                  index: lineData.index
                }
              }
              return null;
            }).filter(line => line !== null);
            
            // Filter to get unique map/stage combinations
            return parsedLines.filter((line, index) => 
              index === 0 || 
              line.map !== parsedLines[index - 1].map ||
              line.stage !== parsedLines[index - 1].stage
            );
          }
          return [];
        },



        async getRouteSteps(routeData) {
            if (!routeData || routeData.length === 0) return [];
            
            let messages = [];
            let seenCombinations = new Set();
            
            for (let step of routeData) {
              const combination = `${step.map}_${step.stage}`;
              if (!seenCombinations.has(combination)) {
                messages.push({
                  msg: `${seenCombinations.size === 0 ? 'Start' : 'Proceed'} your route on ${this.levelNames[step.map - 1]} (Stage ${step.stage})`,
                  map: step.map,
                  stage: step.stage
                });
                seenCombinations.add(combination);
              }
            }
            
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
      if (this.routeMassages.length > 0) {
        this.selectStage(0); // Select Stage 1 (index 0)
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

    .v-expansion-panel-content__wrap {
        
        border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;
    }

    .stage {
        width: 95%;
        height: 85px;
        margin: 0px 4px 0px 7px;
    }

    .stage h3 {
        position: relative;
        font-family: "Gill Sans", sans-serif;
        top: 4px;
        left: 13px;
    }
    .stage p {
        position: relative;
        font-family: "Gill Sans", sans-serif;
        font-size: 15px;
        width: 94%;
        top: 3px;
        left: 13px;
    }

    .stage.activated {
        background-color:#C0E28B !important;
    }
    .v-divider {
        border-color: rgb(var(--vxg-ct2)) !important;
        margin: 16px 8px;
        height: 22px;
    }
}



</style>
