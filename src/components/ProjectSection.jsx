import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Hyve: Note-Taking App",
    description:
      "Hyve is a MERN-based note-taking app with gamification and OAuth login for collaborative academic use.",
    image: "/projects/Hyve.jpg",
    altText: "Screenshot of the Hyve note-taking app interface", 
    tags: ["React", "Tailwind CSS", "Express.js", "Node.js", "MongoDB"],
    demoURL: "https://hyveapp.netlify.app/",
    githubURL: "https://github.com/Axeldarren/Hyve-Notes-App",
  },
  {
    id: 2,
    title: "ITList: Project Management Web App",
    description: "A full-stack project management application engineered to centralize project tracking, time management, and reporting for internal IT teams.",
    image: "/projects/ITList.jpg",
    altText: "Screenshot of the ITList project management app dashboard",
    tags: ["Next.js", "Express.js", "MySQL", "Prisma", "WebSockets"],
    demoURL: "#",
    githubURL: "https://github.com/Axeldarren/itlist"
  },
  {
    id: 3,
    title: "PRDify: AI-Powered PRD Automation Tool",
    description:
      "PRDify automates Product Requirement Document (PRD) creation using LLMs for intelligent suggestions and content generation.",
    image: "/projects/PRDify.jpg", 
    altText: "Image representing an AI tool for generating product requirement documents",
    tags: ["Next.js", "LLM", "Product Management", "AI", "Automation"],
    demoURL: "#",
    githubURL: "https://github.com/C242-PM02-TEAM"
  },
  {
    id: 4,
    title: "GenLingo: AI Interactive Slang Learning App ",
    description: "GenLingo is a Python-based app using Falcon 180B to teach Gen Z slang interactively through chatbot conversations.",
    image: "/projects/Genlingo.jpg",
    altText: "Screenshot of GenLingo, a chatbot for learning slang",
    tags: ["Python", "Streamlit", "AI"],
    demoURL: "https://genlingo.streamlit.app/",
    githubURL: "https://github.com/Axeldarren/GenLingo",
  },
  {
    id: 5,
    title: "Skin Cancer Detection App",
    description:
      "The backend of Skin cancer detection app using ML on Compute Engine and Firestore, integrated via secure GCP REST API.",
    image: "/projects/SkinCancer.png",
    altText: "Image of a skin cancer detection application interface",
    tags: ["Machine Learning", "Google Cloud", "Node.js", "HAPI.js"],
    demoURL: "#", 
    githubURL: "https://github.com/Axeldarren/Skin_Cancer_Detection_App",
  },
  {
    id: 6,
    title: "C++ Password Manager",
    description: "A C++ password manager project that uses linked lists and classes to store encrypted credentials, secured with a master password.",
    image: "/projects/Password.jpg",
    altText: "Image representing a secure password manager",
    tags: ["C++", "Data Structures", "Encryption"],
    demoURL: "#", 
    githubURL: "https://github.com/Axeldarren/Password-Manager-Project-DSA-Repositories",
  },
];

export const ProjectSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was built carefully
          focusing on performance and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key} 
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  
                  alt={project.altText || project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {project.demoURL && project.demoURL !== "#" && ( 
                      <a
                        href={project.demoURL}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        <ExternalLink size={20} />
                        {/* Optional: Add visually hidden text for better accessibility and crawlability for links */}
                        <span className="sr-only">View {project.title} Demo</span> 
                      </a>
                    )}
                    <a
                      href={project.githubURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                      {/* Optional: Add visually hidden text for better accessibility and crawlability for links */}
                      <span className="sr-only">View {project.title} on GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
            <a 
                className="cosmic-button w-fit flex items-center mx-auto gap-2" 
                target="_blank"
                rel="noopener noreferrer" 
                href="https://github.com/Axeldarren"
            >
                Check My Github <ArrowRight size={15} />
            </a>
        </div>
      </div>
    </section>
  );
};