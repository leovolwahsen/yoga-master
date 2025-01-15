import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useAxios } from "../../data/useAxios";
import { useEffect, useState } from "react";
import { IFooterProps, IHandleSubscription } from "../../types/interfaces";

interface FooterProps extends IFooterProps {
  triggerToast: (type: "success" | "error", message: string) => void;
}

export const Footer = ({ isDarkMode, triggerToast }: FooterProps) => {
  const axiosInstance = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleNewsletterSubscription = async (e: IHandleSubscription) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/new-subscribed", { email });
      if (response.status === 201) {
        triggerToast("success", "You have successfully subscribed to our newsletter!");
        setEmail("");
      }
    } catch (err) {
      triggerToast("error", "Failed to subscribe to newsletter!");
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  const stats = [
    { number: "26M+", label: "Visitor" },
    { number: "1M+", label: "Subscriber" },
    { number: "750k+", label: "Students" },
    { number: "70%", label: "Success stories" },
  ];

  const links = [
    { title: "Services", items: ["Rock and Yoga", "Healthy Diet", "Fit to Health", "Exercise"] },
    { title: "About", items: ["About", "Careers", "History", "Our Staff"] },
    { title: "Support", items: ["FAQs", "Contact", "Live Chat"] },
  ];

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
      <div className="w-[90%] mx-auto">
        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 py-12 ${isDarkMode ? "bg-gray-800" : "bg-blue-800"} text-white`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h2 className="text-4xl font-bold">{stat.number}</h2>
              <p className="text-lg">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <form
          onSubmit={handleNewsletterSubscription}
          className="max-w-lg mx-auto p-6 mt-6 border border-gray-300 rounded-lg shadow-md"
        >
          <h3 className="text-2xl font-bold text-center mb-4">Subscribe to our Newsletter</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            required
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-600">
            Subscribe
          </button>
        </form>

        {/* Footer Links Section */}
        <div className="flex flex-wrap justify-center gap-8 py-12">
          {/* Description and Social Media Section */}
          <div className="flex-1 min-w-[250px] max-w-[300px] text-center">
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
              Our experienced instructors will guide you through structured lessons, helping you develop a solid foundation.
            </p>
            <div className={`flex justify-center gap-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              <FaFacebook className="text-2xl" />
              <FaInstagram className="text-2xl" />
              <FaLinkedin className="text-2xl" />
            </div>
          </div>

          {/* Links Sections */}
          {links.map((link, i) => (
            <div key={i} className="flex-1 min-w-[250px] max-w-[300px] text-center">
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

        {/* Footer Bottom Section */}
        <div className={`border-t pt-4 text-center ${isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-500"}`}>
          <p>©YogaGuide Company 2024. All rights reserved.</p>
          <p>Created with YogaGuide</p>
        </div>
      </div>
    </div>
  );
};
