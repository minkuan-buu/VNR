"use client";
import { useEffect, useRef, useState, useCallback } from "react";


const sections = [
  {
    title: "Nguyên nhân và tác hại của tham nhũng",
    image: "https://cdnmedia.baotintuc.vn/Upload/c2tvplmdloSDblsn03qN2Q/files/2021/09/28/phong-chong-tham-nhung-28921.jpg",
  }, 
  {
    title: "Nhận định chung về tham nhũng",
    description:
      "Đảng ta xác định tham nhũng là một trong những nguy cơ lớn, ảnh hưởng nghiêm trọng đến sự phát triển bền vững của đất nước. <br/> Tham nhũng diễn biến phức tạp, xảy ra ở nhiều cấp, nhiều ngành, nhất là các lĩnh vực nhạy cảm như đất đai, đầu tư, tài chính, ngân hàng, công tác cán bộ...",
  },       
  {
    title: "Nguyên nhân của tham nhũng",
    description:
      "Khách quan: <br/>- Quá trình chuyển đổi từ nền kinh tế kế hoạch hóa tập trung sang kinh tế thị trường tạo ra nhiều kẽ hở trong quản lý. <br/>- Mặt trái của kinh tế thị trường, sự chạy theo lợi nhuận làm suy giảm đạo đức xã hội. <br/>- Toàn cầu hóa mở rộng giao lưu, nhưng cũng tạo điều kiện cho các hành vi tham nhũng ngày càng tinh vi hơn. <br/> Chủ quan: <br/>- Một bộ phận không nhỏ cán bộ, đảng viên suy thoái về tư tưởng chính trị, đạo đức, lối sống, lợi dụng chức quyền để trục lợi. <br/>- Công tác quản lý, kiểm tra, giám sát ở nhiều nơi còn yếu, thiếu đồng bộ, xử lý chưa nghiêm. <br/>- Hệ thống pháp luật chưa hoàn thiện, dẫn đến tình trạng “trên nóng, dưới lạnh” - trung ương quyết liệt, cơ sở thực hiện hình thức.",
  },
  {
    title: "Tác hại của tham nhũng",
    description:
      "Thứ nhất: Tha hóa bộ máy Nhà nước, suy giảm lòng tin của nhân dân <br/>- Tham nhũng làm biến chất bộ máy nhà nước, làm một bộ phận cán bộ chỉ lo vun vén cá nhân, bỏ mặc lợi ích quốc gia, dân tộc. <br/>- Các vụ án tham nhũng lớn như Vinashin, Vinalines, PMU 18, AVG... gây chấn động dư luận, làm giảm niềm tin của nhân dân vào Đảng và Nhà nước. <br/>Thứ hai: Kìm hãm sự phát triển kinh tế - xã hội, gia tăng bất bình đẳng: <br/>-  Tham nhũng làm thất thoát tài sản công, lãng phí nguồn lực quốc gia. <br/>- Gây môi trường kinh doanh thiếu công bằng, cản trở sự phát triển của doanh nghiệp lành mạnh. <br/>- Làm trầm trọng thêm tình trạng phân hóa giàu nghèo, tạo ra những nhóm lợi ích thao túng chính sách.",
  },
  {
    title: "Tác hại của tham nhũng",
    description:
      "Thứ ba: Gây mất ổn định chính trị, xói mòn đạo đức xã hội <br/>- Tham nhũng nuôi dưỡng các nhóm lợi ích, hình thành các 'sân sau', đe dọa sự ổn định chính trị. <br/>- Làm băng hoại đạo đức xã hội, gia tăng các tệ nạn, gây bất mãn trong quần chúng nhân dân. <br/>Thứ tư: Ảnh hưởng đến uy tín quốc tế, cản trở hội nhập: <br/>-  Tham nhũng làm xấu hình ảnh đất nước trong mắt bạn bè quốc tế. <br/>- Giảm sức hấp dẫn của môi trường đầu tư, gây khó khăn cho quá trình hội nhập kinh tế toàn cầu.",
  },
  {
    title: "Kết luận",
    description:
      "Công cuộc Đổi mới là một quá trình lịch sử đầy thử thách nhưng cũng rất đỗi tự hào của dân tộc Việt Nam. Những thành tựu đạt được đã tạo nền tảng vững chắc để Việt Nam tiếp tục vững bước trên con đường phát triển. <br/> Tuy nhiên, tham nhũng là một nguy cơ lớn, thách thức sự phát triển bền vững, đòi hỏi sự quyết tâm cao của toàn Đảng, toàn dân để phòng, chống hiệu quả. <br/>Bài học lớn nhất là phải kiên định mục tiêu XHCN, đồng thời không ngừng đổi mới tư duy, đổi mới phương thức lãnh đạo, phát huy sức mạnh toàn dân để đưa đất nước phát triển nhanh, bền vững. ",
  },
];

export default function HomePage() {
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const [activeSection, setActiveSection] = useState<string>(sections[0].date || "");
    const isScrolling = useRef(false);
  
    // 📌 Xử lý cuộn mượt mà
    const handleScroll = useCallback(
      (event: WheelEvent) => {
        if (isScrolling.current) return;
        isScrolling.current = true;
    
        requestAnimationFrame(() => {
          isScrolling.current = false;
        });
    
        // 🔥 Dùng index thay vì tìm theo `date`
        const currentIndex = sections.findIndex((sec, idx) => idx === sectionRefs.current.findIndex(ref => ref?.getBoundingClientRect().top >= 0));
        const direction = event.deltaY > 0 ? 1 : -1;
        const nextIndex = currentIndex + direction;
    
        if (nextIndex >= 0 && nextIndex < sections.length) {
          const nextSection = sectionRefs.current[nextIndex];
    
          if (nextSection) {
            setActiveSection(sections[nextIndex].title); // Cập nhật active bằng title hoặc index
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      },
      [activeSection]
    );
    
  
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
              key={section.date}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.date
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-400"
              }`}
              onClick={() => {
                setActiveSection(section.date);
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
            key={section.date}
            ref={(el) => (sectionRefs.current[index] = el)}
            id={section.date}
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