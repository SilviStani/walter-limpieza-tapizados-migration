import "./Page.scss";
import Hero from "../../Components/Hero/Hero";
import Services from "../../Components/Services/Services";
import Process from "../../Components/Process/Process.jsx";
import Navbar from "../../Components/NavBar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Works from "../../Components/Works/Works";
import { Bottom } from "../../Components/Bottom/Bottom";
import WhatsAppLink from "../../Components/UI/WhatsAppLink";

export default function Home() {
  return (
    <div className="page" id="inicio">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Navbar />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Services />
        <Works />
        <Process />
      </main>
      <Footer />
      <Bottom />
      <div className="mobile-contact"><WhatsAppLink>Pedir presupuesto</WhatsAppLink></div>
    </div>
  );
}
