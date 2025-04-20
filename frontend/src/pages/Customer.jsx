import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import GaugeChart from 'react-gauge-chart';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Customer = () => {
  const [user, setUser] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Computed insights
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [avgDailyConsumption, setAvgDailyConsumption] = useState(0);
  const [avgApplianceUsage, setAvgApplianceUsage] = useState(0);
  const [renewableContribution, setRenewableContribution] = useState(0);
  const [billPrediction, setBillPrediction] = useState(0);
  const [peakHours, setPeakHours] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loadMinusRenewable, setLoadMinusRenewable] = useState(0); // New state
  const [energyEfficiency, setEnergyEfficiency] = useState(0); // New state
  const [energySavings, setEnergySavings] = useState(0); // New state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    if (!user) return;

    fetch('/data.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header) => header.trim(),
          complete: (results) => {
            const data = results.data;
            const userData = filterByBuilding(data, user.name);
            setCsvData(userData);
            processInsights(userData);
            setLoading(false);
          }
        });
      })
      .catch(err => {
        console.error('CSV Error:', err);
        setError('⚠️ Failed to load data.');
        setLoading(false);
      });
  }, [user]);

  const filterByBuilding = (data, userName) => {
    const userNum = parseInt(userName.split(' ')[1]); // Extract number from 'Customer 15', 'Customer 16', etc.
    let buildingId = '';
  
    // For Customer 16 to Customer 20, use Industry_1 to Industry_5
    if (userNum >= 16 && userNum <= 20) {
      const industryId = userNum - 15; // This will map Customer 16 to Industry_1, Customer 17 to Industry_2, etc.
      buildingId = `Industry_${industryId}`;
    } else {
      const prefix = userNum <= 20 ? 'House_' : 'Industry_'; // Default behavior for House_1 to House_20
      buildingId = `${prefix}${userNum}`;
    }
  
    return data.filter(row => row.Building_ID === buildingId);
  };
  
  const processInsights = (data) => {
    const cleaned = data.filter(d =>
      d['Energy_Consumption (kWh)'] &&
      d['Renewable_Generation (kWh)'] &&
      d['Appliance_Usage_Index'] &&
      d['Grid_Price (cents/kWh)']
    );

    const total = cleaned.reduce((sum, row) => sum + row['Energy_Consumption (kWh)'], 0);
    const renewableTotal = cleaned.reduce((sum, row) => sum + row['Renewable_Generation (kWh)'], 0);
    const applianceAvg = cleaned.reduce((sum, row) => sum + row['Appliance_Usage_Index'], 0) / cleaned.length;
    const avgGridPrice = cleaned.reduce((sum, row) => sum + row['Grid_Price (cents/kWh)'], 0) / cleaned.length;
    const bill = total * avgGridPrice / 100; // converting cents to dollars

    const byDay = {};
    cleaned.forEach(row => {
      const date = new Date(row.Timestamp).toLocaleDateString();
      byDay[date] = (byDay[date] || 0) + row['Energy_Consumption (kWh)'];
    });

    const dailyAvg = Object.values(byDay).reduce((a, b) => a + b, 0) / Object.keys(byDay).length;
    const peaks = cleaned.filter(row => row['Energy_Consumption (kWh)'] > 1.2 * dailyAvg);
    const dailyChart = Object.entries(byDay).map(([date, total]) => ({ date, total }));

    const last10Days = dailyChart.slice(0, 12);
    // Calculate Load used minus renewable generation
    const loadUsedMinusRenewable = total - renewableTotal;

    // New insights: Energy Efficiency, Energy Savings
    const energyEfficiencyRatio = renewableTotal / total * 100;
    const savings = renewableTotal;

    setTotalConsumption(total);
    setRenewableContribution((renewableTotal / total) * 100);
    setAvgApplianceUsage(applianceAvg);
    setBillPrediction(bill);
    setAvgDailyConsumption(dailyAvg);
    setPeakHours(peaks);
    setWeeklyData(last10Days);
    setLoadMinusRenewable(loadUsedMinusRenewable);
    setEnergyEfficiency(energyEfficiencyRatio); // Set new insight
    setEnergySavings(savings); // Set new insight
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-600 mt-10 text-center">{error}</div>;

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] overflow-y-auto mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Energy Gauge */}
        <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
          <h2 className="font-semibold text-lg mb-2">🔌 Total Energy Used</h2>
          <GaugeChart
            id="gauge-chart"
            nrOfLevels={20}
            percent={Math.min(totalConsumption / 10000, 1)}
            textColor="#000"
            arcsLength={[0.3, 0.4, 0.3]}
            colors={['#5BE12C', '#F5CD19', '#EA4228']}
          />
          <p className="text-center mt-2 text-sm">{totalConsumption.toFixed(2)} kWh used</p>
        </div>

        {/* Weekly Line Chart */}
        <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition col-span-1 sm:col-span-2">
          <h2 className="font-semibold text-lg mb-2">📈 Weekly Usage Trend</h2>
          <Line
            data={{
              labels: weeklyData.map(d => d.date),
              datasets: [{
                label: 'kWh Used',
                data: weeklyData.map(d => d.total),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59,130,246,0.2)',
                tension: 0.4
              }]
            }}
          />
        </div>

        {/* Renewable Energy Contribution */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-5 shadow hover:shadow-md transition">
          <h2 className="font-semibold text-lg mb-2">🌱 Renewable Contribution</h2>
          <p className="text-2xl font-bold text-green-700">{renewableContribution.toFixed(2)}%</p>
          <p className="text-sm text-gray-700 mt-2">Portion of total energy from renewable sources</p>
        </div>

        {/* Bill Prediction */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-5 shadow hover:shadow-md transition">
          <h2 className="font-semibold text-lg mb-2">💸 Estimated Bill</h2>
          <p className="text-2xl font-bold text-yellow-700">₹{(billPrediction * 85).toFixed(2)}</p>
          <p className="text-sm text-gray-700 mt-2">Approx. bill based on grid price</p>
        </div>
        

        {/* Average Daily Consumption */}
<div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-xl p-5 shadow hover:shadow-md transition">
  <h2 className="font-semibold text-lg mb-2">📅 Average Daily Consumption</h2>
  <p className="text-2xl font-bold text-indigo-700">{avgDailyConsumption.toFixed(2)} kWh</p>
  <p className="text-sm text-gray-700 mt-2">Average daily energy consumption based on the past data</p>
</div>


        {/* Appliance Usage */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-xl p-5 shadow hover:shadow-md transition">
          <h2 className="font-semibold text-lg mb-2">📊 Appliance Usage Index</h2>
          <p className="text-2xl font-bold text-indigo-700">{avgApplianceUsage.toFixed(2)}</p>
          <p className="text-sm text-gray-700 mt-2">Avg. index based on usage patterns</p>
        </div>

        {/* Load Used - Renewable Energy */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-5 shadow hover:shadow-md transition">
          <h2 className="font-semibold text-lg mb-2">⚡ Load Used </h2>
          <p className="text-2xl font-bold text-blue-700">{loadMinusRenewable.toFixed(2)} kWh</p>
          <p className="text-sm text-gray-700 mt-2">Energy used after considering renewable generation</p>
        </div>

        {/* Energy Efficiency */}
        <div className="bg-teal-50 border-l-4 border-teal-500 rounded-xl p-5 shadow hover:shadow-md transition">
          <h2 className="font-semibold text-lg mb-2">🌿 Energy Efficiency</h2>
          <p className="text-2xl font-bold text-teal-700">{energyEfficiency.toFixed(2)}%</p>
          <p className="text-sm text-gray-700 mt-2">Renewable energy contribution to total usage</p>
        </div>

        {/* Energy Savings */}
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-5 shadow hover:shadow-md transition">
          <h2 className="font-semibold text-lg mb-2">💡 Energy Savings</h2>
          <p className="text-2xl font-bold text-orange-700">{energySavings.toFixed(2)} kWh</p>
          <p className="text-sm text-gray-700 mt-2">Energy saved by using renewable sources</p>
        </div>

        {/* Peak Load Alerts */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-5 shadow hover:shadow-md transition">
          <h2 className="font-semibold text-lg mb-2">⏰ Peak Load Alerts</h2>
          {peakHours.length > 0 ? (
            <p className="text-red-700 text-sm">
              ⚠️ Detected <strong>{peakHours.length}</strong> peak hour(s). Shift appliance usage if possible.
            </p>
          ) : (
            <p className="text-green-700 text-sm">✅ No peak usage detected. You're doing great!</p>
          )}
        </div>

        {/* Personalized Tips */}
        <div className="bg-white rounded-xl p-5 shadow hover:shadow-md transition col-span-1 sm:col-span-2 lg:col-span-3">
          <h2 className="font-semibold text-lg mb-2">🔔 Personalized Suggestions</h2>
          <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
            <li>Switch high-usage appliances to non-peak hours.</li>
            <li>Consider installing solar panels to boost renewable %.</li>
            <li>Monitor appliance usage weekly to stay under budget.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Customer;
