import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function TestParticles() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particleOptions = {
    particles: {
      number: { value: 100 },
      size: { value: 5 },
      move: { enable: true, speed: 2 },
      color: { value: "#ffffff" },
    },
  };

  return (
    <div className="h-screen w-full bg-black text-white">
        hi
      <Particles id="tsparticles" init={particlesInit} options={particleOptions} />
    </div>
  );
}
