import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { COURSES } from "./courses";

export default function Home() {
  return (
    <div className="min-h-screen rtl font-assistant">
      <div className="floating-blob blob-1"></div>
      <div className="floating-blob blob-2"></div>

      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent underline decoration-indigo-500/30">
          CourseHub
        </div>
        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-semibold">
                התחברות
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      <header>
        <h1>מאגר הקורסים</h1>
        <p className="subtitle">ברוך הבא למרכז הלמידה האישי שלך. כל החומרים, התרגולים והפתרונות במקום אחד מעוצב ונוח.</p>
      </header>

      <main>
        <div className="course-grid">
          {COURSES.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="course-card">
              <div>
                <div className="course-icon">{course.icon}</div>
                <div className="course-name">{course.name}</div>
                <div className="course-desc">{course.desc}</div>
              </div>
              <div className="card-footer">כניסה לקורס ←</div>
            </Link>
          ))}
        </div>
      </main>

      <footer>
        <p>© 2026 מרכז הקורסים האקדמי - כל הזכויות שמורות</p>
      </footer>
    </div>
  );
}
