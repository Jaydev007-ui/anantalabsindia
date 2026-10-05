import React, { useState } from 'react';
import { X, Sliders, Activity, RotateCcw, Info, CheckCircle2 } from 'lucide-react';
import { ResearchProject } from '../../types';

interface VisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ResearchProject;
}

export const VisualizerModal: React.FC<VisualizerModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen) return null;

  // For SwachhVision: Confidence Threshold vs Precision / Recall / Latency
  // For ThermoShield: Coolant Velocity vs Thermal Resistance & Pressure Drop
  // For Embalming: Perfusion Pressure vs Flow Rate & Tissue Saturation
  // Default: Parametric model explorer

  const isSwachhVision = project.slug.includes('swachhvision');
  const isThermoShield = project.slug.includes('thermoshield');
  const isEmbalming = project.slug.includes('embalming');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
          aria-label="Close visualizer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-sky-700 font-semibold">
          <Activity className="w-4 h-4 text-sky-600" />
          <span>Interactive Research Model & Simulation</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
          {project.title}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Explore experimental response curves and system parameters derived from Ananta Labs laboratory trials.
        </p>

        {isSwachhVision ? (
          <SwachhVisionInteractive />
        ) : isThermoShield ? (
          <ThermoShieldInteractive />
        ) : isEmbalming ? (
          <EmbalmingInteractive />
        ) : (
          <GenericParametricInteractive project={project} />
        )}

        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-mono">
            <Info className="w-3.5 h-3.5 text-sky-600" />
            <span>Telemetry calibrated from Ananta Labs testbench datasets</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 font-medium transition"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
};

