<template>
    <div class="basic-nav-stages"   style="position: absolute;z-index:99; width:270px; height:300px;left:7px;    top: 250px;">
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
          <h4 style="width: 300px;font-size: 10px;">THIS ROUTE CONTAINS MULTIPLE LEVELS</h4>
        </v-expansion-panel-header>
        
        <v-expansion-panel-content >
            <div class="stage" style="background-color:#C0E28B;" >
              <h3>STAGE 1</h3>
              <p>Continue on path towards elevator.</p>
            </div>
            
            <div class="stage" style="background-color:white;margin-bottom: 9px;"> 
            <h3>STAGE 2</h3>
            <p>Take elevator to level 2 and continue towards your destination.</p>
            </div>
         
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
      
    </div>
</template>

<script>
<<<<<<< Updated upstream
=======
import axios from 'axios';
>>>>>>> Stashed changes
export default {
    name: 'BasicNavStages',
    data() {
        return {
<<<<<<< Updated upstream
            showNav: true,
=======
>>>>>>> Stashed changes
            isExpanded: false,
            iconSrc: 'nav_in.svg', // Initial icon
            publicPath: process.env.BASE_URL || '/',
        };
    },
    watch: {
    isExpanded() {
      this.toggleIcon();
    },
  },
<<<<<<< Updated upstream
  methods: {
=======
 

  methods: {
   
   





>>>>>>> Stashed changes
    toggleIcon() {
      this.iconSrc = this.isExpanded ? 'nav_in.svg' : 'nav_out.svg';
    },
    clearState() {
      this.isExpanded = false;
      this.iconSrc = 'nav_in.svg';
<<<<<<< Updated upstream
    },
    toggleshowNav() {
          this.showNav = !this.showNav;
        },

  },
  mounted() {
    this.$root.$on('clear-nav-stages', this.toggleshowNav);
  },
  beforeDestroy() {
    this.$root.$off('clear-nav-stages', this.toggleshowNav);
  },
    computed: {
        // Your computed properties go here
=======
    }
  },
  
    computed: {
        // Your computed properties go here
    },
    mounted() {
     
>>>>>>> Stashed changes
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