import React, { useState } from 'react';
import { 
  Home, 
  User, 
  FolderOpen, 
  FileText, 
  Award, 
  Mail, 
  Phone, 
  Github, 
  Download,
  Menu,
  X,
  ExternalLink,
  MapPin,
  Briefcase,
  Eye,
  ZoomIn
} from 'lucide-react';

// Type definitions for better code organization
type PageType = 'home' | 'projects' | 'resume' | 'certificates' | 'contact';

interface NavigationItem {
  id: PageType;
  label: string;
  icon: React.ReactNode;
}

interface Project {
  name: string;
  description: string;
  link: string;
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

function App() {
  // State management for current page, mobile menu, and certificate modal
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Navigation configuration
  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'About Me', icon: <User size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={20} /> },
    { id: 'resume', label: 'Resume', icon: <FileText size={20} /> },
    { id: 'certificates', label: 'Certificates', icon: <Award size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  // Projects data
  const projects: Project[] = [
    {
      name: 'Reddit NLP Project',
      description: 'Natural Language Processing analysis of Reddit data to extract insights and sentiment patterns from social media discussions.',
      link: 'https://github.com/Achutha2207'
    },
    {
      name: 'Trading Strategies',
      description: 'Quantitative trading strategies implementation with backtesting frameworks and performance analysis for financial markets.',
      link: 'https://github.com/Achutha2207'
    },
    {
      name: 'PDF Summarization',
      description: 'AI-powered document summarization tool that extracts key information from PDF files using advanced NLP techniques.',
      link: 'https://github.com/Achutha2207'
    },
    {
      name: 'Stock Data Analysis',
      description: 'Comprehensive stock market data analysis with visualization tools and predictive modeling for investment insights.',
      link: 'https://github.com/Achutha2207'
    }
  ];

  // Certificate data with proper titles based on the images
  const certificates: Certificate[] = [
    {
      id: 1,
      title: 'Stock Market Basics',
      issuer: 'Zerodha Varsity',
      date: 'July 21, 2023',
      image: '/images/certificates/WhatsApp Image 2025-07-28 at 21.09.54_d664866b.jpg'
    },
    {
      id: 2,
      title: 'Futures Trading',
      issuer: 'Zerodha Varsity',
      date: 'August 20, 2023',
      image: '/images/certificates/WhatsApp Image 2025-07-28 at 21.09.54_f0b089a0.jpg'
    },
    {
      id: 3,
      title: 'Options Trading',
      issuer: 'Zerodha Varsity',
      date: 'October 20, 2023',
      image: '/images/certificates/WhatsApp Image 2025-07-28 at 21.09.54_f5aa0346.jpg'
    }
  ];

  // Navigation handler
  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Certificate modal handlers
  const openCertificateModal = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  // Header Component
  const Header = () => (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Name */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Achutha</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'text-blue-400 bg-gray-800'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-800"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'text-blue-400 bg-gray-800'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  // Certificate Modal Component
  const CertificateModal = () => {
    if (!selectedCertificate) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl max-w-4xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedCertificate.title}</h3>
              <p className="text-gray-400">{selectedCertificate.issuer} • {selectedCertificate.date}</p>
            </div>
            <button
              onClick={closeCertificateModal}
              className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4">
            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  };

  // Home/About Me Page Component
  const HomePage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-white font-bold text-4xl">A</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Hey, I'm <span className="text-blue-400">ACHUTHA S</span>
        </h1>
        <div className="flex items-center justify-center space-x-4 text-gray-400 mb-8">
          <div className="flex items-center space-x-1">
            <MapPin size={16} />
            <span>Bangalore</span>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed">
        <p className="text-xl mb-6">
          A 21-year-old Computer Science student from Bangalore with a growing enthusiasm for both technology and financial systems.
        </p>
        
        <p className="mb-6">
          I first encountered the world of quantitative finance by chance, and something about the blend of math, markets, and code instantly clicked with me. Since then, I've been diving deep into data, financial theories, and quantitative strategies to truly understand what drives performance in the markets.
        </p>
        
      
        
        <p className="text-lg font-medium text-blue-400">
          Always happy to chat about markets, business , tech, , or anything in between — reach out anytime!
        </p>
      </div>

      {/* Quick Links */}
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => handleNavigation('projects')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <FolderOpen size={20} />
          <span>View Projects</span>
        </button>
        <button
          onClick={() => handleNavigation('resume')}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <FileText size={20} />
          <span>View Resume</span>
        </button>
        <button
          onClick={() => handleNavigation('contact')}
          className="border-2 border-blue-500 text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 flex items-center space-x-2"
        >
          <Mail size={20} />
          <span>Get in Touch</span>
        </button>
      </div>
    </div>
  );

