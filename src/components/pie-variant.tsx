import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { formatPercentage } from '@/lib/utils';
import { CategoryTooltip } from '@/components/category-tooltip';

// Define proper typing for our data
type PieData = {
  name: string;
  value: number;
};

const COLORS = ['#0062FF', '#12C6FF', '#FF647F', '#FF9354'];

type Props = {
  data?: PieData[];
};

export const PieVariant = ({ data }: Props) => {
  if (!data) {
    return null;
  }

  // Type-safe function to get percentage
  const getPercentage = (payload: unknown): number => {
    if (
      payload &&
      typeof payload === 'object' &&
      'percent' in payload &&
      typeof payload.percent === 'number'
    ) {
      return payload.percent * 100;
    }
    return 0;
  };

  // Custom tooltip renderer that formats the data to match what CategoryTooltip expects
  const renderCategoryTooltip = (props: any) => {
    if (!props.active || !props.payload || props.payload.length === 0) {
      return null;
    }

    // Transform the payload into the format expected by CategoryTooltip
    const formattedPayload = props.payload.map((entry: any) => ({
      payload: { name: entry.name },
      value: entry.value,
    }));

    return CategoryTooltip({
      payload: formattedPayload,
      active: true,
    });
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }) => {
            if (!payload) return null;

            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry, index) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color || '#000' }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
                      </span>
                      <span className="text-sm">
                        {formatPercentage(getPercentage(entry.payload))}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Tooltip content={renderCategoryTooltip} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
