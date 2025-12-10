import { notFound } from "next/navigation";

const KNOWN_MODULES = [
  "cascade-engine",
  "nexa-portal-core",
  "static-resonance-sync",
];

type ModulePageProps = {
  params: { slug: string };
};

export default function ModuleDetailPage({ params }: ModulePageProps) {
  const { slug } = params;

  if (!KNOWN_MODULES.includes(slug)) {
    notFound();
  }

  return (
    <main>
      <h1>Module: {slug}</h1>
      <p>
        Placeholder for module details. This page will contain the recovered
        technical documentation for the selected module.
      </p>
    </main>
  );
}
