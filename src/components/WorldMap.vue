<template>
<div id="tooltip"></div>
<svg id="map"></svg>
<div id="flag-container">
    <svg id="flag"></svg>
</div>
</template>

<script>
import * as d3 from "d3";


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
            height: 520,
            projection: d3.geoNaturalEarth1()

        };
    },
    methods:{
        mouseOver(d, i){
            d3.select(d.toElement)
                .style("fill", "green");

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

        mouseLeave() {
            d3.selectAll(".topo")
                .style("fill", "yellow");

            d3.select("#tooltip")
                .style("opacity", 0);

            d3.select("#flag")
                .select("image")
                .remove();
        },

        renderMap(){
            console.log(this.flags);
            console.log(this.countries);
            const svg = d3.select("#map")
                .attr("fill", "blue")
                .attr("viewBox", this.margin.left + " " + this.margin.top + " " + this.width + " " + this.height)
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

            svg.append("g")
                .selectAll("path")
                .data(this.countries.features)
                .enter()
                .append("path")
                .attr("class", "topo")
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
    updated() {
        this.renderMap();
    }
}
</script>
