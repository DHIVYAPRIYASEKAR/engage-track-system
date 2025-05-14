
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface TimeDistribution {
  name: string;
  value: number;
  color: string;
}

interface TimeDistributionChartProps {
  data: TimeDistribution[];
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 border rounded-md shadow-sm">
        <p className="font-medium">{`${payload[0].name}`}</p>
        <p className="text-sm">{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const TimeDistributionChart: React.FC<TimeDistributionChartProps> = ({ data, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Time Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{
                  paddingLeft: '10px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeDistributionChart;
