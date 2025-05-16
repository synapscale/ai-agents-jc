import React from "react";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className }: SectionProps) {
  return (
    <section className={className}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      <div>{children}</div>
    </section>
  );
}

export default Section;
