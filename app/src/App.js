import React, { useState, useEffect } from "react";
import { csv, max, scaleBand, scaleLinear } from "d3";

const App = () => {
	const csvUrl =
		"https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

	const [data, setData] = useState(null);

	const width = 1000;
	const height = 400;
	const margin = { top: 20, right: 20, bottom: 20, left: 200 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

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
				{xScale.ticks().map((tick) => (
					<g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
						<line y2={innerHeight} stroke="black" />
						<text
							dy={"1em"}
							y={innerHeight + 3}
							style={{ textAnchor: "middle" }}
						>
							{tick}
						</text>
					</g>
				))}
				{yScale.domain().map((domain) => (
					<text
						key={domain}
						dy=".32em"
						x={-10}
						y={yScale(domain) + yScale.bandwidth() / 2}
						style={{ textAnchor: "end" }}
					>
						{domain}
					</text>
				))}
				{data.map((d) => (
					<rect
						key={d.Country}
						x={0}
						y={yScale(d.Country)}
						width={xScale(d.Population)}
						height={yScale.bandwidth()}
					></rect>
				))}
			</g>
		</svg>
	);
};

export default App;
