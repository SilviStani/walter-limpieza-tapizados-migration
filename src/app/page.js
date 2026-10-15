import "./Page.scss";
import Hero from "../../Components/Hero/Hero";
import Services from "../../Components/Services/Services";
import Process from "../../Components/Process/Process.jsx";
import Navbar from "../../Components/NavBar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Works from "../../Components/Works/Works";
import { Bottom } from "../../Components/Bottom/Bottom";
import Icon from "../../Components/UI/Icon";
import Quote from "../../Components/Quote/Quote";
import Coverage from "../../Components/Coverage/Coverage";
import FAQ from "../../Components/FAQ/FAQ";

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
        <Coverage />
        <Quote />
        <FAQ />
      </main>
      <Footer />
      <Bottom />
      <div className="mobile-contact"><a className="button button-primary" href="#presupuesto"><Icon name="chat" />Pedir presupuesto<Icon name="arrow" /></a></div>
    </div>
  );
}
