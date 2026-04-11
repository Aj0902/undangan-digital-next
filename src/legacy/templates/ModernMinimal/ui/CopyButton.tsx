'use client';

interface CopyButtonProps {
  value: string;
  label: string;
  onCopied?: () => void;
}

export default function CopyButton({ value, label, onCopied }: CopyButtonProps) {
  async function handleCopy() {
    if (!navigator?.clipboard) return;
    await navigator.clipboard.writeText(value);
    onCopied?.();
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
    >
      {label}
    </button>
  );
}
