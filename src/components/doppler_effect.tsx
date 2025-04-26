import { useEffect, useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function DopplerEffectPage() {
  const [sourceX, setSourceX] = useState(10);
  const [speed, setSpeed] = useState(95); // Source speed in px/s
  const [running, setRunning] = useState(true);
  const observerX = 800; // Fixed position of observer
  const [wavefronts, setWavefronts] = useState<{ x: number; createdAt: number }[]>([]);
  const [lastEmissionTime, setLastEmissionTime] = useState(0);
  const lastFrame = useRef(Date.now());
  const lastEmission = useRef(Date.now());
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    function animate() {
      const now = Date.now();
      const dt = (now - lastFrame.current) / 1000; // seconds
      lastFrame.current = now;
  
      setSourceX(prev => {
        const next = prev + speed * dt;
        if (next >= 1600) {
          setWavefronts([]);
          return 10;
        }
  
        if (now - lastEmission.current > Math.max(50, 500 - speed)) {
          setWavefronts(prevWaves => [...prevWaves, { x: next, createdAt: now }]);
          lastEmission.current = now;
        }
  
        return next;
      });
  
      if (running) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }
  
    if (running) {
      animationRef.current = requestAnimationFrame(animate);
    }
  
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [running, speed]);
  
  const waves = wavefronts.map((wave, idx) => {
    const elapsed = (Date.now() - wave.createdAt) / 10;
    return (
      <circle
        key={idx}
        cx={wave.x}
        cy={100}
        r={elapsed }
        stroke="cyan"
        strokeWidth="1"
        fill="none"
      />
    );
  });

  return (
    <div className="flex flex-col gap-8 w-full">
      <Card className="bg-custom-card shadow-black shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Doppler Effect: Moving Source and Observer</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="text-center">
            <p>There is an apparent shift in frequency when the source and/or observer move. Speed affects the intensity of this effect.</p>
            <p className="text-xs mt-1">Note: This is not a perfect representation of the Doppler effect.</p>
          </div>

          <div className="flex w-full relative items-center justify-center overflow-hidden border rounded-lg bg-custom-bg">
            <svg width="1600" height="200">
              {waves}
              {/* Source */}
              <circle cx={sourceX} cy={100} r="10" fill="cyan" />
              {/* Observer */}
              <circle cx={observerX} cy={100} r="10" fill="yellow" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="w-full md:w-1/3">
              <label className="text-md">Source Speed: {speed.toFixed(0)} px/s</label>
              <Slider
                min={25}
                max={300}
                step={5}
                value={[speed]}
                onValueChange={(vals) => setSpeed(vals[0])}
              />
            </div>

            <Button onClick={() => setRunning(prev => !prev)} variant="outline">
              {running ? "Pause" : "Play"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
