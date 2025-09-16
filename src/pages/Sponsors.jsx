import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import sponsorsData from "@/data/sponsors.json";

const Sponsors = () => {
  const tierOrder = { title: 0, platinum: 1, gold: 2, silver: 3, community: 4 };
  const groupedSponsors = sponsorsData.reduce((acc, sponsor) => {
    if (!acc[sponsor.tier]) acc[sponsor.tier] = [];
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <section className="hero-gradient py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins mb-6">
              Our <span className="text-gradient">Sponsors</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground">
              Powered by leading organizations in quantum computing and
              technology
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(groupedSponsors)
            .sort(([a], [b]) => tierOrder[a] - tierOrder[b])
            .map(([tier, sponsors]) => (
              <motion.div
                key={tier}
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-center mb-8 capitalize">
                  {tier} Sponsors
                </h2>
                <div
                  className={`grid gap-6 justify-items-center ${
                    tier === "title"
                      ? "grid-cols-1 max-w-md mx-auto"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
                  }`}
                >
                  {sponsors.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass-card border border-white/10 h-full">
                        <CardContent className="p-6 text-center">
                          <div className="h-16 flex items-center justify-center mb-4 bg-muted/30 rounded-lg">
                            <span className="font-bold text-primary">
                              {sponsor.name}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-2">{sponsor.name}</h3>
                          <p className="text-muted-foreground text-sm">
                            {sponsor.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Sponsors;
