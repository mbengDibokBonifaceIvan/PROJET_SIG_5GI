import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '../lib/fonts';
import { generateYAxish,Resu } from '../lib/utils';

// Define the Resultat type
type Result = {
  id_resultat: number;
  bureauVote: string;
  nombre_voix: number;
  date_saisie: string;
  annee_electionts: number;
};

export default function HistoVerticale() {
  // Mock data for candidates and their votes
  const Resu =[
    {  candidat: 'Candidat A', vote: 120,  },
    {  candidat: 'Candidat B', vote: 80,  },
    { candidat: 'Candidat C', vote: 150,  },
    {  candidat: 'Candidat D', vote: 200,},
    { candidat: 'Candidat E', vote: 50, },
  ];

  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxish(Resu);

  if (!Resu || Resu.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        VOTE PAR CANDIDAT
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {Resu.map((candidatVote) => (
            <div key={candidatVote.candidat} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * candidatVote.vote}px`,
                }}
              ></div>
              <p className="rotate-90 text-sm text-gray-400 sm:rotate-0">
                {candidatVote.vote}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Today 7 October 2024</h3>
        </div>
      </div>
    </div>
  );
}