import React from "react";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";


const MileChart = () => {

  const mileStatics = [
    {
      name: "Sat",
      mileStats: 6000,
    },
    {
      name: "Sun",
      mileStats: 5000,
    },
    {
      name: "Mon",
      mileStats: 7000,
    },
    {
      name: "Tue",
      mileStats: 5780,
    },
    {
      name: "Wed",
      mileStats: 4890,
    },
    {
      name: "Thu",
      mileStats: 6390,
    },
    {
      name: "Fri",
      mileStats: 5490,
    },
  ];

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={mileStatics}>
        <XAxis dataKey="name" stroke="#2884ff" />
        <Bar dataKey="mileStats" stroke="#2884ff" fill="#2884ff" barSize={30} />

        <Tooltip wrapperClassName="tooltip__style" cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MileChart;