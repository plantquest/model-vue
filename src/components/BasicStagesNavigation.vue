<template>
    <div  class="basic-nav-stages"   style="position: absolute;z-index:99; height:300px;left:7px;top: 250px;max-width: calc(100% - 11px);"
    
    >
        <v-expansion-panels class="mb-12" v-model="isExpanded" >
      <v-expansion-panel v-model="isExpanded" style="background-color:#DCEEEF" v-if="routeMassages.length > 0" >
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
          <h4 style="width: 300px;font-size: 10px;">THIS ROUTE CONTAINS MULTIPLE LEVEmmLS</h4>
        </v-expansion-panel-header>
        
        <v-expansion-panel-content  >
            <div v-for="(message, index) in routeMassages" :key="index" class="stage" style="background-color:white;"
            @click="selectStage(index)"
              v-bind:class="{ 'activated': selectStage == index }">
              <h3>STAGE {{ index+1 }}</h3>
              <p>{{ message }}</p>
        
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
            routeMassages: [],
            selectedstage : 0,
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
    }),
  },
    watch: {
    isExpanded() {
      this.toggleIcon();
    },
    // create a watcher for changes in pathData
    '$store.state.pathData': {
    handler(data) {
      console.log('PathData12333: ', data.asset123);
      this.pathData = data.asset123; 
      console.log('this.pathData', this.pathData);

      try {
        const parsedData = JSON.parse(this.pathData);
        console.log('parsedData', parsedData);

        if (parsedData && parsedData.length > 0) { 
          this.pathArray = parsedData[0]; 
          console.log('pathArray', this.pathArray);

          let parsedLines = this.parseLines(this.pathArray); 
          console.log('parsedLines', parsedLines);
          let stages = this.getRouteSteps(parsedLines); 
          this.routeMassages = stages; 
          console.log('stages', stages); 
        } else {
          console.warn("Invalid or empty pathData");
          // Handle the case where parsedData is empty or invalid
        }

      } catch (error) {
        console.error("Error parsing pathData:", error);
        // Handle the error gracefully 
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
    // Dispatch the action to update the pathData in the store
    // handlePathData(data) {
    // this.$store.dispatch('set_path_data', { pathDetails: data })
    //     .then(result => {
    //       console.log('Dispatch result:', result);
    //     })
    //     .catch(error => {
    //       console.error('Dispatch error:', error);
    //     });
    // },
    // handlePathData(data) {
    //     this.$store.commit('set_path_data', {pathDetails: data});
              
    //           this.$store.dispatch('set_path_data', { 
    //       assetId: 'asset123', 
    //       pathData: test});
    // },
    





    getselectedStage() {
     console.log('selectedStage', this.selectedStage);
      return this.selectedStage;
     
    },
    selectStage(index) {
        console.log('indexxxxxxxxx', index);
      this.selectedStage = index;
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
            return data.map(lineData => {
                console.log(lineData.detail)
                let data = lineData.detail.split(',')
                return {
                    id : data[0],
                    type : data[1],
                    map : lineData.index
                }
            })
        },



        getRouteSteps(routeData){
            let steps = routeData;

            let messages = [];

            for(var i=0; i<steps.length-2; i++){
                if(steps[i].type == "Connector"){
                    // first node type connector (i)
                    let msg = `Follow route to strairs and proceed to `;
                    var j = i;
                    while(steps[j].type == "Connector"){
                        j++;
                    }
                    // first node type Standar (j)
                    if(j < steps.length-3){
                        msg += `${this.levelNames[steps[j].map-1]}`
                        messages.push(msg)
                    }
                    i=j;
                }
            }

            if(messages.length > 0){
                messages.push(`Proceed to your destination.`)
                        }
            console.log('Steps:', steps);

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
    this.parseLines(this.test); // Call parseLines with the test data
    this.$root.$on('clear-nav-stages', this.toggleshowNav);
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
        top: 1px;
        left: 13px;
    }

    
}



</style>