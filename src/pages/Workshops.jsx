import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  User,
  Github,
  ExternalLink,
  Filter,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import notebooksData from "@/data/notebooks.json";

const Workshops = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const difficulties = [
    { value: "all", label: "All Levels", color: "default" },
    { value: "Beginner", label: "Beginner", color: "secondary" },
    { value: "Intermediate", label: "Intermediate", color: "default" },
    { value: "Advanced", label: "Advanced", color: "destructive" },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "foundations", label: "Foundations" },
    { value: "circuits", label: "Circuits" },
    { value: "algorithms", label: "Algorithms" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "error-correction", label: "Error Correction" },
    { value: "optimization", label: "Optimization" },
    { value: "protocols", label: "Protocols" },
  ];

  const filteredNotebooks = useMemo(() => {
    return notebooksData.filter((notebook) => {
      if (
        selectedDifficulty !== "all" &&
        notebook.difficulty !== selectedDifficulty
      )
        return false;
      if (selectedCategory !== "all" && notebook.category !== selectedCategory)
        return false;
      return true;
    });
  }, [selectedDifficulty, selectedCategory]);

  const getDifficultyColor = (difficulty) => {
    const diffConfig = difficulties.find((d) => d.value === difficulty);
    return diffConfig ? diffConfig.color : "default";
  };

  const getDifficultyStars = (difficulty) => {
    const stars = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
    };
    return stars[difficulty] || 1;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <section className="hero-gradient py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins mb-6">
              Workshops & <span className="text-gradient">Notebooks</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
              Hands-on learning experiences with guided Jupyter notebooks and
              interactive workshops
            </p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="glass-card border-white/20">
                  <Star className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem
                      key={difficulty.value}
                      value={difficulty.value}
                      className="px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
                    >
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="glass-card border-white/20">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className="px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Notebooks Grid */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <motion.div
            className="max-w-2xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {filteredNotebooks.length}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Notebooks
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round(
                    filteredNotebooks.reduce(
                      (acc, nb) => acc + parseInt(nb.duration),
                      0
                    ) / 60
                  )}
                  h
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Total Content
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {new Set(filteredNotebooks.map((nb) => nb.category)).size}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Categories
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notebooks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredNotebooks.map((notebook, index) => (
              <motion.div
                key={notebook.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card border border-white/10 h-full group cursor-pointer overflow-hidden">
                  {/* Image */}
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
                    {/* Meta Info */}
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

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {notebook.description}
                    </p>

                    {/* Topics */}
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

                    {/* Action Buttons */}
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

          {/* Empty State */}
          {filteredNotebooks.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No notebooks found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more content.
              </p>
            </motion.div>
          )}

          {/* Additional Resources */}
          <motion.div
            className="max-w-4xl mx-auto mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card border border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold font-poppins mb-6 text-center">
                  Additional Learning Resources
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.a
                    href="https://qiskit.org/textbook/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <BookOpen className="w-8 h-8 text-primary mr-4" />
                      <div>
                        <h4 className="font-semibold mb-1">Qiskit Textbook</h4>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive quantum computing course materials
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://quantum-network.ibm.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <ExternalLink className="w-8 h-8 text-primary mr-4" />
                      <div>
                        <h4 className="font-semibold mb-1">
                          IBM Quantum Network
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Access real quantum computers and simulators
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
                    </div>
                  </motion.a>
                </div>

                <div className="text-center mt-8">
                  <p className="text-muted-foreground mb-4">
                    Ready to start your quantum computing journey?
                  </p>
                  <Button className=" text-primary-foreground">
                    Register for Workshops
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Workshops;
