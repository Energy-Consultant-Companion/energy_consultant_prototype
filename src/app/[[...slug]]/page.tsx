import { Prototype } from "@/components/Prototype";
import { SLUGS } from "@/lib/screens";

export function generateStaticParams() {
  return [{ slug: [] as string[] }, ...SLUGS.map((slug) => ({ slug: [slug] }))];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const requested = slug?.[0];
  return <Prototype initialSlug={requested && SLUGS.includes(requested) ? requested : SLUGS[0]} />;
}
