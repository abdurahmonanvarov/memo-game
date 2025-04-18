import { useEffect, useState } from "react";
import { imaged } from "./index";

function App() {
  const [rendom, setRendom] = useState<typeof imaged>([]);
  const [flippedStates, setFlippedStates] = useState<boolean[]>([]);

  useEffect(() => {
    const shuffled = shuffleArray(imaged);
    setRendom(shuffled);
    setFlippedStates(new Array(shuffled.length).fill(false)); // Barchasi boshlanganida orqasi ko‘rinadi
  }, []);

  function shuffleArray(array: typeof imaged) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const handleCardClick = (index: number) => {
    setFlippedStates((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
        {rendom.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(index)}
            className="group [perspective:1000px] bg-white rounded-xl shadow-md aspect-square cursor-pointer"
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 ${
                flippedStates[index] ? "rotate-y-0" : "rotate-y-180"
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front side (rasm) */}
              <div
                className="absolute w-full h-full rounded-xl overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Back side */}
              <div
                className="absolute w-full h-full bg-black rounded-xl flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="text-xl font-bold text-white">Card Back</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
