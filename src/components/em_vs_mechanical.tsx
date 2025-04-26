import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

function EMWaveSVG({ frequency }: { frequency: number }) {
    const width = 2000;
    const height = 200;
    const pointsE = [];

    // Calculate color: red at low frequency, blue at high frequency
    const wavelengthRatio = (frequency - 400) / 400; // 0 to 1
    const color = `rgb(${255 - wavelengthRatio * 255}, 0, ${wavelengthRatio * 255})`;

    for (let x = 0; x <= width; x++) {
        const yE = 50 * Math.sin((2 * Math.PI * x) / 200) + height / 2;
        pointsE.push(`${x},${yE}`);
    }

    return (
        <svg width={width} height={height}>
            <polyline points={pointsE.join(' ')} fill="none" stroke={color} strokeWidth="3" />
        </svg>
    );
}

function MechanicalWaveSVG({ density }: { density: number }) {
    const width = 2000;
    const height = 200;
    const circles = [];

    // More circles = higher density
    const numParticles = Math.floor(100 * density);

    for (let i = 0; i < numParticles; i++) {
        const x = (i / numParticles) * width;
        const y = height / 2 + 20 * Math.sin((2 * Math.PI * x) / 100);

        circles.push(
            <circle key={i} cx={x} cy={y} r="4" fill="cyan" />
        );
    }

    return (
        <svg width={width} height={height}>
        {circles}
        </svg>
    );
}

function EMvsMechanicalPage() {
  const [type, setType] = useState<"electromagnetic" | "mechanical">("electromagnetic");

  // Bonus sliders state
  const [mediumDensity, setMediumDensity] = useState(1); // for mechanical
  const [emFrequency, setEmFrequency] = useState(500); // for electromagnetic (THz)

  return (
    <div className="flex flex-col gap-8 w-full">
      <Card className="bg-custom-card shadow-black shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Electromagnetic vs Mechanical Waves</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          
          {/* Tabs to switch type */}
          <Tabs value={type} onValueChange={(val) => setType(val as "electromagnetic" | "mechanical")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="electromagnetic">Electromagnetic</TabsTrigger>
              <TabsTrigger value="mechanical">Mechanical</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Info Display */}
          {type === "electromagnetic" ? (
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-xl font-bold">Electromagnetic Waves</h2>
              <p>Do not require a medium, they can travel through the vacuum of space.</p>
              <p>Examples: Light, Radio, X-ray</p>

              {/* Bonus Slider: Frequency */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-md">
                  Frequency: {emFrequency.toFixed(0)} THz (Changes color)
                </label>
                <Slider
                  min={400}
                  max={800}
                  step={1}
                  value={[emFrequency]}
                  onValueChange={(vals) => setEmFrequency(vals[0])}
                />
              </div>

              {/* EM Wave Visual */}
              <div className="flex justify-center bg-custom-bg mt-6 rounded-lg border">
                <EMWaveSVG frequency={emFrequency} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-xl font-bold">Mechanical Waves</h2>
              <p>Need a medium to travel.</p>
              <p>Examples: Sound, Earthquakes, Ocean Waves</p>

              {/* Bonus Slider: Medium Density */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-md">
                  Medium Density: {mediumDensity.toFixed(2)} (Increases wave speed)
                </label>
                <Slider
                  min={0.5}
                  max={5}
                  step={0.1}
                  value={[mediumDensity]}
                  onValueChange={(vals) => setMediumDensity(vals[0])}
                />
              </div>

              {/* Mechanical Wave Visual */}
              <div className="flex justify-center bg-custom-bg mt-6 rounded-lg border">
                <MechanicalWaveSVG density={mediumDensity} />
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}

export default EMvsMechanicalPage;