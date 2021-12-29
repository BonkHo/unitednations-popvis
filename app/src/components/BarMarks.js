import React from "react";

const BarMarks = ({ data, yScale, xScale, yValue, xValue }) => {
	return data.map((d) => (
		<rect
			key={yValue(d)}
			x={0}
			y={yScale(yValue(d))}
			width={xScale(xValue(d))}
			height={yScale.bandwidth()}
		></rect>
	));
};

export default BarMarks;
