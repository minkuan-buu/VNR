"use client";
import { useEffect, useRef, useState, useCallback } from "react";


const sections = [
  {
    title: "Phân tích những điểm mới trong Nghị quyết Đại hội Đảng lần thứ XII về công nghiệp hóa, hiện đại hóa gắn với phát triển kinh tế tri thức?",
    image: "https://daihoi13.dangcongsan.vn/Uploads/Images/2021/2/1/33/Sau-8-ngay-l%C3%A0m-viec.JPG",
  },
  {
    title: "Bối cảnh và yêu cầu đổi mới",
    description:
      "Nghị quyết Đại hội XII của Đảng diễn ra trong bối cảnh thế giới bước vào cuộc Cách mạng công nghiệp lần thứ tư (CMCN 4.0), với những chuyển biến mạnh mẽ về công nghệ, số hóa và trí tuệ nhân tạo. Đồng thời, Việt Nam đang trong giai đoạn chuyển đổi mô hình tăng trưởng từ chiều rộng sang chiều sâu, hướng đến nâng cao năng suất lao động và năng lực cạnh tranh.<br/> Do đó, Đại hội XII nhấn mạnh công nghiệp hóa, hiện đại hóa phải gắn liền với phát triển kinh tế tri thức, tận dụng thành tựu khoa học - công nghệ để tạo động lực cho tăng trưởng kinh tế bền vững.",
      image: "https://wallpapergod.com/images/hd/vintage-1680X1050-wallpaper-nrwdlsht6fxzyoxn.jpeg",
  },
  {
    title: "Những điểm mới về công nghiệp hóa, hiện đại hóa",
    description:
      "Chuyển đổi mô hình tăng trưởng theo chiều sâu: <br/>- Thay đổi từ tăng trưởng dựa vào vốn và tài nguyên sang tăng trưởng dựa vào tri thức, đổi mới sáng tạo và khoa học - công nghệ. <br/>- Đẩy mạnh tái cơ cấu nền kinh tế, đặc biệt trong các ngành công nghiệp chủ chốt, nhằm nâng cao giá trị gia tăng và hiệu quả sử dụng tài nguyên. <br/> Đẩy mạnh ứng dụng khoa học - công nghệ và đổi mới sáng tạo: <br/>- Tận dụng thành tựu CMCN 4.0 để phát triển các ngành công nghiệp mũi nhọn như công nghệ thông tin, tự động hóa, trí tuệ nhân tạo, công nghệ sinh học. <br/>- Ưu tiên phát triển công nghiệp công nghệ cao, công nghiệp chế biến, chế tạo và các ngành có giá trị gia tăng lớn. <br/>- Khuyến khích hệ sinh thái khởi nghiệp đổi mới sáng tạo, hỗ trợ doanh nghiệp công nghệ cao phát triển.",
      image: "https://wallpapercave.com/wp/wp5929995.jpg",
  },
  {
    title: "Gắn kết công nghiệp hóa, hiện đại hóa với kinh tế tri thức",
    description:
      "Định hướng nền kinh tế theo mô hình kinh tế tri thức: <br/>- Phát triển các ngành kinh tế dựa trên tri thức như công nghệ thông tin, tài chính - ngân hàng, y tế, giáo dục. <br/>- Đẩy mạnh số hóa và tự động hóa trong sản xuất, dịch vụ. <br/> Ứng dụng công nghệ số vào công nghiệp hóa: <br/>- Chuyển đổi số trong doanh nghiệp, nâng cao năng lực sản xuất thông minh. <br/>- Phát triển các thành phố thông minh, ứng dụng trí tuệ nhân tạo trong quản lý đô thị, giao thông, y tế. <br/> Phát triển thị trường khoa học - công nghệ: <br/>- Hoàn thiện hệ thống sở hữu trí tuệ, tạo điều kiện cho sáng tạo công nghệ phát triển. <br/>- Hỗ trợ doanh nghiệp tiếp cận nguồn vốn đầu tư mạo hiểm để phát triển công nghệ mới.",
      image: "https://mrwallpaper.com/images/hd/download-vintage-wallpaper-gss4wujhwduzic8k.jpg",
  },
  {
    title: "Ý nghĩa và tác động",
    description:
      "- Nâng cao năng suất lao động, cải thiện sức cạnh tranh của nền kinh tế. <br/>- Giảm dần sự phụ thuộc vào các ngành công nghiệp truyền thống, hướng tới nền kinh tế bền vững. <br/>- Mở rộng hội nhập quốc tế, tận dụng cơ hội từ CMCN 4.0 để tham gia sâu vào chuỗi giá trị toàn cầu. <br/>-  Định hướng phát triển bền vững, tạo tiền đề cho Việt Nam trở thành nước công nghiệp theo hướng hiện đại.",
      image: "https://www.itl.cat/pngfile/big/85-850939_book-vintage-paper-background.jpg",
  },
  {
    title: "Kết luận",
    description:
      "Nghị quyết Đại hội XII đã đặt ra những định hướng quan trọng nhằm gắn kết công nghiệp hóa, hiện đại hóa với phát triển kinh tế tri thức. Đây là bước đi chiến lược giúp Việt Nam tận dụng cơ hội từ CMCN 4.0, nâng cao chất lượng tăng trưởng và hội nhập sâu rộng vào nền kinh tế thế giới. 🚀",
      image: "https://images6.alphacoders.com/748/748149.jpg",
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
          <h1 className="text-5xl font-bold font-cus_title bg-black bg-opacity-50 p-2 rounded-lg">{section.title}</h1>
          <div
            className="mt-6 text-2xl text-gray-300 text-justify max-w-4xl font-cus_body bg-black bg-opacity-50 p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        </section>
      ))}
    </div>
  );
}