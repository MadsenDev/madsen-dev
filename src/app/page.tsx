import Hero from "@/components/Hero";
import TranslatedSections from "@/components/TranslatedSections";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div id="home">
        <Hero />
      </div>

      <TranslatedSections />
    </>
  );
}
