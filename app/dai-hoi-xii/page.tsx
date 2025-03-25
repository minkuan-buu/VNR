"use client";
import { useEffect, useRef, useState, useCallback, LegacyRef } from "react";


const sections = [
  {
    date: "20 - 28/1/2016",
    title: "Đại hội XII",
    subtitle: "Diễn ra tại Hà Nội",
    image: "https://daihoi13.dangcongsan.vn/Uploads/Images/2020/10/2/29/toan-canh-dai-hoi.jpg",
  },
  {
    title: "Bối cảnh & Nội Dung",
    description:
      "Bối Cảnh:<br/>- Tình hình thế giới biến động nhanh chóng với cuộc Cách mạng công nghiệp lần thứ tư. <br/>- Đánh dấu 30 năm Đổi mới, 5 năm thực hiện Cương lĩnh xây dựng đất nước và Chiến lược phát triển kinh tế - xã hội 2011 - 2020. <br/>- Việt Nam đạt nhiều thành tựu nhưng vẫn đối diện với thách thức về kinh tế, xã hội và quốc phòng. <br/> Nội dung chính: <br/>- Kiểm điểm thành quả, rút ra bài học sau 30 năm Đổi mới. <br/>- Xác định tiếp tục đổi mới mô hình tăng trưởng, cơ cấu lại nền kinh tế. <br/>- Bầu Ban Chấp hành Trung ương gồm 180 ủy viên chính thức, 20 ủy viên dự khuyết. <br/>- Đồng chí Nguyễn Phú Trọng tiếp tục được bầu làm Tổng Bí thư​.",
  },
  {
    title: "Mục tiêu và nhiệm vụ ",
    description:
      "Mục Tiêu:<br/>- Tăng cường xây dựng Đảng trong sạch, vững mạnh, nâng cao năng lực lãnh đạo và sức chiến đấu của Đảng, xây dựng hệ thống chính trị vững mạnh. <br/>- Phát huy sức mạnh toàn dân tộc và dân chủ xã hội chủ nghĩa. Đẩy mạnh toàn diện, đồng bộ công cuộc đổi mới; phát triển kinh tế nhanh, bền vững, phấn đấu sớm đưa nước ta cơ bản trở thành nước công nghiệp theo hướng hiện đại. <br/>- Nâng cao đời sống vật chất và tinh thần của Nhân dân. Kiên quyết, kiên trì đấu tranh bảo vệ vững chắc độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ của Tổ quốc, bảo vệ Đảng, Nhà nước, Nhân dân và chế độ xã hội chủ nghĩa. <br/>- Giữ gìn hoà bình, ổn định, chủ động và tích cực hội nhập quốc tế để phát triển đất nước; nâng cao vị thế và uy tín của Việt Nam trong khu vực và trên thế giới.",
  },
  {
    title: "Mục tiêu và nhiệm vụ ",
    description:
      "Nhiệm Vụ: <br/>-Xây dựng, chỉnh đốn Đảng: Kiên quyết ngăn chặn suy thoái tư tưởng, đạo đức, lối sống và các biểu hiện “tự diễn biến”, “tự chuyển hóa”. Tập trung xây dựng đội ngũ cán bộ, nhất là cán bộ cấp chiến lược, có phẩm chất và năng lực. <br/>- Cải cách bộ máy và phòng chống tham nhũng: Tinh gọn bộ máy hệ thống chính trị, nâng cao hiệu lực, hiệu quả hoạt động; đấu tranh chống tham nhũng, lãng phí và quan liêu. <br/>- Phát triển kinh tế và công nghiệp hóa: Nâng cao chất lượng tăng trưởng, năng suất lao động và sức cạnh tranh; thực hiện ba đột phá chiến lược; đổi mới mô hình tăng trưởng; công nghiệp hóa, hiện đại hóa, đặc biệt trong nông nghiệp và nông thôn. Cải cách doanh nghiệp nhà nước, ngân sách và xử lý nợ công. <br/>-Giữ vững độc lập, chủ quyền: Kiên trì bảo vệ toàn vẹn lãnh thổ, giữ vững an ninh, trật tự xã hội; mở rộng quan hệ đối ngoại, nâng cao vị thế quốc tế của đất nước. <br/>- Phát huy nguồn lực nhân dân: Chăm lo đời sống nhân dân, đảm bảo an sinh xã hội, tăng cường phúc lợi và giảm nghèo bền vững; phát huy quyền làm chủ và sức mạnh đại đoàn kết toàn dân tộc. <br/>- Phát triển con người và văn hóa: Đề cao nhân tố con người trong phát triển xã hội; chú trọng đạo đức, nhân cách, lối sống, trí tuệ; xây dựng môi trường văn hóa lành mạnh.",
  },
  {
    title: "Thực hiện đường lối Đại hội XII các nghị quyết",
    description:
      "09 - 14/10/2016: Hội nghị lần thứ tư BCHTW quyết định ban hành 3 Nghị quyết <br/>- Nghị quyết về tăng cường xây dựng, chỉnh đốn Đảng; ngăn chặn đẩy lùi sự suy thoái về tư tưởng chính trị, đạo đức, lối sống, những biểu hiện tự diễn biến, tự chuyển hóa trong nội bộ <br/>- Nghị quyết về một số chủ trương, chính sách lớn nhằm tiếp tục đổi mới mô hình tăng trưởng, nâng cao chất lượng tăng trưởng, năng suất lao động và sức cạnh tranh của nền kinh tế <br/>- Nghị quyết về thực hiện hiệu quả tiến trình hội nhập kinh tế quốc tế, giữ vững ổn định chính trị - Xã hội trong bối cảnh nước ta tham gia các hiệp định thương mại tự do thế hệ mới. <br/>05 - 10/5/2017: Hội nghị lần thứ năm BCHTW quyết định ban hành 3 Nghị quyết <br/>- Nghị quyết về phát triển kinh tế tư nhân trở thành một động lực quan trọng của nền kinh tế thị trường định hướng xã hội chủ nghĩa <br/>- Nghị quyết về hoàn thiện thể chế kinh tế thị trường định hướng xã hội chủ nghĩa <br/>- Nghị quyết về tiếp tục cơ cấu lại, đổi mới và nâng cao hiệu quả doanh nghiệp nhà nước.",
  },
  {
    title: "Thực hiện đường lối Đại hội XII các nghị quyết",
    description:
      "<br/> 04/10 - 11/10/2017, Hội nghị lần thứ sáu đã quyết nghị ban hành 4 Nghị quyết <br/>- Nghị quyết một số vấn đề về tiếp tục đổi mới, sắp xếp tổ chức bộ máy của hệ thống chính trị tinh gọn, hoạt động hiệu lực, hiệu quả <br/>- Nghị quyết về tiếp tục đổi mới hệ thống tổ chức và quản lý, nâng cao chất lượng và hiệu quả hoạt động của các đơn vị sự nghiệp công lập. <br/>- Nghị quyết về tăng cường công tác bảo vệ, chăm sóc và nâng cao sức khoẻ nhân dân trong tình hình mới. <br/> 07/5 - 12/5/2018, Hội nghị lần thứ bảy BCHTW đã quyết nghị ban hành 3 nghị quyết <br/>- Nghị quyết về tập trung xây dựng đội ngũ cán bộ các cấp, nhất là cấp chiến lược đủ phẩm chất, năng lực và uy tín, ngang tầm nhiệm vụ. <br/>- Nghị quyết về cải cách chính sách tiền lương đối với cán bộ, công chức, viên chức, lực lượng vũ trang và người lao động trong doanh nghiệp. <br/>- Nghị quyết về cải cách chính sách bảo hiểm xã hội",
  },
  {
    title: "Ý nghĩa và tác động",
    description:
      "- Đại hội XII đánh dấu bước chuyển đổi mạnh mẽ trong tư duy phát triển kinh tế và hội nhập quốc tế.<br/>- Tiếp tục khẳng định quyết tâm đổi mới toàn diện, đồng bộ, hướng đến mục tiêu nước công nghiệp theo hướng hiện đại. <br/>Nhấn mạnh việc nâng cao chất lượng tăng trưởng, cải cách thể chế, phát triển nguồn nhân lực và đổi mới sáng tạo. <br/>- Tạo nền tảng để tiếp tục triển khai các chính sách quan trọng tại Đại hội XIII.",
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
              (sectionRefs.current[index] as unknown as HTMLElement)?.scrollIntoView({
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
          id={index.toString()}
          className="h-screen flex flex-col items-center justify-center text-white text-center px-10 "
          style={{
            backgroundImage: section.image ? `url(${section.image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-4xl font-bold font-cus_title bg-black bg-opacity-50 p-2 rounded-lg">{section.title}</h1>
          <h2 className="text-xl text-gray-300 mt-2 bg-black bg-opacity-50 p-2 rounded-lg">{section.subtitle}</h2>
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