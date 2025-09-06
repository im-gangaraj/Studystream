import { Course } from '@/lib/types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course',
    thumbnail: '/api/placeholder/400/300',
    instructor: 'Dr. Sarah Johnson',
    category: 'Web Development',
    difficulty: 'beginner',
    duration: '42 hours',
    price: 89.99,
    rating: 4.8,
    enrolledCount: 15420,
    createdAt: new Date('2024-01-15'),
    lessons: [
      { id: '1-1', courseId: '1', title: 'Introduction to Web Development', description: 'Getting started with the basics', duration: '15 min', order: 1 },
      { id: '1-2', courseId: '1', title: 'HTML Fundamentals', description: 'Learn HTML structure and tags', duration: '45 min', order: 2 },
      { id: '1-3', courseId: '1', title: 'CSS Styling', description: 'Master CSS for beautiful designs', duration: '60 min', order: 3 },
      { id: '1-4', courseId: '1', title: 'JavaScript Basics', description: 'Introduction to JavaScript programming', duration: '90 min', order: 4 },
    ]
  },
  {
    id: '2',
    title: 'Advanced React & TypeScript',
    description: 'Master modern React patterns, TypeScript, and build production-ready applications',
    thumbnail: '/api/placeholder/400/300',
    instructor: 'Mark Anderson',
    category: 'Frontend',
    difficulty: 'advanced',
    duration: '28 hours',
    price: 129.99,
    rating: 4.9,
    enrolledCount: 8234,
    createdAt: new Date('2024-02-01'),
    lessons: [
      { id: '2-1', courseId: '2', title: 'TypeScript Deep Dive', description: 'Advanced TypeScript concepts', duration: '120 min', order: 1 },
      { id: '2-2', courseId: '2', title: 'React Hooks Mastery', description: 'Custom hooks and patterns', duration: '90 min', order: 2 },
      { id: '2-3', courseId: '2', title: 'State Management', description: 'Redux, Zustand, and Context API', duration: '75 min', order: 3 },
    ]
  },
  {
    id: '3',
    title: 'Python for Data Science',
    description: 'Learn Python programming and data analysis with pandas, NumPy, and matplotlib',
    thumbnail: '/api/placeholder/400/300',
    instructor: 'Prof. Emily Chen',
    category: 'Data Science',
    difficulty: 'intermediate',
    duration: '35 hours',
    price: 99.99,
    rating: 4.7,
    enrolledCount: 12567,
    createdAt: new Date('2024-01-20'),
    lessons: [
      { id: '3-1', courseId: '3', title: 'Python Basics', description: 'Introduction to Python syntax', duration: '60 min', order: 1 },
      { id: '3-2', courseId: '3', title: 'Data Structures', description: 'Lists, dictionaries, and sets', duration: '90 min', order: 2 },
      { id: '3-3', courseId: '3', title: 'NumPy Arrays', description: 'Working with numerical data', duration: '75 min', order: 3 },
    ]
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles, Figma, and create stunning user interfaces',
    thumbnail: '/api/placeholder/400/300',
    instructor: 'Alex Rivera',
    category: 'Design',
    difficulty: 'beginner',
    duration: '25 hours',
    price: 79.99,
    rating: 4.6,
    enrolledCount: 9823,
    createdAt: new Date('2024-02-10'),
    lessons: [
      { id: '4-1', courseId: '4', title: 'Design Principles', description: 'Color theory and typography', duration: '45 min', order: 1 },
      { id: '4-2', courseId: '4', title: 'Figma Basics', description: 'Getting started with Figma', duration: '60 min', order: 2 },
      { id: '4-3', courseId: '4', title: 'User Research', description: 'Understanding your users', duration: '50 min', order: 3 },
    ]
  },
  {
    id: '5',
    title: 'Machine Learning A-Z',
    description: 'Complete guide to machine learning with Python and TensorFlow',
    thumbnail: '/api/placeholder/400/300',
    instructor: 'Dr. Michael Brown',
    category: 'AI/ML',
    difficulty: 'advanced',
    duration: '48 hours',
    price: 149.99,
    rating: 4.9,
    enrolledCount: 6543,
    createdAt: new Date('2024-01-25'),
    lessons: [
      { id: '5-1', courseId: '5', title: 'ML Introduction', description: 'What is machine learning?', duration: '30 min', order: 1 },
      { id: '5-2', courseId: '5', title: 'Supervised Learning', description: 'Classification and regression', duration: '120 min', order: 2 },
      { id: '5-3', courseId: '5', title: 'Neural Networks', description: 'Deep learning basics', duration: '150 min', order: 3 },
    ]
  },
  {
    id: '6',
    title: 'Digital Marketing Masterclass',
    description: 'SEO, social media marketing, and growth hacking strategies',
    thumbnail: '/api/placeholder/400/300',
    instructor: 'Lisa Thompson',
    category: 'Marketing',
    difficulty: 'intermediate',
    duration: '20 hours',
    price: 69.99,
    rating: 4.5,
    enrolledCount: 11234,
    createdAt: new Date('2024-02-05'),
    lessons: [
      { id: '6-1', courseId: '6', title: 'SEO Fundamentals', description: 'Search engine optimization basics', duration: '60 min', order: 1 },
      { id: '6-2', courseId: '6', title: 'Social Media Strategy', description: 'Building your brand online', duration: '75 min', order: 2 },
      { id: '6-3', courseId: '6', title: 'Content Marketing', description: 'Creating engaging content', duration: '55 min', order: 3 },
    ]
  }
];