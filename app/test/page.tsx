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
    date: "19 - 22/4/2001",
    title: "Đại hội IX",
    subtitle: "Diễn ra tại Hà Nội",
    description:
      "Bối Cảnh:<br/>• Việt Nam bước vào thế kỷ XXI với nền kinh tế thị trường định hướng XHCN và hội nhập quốc tế ngày càng sâu rộng. <br/>• Tình hình thế giới biến động mạnh, toàn cầu hóa diễn ra nhanh chóng. <br/> Nội dung chính: <br/>• Thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên CNXH. <br/>• Xác định chiến lược phát triển kinh tế - xã hội 2001 - 2010. <br/>• Đề ra mục tiêu: Đến năm 2010, Việt Nam ra khỏi tình trạng nước nghèo và phát triển theo hướng công nghiệp hóa, hiện đại hóa <br/>• Bầu Ban Chấp hành Trung ương gồm 150 ủy viên chính thức, 21 ủy viên dự khuyết. <br/>• Đồng chí Nông Đức Mạnh được bầu làm Tổng Bí thư.",
  },
  {
    date: "18 - 25/4/2006",
    title: "Đại hội X",
    subtitle: "Diễn ra tại Hà Nội",
    description:
      "Bối Cảnh:<br/>• Việt Nam gia nhập Tổ chức Thương mại Thế giới (WTO), đánh dấu bước hội nhập kinh tế toàn cầu. <br/>• 20 năm thực hiện Đổi mới đã đạt được nhiều thành tựu quan trọng, nhưng còn nhiều thách thức về chênh lệch giàu nghèo, tham nhũng, cải cách hành chính. <br/> Nội dung chính: <br/>• Khẳng định tiếp tục phát triển kinh tế thị trường định hướng XHCN. <br/>• Xây dựng nền kinh tế độc lập, tự chủ, đồng thời chủ động hội nhập kinh tế quốc tế. <br/>• Đẩy mạnh công tác xây dựng Đảng, chống tham nhũng, nâng cao năng lực lãnh đạo. <br/>• Bầu Ban Chấp hành Trung ương gồm 160 ủy viên chính thức, 21 ủy viên dự khuyết. <br/>• Đồng chí Nông Đức Mạnh tiếp tục được bầu làm Tổng Bí thư.",
  },
  {
    date: "12 - 19/1/2011",
    title: "Đại hội XI",
    subtitle: "Diễn ra tại Hà Nội",
    description:
      "Bối Cảnh:<br/>• Kỷ niệm 1.000 năm Thăng Long - Hà Nội. <br/>• Tình hình thế giới có nhiều biến động: khủng hoảng tài chính toàn cầu, xung đột vũ trang, biến đổi khí hậu. <br/>• Việt Nam đạt nhiều thành tựu, nhưng vẫn còn nhiều khó khăn. <br/> Nội dung chính: <br/>• Đại hội thông qua Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội (bổ sung, phát triển năm 2011). <br/>• Xác định chiến lược phát triển kinh tế - xã hội giai đoạn 2011 - 2020. <br/>• Bầu ra Ban Chấp hành Trung ương với 175 ủy viên chính thức, 25 ủy viên dự khuyết. <br/>• Đồng chí Nguyễn Phú Trọng được bầu làm Tổng Bí thư​.",
  },
  {
    date: "20 - 28/1/2016",
    title: "Đại hội XII",
    subtitle: "Diễn ra tại Hà Nội",
    description:
      "Bối Cảnh:<br/>• Tình hình thế giới biến động nhanh chóng với cuộc Cách mạng công nghiệp lần thứ tư. <br/>• Đánh dấu 30 năm Đổi mới, 5 năm thực hiện Cương lĩnh xây dựng đất nước và Chiến lược phát triển kinh tế - xã hội 2011 - 2020. <br/>• Việt Nam đạt nhiều thành tựu nhưng vẫn đối diện với thách thức về kinh tế, xã hội và quốc phòng. <br/> Nội dung chính: <br/>• Kiểm điểm thành quả, rút ra bài học sau 30 năm Đổi mới. <br/>• Xác định tiếp tục đổi mới mô hình tăng trưởng, cơ cấu lại nền kinh tế. <br/>• Bầu Ban Chấp hành Trung ương gồm 180 ủy viên chính thức, 20 ủy viên dự khuyết. <br/>• Đồng chí Nguyễn Phú Trọng tiếp tục được bầu làm Tổng Bí thư​.",
  },
  {
    date: "25/1 - 1/2/2021",
    title: "Đại hội XIII",
    subtitle: "Diễn ra tại Hà Nội",
    description:
      "Bối Cảnh:<br/>• Việt Nam đứng trước nhiều cơ hội và thách thức như biến đổi khí hậu, đại dịch COVID-19. <br/>• Thành tựu nổi bật sau 35 năm Đổi mới, tạo nền tảng cho giai đoạn phát triển mới. <br/> Nội dung chính: <br/>• Chủ đề Đại hội: Xây dựng Đảng và hệ thống chính trị trong sạch, vững mạnh; phát huy khát vọng phát triển đất nước; đẩy mạnh đổi mới toàn diện. <br/>• Định hướng mục tiêu đến giữa thế kỷ XXI đưa Việt Nam trở thành nước phát triển theo định hướng XHCN. <br/>• Bầu Ban Chấp hành Trung ương khóa XIII gồm 200 đồng chí (180 ủy viên chính thức, 20 ủy viên dự khuyết). <br/>• Đồng chí Nguyễn Phú Trọng tiếp tục được bầu làm Tổng Bí thư​.",
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
          const isInView = rect.top >= 30 && rect.bottom <= window.innerHeight - 100;

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

      {/* Section tiêu đề đại hội đảng */}
      <section className="w-full py-16 text-center bg-red-600 text-white">
        <h2 className="text-4xl font-bold uppercase tracking-widest">
          Các Đại Hội Đảng Từ 1986 - Nay
        </h2>
      </section>


      <section className="min-h-screen min-w-full flex items-center justify-center py-16 md:py-24">
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

      {/* Section thành tựu và kinh nghiệm của công cuộc Đổi mới  */}
      <section className="w-full py-16 text-center bg-red-600 text-white">
        <h2 className="text-4xl font-bold uppercase tracking-widest">
          Thành tựu và kinh nghiệm của công cuộc Đổi mới (1986 - 2018)
        </h2>
      </section>
    </div>
  );
}