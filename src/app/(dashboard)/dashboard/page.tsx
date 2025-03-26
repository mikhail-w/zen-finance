import { DataCharts } from '@/components/data-charts';
import { DataGrid } from '@/components/data-grid';

export default function DashboardPage() {
  return (
    <div className="sm:px-6 md:px-0 w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  );
}
