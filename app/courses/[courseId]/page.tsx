import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import CourseContent from "./CourseContent";
import { getCourseById } from "../../courses";

export default async function CoursePage({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;
    const course = getCourseById(courseId);

    if (!course) {
        notFound();
    }

    // Check authentication
    const { userId } = await auth();
    if (!userId) {
        return <div>אנא התחבר כדי לצפות בתוכן</div>;
    }

    const filePath = path.join(
        process.cwd(),
        "content",
        course.folder,
        "index.html"
    );

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    let htmlContent = fs.readFileSync(filePath, "utf-8");

    // Extract internal styles
    const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    const styles = styleMatch ? styleMatch.join("\n").replace(/<\/?style[^>]*>/gi, "") : "";

    // Extract body content
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let content = bodyMatch ? bodyMatch[1] : htmlContent;

    return (
        <div className="course-container">
            <header className="p-4 border-b border-white/10">
                <h1 className="text-xl font-bold">{course.name}</h1>
            </header>
            <CourseContent content={content} styles={styles} />
        </div>
    );
}
