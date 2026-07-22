import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ChevronRight,
  Star,
  BookOpen,
  FileText,
  Clock,
  Play,
  Check,
  Lock,
  User,
  Quote,
  Users,
  HeartHandshake,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { RegisterDialog } from "@/components/site/RegisterDialog";
import { getCourse } from "@/lib/courses";
import { useLocalizedCourse } from "@/lib/useLocalizedCourse";
import type { Course, Review, CurriculumSection } from "@/lib/courses";

const LEVELS_ALL = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const STAR_COUNTS = [0, 1, 2, 3, 4];

export const Route = createFileRoute("/courses/$slug")({
  head: ({ params }) => {
    const c = getCourse(params.slug);
    const title = c ? `${c.title} — Compass Academy` : "Course — Compass Academy";
    const description = c?.description || "Course at Compass Academy.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { slug: params.slug };
  },
  component: CourseDetailsPage,
  notFoundComponent: () => {
    const { t } = useTranslation();
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("common.pageNotFound")}
        </p>
        <h1 className="mt-4 text-4xl">{t("courses.notFound")}</h1>
        <Link to="/courses" className="mt-8 inline-block border-b border-foreground hover:text-brand">
          {t("courses.backToCourses")}
        </Link>
      </div>
    );
  },
});

function CourseDetailsPage() {
  const { t } = useTranslation();
  const { slug } = Route.useLoaderData();
  const course = useLocalizedCourse(slug);
  if (!course) return null;

  if (!course.available) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {t("courses.comingSoon")}
          </p>
          <h1 className="mt-4 text-5xl font-semibold text-ink">{course.title}</h1>
          <p className="mt-4 text-muted-foreground">{t("courses.unavailable")}</p>
          <Link to="/courses" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-brand transition-colors">
            {t("courses.browseCourses")} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6 sm:py-8 pb-28 lg:pb-16">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10">
          {/* LEFT COLUMN — 70% */}
          <div className="lg:flex-none lg:w-[70%] space-y-8 sm:space-y-10 min-w-0">
            <Breadcrumb category={course.category} title={course.title} />
            <CourseTitle course={course} />
            <PreviewCard image={course.image} />
            <AboutSection description={course.longDescription} />
            <OutcomesSection items={course.highlights} />
            <LearningSupportSection items={course.learningSupport} />
            <RequirementsSection items={course.requirements} />
            <CurriculumSection sections={course.sections} />
            <ReviewsSection reviews={course.reviews} />
          </div>

          {/* RIGHT COLUMN — 30% */}
          <div className="lg:flex-none lg:w-[30%] space-y-8">
            <div className="lg:sticky lg:top-24 space-y-8">
              <SidebarCard course={course} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky enroll bar */}
      <MobileEnrollBar courseSlug={course.slug} />
    </Layout>
  );
}

/* ========== COMPONENTS ========== */

function Breadcrumb({ category, title }: { category: string; title: string }) {
  const { t } = useTranslation();
  return (
    <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 animate-fade-in overflow-hidden">
      <Link to="/courses" className="hover:text-brand transition-colors shrink-0">
        {t("nav.courses")}
      </Link>
      <ChevronRight className="w-3 h-3 shrink-0" />
      <span className="text-gray-500 truncate min-w-0">{category}</span>
      <ChevronRight className="w-3 h-3 shrink-0" />
      <span className="text-brand font-medium truncate min-w-0">{title}</span>
    </nav>
  );
}

