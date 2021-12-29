import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { useData } from "./hooks/useData";

// Components
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import BarMarks from "./components/BarMarks";

const App = () => {
	const width = 1000;
	const height = 400;
	const margin = { top: 20, right: 20, bottom: 20, left: 200 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const data = useData();
	const yValue = (d) => d.Country;
	const xValue = (d) => d.Population;

	if (!data) {
		return <pre>"Loading"</pre>;
	}

	const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]);

	const xScale = scaleLinear()
		.domain([0, max(data, xValue)])
		.range([0, innerWidth]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				<AxisBottom xScale={xScale} innerHeight={innerHeight} />
				<AxisLeft yScale={yScale} />
				<BarMarks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
				/>
			</g>
		</svg>
	);
};

export default App;
