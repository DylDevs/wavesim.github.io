import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

function WaveSVG({ amplitude, wavelength, type }: { amplitude: number; wavelength: number; type: "transverse" | "longitudinal" }) {
    const width = 2000;
    const height = amplitude * 2;
    const elements = [];

    if (type === "transverse") {
        // Transverse
        const points = [];
        for (let x = 0; x <= width; x++) {
            const y = amplitude * Math.sin((2 * Math.PI * x) / wavelength) + amplitude;
            points.push(`${x},${y}`);
        }
        return (
            <svg width={width} height={height}>
                <polyline
                    fill="none"
                    stroke="cyan"
                    strokeWidth="3"
                    points={points.join(" ")}
                />
            </svg>
        );
    } else {
        // Longitudinal
        for (let x = 0; x <= width; x += 10) {
            const compression = (Math.sin((2 * Math.PI * x) / wavelength) + 1) / 2;
            const offset = compression * 25;
            elements.push(
                <ellipse
                    key={x}
                    cx={x + offset}
                    cy={height / 2}
                    rx={3}
                    ry={amplitude / 2}
                    fill="cyan"
                />
            );
            }
        return (
            <svg width={width} height={height}>
                {elements}
            </svg>
        );
    }
}

function WavePropertiesPage() {
  const [amplitude, setAmplitude] = useState(50); // Pixels
  const [wavelength, setWavelength] = useState(200); // Pixels
  const [frequency, setFrequency] = useState(5); // Hz
  const [period, setPeriod] = useState(1); // seconds
  const [energy, setEnergy] = useState(0); // Joules
  const [waveType, setWaveType] = useState<"transverse" | "longitudinal">("transverse");

  // Update period when frequency changes
  useEffect(() => {
    setPeriod(1 / frequency);
  }, [frequency]);

  // Update energy proportional to amplitude squared
  useEffect(() => {
    setEnergy((amplitude ** 2) / 1000);
  }, [amplitude]);

  function PropertySlider({ label, value, onChange, min, max, step = 1, tooltip }: any) {
    return (
      <TooltipProvider delayDuration={50}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col gap-1">
              <label className="text-md">{label}: {value.toFixed(2)}</label>
              <Slider
                min={min}
                max={max}
                step={step}
                value={[value]}
                onValueChange={(vals: number[]) => onChange(vals[0])}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <Card className="bg-custom-card shadow-black shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Wave Properties Sandbox</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sliders and Type Selector */}
            <div className="flex flex-col gap-4">
              <PropertySlider
                label="Amplitude"
                min={10}
                max={100}
                value={amplitude}
                onChange={setAmplitude}
                tooltip="Height of the wave (transverse) or density variation (longitudinal)."
              />
              <PropertySlider
                label="Wavelength"
                min={50}
                max={400}
                value={wavelength}
                onChange={setWavelength}
                tooltip="Distance between crests or compressions."
              />
              <PropertySlider
                label="Frequency"
                min={0.5}
                max={5}
                step={0.1}
                value={frequency}
                onChange={setFrequency}
                tooltip="How many waves pass a point per second."
              />
              <div className="flex flex-col gap-1">
                <label className="text-md">Wave Type</label>
                <Tabs value={waveType} onValueChange={(val) => setWaveType(val as "transverse" | "longitudinal")}>
                  <TabsList className="bg-custom-cardhover">
                    <TabsTrigger value="transverse">Transverse</TabsTrigger>
                    <TabsTrigger value="longitudinal">Longitudinal</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 text-center justify-center">
              <div><strong>Period</strong>: {period.toFixed(2)} s</div>
              <div><strong>Speed</strong>: {(frequency * wavelength).toFixed(1)} pixels/s</div>
              <div><strong>Energy</strong>: {energy.toFixed(2)} J</div>
            </div>
          </div>

          {/* Wave Display */}
          <div className="relative overflow-hidden rounded-lg border bg-custom-bg py-2">
            <div className="flex h-64 relative items-center">
              <WaveSVG amplitude={amplitude} wavelength={wavelength} type={waveType} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default WavePropertiesPage;