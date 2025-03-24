"use client";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdWorkOutline } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { info } from "console";

const timelineData = [
  {
    date: "2011 - present",
    title: "Đại hội IX",
    subtitle: "Miami, FL",
    description:
      "Creative Direction, User Experience, Visual Design, Project Management, Team Leading",
  },
  {
    date: "12 - 19/1/2011",
    title: "Đại hội X",
    subtitle: "Diễn ra tại Hà Nội",
    description:
      "Bối Cảnh:<br/>• Kỷ niệm 1.000 năm Thăng Long - Hà Nội. <br/>• Tình hình thế giới có nhiều biến động: khủng hoảng tài chính toàn cầu, xung đột vũ trang, biến đổi khí hậu. <br/>• Việt Nam đạt nhiều thành tựu, nhưng vẫn còn nhiều khó khăn. <br/> Nội dung chính: <br/>• Đại hội thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội (bổ sung, phát triển năm 2011). <br/>• Xác định chiến lược phát triển kinh tế - xã hội giai đoạn 2011 - 2020. <br/>• Bầu ra Ban Chấp hành Trung ương với 175 ủy viên chính thức, 25 ủy viên dự khuyết. <br/>• Đồng chí Nguyễn Phú Trọng được bầu làm Tổng Bí thư​.",
  },
  {
    date: " 20 - 28/1/2016",
    title: "Đại hội XI",
    subtitle: "Diễn ra tại Hà Nội",
    description:
      "Bối Cảnh:<br/>• Kỷ niệm 1.000 năm Thăng Long - Hà Nội. <br/>• Tình hình thế giới có nhiều biến động: khủng hoảng tài chính toàn cầu, xung đột vũ trang, biến đổi khí hậu. <br/>• Việt Nam đạt nhiều thành tựu, nhưng vẫn còn nhiều khó khăn. <br/> Nội dung chính: <br/>• Đại hội thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội (bổ sung, phát triển năm 2011). <br/>• Xác định chiến lược phát triển kinh tế - xã hội giai đoạn 2011 - 2020. <br/>• Bầu ra Ban Chấp hành Trung ương với 175 ủy viên chính thức, 25 ủy viên dự khuyết. <br/>• Đồng chí Nguyễn Phú Trọng được bầu làm Tổng Bí thư​.",
  },
  {
    date: "2006 - 2008",
    title: "Đại hội XII",
    subtitle: "Diễn ra tại Hà Nội",
    description:
    "Bối Cảnh:<br/>• Tình hình thế giới biến động nhanh chóng với cuộc Cách mạng công nghiệp lần thứ tư. <br/>• Đánh dấu 30 năm Đổi mới, 5 năm thực hiện Cương lĩnh xây dựng đất nước và Chiến lược phát triển kinh tế - xã hội 2011 - 2020. <br/>• Việt Nam đạt nhiều thành tựu nhưng vẫn đối diện với thách thức về kinh tế, xã hội và quốc phòng. <br/> Nội dung chính: <br/>• Kiểm điểm thành quả, rút ra bài học sau 30 năm Đổi mới. <br/>• Xác định tiếp tục đổi mới mô hình tăng trưởng, cơ cấu lại nền kinh tế. <br/>• Bầu Ban Chấp hành Trung ương gồm 180 ủy viên chính thức, 20 ủy viên dự khuyết. <br/>• Đồng chí Nguyễn Phú Trọng được bầu làm Tổng Bí thư​.",
},
{
  date: "2006 - 2008",
  title: "Đại hội XIII",
  subtitle: "Diễn ra tại Hà Nội",
  description:
  "Bối Cảnh:<br/>• Tình hình thế giới biến động nhanh chóng với cuộc Cách mạng công nghiệp lần thứ tư. <br/>• Đánh dấu 30 năm Đổi mới, 5 năm thực hiện Cương lĩnh xây dựng đất nước và Chiến lược phát triển kinh tế - xã hội 2011 - 2020. <br/>• Việt Nam đạt nhiều thành tựu nhưng vẫn đối diện với thách thức về kinh tế, xã hội và quốc phòng. <br/> Nội dung chính: <br/>• Kiểm điểm thành quả, rút ra bài học sau 30 năm Đổi mới. <br/>• Xác định tiếp tục đổi mới mô hình tăng trưởng, cơ cấu lại nền kinh tế. <br/>• Bầu Ban Chấp hành Trung ương gồm 180 ủy viên chính thức, 20 ủy viên dự khuyết. <br/>• Đồng chí Nguyễn Phú Trọng được bầu làm Tổng Bí thư​.",
},
];

export default function HomePage() {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let newTimelineIndex: number | null = null;

      elementsRef.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const isInView = rect.top >= 150 && rect.bottom <= window.innerHeight - 150;

          if (isInView) {
            newTimelineIndex = index;
          }
        }
      });
      setActiveIndex(newTimelineIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const handleNavClick = (index: number) => {
    elementsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col items-center">
      <section
        className="relative w-full h-screen flex flex-col items-center justify-center text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cellphones.com.vn/sforum/wp-content/uploads/2024/03/hinh-nen-powerpoint-ve-dang-cong-san-viet-nam-2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center max-w-2xl px-4">
          <span className={title({ color: "violet" })}>Đảng&nbsp;</span>
          <span className={title()}>lãnh đạo&nbsp;</span>
          <br />
          <span className={title()}>
            cả nước quá độ lên chủ nghĩa xã hội và tiến hành công cuộc đổi mới.
          </span>
          <div className={subtitle({ class: "mt-4" })}>(1975 - 2018)</div>
        </div>
      </section>

      <div className="fixed top-1/2 left-5 transform -translate-y-1/2 flex flex-col gap-3">
        {timelineData.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-blue-500 scale-125" : "bg-gray-400"}`}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </div>

      <section className="min-h-[100vh] min-w-full flex items-center justify-center py-96 md:py-96">
        <VerticalTimeline>
          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (elementsRef.current[index] = el)}
              className="timeline-element min-h-[50vh]"
            >
              <VerticalTimelineElement
                className="vertical-timeline-element--work text-2xl"
                date={item.date}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<MdWorkOutline />}
                position={index % 2 === 0 ? "left" : "right"}
                contentStyle={
                  activeIndex === index
                    ? { background: "rgb(233, 30, 99)", color: "#fff" }
                    : { background: "transparent", color: "#fff" }
                }
                contentArrowStyle={
                  activeIndex === index
                    ? { borderRight: "7px solid rgb(233, 30, 99)" }
                    : { borderRight: "7px solid transparent" }
                }
              >
                <h3 className="vertical-timeline-element-title">{item.title}</h3>
                <h4 className="vertical-timeline-element-subtitle">{item.subtitle}</h4>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }}></p>
              </VerticalTimelineElement>
            </div>
          ))}
        </VerticalTimeline>
      </section>
    </div>
  );
}