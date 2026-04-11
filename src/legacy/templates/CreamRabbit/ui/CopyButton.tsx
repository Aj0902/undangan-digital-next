'use client';

interface CopyButtonProps {
  value: string;
  label: string;
}

export default function CopyButton({ value, label }: CopyButtonProps) {
  async function handleCopy() {
    if (!navigator?.clipboard) return;
    await navigator.clipboard.writeText(value);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-6 inline-flex rounded-full bg-amber-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
    >
      {label}
    </button>
  );
}
