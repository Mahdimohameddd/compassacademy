import englishImg from "@/assets/Frame 7 (3).webp";
import spanishImg from "@/assets/sp.webp";

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
  tagline: "Speak with confidence — from A1 to C1.",
  description:
    "At The Compass Academy, students don't just study English — they live the language. Our CEFR-based program (A1–C1) is designed to help learners master speaking, listening, reading, and writing through practical communication, intensive learning, and continuous guidance from experienced instructors.",
  longDescription:
    "At The Compass Academy, students don't just study English — they live the language. Our CEFR-based program (A1–C1) is designed to help learners master speaking, listening, reading, and writing through practical communication, intensive learning, and continuous guidance from experienced instructors.\n\n• CEFR-based curriculum (A1–C1)\n• Master speaking, listening, reading, and writing\n• Intensive 6-week level progression\n• Small groups (maximum 12 students) for personalized attention\n• Professional and experienced English teachers\n• Interactive and active learning methods\n• Daily teacher follow-up and personalized feedback\n• Regular quizzes and progress assessments\n• Real-life communication practice in every session\n• Supportive environment focused on confidence and fluency",
  price: 4500,
  oldPrice: 0,
  duration: "6 weeks per level",
  totalDuration: "100+ hours",
  levels: "A1 — C1",
  image: englishImg,
  available: true,
  sessionsPerWeek: 5,
  sessionDuration: "1h30",
  format: "In-person + Online",
  location: "Algiers + Live Zoom",
  cohortSize: "Max 12 students",
  rating: 4.9,
  reviewsCount: 1250,
  lessonsCount: 100,
  assignmentsCount: 0,
  highlights: [
    "Speak English confidently in everyday and professional situations",
    "Understand spoken English with greater ease",
    "Read and comprehend English texts effectively",
    "Write clear and accurate emails, messages, and essays",
    "Use grammar and vocabulary naturally",
    "Communicate fluently with improved pronunciation",
    "Express ideas confidently in conversations and presentations",
    "Progress confidently through the CEFR levels toward C1 proficiency",
  ],
  learningSupport: [
    "Daily practice sheets covering grammar, vocabulary, reading, and writing",
    "Vocabulary lists organized by each CEFR level",
    "Speaking activities based on real-life situations",
    "Listening exercises using authentic English content",
    "Daily quizzes to reinforce learning",
    "Continuous teacher feedback and progress monitoring",
    "Level assessments to ensure mastery before advancing",
  ],
  requirements: [
    "Basic English knowledge (according to your current level)",
    "Laptop, tablet, or smartphone",
    "Stable internet connection",
    "Commitment to daily practice",
    "Willingness to actively participate during sessions",
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
      body: "Issued after passing the final test. Confirms level completion (A1 through C1).",
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
  ],
  sections: [
    {
      title: "Orientation & Placement",
      lessons: [
        { title: "Welcome to The Compass Academy", duration: "10:00" },
        { title: "CEFR Placement & Learning Roadmap", duration: "15:00" },
        { title: "Learning Platform & Study Resources", duration: "20:00" },
      ],
    },
    {
      title: "Grammar & Vocabulary Foundations",
      lessons: [
        { title: "Essential Grammar Structures", duration: "25:00" },
        { title: "Vocabulary Building", duration: "20:00" },
        { title: "Sentence Formation", duration: "20:00" },
        { title: "Everyday Expressions", duration: "15:00" },
        { title: "Practical Exercises", duration: "30:00" },
      ],
    },
    {
      title: "Speaking & Pronunciation",
      lessons: [
        { title: "Pronunciation & Accent Improvement", duration: "25:00" },
        { title: "Speaking with Confidence", duration: "20:00" },
        { title: "Daily Conversation Practice", duration: "20:00" },
        { title: "Interactive Role Plays", duration: "15:00" },
        { title: "Real-Life Communication", duration: "30:00" },
      ],
    },
    {
      title: "Listening & Reading Skills",
      lessons: [
        { title: "Listening to Native Speakers", duration: "25:00" },
        { title: "Reading Comprehension", duration: "20:00" },
        { title: "Audio-Based Activities", duration: "15:00" },
        { title: "Authentic Text Analysis", duration: "20:00" },
        { title: "Reading Strategies", duration: "30:00" },
      ],
    },
    {
      title: "Writing & Communication",
      lessons: [
        { title: "Writing Emails & Messages", duration: "25:00" },
        { title: "Grammar in Writing", duration: "20:00" },
        { title: "Paragraph & Essay Writing", duration: "30:00" },
        { title: "Professional Communication", duration: "20:00" },
        { title: "Creative Writing Practice", duration: "25:00" },
      ],
    },
    {
      title: "Assessment & CEFR Progression",
      lessons: [
        { title: "Daily Quizzes", duration: "15:00" },
        { title: "Mid-Level Assessment", duration: "20:00" },
        { title: "Speaking Evaluation", duration: "20:00" },
        { title: "Final Level Examination", duration: "40:00", locked: true },
        { title: "Personalized Feedback & Next Level Guidance", duration: "25:00", locked: true },
      ],
    },
  ],
  reviews: [
    {
      name: "أحمد بن علي",
      avatar: "",
      profession: "مهندس برمجيات",
      rating: 5,
      text: "This course transformed my confidence in speaking English. The structured approach and real conversation practice made all the difference. I can now communicate effectively at work and in daily life.",
    },
    {
      name: "سارة محمود",
      avatar: "",
      profession: "أخصائية تسويق",
      rating: 5,
      text: "The pronunciation and fluency sections were incredibly helpful. The instructors are knowledgeable and the peer practice sessions gave me the confidence to speak without fear of making mistakes.",
    },
    {
      name: "مريم بن سعيد",
      avatar: "",
      profession: "طالبة",
      rating: 4,
      text: "I loved the business English module — it helped me prepare for interviews and professional emails. The course materials are well-organized and easy to follow.",
    },
    {
      name: "خالد بوعبد الله",
      avatar: "",
      profession: "محلل أعمال",
      rating: 5,
      text: "Excellent course with practical, real-world application. The weekly breakdown between speaking, grammar, and listening kept me engaged throughout. Highly recommended.",
    },
  ],
  instructor: {
    name: "Hanane Boumediene",
    avatar: "",
    title: "Senior English Language Instructor",
    bio: "Hanane Boumediene is a certified English language instructor with over 12 years of teaching experience. She holds a Ph.D. in Applied Linguistics and has helped thousands of students achieve fluency in English.",
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
      a: "Yes. The price covers a full 6-week level. There's no long-term commitment — you can stop or pause between levels.",
    },
    {
      q: "When do new cohorts start?",
      a: "New cohorts open every month. Reach out via the enroll form and we'll send you the next start dates.",
    },
    {
      q: "What certificate will I receive?",
      a: "After passing the end-of-level test, you receive a certificate confirming your level completion — from A1 through C1.",
    },
    {
      q: "Is the course in-person or online?",
      a: "Both. Sessions are held in-person in Algiers and simultaneously streamed via Zoom. You can attend either way.",
    },
  ],
};

