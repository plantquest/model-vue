<template>
    <div class="basic-nav-stages"   style="position: absolute;z-index:99; width:270px; height:300px;left:7px">
       
        <v-expansion-panels class="mb-12">
      <v-expansion-panel v-model="isExpanded">
        <v-expansion-panel-header  style="background-color:#DCEEEF"  >
            
            <template v-slot:actions >
                <img v-if="isExpanded" :src="`${publicPath}nav_out.svg`" alt="Collapse Icon" style="margin-left: 45px;" />
                <img v-else :src="`${publicPath}nav_in.svg`" alt="Expand Icon" style="margin-left: 45px;" />
          </template>
          <img :src="`${publicPath}Layers.svg`" alt="Layers" class="Layers" style="margin-left: -16px;
          width: 30px;" />
          <h4 style="width: 300px;font-size: 10px;">THIS ROUTE CONTAINS MULTIPLE LEVELS</h4>
          
        </v-expansion-panel-header>
        
        <v-expansion-panel-content >
            <div class="stage" style="margin-top: 8px; background-color:#C0E28B" >
              <h3>STAGE 1</h3>
              <p>Continue on path towards elevator.</p>
            </div>
            
            <div class="stage" style="background-color:white"> 
            <h3>STAGE 2</h3>
            <p>Take elevator to level 2 and continue towards your destination.</p>
            </div>
         
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
      
    </div>
</template>

<script>
export default {
    name: 'BasicNavStages',
    data() {
        return {
            isExpanded: false,
            publicPath: process.env.BASE_URL || '/',
        };
    },
    watch: {
    isExpanded(newVal) {
      
    }
  },
    methods: {
        // Your component methods go here
    },
    computed: {
        // Your computed properties go here
    },
    mounted() {
        // Code to run when the component is mounted
    }
};
</script>

<style scoped>

.basic-nav-stages {

    .v-expansion-panel-content__wrap {
        background-color: #DCEEEF !important;
        border-radius: 10px;
    }
    .stage {
        width: 95%;
        height: 85px;
        margin: 9px 2px 0px 6px;
    }
    
}


</style>