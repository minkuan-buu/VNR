"use client";
import { useEffect, useRef, useState, useCallback } from "react";


const sections = [
  {
    date: "(1986 - 2018)",
    title: "Những kinh nghiệm rút ra từ công cuộc Đổi mới",
    image: "https://media.vov.vn/sites/default/files/styles/large/public/2021-01/Kien%20dinh%20.jpg",
  },
  {
    title: "Xây dựng, chỉnh đốn Đảng",
    description:
      "Triển khai quyết liệt, toàn diện về chính trị, tư tưởng, đạo đức, tổ chức và cán bộ, kiểm soát chặt chẽ quyền lực, phòng chống tham nhũng, suy thoái, xây dựng đội ngũ cán bộ chiến lược, đề cao trách nhiệm nêu gương.",
  },
  {
    title: "Lấy dân làm gốc",
    description:
      "Quán triệt quan điểm “dân là gốc”, đảm bảo dân chủ thực chất, nhân dân là trung tâm và chủ thể của đổi mới, hạnh phúc, ấm no của nhân dân là mục tiêu phấn đấu.",
  },
  {
    title: "Lãnh đạo, tổ chức thực hiện",
    description:
      "Hành động quyết liệt, sáng tạo, đề cao trách nhiệm người đứng đầu, kết hợp chặt chẽ lý luận và thực tiễn, tạo đột phá phát triển.",
  },
  {
    title: "Thể chế và mối quan hệ phát triển",
    description:
      "Xây dựng thể chế đồng bộ, cân bằng giữa đổi mới và ổn định, kinh tế và xã hội, hội nhập và độc lập, phát huy vai trò của giáo dục, khoa học, công nghệ.",
  },
  {
    title: "Quốc phòng, an ninh, đối ngoại",
    description:
      "Chủ động dự báo tình hình, không để bị động, bất ngờ, kiên quyết bảo vệ chủ quyền, giữ vững môi trường hòa bình, hội nhập quốc tế toàn diện, tận dụng thời cơ phát triển",
  },
];

export default function HomePage() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState<number>(0);
  const isScrolling = useRef(false);

  // 📌 Xác định section hiển thị khi load trang
  useEffect(() => {
    const checkActiveSection = () => {
      const validRefs = sectionRefs.current.filter(ref => ref !== null);
      const index = validRefs.findIndex(
        (ref) => (ref as HTMLElement).getBoundingClientRect().top >= 0
      );

      if (index !== -1) {
        setActiveSection(index);
      }
    };

    // Gọi hàm kiểm tra ngay khi trang load
    checkActiveSection();

    // Cập nhật lại khi resize
    window.addEventListener("resize", checkActiveSection);
    return () => window.removeEventListener("resize", checkActiveSection);
  }, []);

  // 📌 Xử lý cuộn mượt mà
  const handleScroll = useCallback((event: WheelEvent) => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    requestAnimationFrame(() => {
      isScrolling.current = false;
    });

    const validRefs = sectionRefs.current.filter(ref => ref !== null);
    const currentIndex = validRefs.findIndex(
      (ref) => (ref as HTMLElement).getBoundingClientRect().top >= 0
    );

    const direction = event.deltaY > 0 ? 1 : -1;
    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < sections.length) {
      setActiveSection(nextIndex);
      validRefs[nextIndex]?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative flex flex-col">
      {/* Dấu chấm điều hướng */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === index
              ? "bg-blue-500 scale-125"
              : "bg-gray-400"
              }`}
            onClick={() => {
              setActiveSection(index);
              sectionRefs.current[index]?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          />
        ))}
      </div>

      {/* Các section */}
      {sections.map((section, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          id={index.toFixed()}
          className="h-screen flex flex-col items-center justify-center text-white text-center px-10 "
          style={{
            backgroundImage: section.image ? `url(${section.image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-4xl font-bold font-cus_title bg-black bg-opacity-50 p-2 rounded-lg">{section.title}</h1>
          <p className="mt-4 text-lg font-light bg-black bg-opacity-50 p-2 rounded-lg">{section.date}</p>
          <div
            className="mt-6 text-lg text-gray-300 text-justify max-w-4xl font-cus_body bg-black bg-opacity-50 p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        </section>
      ))}
    </div>
  );
}