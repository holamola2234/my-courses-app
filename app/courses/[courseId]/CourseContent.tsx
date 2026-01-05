"use client";

import { useEffect, useRef } from "react";
import Latex from "react-latex-next";

interface CourseContentProps {
    content: string;
    styles: string;
}

export default function CourseContent({ content, styles }: CourseContentProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fix links to landing page
        if (contentRef.current) {
            const links = contentRef.current.querySelectorAll('a[href*="index.html"]');
            links.forEach((link) => {
                const href = link.getAttribute("href");
                if (href && (href.endsWith("index.html") || href.includes("../index.html"))) {
                    link.setAttribute("href", "/");
                }
            });
        }
    }, [content]);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <div ref={contentRef} className="course-content-render">
                <Latex strict={false}>{content}</Latex>
            </div>
        </>
    );
}
