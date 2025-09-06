export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "student";
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: Lesson[];
  price: number;
  rating: number;
  enrolledCount: number;
  createdAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl?: string;
  content?: string;
  duration: string;
  order: number;
  completed?: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completedLessons: string[];
  enrolledAt: Date;
  completedAt?: Date;
}