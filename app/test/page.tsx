"use client";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdWorkOutline } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

const timelineData = [
  {
    date: "2011 - present",
    title: "Creative Director",
    subtitle: "Miami, FL",
    description:
      "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
  },
  {
    date: "2010 - 2011",
    title: "Art Director",
    subtitle: "San Francisco, CA",
    description:
      "Creative Direction, User Experience, Visual Design, SEO, Online Marketing",
  },
  {
    date: "2008 - 2010",
    title: "Web Designer",
    subtitle: "Los Angeles, CA",
    description: "User Experience, Visual Design",
  },
  {
    date: "2006 - 2008",
    title: "Web Designer",
    subtitle: "San Francisco, CA",
    description: "User Experience, Visual Design",
  },
  {
    date: "2003 - 2006",
    title: "Web Designer",
    subtitle: "San Francisco, CA",
    description: "User Experience, Visual Design",
  },
];

export default function HomePage() {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  // const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);

  // Xử lý cuộn và cập nhật activeIndex
  useEffect(() => {
    const handleScroll = () => {
      // let newSectionIndex: number | null = null;
      let newTimelineIndex: number | null = null;

      // 📌 Kiểm tra section nào đang nằm trong viewport
      // sectionsRef.current.forEach((el, index) => {
      //   if (el) {
      //     const rect = el.getBoundingClientRect();
      //     const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      //     if (isFullyVisible) {
      //       newSectionIndex = index;
      //     }
      //   }
      // });
      // 📌 Nếu đang ở Timeline Section (section thứ 2)
      // if (newSectionIndex === 1) {
      elementsRef.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const isInView = rect.top >= 150 && rect.bottom <= window.innerHeight - 150;

          if (isInView) {
            newTimelineIndex = index;
          }
        }
      });
      // }
      // console.log(newSectionIndex, newTimelineIndex);

      // Cập nhật state nếu giá trị thay đổi để tránh render dư thừa
      // if (newSectionIndex !== activeSectionIndex) {
      //   setActiveSectionIndex(newSectionIndex);
      // }
      // if (newTimelineIndex !== activeIndex) {
      setActiveIndex(newTimelineIndex);
      // }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]); // Chỉ re-run nếu state thay đổi


  // Xử lý khi click vào item trên thanh điều hướng
  const handleNavClick = (index: number) => {
    elementsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Home Section */}
      <section className="flex flex-col items-center min-h-[100vh] justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing <Code color="primary">app/page.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>

      {/* Thanh điều hướng Timeline */}
      <div className="fixed top-1/2 left-5 transform -translate-y-1/2 flex flex-col gap-3">
        {timelineData.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-blue-500 scale-125" : "bg-gray-400"
              }`}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </div>

      {/* Timeline Section */}
      <section className="min-h-[100vh] min-w-full flex items-center justify-center py-96 md:py-96">
        <VerticalTimeline>
          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (elementsRef.current[index] = el)}
              className="timeline-element min-h-[50vh]"
            >
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={item.date}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<MdWorkOutline />}
                position={index % 2 === 0 ? "left" : "right"}
                contentStyle={
                  activeIndex === index
                    ? { background: "rgb(233, 30, 99)", color: "#fff" }
                    : {
                      background: "transparent",
                      color: "#fff",
                    }
                }
                contentArrowStyle={
                  activeIndex === index
                    ? { borderRight: "7px solid rgb(233, 30, 99)" }
                    : { borderRight: "7px solid transparent" }
                }
              >
                <h3 className="vertical-timeline-element-title">{item.title}</h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {item.subtitle}
                </h4>
                <p>{item.description}</p>
              </VerticalTimelineElement>
            </div>
          ))}
        </VerticalTimeline>
      </section>

      {/* About Section */}
      <section className="flex flex-col items-center min-h-[100vh] justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>About</span>
          <div className={subtitle({ class: "mt-4" })}>
            A beautiful React UI library for your next project.
          </div>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing <Code color="primary">app/page.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </div>
  );
}
