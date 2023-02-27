<template>
<div class="options-container" v-for="item in sidebar_suboptions[suboptions_id].items" v-bind:key="item.id">
    <div class="option">
      <input type="checkbox" :id="item.checkbox_id" :name="item.checkbox_name" @change="store.checkOption($event.target.id)">
      <label for="option1">{{item.text}}</label>
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
                            text:"NATO memebers",
                            checkbox_id:'option1',
                            checkbox_name:'nato_members'
                        },
                        {
                            text:"ASIAN whatever",
                            checkbox_id:'option2',
                            checkbox_name:'asian_whatever'
                        }
                        
                    ]
                },
                {
                    id:1,
                    text:'Religion',
                    items:[
                        {
                            text:"Islam",
                            checkbox_id:'option3',
                            checkbox_name:'islam'
                        },
                        {
                            text:"Christianity",
                            checkbox_id:'option4',
                            checkbox_name:'christianity'
                        }
                        
                    ]
                },
                {
                    id:2,
                    text:'Terrain',
                },
                {
                    id:3,
                    text:'Language',
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