import { useState, useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';

export default function PhotoUpload({ maxPhotos = 11, label = 'Add Photos', hint }) {
  const [photos, setPhotos] = useState([]);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const newPhotos = Array.from(files)
      .slice(0, maxPhotos - photos.length)
      .map(file => ({ url: URL.createObjectURL(file), name: file.name }));
    setPhotos(prev => [...prev, ...newPhotos].slice(0, maxPhotos));
  };

  const remove = (i) => setPhotos(prev => prev.filter((_, idx) => idx !== i));

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#00b4d8] transition-colors bg-gray-50 hover:bg-blue-50/30"
      >
        <ImagePlus className="mx-auto text-gray-400 mb-2" size={32} />
        <p className="text-[13px] font-semibold text-gray-600">{label}</p>
        {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </div>

      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {photos.map((p, i) => (
            <div key={i} className="relative w-20 h-20">
              <img src={p.url} alt={p.name} className="w-full h-full object-cover rounded border border-gray-200" />
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] text-center py-0.5 rounded-b">
                  Main
                </span>
              )}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(i); }}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
