import Image from "next/image";
import "./Page.scss";
import Hero from "../../Components/Hero/Hero";
import Process from "../../Components/Process/Process";
import Navbar from "../../Components/NavBar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Works from "../../Components/Works/Works";
import { ProcessDesc } from "../../Components/Process/ProcessDesc";

export default function Home() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <Works />
      <Process />
      <ProcessDesc/>
      <Footer />
    </div>
  );
}
