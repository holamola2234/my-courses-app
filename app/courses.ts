export interface Course {
    id: string;
    name: string;
    icon: string;
    desc: string;
    folder: string;
}

export const COURSES: Course[] = [
    {
        id: "probability",
        name: "הסתברות",
        icon: "Σ",
        desc: "לימוד יסודות ההסתברות, משתנים מקריים, התפלגויות וסטטיסטיקה.",
        folder: "probability"
    },
    {
        id: "harmonic",
        name: "אנליזה הרמונית",
        icon: "∫",
        desc: "טורי פורייה, התמרות פורייה ויישומים במתמטיקה ופיזיקה.",
        folder: "harmonic-analysis"
    },
    {
        id: "complex",
        name: "פונקציות מרוכבות",
        icon: "i",
        desc: "חקירת פונקציות במשתנה מרוכב, משפטי שאריות ומיפויים קונפורמיים.",
        folder: "complex-functions"
    },
    {
        id: "fluid",
        name: "תורת הזרימה 1",
        icon: "≋",
        desc: "מכניקת זורמים, משוואות נאוויה-סטוקס, זרימה למינרית וטורבולנטית.",
        folder: "flow-theory-1"
    },
    {
        id: "thermodynamics",
        name: "תרמודינמיקה 1",
        icon: "ΔQ",
        desc: "חוקי התרמודינמיקה, מחזורי כוח, אנטרופיה ואנתלפיה.",
        folder: "thermodynamics-1"
    }
];

export const getCourseById = (id: string) => COURSES.find(c => c.id === id);