const spanishCourse: Course = {
  slug: "spanish",
  title: "Spanish Course",
  category: "Spanish Courses",
  tagline: "Learn Spanish the practical way — from A1 to C1.",
  description:
    "Learning Spanish has never been easier. At The Compass Academy, you'll follow a CEFR-based program (A1–C1) designed to help you speak, understand, read, and write Spanish with confidence through practical lessons and real conversations.",
  longDescription:
    "Learning Spanish has never been easier. At The Compass Academy, you'll follow a CEFR-based program (A1–C1) designed to help you speak, understand, read, and write Spanish with confidence through practical lessons and real conversations.\n\n• CEFR curriculum (A1–C1)\n• Focus on speaking from day one\n• Reading, writing & listening practice\n• Intensive 6-week levels\n• Small groups (max. 12 students)\n• Experienced and supportive teachers\n• Daily follow-up, quizzes & personalized feedback\n• Interactive learning with real-life situations",
  price: 4500,
  oldPrice: 0,
  duration: "6 weeks per level",
  totalDuration: "100+ hours",
  levels: "A1 — C1",
  image: spanishImg,
  available: true,
  sessionsPerWeek: 5,
  sessionDuration: "1h30",
  format: "In-person + Online",
  location: "Algiers + Live Zoom",
  cohortSize: "Max 12 students",
  rating: 4.9,
  reviewsCount: 0,
  lessonsCount: 100,
  assignmentsCount: 0,
  highlights: [
    "Speak Spanish confidently in everyday conversations",
    "Understand native Spanish speakers more easily",
    "Read and write with confidence",
    "Build a strong vocabulary and grammar foundation",
    "Communicate naturally while traveling, studying, or working",
    "Progress through the CEFR levels toward fluency",
  ],
  learningSupport: [
    "Daily grammar & vocabulary practice",
    "Speaking activities in every session",
    "Listening exercises with authentic Spanish",
    "Regular quizzes and progress assessments",
    "Continuous teacher guidance and feedback",
    "Level exams before moving to the next stage",
  ],
  requirements: [
    "No previous experience required (A1 available)",
    "Laptop, tablet, or smartphone",
    "Internet connection",
    "Motivation to practice consistently",
  ],
  features: [
    "Spanish language",
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
      body: "Issued after passing the final test. Confirms level completion (A1 through C1).",
    },
  ],
  weeklyBreakdown: [
    { label: "Speaking", percent: 35 },
    { label: "Grammar", percent: 25 },
    { label: "Listening", percent: 20 },
    { label: "Writing & Vocab", percent: 20 },
  ],
  curriculum: [
    { level: "A1", name: "Beginner", focus: "Greetings, basic grammar, present tense, everyday vocabulary." },
    { level: "A2", name: "Elementary", focus: "Past & future tenses, short conversations, travel and daily life." },
    { level: "B1", name: "Intermediate", focus: "Express opinions, handle most situations, write structured texts." },
    { level: "B2", name: "Upper-Intermediate", focus: "Fluent discussion, nuanced grammar, professional & academic Spanish." },
    { level: "C1", name: "Advanced", focus: "Complex topics, idiomatic speech, advanced writing and presentations." },
  ],
  sections: [
    {
      title: "Orientation & Placement",
      lessons: [
        { title: "Welcome to The Compass Academy", duration: "10:00" },
        { title: "CEFR Placement & Learning Roadmap", duration: "15:00" },
        { title: "Learning Platform & Study Resources", duration: "20:00" },
      ],
    },
    {
      title: "Grammar & Vocabulary Foundations",
      lessons: [
        { title: "Essential Grammar Structures", duration: "25:00" },
        { title: "Vocabulary Building", duration: "20:00" },
        { title: "Sentence Formation", duration: "20:00" },
        { title: "Everyday Expressions", duration: "15:00" },
        { title: "Practical Exercises", duration: "30:00" },
      ],
    },
    {
      title: "Speaking & Pronunciation",
      lessons: [
        { title: "Pronunciation & Accent Improvement", duration: "25:00" },
        { title: "Speaking with Confidence", duration: "20:00" },
        { title: "Daily Conversation Practice", duration: "20:00" },
        { title: "Interactive Role Plays", duration: "15:00" },
        { title: "Real-Life Communication", duration: "30:00" },
      ],
    },
    {
      title: "Listening & Reading Skills",
      lessons: [
        { title: "Listening to Native Speakers", duration: "25:00" },
        { title: "Reading Comprehension", duration: "20:00" },
        { title: "Audio-Based Activities", duration: "15:00" },
        { title: "Authentic Text Analysis", duration: "20:00" },
        { title: "Reading Strategies", duration: "30:00" },
      ],
    },
    {
      title: "Writing & Communication",
      lessons: [
        { title: "Writing Emails & Messages", duration: "25:00" },
        { title: "Grammar in Writing", duration: "20:00" },
        { title: "Paragraph & Essay Writing", duration: "30:00" },
        { title: "Professional Communication", duration: "20:00" },
        { title: "Creative Writing Practice", duration: "25:00" },
      ],
    },
    {
      title: "Assessment & CEFR Progression",
      lessons: [
        { title: "Daily Quizzes", duration: "15:00" },
        { title: "Mid-Level Assessment", duration: "20:00" },
        { title: "Speaking Evaluation", duration: "20:00" },
        { title: "Final Level Examination", duration: "40:00", locked: true },
        { title: "Personalized Feedback & Next Level Guidance", duration: "25:00", locked: true },
      ],
    },
  ],
  reviews: [
    {
      name: "أحمد بن علي",
      avatar: "",
      profession: "مهندس برمجيات",
      rating: 5,
      text: "This course transformed my confidence in speaking Spanish. The structured approach and real conversation practice made all the difference.",
    },
    {
      name: "سارة محمود",
      avatar: "",
      profession: "أخصائية تسويق",
      rating: 5,
      text: "The pronunciation and fluency sections were incredibly helpful. The instructors are knowledgeable and the peer practice sessions gave me confidence.",
    },
  ],
  instructor: {
    name: "Compass Academy Team",
    avatar: "",
    title: "Spanish Language Instructors",
    bio: "Our Spanish instructors are certified professionals with years of experience teaching Spanish to Arabic speakers. They use communicative methods focused on real-world application.",
    experience: "Certified instructors",
    students: "Growing community",
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
      a: "Yes. The price covers a full 6-week level. There's no long-term commitment — you can stop or pause between levels.",
    },
    {
      q: "When do new cohorts start?",
      a: "New cohorts open every month. Reach out via the enroll form and we'll send you the next start dates.",
    },
    {
      q: "What certificate will I receive?",
      a: "After passing the end-of-level test, you receive a certificate confirming your level completion — from A1 through C1.",
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
  spanishCourse,
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
