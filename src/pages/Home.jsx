import HeroSlider from "../components/HeroSlider";
import About from "../components/About";
import Services from "../components/Services";
import Partners from "../components/Partners";
import Projects from "../components/Projects";
import Profile from "../components/Profile";
import Contact from "../components/Contact";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <HeroSlider />
      <About />
      <Services />
      <Partners />
      <Projects />
     
      <Contact />
    </main>
  );
}

export default Home;