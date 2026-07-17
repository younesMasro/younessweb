import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqJsonLd } from "@/lib/seo";

export type FaqItem = { question: string; answer: string };

export function FaqSection({
  title = "Questions fréquentes",
  items,
}: {
  title?: string;
  items: FaqItem[];
}) {
  const jsonLd = faqJsonLd(items);

  return (
    <section className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </h2>
        <Accordion type="single" collapsible className="mt-8">
          {items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-base text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
