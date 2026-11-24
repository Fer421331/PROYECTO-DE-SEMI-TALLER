import { LoaderCircle } from 'lucide-react';

interface LoaderProps {
  label?: string;
  fullScreen?: boolean;
  size?: number;
}

export default function Loader({
  label = 'Cargando...',
  fullScreen = false,
  size = 28,
}: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center gap-3 text-green-800 ${fullScreen ? 'min-h-screen w-full' : 'py-6'
        }`}
    >
      <LoaderCircle size={size} className="animate-spin" aria-hidden="true" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
