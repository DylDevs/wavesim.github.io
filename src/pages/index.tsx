import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

import WavePropertiesPage from "@/components/wave_properties";
import EMvsMechanicalPage from "@/components/em_vs_mechanical";
import WaveBehaviorsPage from "@/components/wave_behaviors";
import DopplerPage from "@/components/doppler_effect";

const topics = [
  {
    title: "Wave Properties",
    description: "Relationship between the properties of transverse and longitudinal waves",
    page: WavePropertiesPage,
  },
  {
    title: "EM vs Mechanical",
    description: "What are electromagnetic and mechanical waves?",
    page: EMvsMechanicalPage,
  },
  {
    title: "Wave Behaviors",
    description: "Reflection, Refraction, Interference, Diffraction",
    page: WaveBehaviorsPage,
  },
  {
    title: "Doppler Effect",
    description: "Apparent frequency shift caused by motion",
    page: DopplerPage,
  },
];

export default function HomePage() {
  const [selected_topic, SetSelectedTopic] = useState(-1);  

  return (
    <div className="min-h-screen p-8 text-custom-text bg-custom-bg">
      {selected_topic !== -1 ? (
        <div className="flex relative">
          <Button
            onClick={() => SetSelectedTopic(-1)}
            variant="outline"
            className="absolute top-2 left-2 z-50 bg-custom-card"
          >
            <ArrowLeft size={16} />
          </Button>
          <div className="flex w-full h-full">
            {(() => {
              const PageComponent = topics[selected_topic].page;
              return <PageComponent />;
            })()}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <Card className="rounded-xl shadow-xl text-center mb-8 bg-custom-card shadow-black">
            <h1 className="text-4xl font-bold p-4">Wave Physics Demonstrations</h1>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {topics.map((topic, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="rounded-xl shadow-black shadow-xl bg-custom-card hover:bg-custom-cardhover">
                  <CardHeader>
                    <CardTitle>{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{topic.description}</p>
                    <Button asChild variant="outline" onClick={() => SetSelectedTopic(i)}>
                      <a className="flex items-center gap-2">Learn More <ArrowRight size={16}/></a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
