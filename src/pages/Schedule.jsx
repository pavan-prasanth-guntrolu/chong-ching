import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Filter,
  Download,
  ExternalLink,
  ArrowRight,
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
import scheduleData from "@/data/schedule.json";

const Schedule = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const sessionTypes = [
    { value: "all", label: "All Sessions", color: "default" },
    { value: "keynote", label: "Keynotes", color: "destructive" },
    { value: "workshop", label: "Workshops", color: "default" },
    { value: "tutorial", label: "Tutorials", color: "secondary" },
    { value: "hackathon", label: "Hackathon", color: "outline" },
    { value: "ceremony", label: "Ceremonies", color: "secondary" },
    { value: "break", label: "Breaks", color: "outline" },
    { value: "presentation", label: "Presentations", color: "default" },
  ];

  const filteredSchedule = useMemo(() => {
    return scheduleData
      .filter((day) => {
        if (selectedDay !== "all" && day.date !== selectedDay) return false;

        if (selectedType !== "all") {
          return day.sessions.some((session) => session.type === selectedType);
        }

        return true;
      })
      .map((day) => ({
        ...day,
        sessions:
          selectedType === "all"
            ? day.sessions
            : day.sessions.filter((session) => session.type === selectedType),
      }));
  }, [selectedDay, selectedType]);

  const generateICS = (session, date) => {
    const formatDate = (dateStr, timeStr) => {
      const [startTime] = timeStr.split(" - ");
      const [time, period] = startTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      const sessionDate = new Date(
        `${dateStr}T${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:00`
      );
      return sessionDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const startDate = formatDate(date, session.time);
    const endDate =
      new Date(new Date(startDate.replace("Z", "")).getTime() + 60 * 60 * 1000)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Qiskit Fall Fest//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${session.id}@qiskit-fall-fest-iiits.com
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${session.title}
DESCRIPTION:${session.description || ""}${
      session.speaker ? "\\nSpeaker: " + session.speaker : ""
    }
LOCATION:${session.location || "IIIT Srikakulam"}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${session.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSessionTypeColor = (type) => {
    const typeConfig = sessionTypes.find((t) => t.value === type);
    return typeConfig ? typeConfig.color : "default";
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
              Event <span className="text-gradient">Schedule</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
              Three days of intensive learning, hands-on workshops, and quantum
              innovation
            </p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="glass-card border-white/20">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="all"
                    className="px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
                  >
                    All Days
                  </SelectItem>
                  {scheduleData.map((day) => (
                    <SelectItem
                      key={day.date}
                      value={day.date}
                      className="px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
                    >
                      {day.day} -{" "}
                      {new Date(day.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="glass-card border-white/20 ">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((type) => (
                    <SelectItem
                      key={type.value}
                      value={type.value}
                      className="px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Content */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {filteredSchedule.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: dayIndex * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Day Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-2">
                    {day.day}
                  </h2>
                  <div className="flex items-center justify-center text-lg text-muted-foreground mb-2">
                    <Calendar className="w-5 h-5 mr-2" />
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <p className="text-primary font-medium">{day.title}</p>
                </div>

                {/* Sessions */}
                <div className="space-y-4">
                  {day.sessions.map((session, sessionIndex) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: sessionIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      className="cursor-pointer"
                      onClick={() => navigate(`/event/${session.id}`)}
                    >
                      <Card className="glass-card border border-white/10 overflow-hidden hover:border-primary/30 transition-colors">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            {/* Time Column */}
                            <div className="md:w-1/4 bg-primary/5 p-6 flex flex-col justify-center">
                              <div className="flex items-center text-sm font-medium text-primary mb-2">
                                <Clock className="w-4 h-4 mr-2" />
                                {session.time}
                              </div>
                              {session.location && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  {session.location}
                                </div>
                              )}
                            </div>

                            {/* Content Column */}
                            <div className="md:w-3/4 p-6">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                                <div className="flex-1">
                                  <div className="flex items-start gap-3 mb-2">
                                    <h3 className="text-lg font-semibold leading-tight">
                                      {session.title}
                                    </h3>
                                    <Badge
                                      variant={getSessionTypeColor(
                                        session.type
                                      )}
                                      className="shrink-0"
                                    >
                                      {session.type}
                                    </Badge>
                                  </div>

                                  {session.speaker && (
                                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                                      <User className="w-4 h-4 mr-2" />
                                      {session.speaker}
                                    </div>
                                  )}

                                  <p className="text-muted-foreground text-sm leading-relaxed">
                                    {session.description}
                                  </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      generateICS(session, day.date);
                                    }}
                                    className="shrink-0"
                                    aria-label={`Add ${session.title} to calendar`}
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Calendar
                                  </Button>
                                  <Button
                                    size="sm"
                                    className=" shrink-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Registration logic here
                                    }}
                                  >
                                    Register
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="max-w-2xl mx-auto text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card border border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold font-poppins mb-4">
                  Ready to Join Us?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Don't miss out on this incredible opportunity to learn quantum
                  computing with experts and build the future of technology.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button className=" text-primary-foreground">
                    Register Now
                  </Button>
                  <a
                    href="https://calendar.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <Button variant="outline">
                      Subscribe to Updates
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Schedule;
