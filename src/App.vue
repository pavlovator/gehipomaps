<template>
	<div class="container">
		<Header title="GeoPolMap"/>
		<Tasks :tasks="tasks" />
                    <div v-if="countries && flags && ocean">
                        <WorldMap :countries="countries" :flags="flags" :ocean="ocean" />
                    </div>
                    <div v-else>
                        <p>Loading data...</p>
                    </div>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import Tasks from './components/Tasks.vue';
import WorldMap from './components/WorldMap.vue';

import * as d3 from "d3";


export default {
	name: 'App',
	components: {
		Header,
        Tasks,
        WorldMap
	},
	data(){
        return {
            countries: null,
            ocean: null,
            flags: null,
            tasks: []
        }
    },
    mounted(){
        this.fetchData();
        this.tasks = [
            {
                id:1,
                text:'Doc appt11111',
                day:'March first at 10:10',
                reminder:'true'
            }
        ];
    },
    methods: {
        async fetchData(){
            let flagdata = new Map();
            await d3.csv("./data/wiki_flags.csv", function(d) {flagdata.set(d.ISO_A3, d.wiki_flag); });
            this.flags = flagdata;
            this.countries = await d3.json("./data/ne_50m_admin_0_countries.geojson");
            this.ocean = await(d3.json("./data/ne_50m_ocean.geojson"));
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
body {
	font-family: 'Poppins', sans-serif;
    background-color: beige;
}
.container {
	max-width: 1200px;
  margin: 30px auto;
	overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
</style>