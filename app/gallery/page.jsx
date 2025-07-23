'use client';
import { useState, useEffect, useCallback } from 'react';
import ScrollLock from 'react-scrolllock';

import { FloatingArrow } from '../../components/FloatingArrow/FloatingArrow';
import { ZoomCardItem } from '../../components/ZoomCardItem/ZoomCardItem';
import { Gallery } from '../../components/Gallery/Gallery';
import { Nav } from '../../components/Nav/Nav';
import { db } from '../../firebase/firebase';
import { ref,get,child } from 'firebase/database';

export default function GalleryPage() {
  const [lock, setLock] = useState(false);
  const [search, setSearch] = useState('');
  const [card, setCard] = useState(null);
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    setIsWide(window.innerWidth > 500);
  }, []);

  const receiveNavSearchText = useCallback((query) => {
    setSearch(query);
  }, []);

  const receiveTagSearchText = useCallback((tag) => {
    setLock(false);
    setSearch(tag.toLowerCase());
  }, []);


const receiveCardDetails = useCallback((cardData) => {
  const cardId = cardData.id;
  const cardRef = child(ref(db), 'Cards/' + cardId);

  get(cardRef).then((snapshot) => {
    const data = snapshot.val() || {};
    setCard({ ...data });
    setLock(true);
  });
}, []);
 

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 pt-10 relative">
      <Nav search={search} handleNavSearch={receiveNavSearchText} />

      <main className={`pt-24 ${lock ? 'pointer-events-none overflow-hidden' : ''}`}>
        <Gallery search={search} handleGalleryClickedCard={receiveCardDetails} />
        {isWide && lock && <ScrollLock />}
      </main>

      {!card || !lock ? (
        <FloatingArrow />
      ) : (
        <div className={`fixed inset-0 z-50 bg-white dark:bg-gray-900 transition-all duration-300 ${isWide ? 'p-12' : 'p-4'}`}>
          <button
            onClick={() => setLock(false)}
            className="absolute top-6 right-6 text-2xl text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            &times;
          </button>
          <ZoomCardItem card={card} handleTagSearch={receiveTagSearchText} />
        </div>
      )}
    </div>
  );
}
