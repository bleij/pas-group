import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import Advantages from "@/components/home/Advantages";
import Solutions from "@/components/home/Solutions";
import Services from "@/components/home/Services";
import Experience from "@/components/home/Experience";
import Testimonials from "@/components/home/Testimonials";
import About from "@/components/home/About";
import Certificates from "@/components/home/Certificates";
import Partners from "@/components/home/Partners";
import WorkStages from "@/components/home/WorkStages";
import News from "@/components/home/News";
import Presentations from "@/components/home/Presentations";
import Contact from "@/components/home/Contact";

export default function HomePage() {
    return (
        <main className="flex flex-col min-h-screen">
            {/* Шапка */}
            <Header/>

            {/* Контентные блоки */}
            <Hero/>
            <Advantages/>
            <Solutions/>
            <Services/>
            <Experience/>
            <Testimonials/>
            <About/>
            <Certificates/>
            <Partners/>
            <WorkStages/>
            <News/>
            <Presentations/>
            <Contact/>

            {/* Футер */}
            <Footer/>
        </main>
    );
}
