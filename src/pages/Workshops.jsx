import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  User,
  Github,
  ExternalLink,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const workshopsData = [
  {
    id: 1,
    title: "Quantum Computing Basics",
    description:
      "Introduction to quantum computing concepts, qubits, and quantum gates.",
    author: "Dr. Jayadeep",
    duration: "2h",
    difficulty: "Beginner",
    category: "foundations",
    topics: ["Qubits", "Quantum Gates", "Superposition", "Entanglement"],
    colab: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Quantum Sensing Principles",
    description: "Learn the basics of quantum sensors and their applications.",
    author: "Dr. Ravi",
    duration: "2h",
    difficulty: "Beginner",
    category: "foundations",
    topics: ["Quantum Sensors", "Measurement", "Applications"],
    colab: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Quantum Cryptography Fundamentals",
    description: "Understand quantum cryptography and secure communication.",
    author: "Dr. Shyam",
    duration: "2h",
    difficulty: "Intermediate",
    category: "protocols",
    topics: ["QKD", "Quantum Encryption", "Protocols"],
    colab: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Quantum Materials Science",
    description: "Explore quantum materials and their technological impact.",
    author: "Dr. Sri Latha",
    duration: "2h",
    difficulty: "Intermediate",
    category: "materials",
    topics: ["Quantum Materials", "Superconductors", "Topological Materials"],
    colab: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Quantum Computing Workshop",
    description: "Hands-on exercises with quantum algorithms and circuits.",
    author: "Dr. Pavan",
    duration: "3h",
    difficulty: "Advanced",
    category: "algorithms",
    topics: ["Algorithms", "Circuit Design", "Qiskit"],
    colab: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Marine Quantum Sensing Workshop",
    description: "Quantum sensing techniques applied to marine environments.",
    author: "Dr. Mohith",
    duration: "3h",
    difficulty: "Advanced",
    category: "circuits",
    topics: ["Sensors", "Marine Applications", "Data Analysis"],
    colab: "#",
    github: "#",
  },
  {
    id: 7,
    title: "Quantum Cryptography Workshop",
    description:
      "Advanced workshop on implementing quantum cryptography protocols.",
    author: "Dr. Hema",
    duration: "3h",
    difficulty: "Advanced",
    category: "protocols",
    topics: ["QKD", "Key Distribution", "Security"],
    colab: "#",
    github: "#",
  },
  {
    id: 8,
    title: "Quantum Devices Workshop",
    description: "Hands-on learning about quantum devices and hardware.",
    author: "Dr. Praveen",
    duration: "3h",
    difficulty: "Advanced",
    category: "hardware",
    topics: ["Qubits", "Superconducting Circuits", "Trapped Ions"],
    colab: "#",
    github: "#",
  },
  {
    id: 9,
    title: "Pre-hackathon Workshops & Mentorship",
    description:
      "Guided mentorship sessions to prepare for the hackathon challenges.",
    author: "Mentors Team",
    duration: "4h",
    difficulty: "All Levels",
    category: "mentorship",
    topics: ["Problem Solving", "Quantum Projects", "Teamwork"],
    colab: "#",
    github: "#",
  },
];

const getDifficultyColor = (difficulty) => {
  const mapping = {
    Beginner: "secondary",
    Intermediate: "default",
    Advanced: "destructive",
    "All Levels": "default",
  };
  return mapping[difficulty] || "default";
};

const getDifficultyStars = (difficulty) => {
  const stars = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    "All Levels": 2,
  };
  return stars[difficulty] || 1;
};

const Workshops = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <section className="hero-gradient py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins mb-6">
            Workshops & <span className="text-gradient">Notebooks</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
            Hands-on learning experiences with guided Jupyter notebooks and
            interactive workshops
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {workshopsData.map((notebook, index) => (
              <motion.div
                key={notebook.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card border border-white/10 h-full group cursor-pointer overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant={getDifficultyColor(notebook.difficulty)}
                        className="font-medium"
                      >
                        {notebook.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < getDifficultyStars(notebook.difficulty)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-semibold text-white line-clamp-2">
                        {notebook.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {notebook.duration}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {notebook.author}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {notebook.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {notebook.topics.slice(0, 3).map((topic, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {notebook.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{notebook.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={notebook.colab}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          className="w-full  text-primary-foreground"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open in Colab
                        </Button>
                      </a>
                      <a
                        href={notebook.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          <Github className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Workshops;
