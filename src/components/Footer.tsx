import { useState } from 'react';

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  // Replace "Your Name" with your actual name
  const name = "Jeffery Ozoekwe-Awagu";

  // Replace with your actual portfolio URL
  const portfolioUrl = "https://www.jeffawe.com";

  return (
    <footer className="bg-blue-600 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <a
              href={portfolioUrl}
              className="text-xl font-semibold text-white hover:text-blue-400 transition-colors"
            >
              {name}
            </a>
            <p className="mt-2 text-sm">
              &copy; {currentYear} All Rights Reserved
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://jeffawe.github.io/toa.github.io/"
              className="text-sm hover:text-white hover:underline transition-colors"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="/settings/help"
              className="text-sm hover:text-white hover:underline transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-4 text-xs text-center md:text-left">
          <a
            href="https://www.flaticon.com/free-icons/pulse"
            title="pulse icons"
            className="hover:text-white hover:underline transition-colors"
          >
            Pulse icons created by Dixit Lakhani_02 - Flaticon
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;