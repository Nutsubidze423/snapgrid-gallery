'use client'
import { useEffect } from 'react'

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!image) return null
  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4" onClick={onClose}>
      <img src={image.url} alt={image.caption} className="max-w-full max-h-[80vh] rounded-lg" />
      <p className="text-white mt-4">{image.caption}</p>
    </div>
  )
}
