import React from "react";

const AxisLeft = ({ yScale }) => {
	return yScale.domain().map((domain) => (
		<text
			key={domain}
			dy=".32em"
			x={-10}
			y={yScale(domain) + yScale.bandwidth() / 2}
			style={{ textAnchor: "end" }}
		>
			{domain}
		</text>
	));
};

export default AxisLeft;
