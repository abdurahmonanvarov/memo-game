import { useEffect, useMemo, useState } from "react";
import { imaged } from "./index";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<number[]>([]);
  const [victory, setVictory] = useState(false);

  const uniqueCardIds = useMemo(
    () => Array.from(new Set(imaged.map((item) => item.cardId))),
    []
  );

  const shuffledImages = useMemo(() => {
    const shuffled = [...imaged];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("matchedCardIds");
    if (stored) {
      const parsed = JSON.parse(stored);
      setMatchedCardIds(parsed);
      if (parsed.length === uniqueCardIds.length) {
        setVictory(true);
      }
    }
  }, [uniqueCardIds.length]);

  useEffect(() => {
    if (matchedCardIds.length === uniqueCardIds.length) {
      setVictory(true);
    }
  }, [matchedCardIds, uniqueCardIds.length]);

  const handleClick = (id: number) => {
    if (selectedCards.includes(id)) return;

    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      const firstItem = imaged.find((item) => item.id === first);
      const secondItem = imaged.find((item) => item.id === second);
      if (!firstItem || !secondItem) return;

      if (firstItem.cardId === secondItem.cardId) {
        if (!matchedCardIds.includes(firstItem.cardId)) {
          const updated = [...matchedCardIds, firstItem.cardId];
          setMatchedCardIds(updated);
          localStorage.setItem("matchedCardIds", JSON.stringify(updated));
        }
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 800);
      }
    }

    if (newSelected.length > 2) {
      setSelectedCards([id]);
    }
  };

  const isVisible = (itemId: number, cardId: number) => {
    return selectedCards.includes(itemId) || matchedCardIds.includes(cardId);
  };
  const handleVictoryClick = () => {
    localStorage.removeItem("matchedCardIds");
    setMatchedCardIds([]);
    setSelectedCards([]);
    setVictory(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
        {shuffledImages.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-2 flex items-center justify-center aspect-square cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => handleClick(item.id)}
          >
            <motion.img
              src={item.img}
              alt={item.name}
              initial={{
                opacity: 0,
                filter: "grayscale(100%) blur(5px)",
                scale: 0.95,
              }}
              animate={{
                opacity: isVisible(item.id, item.cardId) ? 1 : 0,
                filter: isVisible(item.id, item.cardId)
                  ? "grayscale(0%) blur(0px)"
                  : "grayscale(100%) blur(5px)",
                scale: isVisible(item.id, item.cardId) ? 1 : 0.95,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* G'alaba animatsiyasi */}
      <AnimatePresence>
        {victory && (
          <motion.div
            onClick={handleVictoryClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-white/80 z-50 cursor-pointer"
          >
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-4xl font-bold text-green-600"
            >
              🎉 G'alaba! 🎉
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
