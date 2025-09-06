import { useState, useMemo } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCourses } from "@/data/mockData";
import { Search, Filter, Star, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const categories = useMemo(() => {
    const cats = new Set(mockCourses.map(c => c.category));
    return ["all", ...Array.from(cats)];
  }, []);

  const filteredCourses = useMemo(() => {
    let courses = [...mockCourses];

    // Search filter
    if (searchQuery) {
      courses = courses.filter(
        course =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      courses = courses.filter(course => course.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== "all") {
      courses = courses.filter(course => course.difficulty === selectedDifficulty);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        courses.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        courses.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        courses.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        courses.sort((a, b) => b.enrolledCount - a.enrolledCount);
    }

    return courses;
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      {/* Header */}
      <section className="px-4 py-12">
        <div className="container mx-auto">
          <div className="glass-card p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Explore <span className="gradient-text">Our Courses</span>
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover courses that match your interests and career goals
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 text-base glass"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 pb-8">
        <div className="container mx-auto">
          <div className="glass-card p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <Filter className="h-5 w-5 text-muted-foreground" />
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="ml-auto text-sm text-muted-foreground">
                {filteredCourses.length} courses found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Card 
                key={course.id} 
                className="glass-card overflow-hidden hover-lift hover-glow cursor-pointer"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  <Badge 
                    className="absolute top-3 right-3"
                    variant={
                      course.difficulty === 'beginner' ? 'default' : 
                      course.difficulty === 'intermediate' ? 'secondary' : 
                      'destructive'
                    }
                  >
                    {course.difficulty}
                  </Badge>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    by {course.instructor}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>{course.enrolledCount}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold">${course.price}</div>
                    <Button size="sm">Enroll Now</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No courses found matching your criteria</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedDifficulty("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}