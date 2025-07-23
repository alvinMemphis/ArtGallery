// /app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import LoginForm from '@/components/LoginForm';
import UploadForm from '@/components/UploadForm';

export default function AdminPage() {
  const [user, setUser] = useState({email:'okaoEddy@gmail.com',});

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, setUser);
    // return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {user && user .email!==''? (
        <div>
          <p className="mb-4">Logged in as: {user.email}</p>
          <button
            onClick={() => signOut(auth)}
            className="mb-8 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
          <UploadForm />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
