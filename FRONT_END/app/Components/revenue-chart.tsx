import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from "./lib/fonts";
import { generateYAxis } from "./lib/utils";

export default function RevenueChart() {
  // Simulated data, replace this with your fetchRevenue() call
  const revenue = [
    { candidat: "Hemery A", vote: 1020 },
    { candidat: "Amirah B", vote: 2900 },
    { candidat: "C", vote: 1500 },
    { candidat: "Raissa D", vote: 3552 },
    { candidat: "Diroil E", vote: 3000 },
    { candidat: "B", vote: 900 },
    { candidat: "Ivan C", vote: 400 },
    { candidat: "D", vote: 602 },
    { candidat: "Flora E", vote: 2500 },
  ];

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-900">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        VOTE PAR CANDIDAT
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-900 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((candidatVote) => (
            <div key={candidatVote.candidat} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-600"
                style={{
                  height: `${(chartHeight / topLabel) * candidatVote.vote}px`,
                }}
              ></div>
              <p className="rotate-90 text-sm text-gray-900 sm:rotate-0">
                {candidatVote.candidat}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-900" />
          <h3 className="ml-2 text-sm text-gray-500 ">Today 7 October 2024</h3>
        </div>
      </div>
    </div>
  );
}