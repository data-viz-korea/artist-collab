<template>
  <div ref="app"></div>
</template>
<script>
import * as d3 from "d3";
import * as d3_force from "d3-force";
import { onMounted, ref } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const width = 100;
    const height = 100;
    const color = "#ccc";
    const app = ref(null);

    onMounted(() => {
      fetch("/api/data")
        .then((response) => response.json())
        .then((data) => {
          const { links, nodes } = data;
          const simulation = d3_force
            .forceSimulation(nodes)
            .force(
              "link",
              d3_force.forceLink(links).id((d) => d.id),
            )
            .force("charge", d3_force.forceManyBody())
            .force("center", d3_force.forceCenter(width / 2, height / 2));

          const svg = d3
            .select(app.value)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0, 10)");

          const link = svg
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", (d) => Math.sqrt(d.value));

          const node = svg
            .append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", color);

          node.append("title").text((d) => d.id);

          simulation.on("tick", () => {
            link
              .attr("x1", (d) => d.source.x)
              .attr("y1", (d) => d.source.y)
              .attr("x2", (d) => d.target.x)
              .attr("y2", (d) => d.target.y);

            node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
          });

          // invalidation.then(() => simulation.stop());

          return svg.node();
        });
    });
    return { app };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
