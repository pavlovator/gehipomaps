<template>
	<div class="app">
        <Sidebar />
        <div class="main-container" v-if="countries && flags && ocean">
            <Header title="GeoPolMap"/>
            <WorldMap :countries="countries" :flags="flags" :ocean="ocean" />
        </div>
        <div class="main-container" v-else>
            <Header title="GeoPolMap"/>
            <p>Loading data...</p>
        </div>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue'
import WorldMap from './components/WorldMap.vue';

import * as d3 from "d3";


export default {
	name: 'App',
	components: {
		Header,
        WorldMap,
        Sidebar
	},
	data(){
        return {
            countries: null,
            ocean: null,
            flags: null,
        }
    },
    mounted(){
        this.fetchData();
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

<style lang="scss">
:root {
	--primary: #4ade80;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}
body {
	background: var(--light);
}
button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}
.app {
    height: 100%;
	display: flex;
	main {
		flex: 1 1 0;
		padding: 2rem;
		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
.main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}
</style>