// SwachhVision Interactive Confidence Threshold Tuning
const SwachhVisionInteractive: React.FC = () => {
  const [threshold, setThreshold] = useState(0.72);
  const [temporalWindow, setTemporalWindow] = useState(8);

  // Dynamic calculations based on calibrated empirical response
  const precision = Math.min(99.4, 78 + threshold * 24 - (temporalWindow < 6 ? 6 : 0));
  const recall = Math.max(74.0, 98 - (threshold - 0.5) * 45);
  const f1Score = (2 * (precision * recall)) / (precision + recall);
  const falseAlarmRate = Math.max(0.4, (1 - threshold) * 6.5 * (8 / temporalWindow));
  const latencyMs = 28 + (temporalWindow - 4) * 1.8;

  return (
    <div className="space-y-6">
      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-700">Confidence Threshold (θ)</span>
            <span className="text-sky-700 font-semibold">{threshold.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.50"
            max="0.95"
            step="0.01"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>0.50 (Permissive)</span>
            <span>0.72 (Baseline)</span>
            <span>0.95 (Strict)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-700">Temporal Verification Window</span>
            <span className="text-sky-700 font-semibold">{temporalWindow} frames</span>
          </div>
          <input
            type="range"
            min="4"
            max="16"
            step="1"
            value={temporalWindow}
            onChange={(e) => setTemporalWindow(parseInt(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>4 frames (133ms)</span>
            <span>8 frames (266ms)</span>
            <span>16 frames (533ms)</span>
          </div>
        </div>
      </div>

      {/* Output Metrics Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Detection Precision</div>
          <div className="text-xl font-bold font-mono text-sky-700 mt-1">
            {precision.toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">True positive fraction</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Detection Recall</div>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">
            {recall.toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Capture rate of events</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">False Positive Rate</div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">
            {falseAlarmRate.toFixed(2)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Non-spitting triggers</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Pipeline Latency</div>
          <div className="text-xl font-bold font-mono text-amber-700 mt-1">
            {latencyMs.toFixed(1)} ms
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Trigger to audio delay</div>
        </div>
      </div>

      {/* Graphical Bar Visualization */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="text-xs font-mono text-slate-700 flex items-center justify-between">
          <span>Classifier Performance Balance (F1 Harmonic Mean: {f1Score.toFixed(1)}%)</span>
          <span className="text-[11px] text-sky-700 font-semibold">Operational Target: &gt;92%</span>
        </div>
        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${precision}%` }}
            className="bg-sky-600 h-full transition-all duration-300"
            title={`Precision: ${precision.toFixed(1)}%`}
          />
        </div>
        <div className="text-[11px] text-slate-600 leading-relaxed">
          {threshold > 0.85
            ? "High-precision strict regime: Eliminates almost all false alarms, but subtle or occluded spitting events at distance may be missed."
            : threshold < 0.65
            ? "Permissive sensitivity regime: Captures minor head movements but increases risk of false triggers on beverage drinking."
            : "Optimized operational balance: Recommended configuration deployed across municipal field sites."}
        </div>
      </div>
    </div>
  );
};

// ThermoShield Interactive Heat Transfer
const ThermoShieldInteractive: React.FC = () => {
  const [flowRate, setFlowRate] = useState(1.8); // L/min
  const [heatFlux, setHeatFlux] = useState(120); // W/cm²

  // Approximate physics
  const reynolds = Math.round(flowRate * 1250);
  const thermalResistance = Math.max(0.075, 0.16 - Math.log10(reynolds / 300) * 0.08);
  const pressureDropKpa = Math.max(3.0, Math.pow(flowRate, 1.85) * 14.2);
  const maxDieTemp = 25 + heatFlux * 4 * thermalResistance; // assuming 4 cm² die area

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-700">Coolant Flow Rate (Q)</span>
            <span className="text-sky-700 font-semibold">{flowRate.toFixed(2)} L/min</span>
          </div>
          <input
            type="range"
            min="0.3"
            max="3.0"
            step="0.1"
            value={flowRate}
            onChange={(e) => setFlowRate(parseFloat(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>0.3 L/min (Laminar)</span>
            <span>1.8 L/min (Nominal)</span>
            <span>3.0 L/min (Turbulent)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-700">Silicon Heat Flux (q″)</span>
            <span className="text-sky-700 font-semibold">{heatFlux} W/cm²</span>
          </div>
          <input
            type="range"
            min="40"
            max="160"
            step="5"
            value={heatFlux}
            onChange={(e) => setHeatFlux(parseInt(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>40 W/cm² (Standard)</span>
            <span>120 W/cm² (GaN/SiC)</span>
            <span>160 W/cm² (Extreme)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Reynolds Number</div>
          <div className="text-xl font-bold font-mono text-sky-700 mt-1">
            Re {reynolds.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {reynolds > 2300 ? "Vortex turbulence" : "Laminar boundary"}
          </div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Thermal Resistance</div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">
            {thermalResistance.toFixed(3)} K/W
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Cold plate performance</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Pressure Drop (ΔP)</div>
          <div className="text-xl font-bold font-mono text-amber-700 mt-1">
            {pressureDropKpa.toFixed(1)} kPa
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Hydraulic penalty</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Junction Temp (Tj)</div>
          <div className={`text-xl font-bold font-mono mt-1 ${maxDieTemp > 85 ? 'text-red-600' : 'text-sky-700'}`}>
            {maxDieTemp.toFixed(1)} °C
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Safe limit: &lt;85°C</div>
        </div>
      </div>
    </div>
  );
};

// Embalming Machine Interactive Perfusion
const EmbalmingInteractive: React.FC = () => {
  const [pressurePsi, setPressurePsi] = useState(14.5);
  const [pulseFreq, setPulseFreq] = useState(50); // BPM

  const flowRateMpm = pressurePsi * 42.5 * (1 + (pulseFreq - 50) * 0.005);
  const tissueEdemaRisk = pressurePsi > 25 ? "High (Edema Alert)" : pressurePsi > 20 ? "Moderate" : "Low / Safe";
  const vascularRuptureRisk = pressurePsi > 28 ? "CRITICAL RISK" : "0.0% (Protected)";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-700">Set Perfusion Pressure</span>
            <span className="text-sky-700 font-semibold">{pressurePsi.toFixed(1)} PSI</span>
          </div>
          <input
            type="range"
            min="2"
            max="35"
            step="0.5"
            value={pressurePsi}
            onChange={(e) => setPressurePsi(parseFloat(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>2 PSI (Microcapillary)</span>
            <span>15 PSI (Nominal)</span>
            <span>35 PSI (Max Sclerotic)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-700">Pulse-Wave Frequency</span>
            <span className="text-sky-700 font-semibold">{pulseFreq} BPM</span>
          </div>
          <input
            type="range"
            min="30"
            max="90"
            step="5"
            value={pulseFreq}
            onChange={(e) => setPulseFreq(parseInt(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>30 BPM (Gentle)</span>
            <span>50 BPM (Physiological)</span>
            <span>90 BPM (High Shear)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Volumetric Perfusion</div>
          <div className="text-xl font-bold font-mono text-sky-700 mt-1">
            {Math.round(flowRateMpm)} mL/min
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Dynamic arterial delivery</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Vascular Blowout Risk</div>
          <div className={`text-xl font-bold font-mono mt-1 ${pressurePsi > 25 ? 'text-red-600' : 'text-emerald-700'}`}>
            {vascularRuptureRisk}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Automated safety relief</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Tissue Edema Index</div>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">
            {tissueEdemaRisk}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Capillary fluid retention</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-[11px] font-mono text-slate-500">Preservative Fluid Saved</div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">
            28.4%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">vs manual gravity method</div>
        </div>
      </div>
    </div>
  );
};

const GenericParametricInteractive: React.FC<{ project: ResearchProject }> = ({ project }) => {
  return (
    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-4">
      <div className="font-mono text-sm text-sky-700 font-semibold">
        Empirical Performance Matrix — {project.researchId}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
        {project.performanceMetrics.map((m, idx) => (
          <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg shadow-xs">
            <div className="text-[11px] text-slate-500 font-mono">{m.label}</div>
            <div className="text-base font-bold text-slate-900 font-mono mt-1">
              {m.value} <span className="text-xs text-sky-600">{m.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
