const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 z-10 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm text-gray-300 text-center">
              Designed and developed by Saiteja.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
