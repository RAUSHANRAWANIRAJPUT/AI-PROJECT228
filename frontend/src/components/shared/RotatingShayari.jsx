import React, { useEffect, useMemo, useState } from 'react';

const shayaris = [
  { emoji: '🍲', text: 'Rasoi ki khushboo,\ndil ko ghar le aaye.' },
  { emoji: '🍛', text: 'Thoda masala, thoda pyaar,\nswaad ban jaye yaadgaar.' },
  { emoji: '🥘', text: 'Garam roti ka ehsaas,\ndil ke bilkul paas.' },
  { emoji: '🍜', text: 'Pyaar se pakao,\nhar niwala muskaan ban jaye.' },
  { emoji: '🍚', text: 'Chulhe ki aanch mein,\napno ka pyaar mile.' },
  { emoji: '🥗', text: 'Sada sa khana bhi,\ndil se bane toh khaas.' },
  { emoji: '🍝', text: 'Bhookh bhi muskaye,\njab recipe pyaar se aaye.' },
  { emoji: '🫕', text: 'Kadhai mein khushboo,\ndil mein sukoon jagaye.' },
  { emoji: '🥣', text: 'Naram sa swaad,\nyaadon ko meetha banaye.' },
  { emoji: '🍱', text: 'Har plate mein pyaar,\nhar bite mein izhaar.' },
];

const getSeedIndex = (seed) => {
  const value = String(seed || 'shayari');
  return [...value].reduce((total, char) => total + char.charCodeAt(0), 0) % shayaris.length;
};

const RotatingShayari = ({ seed = 'home', className = '' }) => {
  const startIndex = useMemo(() => getSeedIndex(seed), [seed]);
  const [index, setIndex] = useState(startIndex);
  const current = shayaris[index];

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % shayaris.length);
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className={`shayari-text flex items-start gap-3 ${className}`}>
      <span className="mt-1 text-2xl" aria-hidden="true">{current.emoji}</span>
      <span className="whitespace-pre-line">{current.text}</span>
    </div>
  );
};

export default RotatingShayari;