  // Projects Page Component
  const ProjectsPage = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">My Projects</h1>
      
      </div>

      {/* GitHub Profile Link */}
      <div className="text-center mb-12">
        <a
          href="https://github.com/Achutha2207"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700"
        >
          <Github size={20} />
          <span>View All Projects on GitHub</span>
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-700 hover:border-gray-600"
          >
            <h3 className="text-xl font-bold text-white mb-3">{project.name}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium"
            >
              <Github size={16} />
              <span>View Project</span>
              <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  // Resume Page Component
  const ResumePage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Resume</h1>
        <p className="text-xl text-gray-400">
          Download my resume to learn more about my experience and qualifications.
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
        <div className="w-24 h-24 bg-blue-500 bg-opacity-20 rounded-full mx-auto mb-6 flex items-center justify-center">
          <FileText size={40} className="text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">ACHUTHA'S Resume</h2>
        <p className="text-gray-400 mb-8">
          Comprehensive overview of my education, experience, and skills in quantitative finance and computer science.
        </p>
        
        <a
          href="/ACHUTHA_RESUME (11).pdf"
          download
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-medium"
        >
          <Download size={24} />
          <span>Download Resume</span>
        </a>
        
        <p className="text-sm text-gray-500 mt-4">PDF Format • Updated Recently</p>
      </div>
    </div>
  );

  // Certificates Page Component
  const CertificatesPage = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Certificates</h1>
        <p className="text-xl text-gray-400">
          Professional certifications and achievements in quantitative finance and trading.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-gray-600 group"
          >
            <div className="relative">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image doesn't load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-64 bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <Award size={48} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">{cert.title}</p>
                </div>
              </div>
              
              {/* Overlay with view button */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={() => openCertificateModal(cert)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                >
                  <ZoomIn size={16} />
                  <span>View Full Size</span>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                {cert.title}
              </h3>
              <p className="text-gray-400 text-sm mb-1">
                {cert.issuer}
              </p>
              <p className="text-gray-500 text-sm">
                Issued: {cert.date}
              </p>
              <button
                onClick={() => openCertificateModal(cert)}
                className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
              >
                <Eye size={14} />
                <span>View Certificate</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Contact Page Component
  const ContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-400">
          Feel free to reach out for collaborations, opportunities, or just to chat about markets and tech!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Email Contact */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-700">
          <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Mail size={32} className="text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Email</h3>
          <a
            href="mailto:achutha22072004@gmail.com"
            className="text-blue-400 hover:text-blue-300 font-medium text-lg"
          >
            achutha22072004@gmail.com
          </a>
          <p className="text-gray-400 mt-4">
            Best way to reach me for professional inquiries
          </p>
        </div>

        {/* Phone Contact */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-700">
          <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Phone size={32} className="text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Phone</h3>
          <a
            href="tel:+919740716659"
            className="text-green-400 hover:text-green-300 font-medium text-lg"
          >
            +91 9740716659
          </a>
          <p className="text-gray-400 mt-4">
            Available for calls during business hours
          </p>
        </div>
      </div>

      {/* Additional Contact Info */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 border border-gray-600">
          <h3 className="text-2xl font-bold text-white mb-4">Let's Connect!</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether you want to discuss quantitative finance, share insights about Formula 1, 
            or explore potential collaborations, I'm always excited to connect with like-minded individuals.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/Achutha2207"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2 border border-gray-600"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:achutha22072004@gmail.com"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Mail size={20} />
              <span>Email Me</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render function with page switching logic
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'projects':
        return <ProjectsPage />;
      case 'resume':
        return <ResumePage />;
      case 'certificates':
        return <CertificatesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  // Main App Component Return
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="pb-12">
        {renderCurrentPage()}
      </main>
      
      {/* Certificate Modal */}
      <CertificateModal />
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Achutha. Built with React, TypeScript, and Tailwind CSS.
            </p>
            <p className="text-gray-500 mt-2">
              Passionate about quantitative finance, technology, and Formula 1.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
