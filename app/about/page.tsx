// app/about/page.tsx
import HeaderTransparent from "@/components/layout/HeaderTransparent";
import HeroLanding from "@/components/home/HeroLanding";
import Advantages from "@/components/home/Advantages";
import Solutions from "@/components/home/Solutions.server";
import Experience from "@/components/home/Experience.server";
import Letters from "@/components/home/Letters.server";
import Documents from "@/components/home/Documents.server";
import About from "@/components/home/About";
import Certificates from "@/components/home/Certificates.server";
import Partners from "@/components/home/Partners.server";
import News from "@/components/home/News.server";
import Presentations from "@/components/home/Presentations.server";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";

export default async function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col">
            {/* прозрачный хедер */}
            <HeaderTransparent/>

            {/* hero-блок */}
            <HeroLanding
                bg="/about-bg.png"
                title="О компании"
                description={`Power & Automation Solutions (PAS) — инжиниринговый партнер, специализирующийся на комплексных проектах в области промышленной электроэнергетики и автоматизации.

Обеспечение полной системной интеграции — от проекта подстанции до логики контроллера. Это исключает риски на стыке дисциплин и гарантирует единую ответственность за результат.`}
                // desktop
                overlayDesktopColor="#1A335F"
                overlayDesktopOpacity={0.45}
                overlayDesktopClip="polygon(70% 100%, -30% 100%, 10% 0, 100% 0)"
                overlayDesktopWidth="90%"
                // mobile
                overlayMobileColor="#193A6F"
                overlayMobileOpacity={0.55}
                overlayMobileClip="polygon(0 0, 70% 0, 90% 100%, 0 100%)"
                overlayMobileWidth="100%"
                // text
                descSize="24px"
                descWeight="400"
                descSizeMobile="16"
            />

            {/* контентные блоки */}
            <Advantages/>
            <Solutions/>
            <Experience/>
            <Letters/>
            <Documents/>
            <About/>
            <Certificates/>
            <Partners/>
            <News/>
            <Presentations/>
            <Contact/>
            <Footer/>
        </main>
    );
}