import { useState } from "react";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  Upload,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

interface PredictionResult {
  riskPercentage: number;
  riskLevel: "low" | "medium" | "high";
  failureDetected: boolean;
  failureType?: string;
  message: string;
}

export default function MachineFailureAI() {
  const [airTemp, setAirTemp] = useState("298.1");
  const [processTemp, setProcessTemp] = useState("308.6");
  const [rotationalSpeed, setRotationalSpeed] = useState("1551");
  const [torque, setTorque] = useState("42.8");
  const [toolWear, setToolWear] = useState("0");
  const [machineType, setMachineType] = useState("L");

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [bulkResults, setBulkResults] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [showManual, setShowManual] = useState(false);

  /* ================= SINGLE PREDICTION ================= */

  const analyzeMachine = async () => {
    setIsAnalyzing(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Air_temperature_K: Number(airTemp),
          Process_temperature_K: Number(processTemp),
          Rotational_speed_rpm: Number(rotationalSpeed),
          Torque_Nm: Number(torque),
          Tool_wear_min: Number(toolWear),
          Type: machineType,
          Temp_Diff: Number(processTemp) - Number(airTemp),
          Torque_Speed: Number(torque) * Number(rotationalSpeed),
        }),
      });

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      const risk = Math.round(data.failure_probability * 100);

      let riskLevel: "low" | "medium" | "high" = "low";
      if (risk > 60) riskLevel = "high";
      else if (risk > 40) riskLevel = "medium";

      setPrediction({
        riskPercentage: risk,
        riskLevel,
        failureDetected: data.failure_detected,
        failureType: data.failure_type || "None",
        message: data.failure_detected
          ? `High probability of ${data.failure_type}. Immediate maintenance recommended.`
          : "Machine operating within normal parameters.",
      });
    } catch {
      alert("Backend error");
    }

    setIsAnalyzing(false);
  };

  /* ================= BULK PREDICTION ================= */

  const analyzeBulk = async (file: File) => {
    setIsBulkUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict-bulk", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Bulk failed");

      const data = await response.json();
      setBulkResults(data.results);
    } catch {
      alert("Bulk upload failed.");
    }

    setIsBulkUploading(false);
  };

  const downloadCSV = () => {
    if (!bulkResults.length) return;

    const headers = Object.keys(bulkResults[0]);
    const csvRows = [
      headers.join(","),
      ...bulkResults.map(row =>
        headers.map(field => JSON.stringify(row[field] ?? "")).join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bulk_predictions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRiskColor = (level: string) => {
    if (level === "high") return "#EF4444";
    if (level === "medium") return "#FACC15";
    return "#22C55E";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">

      {/* ================= BULK SECTION (TOP NOW) ================= */}

      <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800 mb-12">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-400" />
          Bulk Machine Analysis (CSV Upload)
        </h2>

        <div
          className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500"
          onClick={() => document.getElementById("csvUpload")?.click()}
        >
          <Upload className="mx-auto mb-4 text-blue-400" size={40} />
          <p className="text-slate-400">Click to Upload CSV</p>

          <input
            id="csvUpload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                analyzeBulk(e.target.files[0]);
              }
            }}
          />
        </div>

        {isBulkUploading && (
          <p className="text-blue-400 mt-4">Analyzing CSV...</p>
        )}

        {bulkResults.length > 0 && (
          <div className="mt-6">
            <button
              onClick={downloadCSV}
              className="mb-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white flex items-center gap-2"
            >
              <Download size={18} />
              Download Results
            </button>

            <div className="overflow-auto max-h-80 border border-slate-700 rounded-lg">
              <table className="w-full text-sm text-slate-300">
                <thead className="bg-slate-800">
                  <tr>
                    {Object.keys(bulkResults[0]).map((key) => (
                      <th key={key} className="p-2 text-left">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bulkResults.map((row, i) => (
                    <tr key={i} className="border-t border-slate-700">
                      {Object.values(row).map((val, idx) => (
                        <td key={idx} className="p-2">{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ================= MANUAL DROPDOWN ================= */}

      <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
        <button
          onClick={() => setShowManual(!showManual)}
          className="text-white font-semibold mb-4"
        >
          {showManual ? "Hide Manual Entry ▲" : "Manual Entry ▼"}
        </button>

        {showManual && (
          <div className="grid grid-cols-2 gap-8">
            <div>
              <Input label="Air Temperature (K)" value={airTemp} setValue={setAirTemp} />
              <Input label="Process Temperature (K)" value={processTemp} setValue={setProcessTemp} />
              <Input label="Rotational Speed (RPM)" value={rotationalSpeed} setValue={setRotationalSpeed} />
              <Input label="Torque (Nm)" value={torque} setValue={setTorque} />
              <Input label="Tool Wear (min)" value={toolWear} setValue={setToolWear} />

              <select
                value={machineType}
                onChange={(e) => setMachineType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white mt-3"
              >
                <option value="L">L - Low Quality</option>
                <option value="M">M - Medium Quality</option>
                <option value="H">H - High Quality</option>
              </select>

              <button
                onClick={analyzeMachine}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 mt-4 rounded-lg text-white"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Risk"}
              </button>
            </div>

            <div>
              {prediction && (
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl font-bold mb-4"
                    style={{ color: getRiskColor(prediction.riskLevel) }}
                  >
                    {prediction.riskPercentage}%
                  </motion.div>

                  <p className="text-slate-300">{prediction.message}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

/* INPUT COMPONENT */

function Input({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (val: string) => void;
}) {
  return (
    <div className="mb-3">
      <label className="block text-sm text-slate-300 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
      />
    </div>
  );
}
