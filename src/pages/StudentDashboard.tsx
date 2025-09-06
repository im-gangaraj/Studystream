import { useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { mockCourses } from "@/data/mockData";
import { BookOpen, Clock, Award, TrendingUp, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock enrolled courses with progress
  const [enrolledCourses] = useState([
    { ...mockCourses[0], progress: 75, completedLessons: 3 },
    { ...mockCourses[1], progress: 30, completedLessons: 1 },
    { ...mockCourses[2], progress: 100, completedLessons: 3 },
  ]);

  const stats = {
    totalCourses: enrolledCourses.length,
    completedCourses: enrolledCourses.filter(c => c.progress === 100).length,
    totalHours: enrolledCourses.reduce((acc, c) => acc + parseInt(c.duration), 0),
    avgProgress: Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length),
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="glass-card p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.name}</span>!
          </h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-xs text-muted-foreground">Courses</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">Enrolled</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Award className="h-8 w-8 text-success" />
                <span className="text-xs text-muted-foreground">Completed</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedCourses}</div>
              <p className="text-xs text-muted-foreground">Certificates</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Clock className="h-8 w-8 text-secondary" />
                <span className="text-xs text-muted-foreground">Time</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHours}h</div>
              <p className="text-xs text-muted-foreground">Learning</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-accent" />
                <span className="text-xs text-muted-foreground">Progress</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgProgress}%</div>
              <p className="text-xs text-muted-foreground">Average</p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="glass-card hover-lift">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  {course.progress === 100 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle className="h-16 w-16 text-success" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-16 w-16 text-primary/60" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.completedLessons} of {course.lessons.length} lessons completed
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <Button 
                    className="w-full"
                    variant={course.progress === 100 ? "outline" : "default"}
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    {course.progress === 100 ? "Review Course" : "Continue"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <Button variant="outline" onClick={() => navigate('/courses')}>
              Browse All
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockCourses.slice(3, 7).map((course) => (
              <Card 
                key={course.id} 
                className="glass-card hover-lift cursor-pointer"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20" />
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm mb-1 line-clamp-2">{course.title}</h4>
                  <p className="text-xs text-muted-foreground">{course.instructor}</p>
                  <div className="mt-2 font-bold">${course.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}