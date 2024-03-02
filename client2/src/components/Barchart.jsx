import React from "react";

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




const MileChart = () => {

  const data = [
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
    <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="mileStats" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
      
    </BarChart>
  </ResponsiveContainer>

  );
};

export default MileChart;