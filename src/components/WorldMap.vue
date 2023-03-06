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
import chroma from "chroma-js"

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
            store: this.createStore(),
            default_color: chroma('yellow'),
            option_colors: {
                nato: "blue",
                brics: "orange",
                common_wealth: "green",
                eu: "#003399",
                asean: "red",
                sco: "#40E0D0",
                oas: "#982ecb",
                arab_league: "green",
                united_nations: "#009898"
            },
            colors_byISO: Object()
        };
    },
    methods:{
        createStore() {
            return useMapOptionsStore() 
        },
        mouseOver(d, i){
            let hover_color;
            if (d.target.id in this.colors_byISO){
                hover_color = chroma.average([this.blendColors(d.target.id), "rgba(100,100,100,0.7)"])
            } else {
                hover_color = chroma.average([this.default_color, "rgba(100,100,100,0.7)"])
            }

            d3.select(d.target)
                .attr("fill", hover_color)

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
                .attr("fill", d.target.id in this.colors_byISO ? this.blendColors(d.target.id) : this.default_color);

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
                .attr("fill", this.default_color)
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
                    
        },
        addColorsByISO(ISO, option){
            if (ISO in this.colors_byISO) {
                this.colors_byISO[ISO][option] = this.option_colors[option];
            } else {
                if (this.colors_byISO[ISO] !== undefined){
                    this.colors_byISO[ISO][option] = this.option_colors[option];
                } else {
                    this.colors_byISO[ISO] = {[option]:this.option_colors[option]};
                }
            }
            this.blendColors(ISO);
        },
        deleteColorsByISO(ISO, option){
            delete this.colors_byISO[ISO][option];
        },
        blendColors(ISO){
            const opt_colors = Object.values(this.colors_byISO[ISO]);
            if (opt_colors.length == 0){
                return this.default_color;
            }
            const blended_color = chroma.average(opt_colors);
            return blended_color;
        },
        applyColoring(is_checked, file, option){
            const addColors = this.addColorsByISO;
            const deleteColors = this.deleteColorsByISO;
            const blendColors = this.blendColors;
            d3.csv(file, function(data) {
                if (is_checked){
                    addColors(data.ISO_A3, option);
                } else {
                    deleteColors(data.ISO_A3, option);
                }
                const blended_color = blendColors(data.ISO_A3);
                d3.select('#'+data.ISO_A3)
                    .attr('fill', blended_color);
            });
        }
    },
    mounted() {
        this.renderMap();
    },
    watch: {
        'store.checked_options.pol_opt1_nato.checked': function(value) {
            this.applyColoring(value, this.store.checked_options.pol_opt1_nato.file, 'nato');
        },
        'store.checked_options.pol_opt2_brics.checked': function(value) {
            this.applyColoring(value, this.store.checked_options.pol_opt2_brics.file, 'brics');
        },
        'store.checked_options.pol_opt3_common_wealth.checked': function(value){
            this.applyColoring(value, this.store.checked_options.pol_opt3_common_wealth.file, 'common_wealth');
        },
        'store.checked_options.pol_opt4_eu.checked': function(value){
            this.applyColoring(value, this.store.checked_options.pol_opt4_eu.file, 'eu');
        },
        'store.checked_options.pol_opt5_asean.checked': function(value){
            this.applyColoring(value, this.store.checked_options.pol_opt5_asean.file, 'asean');
        },
        'store.checked_options.pol_opt6_sco.checked': function(value){
            this.applyColoring(value, this.store.checked_options.pol_opt6_sco.file, 'sco');
        },
        'store.checked_options.pol_opt7_oas.checked': function(value){
            this.applyColoring(value, this.store.checked_options.pol_opt7_oas.file, 'oas');
        },
        'store.checked_options.pol_opt8_arab_league.checked': function(value){
            this.applyColoring(value, this.store.checked_options.pol_opt8_arab_league.file, 'arab_league');
        },
        'store.checked_options.pol_opt9_united_nations.checked': function(value){
            this.applyColoring(value, this.store.checked_options.pol_opt9_united_nations.file, 'united_nations');
        },
        'store.checked_options.rel_opt1_islam.checked': function(value) {
            console.log(value);
        },
        'store.checked_options.rel_opt2_christianity.checked': function(value) {
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
    float: left;
}

.map-container svg {
  vertical-align: middle;
}
</style>