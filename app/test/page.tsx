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
    description: "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
  },
  {
    date: "2010 - 2011",
    title: "Art Director",
    subtitle: "San Francisco, CA",
    description: "Creative Direction, User Experience, Visual Design, SEO, Online Marketing",
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
];

export default function HomePage() {
  const elementsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      elementsRef.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const isInView = rect.top >= 100 && rect.bottom <= window.innerHeight - 100;
          if (isInView) {
            setActiveIndex(index);
          }
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Home Section */}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
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

      {/* Timeline Section */}
      <VerticalTimeline>
        {timelineData.map((item, index) => (
          <div key={index} ref={(el) => (elementsRef.current[index] = el)}>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date={item.date}
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<MdWorkOutline />}
              contentStyle={
                activeIndex === index
                  ? { background: "rgb(233, 30, 99)", color: "#fff" }
                  : { background: "transparent", color: "#000" }
              }
              contentArrowStyle={
                activeIndex === index
                  ? { borderRight: "7px solid rgb(233, 30, 99)" }
                  : { borderRight: "7px solid transparent" }
              }
            >
              <h3 className="vertical-timeline-element-title">{item.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{item.subtitle}</h4>
              <p>{item.description}</p>
            </VerticalTimelineElement>
          </div>
        ))}
      </VerticalTimeline>
    </div>
  );
}
