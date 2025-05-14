
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ProductivityData {
  day: string;
  actual: number;
  expected: number;
}

interface ProductivityChartProps {
  data: ProductivityData[];
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 border rounded-md shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-xs text-brand">{`Actual: ${payload[0].value} hrs`}</p>
        <p className="text-xs text-neutral-dark">{`Expected: ${payload[1].value} hrs`}</p>
      </div>
    );
  }
  return null;
};

const ProductivityChart: React.FC<ProductivityChartProps> = ({ data, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Weekly Productivity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="actual" fill="#7E69AB" radius={[4, 4, 0, 0]} />
              <ReferenceLine
                y={8}
                stroke="#8E9196"
                strokeDasharray="3 3"
                label={{ value: 'Target: 8h', position: 'right', fill: '#8E9196', fontSize: 11 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductivityChart;
