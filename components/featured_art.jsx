// /components/FeaturedArt.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase/firebase';
import { ref, onValue, get } from 'firebase/database';
// interface Artwork {
//   title: string;
//   imageUrl: string;
//   featured?: boolean;
//   tags?: string[];
// }

export default function FeaturedArt() {
  const [artworks, setArtworks] = useState([]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const snapshot = await get(ref(db, 'Cards'));
      const data = snapshot.exists() ? snapshot.val() : {};
      setArtworks(data.slice(0, 2)); // show up to 2
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  };

  fetchData();
}, []);

  useEffect(() => {
    const artRef = ref(db, 'artworks');
    onValue(artRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const featured = Object.values<Artwork>(data).filter((art) => art);
      setArtworks(featured.slice(0, 3)); // show up to 2
    });
  }, []);

  return (
    <section className="w-full min-h-[60vh] bg-black text-white px-6 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center">Featured Art</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        {artworks.map((art, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.3, duration: 0.6 }}
            className="relative group overflow-hidden rounded-2xl shadow-lg max-w-[90vw] md:max-w-md"
          >
            <img
              src={art.imgURL}
              alt={art.title}
              className="object-cover w-full h-72 md:h-96 transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-xl font-semibold">{art.title}</h3>
              <p className="text-sm text-gray-300">{art.tags?.join(', ')}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
