import Link from "next/link";
import AuthButton from "./AuthButton";
import AddProperty from "../add-property/page";

const Header = () => {
    return (  
        <header className="text-white p-6 shadow-md bg-gradient-to-r from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90%">
            <div className="container mx-auto max-h-24 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-mono font-bold">Beyt.co</h1>

                {/* Navigation Links */}
                <nav className="flex-1">
                    <ul className="flex space-x-10 font-mono text-xl justify-center">
                        <li><Link href="/"><span className="hover:underline">Home</span></Link></li>
                        <li><Link href="/properties"><span className="hover:underline">Properties</span></Link></li>
                        <li><Link href="/contact"><span className="hover:underline">Contact</span></Link></li>
                    </ul>
                </nav>

                {/* Auth Button */}

                <div className="flex justify-end">
                  
                    <AuthButton />
                </div>
            </div>
        </header>
    );
};

export default Header;