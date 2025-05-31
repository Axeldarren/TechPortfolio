import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
      aria-labelledby="hero-title"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 id="hero-title" className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> 
              Hi, I'm
            </span>
            <span className="text-primary ml-2 opacity-0 animate-fade-in-delay-1"> 
              Axel
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2"> 
              Darren Suryanto
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            I create stellar backend and fullstack solutions as a Software Engineer and Project Manager.
            With cloud, data, and scalability in focus — I build systems that perform like stars in motion.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a 
              href="#projects" 
              className="cosmic-button"
              aria-label="View My Work and Projects" 
            >
              View My Work
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <div className="text-sm text-muted-foreground mb-2" id="scroll-indicator-label">
            Scroll
          </div>
          <ArrowDown className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};