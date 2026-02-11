import "./Page.scss";
import Hero from "../../Components/Hero/Hero";
import Process from "../../Components/Process/Process";
import Navbar from "../../Components/NavBar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Works from "../../Components/Works/Works";
import { ProcessDesc } from "../../Components/Process/ProcessDesc";
import { Bottom } from "../../Components/Bottom/Bottom";

export default function Home() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <Works />
      <Process />
      <ProcessDesc/>
      <Footer />
      <Bottom />
    </div>
  );
}
