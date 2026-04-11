interface AccentBarProps {
  label: string;
}

export default function AccentBar({ label }: AccentBarProps) {
  return (
    <div className="mb-6 inline-flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-amber-700">
      <span className="inline-flex h-2 w-2 rounded-full bg-amber-600" />
      {label}
    </div>
  );
}
