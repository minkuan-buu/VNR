"use client";
import { useEffect, useRef, useState, useCallback } from "react";


const sections = [
  {
    date: "(1986 - 2018)",
    title: "Thành tựu của công cuộc Đổi mới",
    image: "https://cdn.thuvienphapluat.vn/uploads/tintuc/2024/11/15/quoc-hoi-bau-chu-tich-nuoc.jpg",
  }, 
  {
    title: "Thành tựu về kinh tế",
    description:
      "Việt Nam thoát khỏi khủng hoảng kinh tế - xã hội kéo dài suốt thập niên 80.<br/>- Trước Đổi mới, kinh tế Việt Nam rơi vào khủng hoảng nghiêm trọng: lạm phát tăng cao, nhiều năm liền tăng trưởng âm, đời sống người dân cực kỳ khó khăn. <br/>- Đổi mới đã giúp Việt Nam vững vàng vượt qua giai đoạn khó khăn này. <br/> Tốc độ tăng trưởng ấn tượng: <br/>- Giai đoạn 1991 - 2010, GDP tăng trưởng bình quân khoảng 7%/năm, thuộc nhóm quốc gia có tốc độ tăng trưởng cao nhất thế giới. <br/>- Giai đoạn 2011 - 2018, dù kinh tế thế giới bất ổn, khủng hoảng tài chính toàn cầu, lạm phát trong nước cao, nợ xấu ngân hàng lớn... nhưng Việt Nam vẫn duy trì mức tăng trưởng 6-7%/năm nhờ nỗ lực ổn định kinh tế vĩ mô và tái cơ cấu nền kinh tế. <br/> Cơ cấu kinh tế chuyển dịch theo hướng công nghiệp hóa, hiện đại hóa: <br/>- Tỷ trọng nông nghiệp trong GDP giảm dần, công nghiệp và dịch vụ tăng lên rõ rệt. <br/>- Hình thành các ngành kinh tế mũi nhọn như dầu khí, viễn thông, công nghệ thông tin, điện tử.",
  },       
  {
    title: "Thành tựu về kinh tế",
    description:
      "Thành tựu trong xuất nhập khẩu: <br/>- Từ chỗ nền kinh tế đóng cửa, đến năm 2018, kim ngạch xuất nhập khẩu đạt 480 tỷ USD, Việt Nam nhiều năm liền xuất siêu. <br/>- Trở thành một trong những trung tâm sản xuất, lắp ráp điện tử lớn của thế giới, thu hút các tập đoàn như Samsung, LG, Intel... <br/> Thu nhập bình quân đầu người tăng mạnh: <br/>- Năm 1986: khoảng 100 USD/người/năm. <br/>-  Năm 2018: đạt 2.587 USD/người/năm (theo World Bank), chính thức trở thành nước có thu nhập trung bình.",
  },
  {
    title: "Thành tựu về văn hóa - xã hội",
    description:
      "Đời sống nhân dân được cải thiện rõ rệt: <br/>- Tỷ lệ hộ nghèo giảm từ hơn 60% (đầu những năm 1990) xuống còn khoảng 6% vào năm 2018 (theo chuẩn nghèo đa chiều). <br/>- Người dân có nhiều cơ hội tiếp cận các dịch vụ y tế, giáo dục, thông tin và giải trí. <br/>Văn hóa phát triển đa dạng, hội nhập mà vẫn giữ được bản sắc dân tộc: <br/>- Hàng loạt lễ hội, di sản văn hóa vật thể và phi vật thể được UNESCO công nhận: Nhã nhạc cung đình Huế, Không gian văn hóa cồng chiêng Tây Nguyên, Ca trù, Quan họ Bắc Ninh...",
  },
  {
    title: "Thành tựu về văn hóa - xã hội",
    description:
      "Giáo dục và y tế được chú trọng phát triển: <br/>- Việt Nam là một trong những nước có tỷ lệ biết chữ cao nhất khu vực, hơn 94% dân số biết chữ. <br/>- Các chương trình y tế quốc gia phát huy hiệu quả, tuổi thọ trung bình năm 2018 đạt 73,5 tuổi, cao nhất trong các nước có mức thu nhập tương đương. <br/>Thành tựu về khoa học - công nghệ: <br/>- Công nghệ thông tin, truyền thông bùng nổ, mạng internet phủ rộng, góp phần quan trọng thúc đẩy kinh tế số, xã hội số.",
  },
  {
    title: "Thành tựu về chính trị - quốc phòng - đối ngoại",
    description:
      "Giữ vững độc lập, chủ quyền, toàn vẹn lãnh thổ. <br/>Tình hình chính trị - xã hội ổn định: <br/>- an ninh quốc phòng được củng cố vững chắc, tạo nền tảng cho phát triển kinh tế - xã hội. <br/>Đường lối đối ngoại rộng mở, đa phương hóa, đa dạng hóa quan hệ quốc tế: <br/>-Việt Nam trở thành thành viên của nhiều tổ chức quốc tế: ASEAN (1995), APEC (1998), WTO (2007)... <br/>- Quan hệ ngoại giao với trên 180 quốc gia, quan hệ kinh tế, thương mại với hầu hết các nước và vùng lãnh thổ trên thế giới. <br/>- Tổ chức thành công nhiều sự kiện quốc tế lớn như Hội nghị APEC 2017, Hội nghị Thượng đỉnh Mỹ - Triều 2019 tại Hà Nội.",
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