function CourseTitle({ course }: { course: Course }) {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold leading-[1.08] text-ink tracking-tight">
        {course.title}
      </h1>
      <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-x-3 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-foreground/5 border border-border flex items-center justify-center overflow-hidden shrink-0">
            {course.instructor.avatar ? (
              <img src={course.instructor.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <span className="text-foreground font-medium">
            {course.instructor.name.split(" ")[0]}
          </span>
        </div>

        <span className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 shrink-0" />
          <span className="text-foreground font-medium">{course.rating}</span>
          <span className="text-muted-foreground">({course.reviewsCount.toLocaleString()})</span>
        </span>

        <Divider />
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> {course.lessonsCount} {t("courseDetail.lessons")}
        </span>

        <Divider />
        <span className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> {course.assignmentsCount} {t("courseDetail.assignments")}
        </span>

        <Divider />
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> {course.totalDuration}
        </span>
      </div>
    </div>
  );
}

function PreviewCard({ image }: { image: string }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-brand/5 via-purple-50 to-blue-50 border border-border animate-fade-in">
      <img
        src={image}
        alt="Course preview"
        className="w-full h-auto max-h-[200px] sm:max-h-[260px] lg:h-[420px] lg:max-h-none object-contain lg:object-cover transition-transform duration-700"
      />
    </div>
  );
}

function AboutSection({ description }: { description: string }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref);

  return (
    <section ref={ref} className="animate-on-view">
      <h2 className="text-xl font-semibold text-ink">{t("courseDetail.about")}</h2>
      <p className="mt-3 text-sm text-muted-foreground leading-[1.75] max-w-3xl whitespace-pre-line">{description}</p>
    </section>
  );
}

