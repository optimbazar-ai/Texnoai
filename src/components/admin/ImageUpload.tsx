import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageSelect: (base64: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, currentImage }) => {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Faqat JPG, PNG, GIF va WEBP formatdagi rasmlar qo\'llab-quvvatlanadi';
    }
    if (file.size > MAX_SIZE) {
      return 'Fayl hajmi 5MB dan oshmasligi kerak';
    }
    return null;
  };

  const processFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onImageSelect(base64);
    };
    
    reader.onerror = () => {
      setError('Faylni o\'qishda xatolik yuz berdi');
    };
    
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview('');
    onImageSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-brand-primary bg-brand-primary/10'
            : 'border-gray-700 hover:border-brand-primary/50 hover:bg-dark-bg/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg object-contain"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors duration-300"
            >
              O'chirish
            </button>
          </div>
        ) : (
          <div className="py-8">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-dark-subtext"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-white font-medium mb-2">
              Rasm yuklash uchun bosing yoki sudrab tashlang
            </p>
            <p className="text-dark-subtext text-sm">
              JPG, PNG, GIF yoki WEBP (max 5MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="text-dark-subtext text-xs space-y-1">
        <p>✓ Qo'llab-quvvatlanadigan formatlar: JPG, PNG, GIF, WEBP</p>
        <p>✓ Maksimal hajm: 5MB</p>
        <p>✓ Tavsiya etiladigan o'lcham: 1200x800 piksel</p>
      </div>
    </div>
  );
};

export default ImageUpload;
