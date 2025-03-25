"use client";
import { useEffect, useRef, useState, useCallback } from "react";


const sections = [
  {
    date: "25/1 - 1/2/2021",
    title: "Đại hội XIII",
    subtitle: "Diễn ra tại Hà Nội",
    image: "https://tapchimoitruong.vn/uploads/082021/image001_52afa047.jpg",
  },
  {
    title: "Bối Cảnh & Nội Dung",
    description:
      "- Đất nước đứng trước nhiều cơ hội và thách thức như biến đổi khí hậu, dịch bệnh (đặc biệt là đại dịch COVID-19). <br/>- Thành tựu nổi bật sau 35 năm đổi mới, tạo nền tảng để phát triển trong giai đoạn mới. <br/> Nội dung chính: <br/>- Chủ đề Đại hội: “Tăng cường xây dựng, chỉnh đốn Đảng và hệ thống chính trị trong sạch, vững mạnh; khơi dậy khát vọng phát triển đất nước; phát huy ý chí, sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh thời đại; tiếp tục đẩy mạnh toàn diện, đồng bộ công cuộc đổi mới; xây dựng và bảo vệ vững chắc Tổ quốc; giữ vững môi trường hòa bình, ổn định; phấn đấu đến giữa thế kỷ XXI, nước ta trở thành nước phát triển, theo định hướng xã hội chủ nghĩa.” <br/>- Bầu Ban Chấp hành Trung ương khóa XIII gồm 200 đồng chí (180 ủy viên chính thức, 20 ủy viên dự khuyết). <br/>- Đồng chí Nguyễn Phú Trọng tiếp tục được bầu làm Tổng Bí thư​.",
  },
  {
    title: "Mục tiêu",
    description:
      "- Đến năm 2025, kỷ niệm 50 năm giải phóng hoàn toàn miền Nam, thống nhất đất nước: Là nước đang phát triển, có công nghiệp theo hướng hiện đại, vượt qua mức thu nhập trung bình thấp. <br/>- Đến năm 2030, kỷ niệm 100 năm thành lập Đảng: Là nước đang phát triển, có công nghiệp hiện đại, thu nhập trung bình cao. <br/>- Đến năm 2045, kỷ niệm 100 năm thành lập nước Việt Nam Dân chủ Cộng hòa, nay là nước Cộng hòa xã hội chủ nghĩa Việt Nam: Trở thành nước phát triển, thu nhập cao.",
  },
  {
    title: "Nhiệm vụ",
    description:
      "Xây dựng, chỉnh đốn Đảng: <br/>- Nâng cao năng lực lãnh đạo, đổi mới phương thức cầm quyền. <br/>- Kiện toàn bộ máy tinh gọn, hiệu lực, hiệu quả. <br/>- Chống tham nhũng, quan liêu, 'lợi ích nhóm' <br/>-Xây dựng đội ngũ cán bộ đủ phẩm chất, năng lực, uy tín. <br/>Kiểm soát dịch bệnh, phục hồi và phát triển kinh tế - xã hội: <br/>- Tiêm chủng đại trà, kiểm soát đại dịch Covid-19. <br/>- Đổi mới mô hình tăng trưởng, phát triển kinh tế số. <br/>- Hoàn thiện thể chế kinh tế, tăng năng suất, nâng cao sức cạnh tranh. <br/>Giữ vững độc lập, tăng cường quốc phòng - an ninh, đối ngoại: <br/>- Phát triển quân đội, công an cách mạng, chính quy, hiện đại. <br/>- Bảo vệ chủ quyền biển, đảo, giữ vững hòa bình, ổn định. <br/>- Phát triển quan hệ đối ngoại đa chiều, đa phương.Đẩy mạnh hội nhập quốc tế, nâng cao vị thế đất nước.",
  },
  {
    title: "Thực hiện đường lối Đại hội XIII các nghị quyết",
    description:
      "01 - 04/10/2021: Hội nghị Trung ương 4 khóa XIII thông qua 2 nghị quyết quan trọng: <br/>- Nghị quyết về xây dựng, chỉnh đốn Đảng và hệ thống chính trị: Tiếp tục đẩy mạnh công tác phòng, chống tham nhũng, suy thoái tư tưởng chính trị, đạo đức, lối sống trong nội bộ. <br/>- Nghị quyết về phát triển kinh tế - xã hội: Định hướng phục hồi kinh tế sau đại dịch COVID-19, thúc đẩy chuyển đổi số, phát triển nền kinh tế số và kinh tế xanh. <br/>04 - 10/5/2022: Hội nghị Trung ương 5 khóa XIII ban hành 3 nghị quyết trọng điểm: <br/>- Nghị quyết về đất đai: Hoàn thiện chính sách, pháp luật về đất đai, đảm bảo sử dụng đất đai hiệu quả, minh bạch. <br/>- Nghị quyết về phát triển kinh tế tập thể: Khuyến khích mô hình hợp tác xã kiểu mới, hỗ trợ doanh nghiệp nhỏ và vừa phát triển bền vững. <br/>- Nghị quyết về nông nghiệp, nông dân, nông thôn: Đẩy mạnh công nghiệp hóa nông nghiệp, nâng cao thu nhập và đời sống nông dân.",
  },
  {
    title: "Thực hiện đường lối Đại hội XII các nghị quyết",
    description:
      "03 - 09/10/2022: Hội nghị Trung ương 6 khóa XIII thông qua 4 nghị quyết: <br/>- Nghị quyết về tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam: Định hướng cải cách tư pháp, nâng cao chất lượng lập pháp. <br/>- Nghị quyết về đổi mới và nâng cao hiệu quả hoạt động của các đơn vị sự nghiệp công lập: Nâng cao chất lượng dịch vụ công, đẩy mạnh tự chủ tài chính. <br/>- Nghị quyết về chăm sóc sức khỏe nhân dân: Củng cố hệ thống y tế cơ sở, bảo vệ sức khỏe cộng đồng. <br/>- Nghị quyết về chiến lược bảo vệ Tổ quốc trong tình hình mới: Tăng cường quốc phòng, an ninh, bảo vệ chủ quyền lãnh thổ.",
  },
  {
    title: "Ý nghĩa và tác động",
    description:
      "- Tiếp tục công cuộc đổi mới: Đại hội XIII khẳng định quyết tâm đẩy mạnh toàn diện, đồng bộ công cuộc đổi mới, hướng tới mục tiêu trở thành nước phát triển vào năm 2045. <br/>- Phục hồi kinh tế sau đại dịch: Đưa ra các chính sách hỗ trợ phục hồi kinh tế, thúc đẩy chuyển đổi số, công nghiệp hóa, hiện đại hóa. <br/>- Nâng cao vị thế đất nước: Mở rộng quan hệ đối ngoại, tích cực hội nhập quốc tế, bảo vệ lợi ích quốc gia - dân tộc. <br/>- Đẩy mạnh công tác xây dựng, chỉnh đốn Đảng: Tăng cường kỷ luật Đảng, nâng cao năng lực lãnh đạo và sức chiến đấu. <br/>- Chăm lo đời sống nhân dân: Đẩy mạnh an sinh xã hội, nâng cao đời sống vật chất và tinh thần, đảm bảo phát triển bền vững.",
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