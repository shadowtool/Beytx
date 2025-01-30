import Link from "next/link";


const Header = () => {
    return (  
        <header className="bg-green-700 text-white p-4 shadow-md"> {/* Tailwind classes for styling */}
      <div className="container mx-auto max-h-24 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">Beytx</h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-10">
            <li><Link href="/"><span className="hover:underline">Home</span></Link></li>
            <li><Link href="/properties"><span className="hover:underline">Properties</span></Link></li>
            <li><Link href="/contact"><span className="hover:underline">Contact</span></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;