import englishImg from "@/assets/english-course.png";

export type Review = {
  name: string;
  avatar: string;
  profession: string;
  rating: number;
  text: string;
};

export type Lesson = {
  title: string;
  duration: string;
  locked?: boolean;
};

export type CurriculumSection = {
  title: string;
  lessons: Lesson[];
};

export type Instructor = {
  name: string;
  avatar: string;
  title: string;
  bio: string;
  experience: string;
  students: string;
  philosophy: string;
};

export type Course = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  oldPrice: number;
  duration: string;
  totalDuration: string;
  levels: string;
  image: string;
  available: boolean;
  sessionsPerWeek: number;
  sessionDuration: string;
  format: string;
  location: string;
  cohortSize: string;
  rating: number;
  reviewsCount: number;
  lessonsCount: number;
  assignmentsCount: number;
  highlights: string[];
  learningSupport: string[];
  requirements: string[];
  features: string[];
  deliverables: { title: string; body: string }[];
  weeklyBreakdown: { label: string; percent: number }[];
  curriculum: { level: string; name: string; focus: string }[];
  sections: CurriculumSection[];
  reviews: Review[];
  instructor: Instructor;
  faq: { q: string; a: string }[];
};

const englishCourse: Course = {
  slug: "english",
  title: "English Course",
  category: "English Courses",
  tagline: "Speak with confidence — from A1 to C2.",
  description:
    "Students at The Compass Academy do not only study English — they use English in every session. A program built around practical usage, real-life application, and confidence through consistent speaking practice.",
  longDescription:
    "Students at The Compass Academy do not only study English — they use English in every session. The program is built around practical usage, real-life application, and confidence through consistent speaking practice.\n\n• Practical English usage (not only theory)\n• Speaking and communication in every session\n• Intensive level-based progression\n• Active student participation\n• Real-life language application\n• Confidence-building environment",
  price: 89,
  oldPrice: 180,
  duration: "8 weeks per level",
  totalDuration: "18h 30m",
  levels: "A1 — C2",
  image: englishImg,
  available: true,
  sessionsPerWeek: 3,
  sessionDuration: "1h30",
  format: "In-person + online",
  location: "Algiers + Live Zoom",
  cohortSize: "Max 12 students",
  rating: 4.9,
  reviewsCount: 1250,
  lessonsCount: 24,
  assignmentsCount: 12,
  highlights: [
    "Speak confidently in daily conversations",
    "Improve pronunciation and fluency",
    "Use advanced vocabulary naturally",
    "Write professional emails",
    "Understand native speakers better",
    "Build speaking confidence",
  ],
  learningSupport: [
    "Practice datasheets — vocabulary, grammar and speaking tasks shared via Google Classroom",
    "Vocabulary sheets — key terms and phrases per level for structured review",
    "Speaking activities — guided exercises built around real-life scenarios",
  ],
  requirements: [
    "Basic understanding of English",
    "Laptop or smartphone",
    "Internet connection",
    "Motivation to practice daily",
  ],
  features: [
    "English language",
    "Exercises & quizzes",
    "Beginner to advanced",
    "Mobile & desktop access",
    "Lifetime access",
    "Completion certificate",
  ],
  deliverables: [
    {
      title: "Session recordings",
      body: "Uploaded to Google Drive and shared within 24 hours. Used for revision and missed sessions.",
    },
    {
      title: "PDF practice sheets",
      body: "Vocabulary, grammar and speaking tasks shared via Google Classroom. Printable and digital format.",
    },
    {
      title: "Telegram group",
      body: "One dedicated group per cohort. Communication with teacher, Q&A, file sharing, and updates.",
    },
    {
      title: "End-of-level test",
      body: "Final evaluation per level — tests speaking, grammar, vocabulary, and listening.",
    },
    {
      title: "Completion certificate",
      body: "Issued after passing the final test. Confirms level completion (A1 through C2).",
    },
  ],
  weeklyBreakdown: [
    { label: "Speaking", percent: 35 },
    { label: "Grammar", percent: 25 },
    { label: "Listening", percent: 20 },
    { label: "Writing & Vocab", percent: 20 },
  ],
  curriculum: [
    {
      level: "A1",
      name: "Beginner",
      focus: "Greetings, basic grammar, present tense, everyday vocabulary.",
    },
    {
      level: "A2",
      name: "Elementary",
      focus: "Past & future tenses, short conversations, travel and daily life.",
    },
    {
      level: "B1",
      name: "Intermediate",
      focus: "Express opinions, handle most situations, write structured texts.",
    },
    {
      level: "B2",
      name: "Upper-Intermediate",
      focus: "Fluent discussion, nuanced grammar, professional & academic English.",
    },
    {
      level: "C1",
      name: "Advanced",
      focus: "Complex topics, idiomatic speech, advanced writing and presentations.",
    },
    {
      level: "C2",
      name: "Mastery",
      focus: "Near-native command — debate, literature, specialized vocabulary.",
    },
  ],
  sections: [
    {
      title: "Introduction to Communication",
      lessons: [
        { title: "Welcome & Course Overview", duration: "10:00" },
        { title: "Why Communication Matters", duration: "15:00" },
        { title: "Self-Introduction Practice", duration: "20:00" },
      ],
    },
    {
      title: "Pronunciation Essentials",
      lessons: [
        { title: "Vowel Sounds & Intonation", duration: "25:00" },
        { title: "Consonant Clusters", duration: "20:00" },
        { title: "Common Pronunciation Errors", duration: "15:00" },
        { title: "Practice Session", duration: "30:00" },
      ],
    },
    {
      title: "Speaking Fluently",
      lessons: [
        { title: "Building Natural Responses", duration: "20:00" },
        { title: "Connecting Ideas Smoothly", duration: "25:00" },
        { title: "Handling Interruptions", duration: "15:00" },
        { title: "Fluency Drills", duration: "30:00", locked: true },
      ],
    },
    {
      title: "Business English Basics",
      lessons: [
        { title: "Email Writing & Etiquette", duration: "25:00" },
        { title: "Meeting & Presentation Language", duration: "30:00" },
        { title: "Negotiation Phrases", duration: "20:00" },
        { title: "Professional Email Project", duration: "45:00", locked: true },
      ],
    },
    {
      title: "Advanced Conversations",
      lessons: [
        { title: "Debate & Discussion Skills", duration: "30:00" },
        { title: "Idioms & Expressions", duration: "20:00" },
        { title: "Cultural Nuances", duration: "25:00", locked: true },
        { title: "Final Assessment Prep", duration: "40:00", locked: true },
      ],
    },
  ],
  reviews: [
    {
      name: "Sarah Johnson",
      avatar: "",
      profession: "Marketing Specialist",
      rating: 5,
      text: "This course transformed my confidence in speaking English. The structured approach and real conversation practice made all the difference. I can now communicate effectively at work and in daily life.",
    },
    {
      name: "Ahmed Benali",
      avatar: "",
      profession: "Software Engineer",
      rating: 5,
      text: "The pronunciation and fluency sections were incredibly helpful. The instructors are knowledgeable and the peer practice sessions gave me the confidence to speak without fear of making mistakes.",
    },
    {
      name: "Maria Garcia",
      avatar: "",
      profession: "Student",
      rating: 4,
      text: "I loved the business English module — it helped me prepare for interviews and professional emails. The course materials are well-organized and easy to follow.",
    },
    {
      name: "James Wilson",
      avatar: "",
      profession: "Business Analyst",
      rating: 5,
      text: "Excellent course with practical, real-world application. The weekly breakdown between speaking, grammar, and listening kept me engaged throughout. Highly recommended.",
    },
  ],
  instructor: {
    name: "Dr. Emily Parker",
    avatar: "",
    title: "Senior English Language Instructor",
    bio: "Dr. Emily Parker is a certified English language instructor with over 12 years of teaching experience. She holds a Ph.D. in Applied Linguistics and has helped thousands of students achieve fluency in English.",
    experience: "12+ years teaching",
    students: "5,000+ students taught",
    philosophy:
      "Language learning should be practical, enjoyable, and built on real communication. Every student has the ability to become fluent with the right guidance and consistent practice.",
  },
  faq: [
    {
      q: "How do I know my starting level?",
      a: "Every new student takes a free placement test before enrolling — speaking + written — so you start at the right level.",
    },
    {
      q: "What happens if I miss a session?",
      a: "All sessions are recorded and shared via Google Drive within 24 hours. Practice sheets stay available throughout the level.",
    },
    {
      q: "Can I pay per level?",
      a: "Yes. The price covers a full 8-week level. There's no long-term commitment — you can stop or pause between levels.",
    },
    {
      q: "When do new cohorts start?",
      a: "New cohorts open every month. Reach out via the enroll form and we'll send you the next start dates.",
    },
    {
      q: "What certificate will I receive?",
      a: "After passing the end-of-level test, you receive a certificate confirming your level completion — from A1 through C2.",
    },
    {
      q: "Is the course in-person or online?",
      a: "Both. Sessions are held in-person in Algiers and simultaneously streamed via Zoom. You can attend either way.",
    },
  ],
};

const placeholderCourse: Course = {
  slug: "",
  title: "",
  category: "",
  tagline: "Coming soon.",
  description: "",
  longDescription: "",
  price: 0,
  oldPrice: 0,
  duration: "",
  totalDuration: "",
  levels: "",
  image: englishImg,
  available: false,
  sessionsPerWeek: 0,
  sessionDuration: "",
  format: "",
  location: "",
  cohortSize: "",
  rating: 0,
  reviewsCount: 0,
  lessonsCount: 0,
  assignmentsCount: 0,
  highlights: [],
  learningSupport: [],
  requirements: [],
  features: [],
  deliverables: [],
  weeklyBreakdown: [],
  curriculum: [],
  sections: [],
  reviews: [],
  instructor: {
    name: "",
    avatar: "",
    title: "",
    bio: "",
    experience: "",
    students: "",
    philosophy: "",
  },
  faq: [],
};

export const courses: Course[] = [
  englishCourse,
  {
    ...placeholderCourse,
    slug: "french",
    title: "French",
    category: "Languages",
    tagline: "Coming soon.",
    available: false,
  },
  {
    ...placeholderCourse,
    slug: "spanish",
    title: "Spanish",
    category: "Languages",
    tagline: "Coming soon.",
    available: false,
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
