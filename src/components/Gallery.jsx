'use client'
import { useState, useMemo } from 'react'

export default function Gallery({ images, onDelete, onSelect }) {
  const tags = useMemo(() => {
    const set = new Set(images.flatMap(i => i.tags || []))
    return ['all', ...Array.from(set)]
  }, [images])
  const [activeTag, setActiveTag] = useState('all')

  const filtered = useMemo(() => {
    if (activeTag === 'all') return images
    return images.filter(i => (i.tags || []).includes(activeTag))
  }, [images, activeTag])

  if (images.length === 0) {
    return <p className="text-center text-gray-500">No images yet. Upload some to get started.</p>
  }

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {tags.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)} className={`px-3 py-1 rounded ${activeTag === tag ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-slate-700'}`}>
            {tag}
          </button>
        ))}
      </div>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {filtered.map(img => (
          <div key={img.id} className="relative group mb-4 break-inside-avoid cursor-pointer" onClick={() => onSelect(img)}>
            <img src={img.url} alt={img.caption} className="w-full rounded-lg shadow hover:opacity-90 transition" loading="lazy" />
            <button onClick={(e) => { e.stopPropagation(); onDelete(img.id) }} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100">×</button>
          </div>
        ))}
      </div>
    </div>
  )
}
