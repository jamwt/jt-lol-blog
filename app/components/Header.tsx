const Header = () => {
  return (
    <header className="bg-[url('/rad.jpeg')] bg-cover bg-center shadow-sm">
      <div className="max-w-4xl mx-auto py-6 px-4">
        <a
          href="/"
          className="text-3xl font-bold text-white hover:text-gray-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] [-webkit-text-stroke:1px_#000]"
        >
          Jamie Turner
        </a>
      </div>
    </header>
  );
};

export default Header;
