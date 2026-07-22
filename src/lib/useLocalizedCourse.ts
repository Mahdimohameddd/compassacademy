import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getCourse, type Course, type Review, type Instructor } from "./courses";

function tc(t: (k: string, opts?: object) => string, prefix: string, key: string, fallback: string) {
  const val = t(`${prefix}.${key}`, { defaultValue: undefined });
  if (val && val !== `${prefix}.${key}`) return val;
  return fallback;
}

export function useLocalizedCourse(slug: string): Course | undefined {
  const { t } = useTranslation();
  const course = getCourse(slug);
  if (!course) return undefined;

  return useMemo(() => {
    const prefix = `course.${slug}`;
    const str = (key: string, fallback: string) => tc(t, prefix, key, fallback);

    const arr = (key: string, fallback: string[]) => {
      const val = t(`${prefix}.${key}`, { returnObjects: true }) as string[] | undefined;
      return Array.isArray(val) && val.length ? val : fallback;
    };

    const objs = <T>(key: string, fallback: T[]): T[] => {
      const val = t(`${prefix}.${key}`, { returnObjects: true }) as T[] | undefined;
      return Array.isArray(val) && val.length ? val : fallback;
    };

    const obj = <T>(key: string, fallback: T): T => {
      const val = t(`${prefix}.${key}`, { returnObjects: true }) as T | undefined;
      if (val && typeof val === "object") return val;
      return fallback;
    };

    return {
      ...course,
      title: str("title", course.title),
      category: str("category", course.category),
      tagline: str("tagline", course.tagline),
      description: str("description", course.description),
      longDescription: str("longDescription", course.longDescription),
      duration: str("duration", course.duration),
      totalDuration: str("totalDuration", course.totalDuration),
      levels: str("levels", course.levels),
      format: str("format", course.format),
      location: str("location", course.location),
      cohortSize: str("cohortSize", course.cohortSize),
      highlights: arr("highlights", course.highlights),
      learningSupport: arr("learningSupport", course.learningSupport),
      requirements: arr("requirements", course.requirements),
      features: arr("features", course.features),
      deliverables: objs("deliverables", course.deliverables),
      weeklyBreakdown: objs("weeklyBreakdown", course.weeklyBreakdown),
      curriculum: objs("curriculum", course.curriculum),
      sections: objs("sections", course.sections),
      reviews: objs<Review>("reviews", course.reviews),
      instructor: obj<Instructor>("instructor", course.instructor),
      faq: objs("faq", course.faq),
    };
  }, [slug, t]);
}
