import { memo, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/lib/courses";
import { RegisterDialog } from "./RegisterDialog";

export const CourseCard = memo(function CourseCard({ course }: { course: Course }) {
  const { t } = useTranslation();
  const tc = useCallback((key: string, fallback: string) => {
    const val = t(`course.${course.slug}.${key}`, { defaultValue: fallback });
    return val || fallback;
  }, [t, course.slug]);
  return (
    <article className="bg-card border border-border p-5 sm:p-6 md:p-8 rounded-3xl transition-all duration-500 hover:border-brand/40 animate-fade-up overflow-hidden">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          <span aria-label="home">⌂</span>
        </Link>
        <span>›</span>
        <span>{tc("category", course.category)}</span>
        <span>›</span>
        <span className="text-brand font-medium">{tc("title", course.title)}</span>
      </nav>

      {/* Media */}
      <Link
        to="/courses/$slug"
        params={{ slug: course.slug }}
        className="mt-4 sm:mt-5 block rounded-2xl overflow-hidden border border-border group"
      >
        <img
          src={course.image}
          alt={tc("title", course.title)}
          className="w-full aspect-[16/10] object-cover lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-[1.02] transition duration-700 rounded-2xl"
          loading="lazy"
        />
      </Link>

      {/* Title under image */}
      <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl md:text-[28px] font-semibold text-ink leading-tight tracking-tight">
        English Course
      </h3>

      {/* Description */}
      <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2">
        {tc("description", course.description)}
      </p>

      {/* Price + Actions */}
      {course.available && (
        <div className="mt-5 sm:mt-7 pt-5 sm:pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {t("courseDetail.price")}
            </p>
            <p className="mt-1 text-lg sm:text-xl font-semibold text-ink">
              4,500{" "}
              <span className="text-xs sm:text-sm font-normal text-muted-foreground">DA</span>
            </p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <Link
              to="/courses/$slug"
              params={{ slug: course.slug }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-3 sm:py-2.5 text-sm font-medium border border-border text-foreground hover:border-foreground transition-colors rounded-xl whitespace-nowrap"
            >
              {t("courseDetail.viewDetails")}
            </Link>
            <RegisterDialog
              trigger={
                <button
                  type="button"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-3 sm:py-2.5 text-sm font-medium bg-brand text-primary-foreground hover:bg-foreground transition-colors rounded-xl whitespace-nowrap"
                >
                  {t("courseDetail.enroll")} <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </button>
              }
            />
          </div>
        </div>
      )}
    </article>
  );
});
