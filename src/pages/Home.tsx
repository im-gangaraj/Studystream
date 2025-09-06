import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockCourses } from "@/data/mockData";
import { ArrowRight, BookOpen, Users, Award, TrendingUp, Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const navigate = useNavigate();
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32">
        <div className="container mx-auto">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Transform Your Future</span>
              <br />
              with Online Learning
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access world-class courses, learn from industry experts, and advance your career with our comprehensive learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/courses')}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/register')}
                className="hover-lift"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, value: "500+", label: "Courses" },
              { icon: Users, value: "50K+", label: "Students" },
              { icon: Award, value: "95%", label: "Success Rate" },
              { icon: TrendingUp, value: "4.8", label: "Rating" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 text-center hover-lift">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground">Discover our most popular courses</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="glass-card overflow-hidden hover-lift hover-glow">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/40" />
                  </div>
                  <Badge 
                    className="absolute top-4 right-4"
                    variant={course.difficulty === 'beginner' ? 'default' : course.difficulty === 'intermediate' ? 'secondary' : 'destructive'}
                  >
                    {course.difficulty}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-sm text-muted-foreground">({course.enrolledCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">${course.price}</div>
                    <Button onClick={() => navigate(`/course/${course.id}`)}>
                      View Course
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/courses')}
              className="hover-lift"
            >
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="glass-card p-12 text-center max-w-3xl mx-auto pulse-glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students already learning on our platform
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-12"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}