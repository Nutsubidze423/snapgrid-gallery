'use client'
import { useState } from 'react'

export default function Upload({ onUpload }) {
  const [drag, setDrag] = useState(false)

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        onUpload({ id: Date.now() + Math.random(), url: e.target.result, tags: [], caption: file.name })
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files) }}
      className={`border-2 border-dashed p-8 text-center rounded-lg mb-6 ${drag ? 'border-indigo-500 bg-indigo-50 dark:bg-slate-800' : 'border-gray-300 dark:border-slate-600'}`}
    >
      <p className="mb-2">Drag & drop images here or click to upload</p>
      <input type="file" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files)} className="hidden" id="file-input" />
      <label htmlFor="file-input" className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded">Browse</label>
    </div>
  )
}
