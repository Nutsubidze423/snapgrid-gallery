'use client'
import { useState, useEffect } from 'react'
import Upload from '@/components/Upload'
import Gallery from '@/components/Gallery'
import Lightbox from '@/components/Lightbox'

export default function Home() {
  const [images, setImages] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('snapgrid_images')
    if (saved) setImages(JSON.parse(saved))
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('snapgrid_images', JSON.stringify(images))
  }, [images])

  const addImage = (img) => setImages([img, ...images])
  const deleteImage = (id) => setImages(images.filter(i => i.id !== id))

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">SnapGrid Gallery</h1>
      <Upload onUpload={addImage} />
      <Gallery images={images} onDelete={deleteImage} onSelect={setLightbox} />
      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}
