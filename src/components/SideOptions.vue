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
                            checkbox_id:'opt1_nato',
                            checkbox_name:'nato_members'
                        },
                        {
                            text:"BRICS",
                            checkbox_id:'opt2_brics',
                            checkbox_name:'brics_members'
                        }
                        
                    ]
                },
                {
                    id:1,
                    text:'Religion',
                    items:[
                        {
                            text:"Islam",
                            checkbox_id:'opt3_islam',
                            checkbox_name:'islam'
                        },
                        {
                            text:"Christianity",
                            checkbox_id:'opt4_christianity',
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