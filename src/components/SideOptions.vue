<template>
<div class="options-container" v-for="item in sidebar_suboptions[suboptions_id].items" v-bind:key="item.id">
    <div class="option">
      <input type="checkbox" :checked="store.checked_options[item.checkbox_id].checked" :id="item.checkbox_id" :name="item.checkbox_name" @change="store.checkOption($event.target.id)">
      <label :for="item.checkbox_id">{{item.text}}</label>
    </div>
</div>
</template>

<script>
import { useMapOptionsStore } from '@/stores/map_options'

export default {
    name: 'App-SideOptions',
    props:{
        suboptions_id: Number
    },
    data(){
        return {
            store: this.createStore(),
            sidebar_suboptions: [
                {
                    id:0,
                    text:'Political',
                    items:[
                        {
                            text:"NATO",
                            checkbox_id:'pol_opt1_nato',
                            checkbox_name:'nato_members'
                        },
                        {
                            text:"BRICS",
                            checkbox_id:'pol_opt2_brics',
                            checkbox_name:'brics_members'
                        },
                        {
                            text:"Common Wealth",
                            checkbox_id:'pol_opt3_common_wealth',
                            checkbox_name:'common_wealth_members'
                        },
                        {
                            text:"EU",
                            checkbox_id:'pol_opt4_eu',
                            checkbox_name:"european_union_members"
                        },
                        {
                            text:"ASEAN",
                            checkbox_id:"pol_opt5_asean",
                            checkbox_name:"association_of_southeast_asian_nations_members"
                        },
                        {
                            text:"SCO",
                            checkbox_id:"pol_opt6_sco",
                            checkbox_name:"shanghai_cooperation_organisation_members"

                        },
                        {
                            text:"OAS",
                            checkbox_id:"pol_opt7_oas",
                            checkbox_name:"organization_of_american_states_members"

                        },
                        {
                            text:"Arab League",
                            checkbox_id:"pol_opt8_arab_league",
                            checkbox_name:"arab_league_members"

                        },
                        {
                            text:"United Nations",
                            checkbox_id:"pol_opt9_united_nations",
                            checkbox_name:"united_nations_members"

                        }
                    ]
                },
                {
                    id:1,
                    text:'Religion',
                    items:[
                        {
                            text:"Islam",
                            checkbox_id:'rel_opt1_islam',
                            checkbox_name:'islam'
                        },
                        {
                            text:"Christianity",
                            checkbox_id:'rel_opt2_christianity',
                            checkbox_name:'christianity'
                        }
                        
                    ]
                },
                {
                    id:2,
                    text:'Language',
                },
                {
                    id:3,
                    text:'Terrain',
                },
                {
                    id:4,
                    text:'Philosophy',
                },
                {
                    id:5,
                    text:'History',
                }
            ]
        }
    },
    methods:{
        createStore() {
            return useMapOptionsStore() 
        }
    }
}
</script>


<style lang="scss" scoped>

.options-container {
    padding: 10px;
    background-color: var(--dark-alt);
}
  
.option {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-left: 20px; /* add padding to the left */
}
  
.option input[type="checkbox"] {
    margin-right: 10px;
}
</style>