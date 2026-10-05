import { Scissors } from 'lucide-react';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const boxSize = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9 sm:w-10 sm:h-10';
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={`${boxSize} bg-black text-white flex items-center justify-center shrink-0`}>
        <Scissors className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
      </span>
      <span className="font-display text-lg sm:text-xl text-zinc-900 leading-none">
        BARBER<span className="text-zinc-400">HOUSE</span>
      </span>
    </span>
  );
}
