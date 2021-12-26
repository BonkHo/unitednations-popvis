import React, { useState, useEffect } from "react";
import { csv, max, scaleBand, scaleLinear } from "d3";

const App = () => {
	const csvUrl =
		"https://gist.githubusercontent.com/BonkHo/b3de3a613a954de4af97f8f0c3d35f2c/raw/ea0362c3a3977b876a065f0e1fdc547cb4913455/unitedNationsTotalPopulation.csv";

	const [data, setData] = useState(null);

	const width = 1280;
	const height = 700;

	useEffect(() => {
		const row = (d) => {
			d.Population = +d["2020"];
			return d;
		};
		csv(csvUrl, row).then(setData);
	}, []);

	if (!data) {
		return <pre>"Loading"</pre>;
	}

	const yScale = scaleBand()
		.domain(data.map((d) => d.Country))
		.range([0, height]);

	const xScale = scaleLinear()
		.domain([0, max(data, (d) => d.Population)])
		.range([0, width]);

	return (
		<svg width={width} height={height}>
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
		</svg>
	);
};

export default App;
