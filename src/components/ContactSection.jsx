import { Instagram, Linkedin, Mail, Map, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false); // This state will still be used to disable the button
    const [formData, setFormData] = useState({ // Add state for form inputs
        name: '',
        email: '',
        message: '',
    });

    // Handle input changes to update form state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission (page reload)

        setIsSubmitting(true);

        // Simulate a delay or process the form data (for now, we'll just redirect to email)
        setTimeout(() => {
            // Construct the mailto link with pre-filled subject and body
            const subject = encodeURIComponent(`Message from your website from ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n\n` +
                `Message:\n${formData.message}`
            );
            const mailtoLink = `mailto:axeldarren.suryanto@gmail.com?subject=${subject}&body=${body}`;

            // Open the user's email client
            window.location.href = mailtoLink;

            toast({
                title: "Opening Email Client",
                description: "The form functionality is currently under development. Please send your message directly via email.",
            });
            setIsSubmitting(false);
            // Optionally clear the form after redirection, though the email client opening might interrupt this
            setFormData({ name: '', email: '', message: '' }); 
        }, 500); // Shorter delay since it's just redirecting
    };

    return (
        <section
            id="contact"
            className="py-24 px-4 relative bg-secondary/30"
        >
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Get In <span className="text-primary"> Touch</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Have a project in mind or just want to collaborate? Feel free to reach out.
                    I am always open to discussing new ideas, projects, or opportunities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-6"> Contact Information</h3>

                        <div className="space-y-6 justify-center">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium"> Email</h4>
                                    <a
                                        href="mailto:axeldarren.suryanto@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        axeldarren.suryanto@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium"> Phone</h4>
                                    <a
                                        href="http://wa.me/6285933795235"
                                        target="_blank"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        +62 859-3379-5235
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Map className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium"> Location</h4>
                                    <span // Changed to span as it's not a clickable link
                                        className="text-muted-foreground"
                                    >
                                        Jakarta, Indonesia
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="font-medium mb-4"> Connect With Me</h4>
                            <div className="flex space-x-4 justify-center">
                                <a
                                    href="https://www.linkedin.com/in/axelsuryanto/"
                                    target="_blank"
                                >
                                    <Linkedin />
                                </a>
                                <a
                                    href="https://www.instagram.com/axel_suryanto/"
                                    target="_blank"
                                >
                                    <Instagram />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-lg shadow-xs"> {/* Removed onSubmit from div */}
                        <h3 className="text-2xl font-semibold mb-6">
                            Send a Message
                        </h3>

                        {/* Add the warning message here */}
                        <p className="mb-6 text-amber-600 text-center text-sm">
                            <b>Note:</b> This form is currently under development. Please contact me directly via email at{" "}
                            <a href="mailto:axeldarren.suryanto@gmail.com" className="underline hover:text-primary transition-colors">
                                axeldarren.suryanto@gmail.com
                            </a>{" "}for now. Thank you for your understanding!
                        </p>


                        <form className="space-y-6" onSubmit={handleSubmit}> {/* Added onSubmit to form */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="John Doe..."
                                    value={formData.name} // Controlled input
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="john@gmail.com"
                                    value={formData.email} // Controlled input
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                                    placeholder="Hi Axel, I would like to discuss..."
                                    value={formData.message} // Controlled input
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "cosmic-button w-full flex items-center justify-center gap-2",
                                    isSubmitting && "opacity-70 cursor-not-allowed" // Added disabled styling
                                )}
                            >
                                {isSubmitting ? "Opening Email..." : "Send Message"} {/* Changed button text */}
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};