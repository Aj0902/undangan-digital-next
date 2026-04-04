interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-amber-600">{title}</p>
      <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