function OutcomesSection({ items }: { items: string[] }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref);

  return (
    <section ref={ref} className="animate-on-view">
      <h2 className="text-xl font-semibold text-ink">
        {t("courseDetail.outcomes")}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3.5 p-2.5 -ml-2.5 rounded-lg hover:bg-gray-50/50 transition-colors group"
          >
            <span className="w-5 h-5 rounded-full border-2 border-brand/30 flex items-center justify-center shrink-0 group-hover:border-brand transition-colors">
              <Check className="w-3 h-3 text-brand" strokeWidth={3} />
            </span>
            <span className="text-sm text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RequirementsSection({ items }: { items: string[] }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref);

  if (!items.length) return null;

  return (
    <section ref={ref} className="animate-on-view">
      <h2 className="text-xl font-semibold text-ink">{t("courseDetail.requirements")}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function LearningSupportSection({ items }: { items: string[] }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref);

  if (!items.length) return null;

  return (
    <section ref={ref} className="animate-on-view">
      <h2 className="text-xl font-semibold text-ink">
        {t("courseDetail.support")}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3.5 p-2.5 -ml-2.5 rounded-lg hover:bg-gray-50/50 transition-colors group"
          >
            <span className="w-5 h-5 rounded-full border-2 border-brand/30 flex items-center justify-center shrink-0 group-hover:border-brand transition-colors">
              <Check className="w-3 h-3 text-brand" strokeWidth={3} />
            </span>
            <span className="text-sm text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CurriculumSection({ sections }: { sections: CurriculumSection[] }) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref);

  const { totalLessons, progress } = useMemo(() => {
    const total = sections.reduce((a, s) => a + s.lessons.length, 0);
    const unlocked = sections.reduce(
      (a, s) => a + s.lessons.filter((l) => !l.locked).length, 0,
    );
    return { totalLessons: total, progress: Math.round((unlocked / total) * 100) };
  }, [sections]);

  return (
    <section ref={ref} className="animate-on-view">
      <h2 className="text-xl font-semibold text-ink">{t("courseDetail.curriculum")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {sections.length} {t("courseDetail.sections")} &middot; {totalLessons} {t("courseDetail.lessons_lower")} &middot; {progress}% {t("courseDetail.unlocked")}
      </p>

      {progress > 0 && (
        <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="mt-4 space-y-2">
        {sections.map((section, i) => {
          const isOpen = openIndex === i;
          const unlocked = section.lessons.filter((l) => !l.locked).length;
          return (
            <div key={section.title} className="border border-border rounded-xl bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex((prev) => (prev === i ? null : i))}
                className="w-full flex items-center justify-between px-3 sm:px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ChevronRight
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                  <span className="font-medium text-ink text-sm truncate">{section.title}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 ml-4">
                  {unlocked}/{section.lessons.length}
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-border divide-y divide-border/50">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.title}
                      className={`flex items-center justify-between px-3 sm:px-5 py-3.5 text-sm ${
                        lesson.locked ? "opacity-50" : "hover:bg-gray-50/50"
                      } transition-colors`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {lesson.locked ? (
                          <Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-brand shrink-0" fill="currentColor" />
                        )}
                        <span className={lesson.locked ? "text-muted-foreground text-sm truncate" : "text-foreground text-sm truncate"}>
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0 ml-3">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref);

  const avgRating = useMemo(() =>
    reviews.length
      ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
      : "0",
    [reviews],
  );

  return (
    <section ref={ref} className="animate-on-view">
      <h2 className="text-xl font-semibold text-ink">{t("courseDetail.reviews")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        <span className="text-amber-500 font-medium">{avgRating}</span> {t("courseDetail.reviewSummary")} &middot;{" "}
        {reviews.length} {t("courseDetail.reviews").toLowerCase()}
      </p>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div key={review.name} className="bg-white border border-border rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand text-sm font-medium shrink-0">
                {review.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink text-sm">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.profession}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {STAR_COUNTS.map((i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
              <Quote className="w-3 h-3 inline -translate-y-0.5 text-muted-foreground/30 mr-1" />
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SidebarCard({ course }: { course: Course }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-8 border border-border">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold text-brand">{course.price.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground">DA</span>
      </div>

      <div className="mt-5 space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <BookOpen className="w-4 h-4 text-brand shrink-0" />
          <span>{course.format}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-brand shrink-0" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center gap-3">
          <Users className="w-4 h-4 text-brand shrink-0" />
          <span>{course.cohortSize}</span>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-border">
        <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("courseDetail.studentJourney")}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("courseDetail.journeyDescription")}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {LEVELS_ALL.filter((l) => course.levels.includes(l)).map((level) => (
            <span
              key={level}
              className="px-3 py-1 text-xs font-medium bg-brand/10 text-brand rounded-full"
            >
              {level}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-border">
        <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-muted-foreground mb-3">
          {t("courseDetail.deliverables")}
        </p>
        <ul className="space-y-2">
          {course.deliverables.map((item) => (
            <li key={item.title} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="w-3 h-3 text-brand shrink-0" strokeWidth={3} />
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      <RegisterDialog
        trigger={
          <button className="mt-5 w-full h-14 bg-brand hover:bg-brand/90 text-white font-medium text-base rounded-xl transition-colors active:scale-[0.98]">
            {t("courseDetail.enroll")}
          </button>
        }
      />
    </div>
  );
}

function MobileEnrollBar({ courseSlug }: { courseSlug: string }) {
  const { t } = useTranslation();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold text-brand">{course.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">DA</span>
        </div>
      </div>
      <RegisterDialog
        trigger={
          <button className="h-12 px-8 bg-brand hover:bg-brand/90 text-white font-medium text-sm rounded-xl transition-colors active:scale-[0.98] shrink-0">
            {t("courseDetail.enroll")}
          </button>
        }
      />
    </div>
  );
}

function InstructorSection({ instructor }: { instructor: Course["instructor"] }) {
  const { t } = useTranslation();
  if (!instructor.name) return null;
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-8 border border-border">
      <h3 className="text-base font-semibold text-ink">{t("courseDetail.instructor")}</h3>

      <div className="mt-5 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand/20 via-purple-100 to-blue-100 flex items-center justify-center overflow-hidden border-2 border-brand/20">
          {instructor.avatar ? (
            <img src={instructor.avatar} alt={instructor.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-brand" />
          )}
        </div>
        <h4 className="mt-4 font-semibold text-ink text-base">{instructor.name}</h4>
        <p className="text-xs text-muted-foreground">{instructor.title}</p>
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{instructor.bio}</p>

      <div className="mt-4 space-y-3 text-sm text-muted-foreground pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Users className="w-4 h-4 text-brand shrink-0" />
          <span>{instructor.students}</span>
        </div>
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-4 h-4 text-brand shrink-0" />
          <span>{instructor.experience}</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed italic border-t border-border pt-4">
        &ldquo;{instructor.philosophy}&rdquo;
      </p>
    </div>
  );
}

function Divider() {
  return <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />;
}

function useInView(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
