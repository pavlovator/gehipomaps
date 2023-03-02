<template>
<div class="main-content">
    <div id="tooltip"></div>

    <div class="map-container">
        <svg id="map"></svg>
    </div>
    <div id="flag-container">
        <svg id="flag"></svg>
    </div>
    <div class="container">
  </div>
</div>
</template>

<script>
import * as d3 from "d3";
import { useMapOptionsStore } from '@/stores/map_options'


export default {
    name: "App-WorldMap",
    props: {
        countries: Object,
        ocean: Object,
        flags: Map
    },
    data() {
        return {
            margin: {top: 10, right: 10, bottom: 10, left: 10},
            width: 1000,
            height: 500,
            projection: d3.geoNaturalEarth1(),
            store: this.createStore()
        };
    },
    methods:{
        createStore() {
            return useMapOptionsStore() 
        },
        mouseOver(d, i){
            d3.select(d.target)
                .attr("fill", "grey")

            d3.select("#tooltip")
                .style("opacity", 0.8)
                .html(i.properties.ISO_A3 + ": " + i.properties.ADMIN)
                .style("left", (d.clientX) + "px")
                .style("top", (d.clientY - 5) + "px")
                .style("pointer-events", "none");


            d3.select("#flag")
                .append("image")
                .attr("xlink:href", this.flags.get(i.properties.ISO_A3))
                .attr("height", 100);
        },

        mouseLeave(d) {
            d3.select(d.target)
                .attr("fill", "yellow");

            d3.select("#tooltip")
                .style("opacity", 0);

            d3.select("#flag")
                .select("image")
                .remove();
        },

        renderMap(){
            console.log("rendering map");
            const svg = d3.select("#map")
                .attr("viewBox", this.margin.left + " " +  this.margin.top +" " + this.width + " " + this.height)
                .append("g")
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            
            d3.select("#tooltip")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "1px")
                .style("border-radius", "5px")
                .style("padding", "5px")
                .style("position", "absolute");

            const zoom = d3.zoom()
                .scaleExtent([1, 20])
                .translateExtent([[this.margin.left + this.margin.right, this.margin.top + this.margin.bottom], [this.width, this.height]])
                .on("zoom", e => {
                    const g = svg.selectAll("g");
                    let transform = e.transform;
                    g.attr("transform", (transform));
                    });

            // draw Map
            svg.append("g")
                .selectAll("path")
                .data(this.countries.features)
                .enter()
                .append("path")
                .attr("class", "topo")
                .attr("id", function(d) { return d.properties.ISO_A3; })
                .attr("d", d3.geoPath()
                    .projection(this.projection))
                .attr("fill", "yellow")
                .attr("stroke", "black")
                .attr("stroke-width", "0.1px")
                .on("mouseover", this.mouseOver)
                .on("mouseleave", this.mouseLeave);

            //draw ocean
            svg.append("g")
                .selectAll("path")
                .data(this.ocean.features)
                .enter()
                .append("path")
                .attr("class", "ocean")
                .attr("d", d3.geoPath()
                    .projection(this.projection))
                .attr("fill", "PaleTurquoise")
                .attr("stroke", "black")
                .attr("stroke-width", "0.1px");

            svg.call(zoom)
                .call(zoom.transform, d3.zoomIdentity);
                    
        }
    },
    mounted() {
        this.renderMap();
    },
    watch: {
        'store.checked_options.opt1_nato.checked': function(value) {
            d3.csv(this.store.checked_options.opt1_nato.file, function(data) {
                d3.select('#'+data.ISO_A3)
                    .attr('fill', value ? 'blue' : 'yellow');
            });
        },
        'store.checked_options.opt2_brics.checked': function(value) {
            d3.csv(this.store.checked_options.opt2_brics.file, function(data) {
                d3.select('#'+data.ISO_A3)
                    .attr('fill', value ? 'orange' : 'yellow');
            });
        },
        'store.checked_options.opt3_islam.checked': function(value) {
            console.log(value);
        },
        'store.checked_options.opt4_christianity.checked': function(value) {
            console.log(value);
        }
    },
    
}
</script>
<style lang="scss" scoped>

.main-content {
    flex: 1;
    background-color: white;
    padding: 10px;
}

.map-container {
    width: 80%;
    margin: 0 auto;
    border: 2px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.map-container svg {
  vertical-align: middle;
}
</style>