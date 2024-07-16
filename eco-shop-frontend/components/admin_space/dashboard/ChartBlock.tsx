import { Chart01 } from "@ext/components/chartJs/Chart01";

function ChartBlock({ title }: { title: string }) {
  const years = Array.from({ length: 201 }, (_, index) => 1900 + index);
  return (
    <div className="bg-[rgba(0,0,0,0.2)] p-2 rounded-lg flex-col flex gap-2">
      <div className=" flex flex-col">
        <p className="text-white text-lg sm:text-xl font-semibold mb-2 text-center">
          {title}
        </p>
        <div className="flex flex-row justify-between items-center">
          <select
            id="year"
            name="year"
            required
            className="bg-transparent text-white border border-white rounded-md text-sm p-2"
          >
            <option value="">-- Select a year --</option>
            {years.map((year) => (
              <option key={year} value={year} className="text-black">
                {year}
              </option>
            ))}
          </select>
          <button className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md shadow-dark-900 shadow-md">
            Search
          </button>
        </div>
      </div>

      <Chart01 />
    </div>
  );
}

export default ChartBlock;
