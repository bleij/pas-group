import HeaderTransparent from "@/components/layout/HeaderTransparent";
import HeroLanding from "@/components/home/HeroLanding";

import Advantages from "@/components/home/Advantages";
import Solutions from "@/components/home/Solutions.server";
import Services from "@/components/home/Services.server";
import Experience from "@/components/home/Experience.server";
import Letters from "@/components/home/Letters.server";
import Documents from "@/components/home/Documents.server";
import About from "@/components/home/About";
import Certificates from "@/components/home/Certificates.server";
import Partners from "@/components/home/Partners.server";
import WorkStages from "@/components/home/WorkStages";
import News from "@/components/home/News.server";
import Presentations from "@/components/home/Presentations.server";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";

export default async function HomePage() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* прозрачный хедер только на главной */}
            <HeaderTransparent/>
            <HeroLanding/>

            {/* дальше — обычные блоки */}
            <Partners/>

            <Advantages/>
            <Solutions/>
            <Services limitGroups={2}/>
            <Experience/>
            <Letters/>
            <Documents/>
            <About/>
            <Certificates/>
            <Partners/>
            <WorkStages/>
            <News/>
            <Presentations/>
            <Contact/>
            <Footer/>
        </main>
    );
}