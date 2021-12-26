import React, { useState, useEffect } from "react";
import { csv, max, scaleBand, scaleLinear } from "d3";

const App = () => {
	const csvUrl =
		"https://gist.githubusercontent.com/BonkHo/b3de3a613a954de4af97f8f0c3d35f2c/raw/ea0362c3a3977b876a065f0e1fdc547cb4913455/unitedNationsTotalPopulation.csv";

	const [data, setData] = useState(null);

	const width = 1280;
	const height = 700;
	const margin = { top: 20, right: 20, bottom: 20, left: 20 };
	const innerWidth = height - margin.left - margin.right;
	const innerHeight = width - margin.top - margin.bottom;

	useEffect(() => {
		const row = (d) => {
			d.Population = +d["2020"];
			return d;
		};
		csv(csvUrl, row).then((data) => setData(data.slice(0, 10)));
	}, []);

	if (!data) {
		return <pre>"Loading"</pre>;
	}

	console.log(data);

	const yScale = scaleBand()
		.domain(data.map((d) => d.Country))
		.range([0, innerHeight]);

	const xScale = scaleLinear()
		.domain([0, max(data, (d) => d.Population)])
		.range([0, innerWidth]);

	console.log(xScale.ticks());

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				{data.map((d) => (
					<rect
						x={0}
						y={yScale(d.Country)}
						width={xScale(d.Population)}
						height={yScale.bandwidth()}
					>
						{" "}
					</rect>
				))}
			</g>
		</svg>
	);
};

export default App;
