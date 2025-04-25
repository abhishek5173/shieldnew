  import React, { useEffect, useState } from 'react';
  import Papa from 'papaparse';
  import { Bar } from 'react-chartjs-2';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const colonies = {
    Colony_1: ['House_1', 'House_2', 'House_3', 'House_4', 'House_5', 'Industry_1', 'Industry_2'],
    Colony_2: ['House_6', 'House_7', 'House_8', 'House_9', 'House_10', 'Industry_3', 'Industry_4'],
    Colony_3: ['House_11', 'House_12', 'House_13', 'House_14', 'House_15', 'Industry_5', 'Industry_6'],
  };

  export default function Owner() {
    const [data, setData] = useState([]);
    const [selectedView, setSelectedView] = useState('All Colonies');
    const [selectedBuildings, setSelectedBuildings] = useState([]);
    const [startDate, setStartDate] = useState('2024-02-01');
    const [endDate, setEndDate] = useState('2024-02-29');
    const [view, setView] = useState('');

    useEffect(() => {
      Papa.parse('/data.csv', {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: (results) => {
          const cleaned = results.data.filter((row) => row.Building_ID && row.Timestamp);
          setData(cleaned);
        },
      });
    }, []);

    const getBuildingsToShow = () => {
      if (selectedView === 'All Colonies') return Object.values(colonies).flat();
      if (colonies[selectedView]) return colonies[selectedView];
      return selectedBuildings;
    };

    const buildingsToShow = getBuildingsToShow();

    const filteredData = data.filter((row) => {
      const dateParts = row.Timestamp.split(' ')[0].split('-');
      const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      return (
        date >= new Date(startDate) &&
        date <= new Date(endDate) &&
        buildingsToShow.includes(row.Building_ID)
      );
    });

    const groupedByTimestamp = {};
    filteredData.forEach((row) => {
      const time = row.Timestamp;
      if (!groupedByTimestamp[time]) groupedByTimestamp[time] = {};
      groupedByTimestamp[time][row.Building_ID] = row['Energy_Consumption (kWh)'] || 0;
    });

    const timestamps = Object.keys(groupedByTimestamp).slice(0, 10);
    const datasets = buildingsToShow.map((building, i) => ({
      label: building,
      data: timestamps.map((t) => groupedByTimestamp[t]?.[building] || 0),
      backgroundColor: `hsl(${(i * 50) % 360}, 70%, 60%)`,
    }));

    const chartData = {
      labels: timestamps,
      datasets,
    };

    // SHIELD Analysis
    const totalConsumption = filteredData.reduce((sum, row) => sum + row['Energy_Consumption (kWh)'], 0);
    const totalRenewable = filteredData.reduce((sum, row) => sum + (row['Renewable_Generation (kWh)'] || 0), 0);
    const netBalance = totalRenewable - totalConsumption;
    const dateDiff = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
    const averageDailyConsumption = totalConsumption / dateDiff;
    const predictedNextMonth = Math.round(averageDailyConsumption * 31);
    const predictedMonthAfter = Math.round(averageDailyConsumption * 30);

    const peakLoads = Object.entries(groupedByTimestamp)
      .map(([time, buildings]) => ({
        time,
        total: Object.values(buildings).reduce((a, b) => a + b, 0),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);

    const overloadThreshold = 1000;
    const overloadRisks = peakLoads.filter(p => p.total > overloadThreshold);

    const suggestions = [];
    const buildingConsumption = {};
    filteredData.forEach((row) => {
      buildingConsumption[row.Building_ID] = (buildingConsumption[row.Building_ID] || 0) + row['Energy_Consumption (kWh)'];
    });

    // SMART THRESHOLD BASED ON AVERAGE
    const allConsumptions = Object.values(buildingConsumption);
    const avgConsumption = allConsumptions.reduce((a, b) => a + b, 0) / allConsumptions.length;
    const dynamicThreshold = avgConsumption * 1.5;

    Object.entries(buildingConsumption).forEach(([building, total]) => {
      if (total > dynamicThreshold) {
        suggestions.push(`${building} is consuming ${total.toFixed(2)} kWh, which is significantly higher than the average (${avgConsumption.toFixed(2)} kWh). Consider load redistribution.`);
      }
    });

    return (
      <div className="p-4 h-[calc(100vh-3.5rem)] bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center">⚡ SHIELD Energy Official Dashboard</h1>

        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          <button onClick={() => setSelectedView('All Colonies')} className="px-3 py-1 bg-blue-600 text-white rounded">All Colonies</button>
          {Object.keys(colonies).map((colony) => (
            <button key={colony} onClick={() => setSelectedView(colony)} className="px-3 py-1 bg-green-600 text-white rounded">{colony}</button>
          ))}
          <button
            onClick={() => {
              const input = prompt('Enter comma-separated building IDs:');
              if (input) {
                setSelectedView('Custom');
                setSelectedBuildings(input.split(',').map(s => s.trim()));
              }
            }}
            className="px-3 py-1 bg-purple-600 text-white rounded"
          >
            Custom
          </button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-3 py-1 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-3 py-1 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            {filteredData.length > 0 ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: `Energy Usage - ${selectedView}` },
                  },
                  scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'kWh' } },
                    x: { ticks: { maxRotation: 90, minRotation: 45 } },
                  },
                }}
              />
            ) : (
              <p className="text-red-600">No data found for selected range.</p>
            )}
          </div>
            
          <div className="bg-white p-4 rounded shadow text-sm space-y-2">
          <div className="space-y-4">
      {/* Toggle Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setView('traditional')}
          className={`px-4 py-2 rounded ${view === 'traditional' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Traditional
        </button>
        <button
          onClick={() => setView('ourModel')}
          className={`px-4 py-2 rounded ${view === 'ourModel' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Our Model
        </button>
      </div>

      {/* Conditional Content */}
      {view && (
        <div className="bg-white p-4 rounded shadow text-sm space-y-2">
          <h2 className="text-xl font-semibold mb-2">📋 SHIELD Report</h2>

          <p><strong>Total Consumption ({startDate} to {endDate}):</strong> {totalConsumption.toFixed(2)} kWh</p>
          
          {/* Only show the rest if 'Our Model' is selected */}
          {view === 'ourModel' && (
            <>
              <p><strong>Total Renewable Generation:</strong> {totalRenewable.toFixed(2)} kWh</p>
          <p>
            <strong>Net Balance (Renewable - Consumption):</strong>{" "}
            <span className={netBalance >= 0 ? "text-green-600" : "text-red-600"}>
              {netBalance.toFixed(2)} kWh
            </span>
          </p>

              <div className='flex gap-6'>
                <p><strong>Predicted Demand (March):</strong> {predictedNextMonth} kWh</p>
                <p><strong>Predicted Demand (April):</strong> {predictedMonthAfter} kWh</p>
              </div>

              <div className="mt-3">
                <strong>Peak Load Hours:</strong>
                <ul className="list-disc list-inside">
                  {peakLoads.map((p, i) => (
                    <li key={i}>{p.time} → {p.total.toFixed(2)} kWh</li>
                  ))}
                </ul>
              </div>

              {overloadRisks.length > 0 && (
                <div className="text-red-600">
                  <strong>⚠ Overload Risks:</strong>
                  <ul className="list-disc list-inside">
                    {overloadRisks.map((p, i) => (
                      <li key={i}>{p.time} → {p.total.toFixed(2)} kWh</li>
                    ))}
                  </ul>
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="text-blue-700">
                  <strong>✅ Suggestions:</strong>
                  <ul className="list-disc list-inside">
                    {suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
</div>

        </div>
      </div>
    );
  }
