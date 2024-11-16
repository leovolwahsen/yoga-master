import { FaBars } from "react-icons/fa";

interface FooterProps {
  isDarkMode: boolean;
}

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-4 text-center md:text-left">
          <div>
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Our experienced instructors will guide you through structured lessons, helping you
              develop a solid foundation while nurturing your creativity and musical expression.
            </p>
            <div
              className={`flex justify-center md:justify-start gap-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {["facebook", "instagram", "twitter", "github", "dribbble"].map((icon, i) => (
                <span key={i} className="cursor-pointer hover:text-blue-600">
                  <i>{`fab fa-${icon}`}</i>
                </span>
              ))}
            </div>
          </div>
          {links.map((link, i) => (
            <div key={i}>
              <h3 className="font-bold mb-4">{link.title}</h3>
              <ul className="space-y-2">
                {link.items.map((item, j) => (
                  <li key={j}>{item}</li>
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
