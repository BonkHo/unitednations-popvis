import React from "react";

const AxisBottom = ({ xScale, innerHeight }) => {
	return xScale.ticks().map((tick) => (
		<g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
			<line y2={innerHeight} stroke="black" />
			<text dy={"1em"} y={innerHeight + 3} style={{ textAnchor: "middle" }}>
				{tick}
			</text>
		</g>
	));
};

export default AxisBottom;
