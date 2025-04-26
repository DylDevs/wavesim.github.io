import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const behavior_descriptions: Record<string, string> = {
    reflection: "Reflection happens when a wave bounces off a surface.",
    refraction: "Refraction is the bending of a wave as it enters a new medium.",
    interference: "Interference is when two waves meet and combine, creating a new wave pattern.",
    diffraction: "Diffraction is the bending of waves around obstacles or through openings."
};
  
const behavior_examples: Record<string, string> = {
    reflection: "Example: Mirror reflecting light",
    refraction: "Example: A straw in water",
    interference: "Example: Sound from two speakers",
    diffraction: "Example: Light underneath a door"
}

function ReflectionSVG() {
    const width = 400;
    const height = 300;
    const mirrorY = 150;
    const incident = "M 50 50 L 200 150";
    const reflected = "M 200 150 L 350 50";

    return (
        <svg width={width} height={height}>
            {/* Mirror line */}
            <line x1="0" y1={mirrorY} x2={width} y2={mirrorY} stroke="white" strokeWidth="2" />
            {/* Incident wave */}
            <path d={incident} stroke="cyan" strokeWidth="3" fill="none" />
            {/* Reflected wave */}
            <path d={reflected} stroke="yellow" strokeWidth="3" fill="none" />
        </svg>
    );
}

function RefractionSVG() {
    const width = 400;
    const height = 300;
    const boundaryY = 150;

    return (
        <svg width={width} height={height}>
            {/* Boundary line */}
            <line x1="0" y1={boundaryY} x2={width} y2={boundaryY} stroke="white" strokeWidth="2" strokeDasharray="10,10" />
            {/* Incident wave */}
            <line x1="100" y1="50" x2="200" y2="150" stroke="cyan" strokeWidth="3" />
            {/* Refracted wave */}
            <line x1="200" y1="150" x2="250" y2="250" stroke="yellow" strokeWidth="3" />
        </svg>
    );
}
  
function InterferenceSVG() {
  const width = 500;
  const height = 300;
  const wave1 = [];
  const wave2 = [];
  const sum_wave = [];

  for (let x = 0; x <= width; x++) {
    const y1 = 40 * Math.sin((2 * Math.PI * x) / 100) + 130;
    const y2 = 40 * Math.sin((2 * Math.PI * x) / 100 + Math.PI) + 220;
    wave1.push(`${x},${y1}`);
    wave2.push(`${x},${y2}`);
    sum_wave.push(`${x},40`);
  }

  return (
    <svg width={width} height={height}>
      {/* Labels */}
      <text x="0" y="20" fontSize="14" fill="white">Resultant Wave</text>
      <text x="0" y="70" fontSize="14" fill="white">Interfering Waves</text>
    
      {/* Sum wave */}
      <polyline points={sum_wave.join(' ')} fill="none" stroke="yellow" strokeWidth="2" />

      {/* First wave */}
      <polyline points={wave1.join(' ')} fill="none" stroke="cyan" strokeWidth="2" />

      {/* Second wave */}
      <polyline points={wave2.join(' ')} fill="none" stroke="cyan" strokeWidth="2" />
    </svg>
  );
}


function DiffractionSVG() {
    const width = 400;
    const height = 200;
    const waveFronts = [];
    const waveLines = [];

    for (let r = 10; r < 110; r += 20) {
        waveFronts.push(
            <path
                key={r}
                d={`
                M 200 ${100 - r}
                A ${r} ${r} 0 0 1 200 ${100 + r}
                `}
                fill="none"
                stroke="yellow"
                strokeWidth="2"
            />
        );
    }

    for (let r = 10; r < 180; r += 20) {
        waveLines.push(
            <line
                key={r}
                x1={r - 5}
                y1="70"
                x2={r - 5}
                y2="130"
                stroke="cyan"
                strokeWidth="2"
            />
        );
    }

    return (
        <svg width={width} height={height}>
            {/* Walls */}
            <rect x="180" y="0" width="10" height="90" fill="white" />
            <rect x="180" y="110" width="10" height="90" fill="white" />
            {/* Waves */}
            {waveFronts}
            {waveLines}
        </svg>
    );
}
  

function WaveBehaviorsPage() {
  const [behavior, setBehavior] = useState<"reflection" | "refraction" | "interference" | "diffraction">("reflection");

  return (
    <div className="flex flex-col gap-8 w-full">
      <Card className="bg-custom-card shadow-black shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Wave Behaviors</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          
          {/* Behavior Tabs */}
          <Tabs value={behavior} onValueChange={(val) => setBehavior(val as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="reflection">Reflection</TabsTrigger>
              <TabsTrigger value="refraction">Refraction</TabsTrigger>
              <TabsTrigger value="interference">Interference</TabsTrigger>
              <TabsTrigger value="diffraction">Diffraction</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* SVG Display */}
          <div className="flex justify-center bg-custom-bg p-4 border rounded-lg">
            {behavior === "reflection" && <ReflectionSVG />}
            {behavior === "refraction" && <RefractionSVG />}
            {behavior === "interference" && <InterferenceSVG />}
            {behavior === "diffraction" && <DiffractionSVG />}
          </div>

          {/* Info Text */}
          <div className="text-center">
            {behavior_descriptions[behavior]}
            <br />
            {behavior_examples[behavior]}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export default WaveBehaviorsPage