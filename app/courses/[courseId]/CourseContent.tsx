"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

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

        // Trigger MathJax typeset if it's already loaded
        if (typeof (window as any).MathJax !== "undefined" && (window as any).MathJax.typesetPromise) {
            (window as any).MathJax.typesetPromise();
        }
    }, [content]);

    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
                strategy="afterInteractive"
                onLoad={() => {
                    if ((window as any).MathJax && (window as any).MathJax.typesetPromise) {
                        (window as any).MathJax.typesetPromise();
                    }
                }}
            />
            <Script id="mathjax-config" strategy="beforeInteractive">
                {`
          window.MathJax = {
            tex: {
              inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
              displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
              processEscapes: true
            },
            options: {
              ignoreHtmlClass: 'tex2jax_ignore',
              processHtmlClass: 'tex2jax_process'
            }
          };
        `}
            </Script>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <div
                ref={contentRef}
                className="course-content-render"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </>
    );
}
