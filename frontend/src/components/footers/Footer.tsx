import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FooterProps } from "../../types/interfaces";

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const stats = [
    { number: "35M+", label: "Visitor" },
    { number: "5M+", label: "Subscriber" },
    { number: "950k+", label: "Students" },
    { number: "90%", label: "Success stories" },
  ];

  const links = [
    {
      title: "Services",
      items: ["Rock and Yoga", "Healthy Diet", "Fit to Health", "Exercise"],
    },
    {
      title: "About",
      items: ["About", "Careers", "History", "Our Staff"],
    },
    {
      title: "Support",
      items: ["FAQs", "Contact", "Live Chat"],
    },
  ];

  return (
    <div className={`w-full ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
      <div className="w-[90%] mx-auto">
        {/* Stats Section */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 w-full py-12 ${
            isDarkMode ? "bg-gray-800" : "bg-blue-800"
          } text-white`}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold">{stat.number}</h2>
              <p className="text-lg">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Footer Links Section */}
        <div className="flex flex-wrap justify-center gap-8 py-12 px-4">
          {/* Social Media and Description Section */}
          <div className="flex-1 min-w-[250px] max-w-[300px] text-center flex flex-col items-center">
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Our experienced instructors will guide you through structured lessons, helping you
              develop a solid foundation while nurturing your creativity and musical expression.
            </p>
            <div
              className={`flex justify-center gap-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <FaFacebook className="text-2xl" />
              <FaInstagram className="text-2xl" />
              <FaLinkedin className="text-2xl" />
            </div>
          </div>

          {/* Links Sections */}
          {links.map((link, i) => (
            <div
              key={i}
              className="flex-1 min-w-[250px] max-w-[300px] text-center flex flex-col items-center"
            >
              <h3 className="font-bold mb-4">{link.title}</h3>
              <ul className="space-y-2">
                {link.items.map((item, j) => (
                  <li key={j} className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div
        className={`mt-12 border-t pt-4 text-center ${
          isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-500"
        }`}
      >
        <p>©YogaGuide Company 2024. All rights reserved.</p>
        <p>Created with YogaGuide</p>
      </div>
    </div>
  );
};
