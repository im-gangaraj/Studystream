import { useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { mockCourses } from "@/data/mockData";
import { Plus, Edit, Trash2, Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Course } from "@/lib/types";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState(mockCourses);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "beginner" as Course['difficulty'],
    duration: "",
    price: "",
    instructor: "",
  });

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((acc, c) => acc + c.enrolledCount, 0),
    totalRevenue: courses.reduce((acc, c) => acc + (c.price * c.enrolledCount), 0),
    avgRating: (courses.reduce((acc, c) => acc + c.rating, 0) / courses.length).toFixed(1),
  };

  const handleSubmit = () => {
    if (editingCourse) {
      setCourses(courses.map(c => 
        c.id === editingCourse.id 
          ? { ...c, ...formData, price: parseFloat(formData.price) }
          : c
      ));
      toast.success("Course updated successfully!");
      setEditingCourse(null);
    } else {
      const newCourse: Course = {
        id: String(courses.length + 1),
        ...formData,
        price: parseFloat(formData.price),
        thumbnail: "/api/placeholder/400/300",
        rating: 0,
        enrolledCount: 0,
        createdAt: new Date(),
        lessons: [],
      };
      setCourses([...courses, newCourse]);
      toast.success("Course added successfully!");
    }
    
    setIsAddingCourse(false);
    setFormData({
      title: "",
      description: "",
      category: "",
      difficulty: "beginner",
      duration: "",
      price: "",
      instructor: "",
    });
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
    toast.success("Course deleted successfully!");
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      difficulty: course.difficulty,
      duration: course.duration,
      price: String(course.price),
      instructor: course.instructor,
    });
    setIsAddingCourse(true);
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="glass-card p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>

        {/* Stats */}
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
              <p className="text-xs text-muted-foreground">Total courses</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-secondary" />
                <span className="text-xs text-muted-foreground">Students</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Enrolled</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <DollarSign className="h-8 w-8 text-success" />
                <span className="text-xs text-muted-foreground">Revenue</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total revenue</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-accent" />
                <span className="text-xs text-muted-foreground">Rating</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRating}</div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Management */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Course Management</CardTitle>
              <Dialog open={isAddingCourse} onOpenChange={setIsAddingCourse}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingCourse(null);
                    setFormData({
                      title: "",
                      description: "",
                      category: "",
                      difficulty: "beginner",
                      duration: "",
                      price: "",
                      instructor: "",
                    });
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl glass-card">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCourse ? "Edit Course" : "Add New Course"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter course title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter course description"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="e.g., Web Development"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select 
                          value={formData.difficulty} 
                          onValueChange={(v) => setFormData({ ...formData, difficulty: v as Course['difficulty'] })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="e.g., 10 hours"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="99.99"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="instructor">Instructor</Label>
                        <Input
                          id="instructor"
                          value={formData.instructor}
                          onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                          placeholder="Instructor name"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddingCourse(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>
                        {editingCourse ? "Update" : "Add"} Course
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          course.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          course.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {course.difficulty}
                        </span>
                      </TableCell>
                      <TableCell>{course.enrolledCount}</TableCell>
                      <TableCell>${course.price}</TableCell>
                      <TableCell>{course.rating}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleEdit(course)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDelete(course.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}