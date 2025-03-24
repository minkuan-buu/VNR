"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const sections = ["home", "about", "contact"];

export default function HomePage() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState<string>("home");
  const isScrolling = useRef(false);

  // 📌 Xử lý cuộn mượt mà
  const handleScroll = useCallback((event: WheelEvent) => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    requestAnimationFrame(() => {
      isScrolling.current = false;
    });

    const currentIndex = sections.indexOf(activeSection);
    const direction = event.deltaY > 0 ? 1 : -1;
    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < sections.length) {
      const nextSection = sectionRefs.current[nextIndex];

      if (nextSection) {
        setActiveSection(sections[nextIndex]);
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [activeSection]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative flex flex-col">
      {/* Dấu chấm điều hướng */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
        {sections.map((section, index) => (
          <button
            key={section}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === section ? "bg-blue-500 scale-125" : "bg-gray-400"
              }`}
            onClick={() => {
              setActiveSection(section);
              sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        ))}
      </div>

      {/* Các section */}
      {sections.map((section, index) => (
        <section
          key={section}
          ref={(el) => (sectionRefs.current[index] = el)}
          id={section}
          className={`h-screen flex items-center justify-center bg-black`}
        >
          <h1 className="text-4xl font-bold capitalize">{section} Section</h1>
        </section>
      ))}
    </div>
  );
}
