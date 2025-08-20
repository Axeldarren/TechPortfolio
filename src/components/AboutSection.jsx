import { Briefcase, Code, User } from "lucide-react"


export const AboutSection = () => {
    return (
        <section id='about' className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="text-primary"> Me</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">
                            Full Stack Developer & Project Manager
                        </h3>

                        <p className="text-muted-foreground">
                            With 3+ years of experience, I specialize in full stack development using React, Next.js, Node.js, Express, and PostgreSQL. I build seamless, scalable web applications from UI to backend, leveraging Tailwind CSS for design and deploying to cloud platforms like GCP.
                        </p>

                        <p className="text-muted-foreground">
                            Beyond coding, I bring structure and direction as a technical Project Manager, skilled in tools like Jira, Trello,
                            and Notion. I lead teams using agile methodologies, align stakeholders, and ensure smooth delivery from
                            planning to launch — bridging technical execution with strategic impact.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <a 
                                href="#contact" 
                                className="cosmic-button"
                            >
                                Get in Touch
                            </a>

                            <a 
                                href="https://drive.google.com/uc?export=download&id=12bWf8EbfKedqNg9uT3zcQuBiNl7T9_sv" 
                                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                            >
                                Download CV
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Full Stack Development</h4>
                                    <p className="text-muted-foreground">
                                        Expert in building robust web applications with React, Next.js, Node.js, Express, and PostgreSQL — delivering seamless user experiences and scalable APIs.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Backend Development</h4>
                                    <p className="text-muted-foreground">
                                        Expert in building robust server-side applications and APIs with Node.js, Express, and PostgreSQL — delivering scalable and secure backend solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Project Management</h4>
                                    <p className="text-muted-foreground">
                                        Technical PM skilled in agile workflows using Jira, Trello, and Notion — leading cross-functional teams from planning to deployment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}