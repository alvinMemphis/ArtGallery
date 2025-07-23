// /components/UploadForm.tsx
'use client';

import { useState } from 'react';
import { storage, db } from '@/firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { push, ref as dbRef } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

export default function UploadForm() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setSuccess(false);

    try {
      const id = uuidv4();
      const storageRef = ref(storage, `images/${id}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await push(dbRef(db, 'artworks'), {
        title,
        tags: tags.split(',').map(t => t.trim()),
        imageUrl: url,
        createdAt: Date.now()
      });

      setTitle('');
      setTags('');
      setFile(null);
      setSuccess(true);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4 max-w-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full"
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-green-600 hover:bg-green-700 rounded"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {success && <p className="text-green-400">Uploaded successfully!</p>}
    </form>
  );
}
