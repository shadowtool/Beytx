import Link from "next/link";
import AuthButton from "./AuthButton";
import AddPropertyButton from "./AddPropertyButton";

const Header = () => {
    return ( 
        <section> 
        <header className="text-white p-0 shadow-md bg-gradient-to-r from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90%">
            <div className="container mx-auto flex justify-between items-center">
                <img src="/images/beyt.png" alt="Logo" className="max-w-36 max-h-12" />

                {/* Auth Button */}
                <div className="flex justify-center items-center gap-2">
                    <AuthButton />
                    <AddPropertyButton />
                </div>
            </div>
        </header>
        <div className="text-white p-2 shadow-md bg-gradient-to-r from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90%">
            <div className="container mx-auto flex justify-center items-center h-12">
                {/* Navigation Links */}
                <nav className="flex-1 flex justify-center items-center">
                    <ul className="flex space-x-2 text-2xl">
                        <li>
                            <Link href="/">
                                <span className="border-2 border-zinc-200 rounded-lg p-2 text-white transition-all duration-1000 hover:bg-emerald-400 hover:scale-105">
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/properties">
                                <span className="border-2 border-zinc-200 rounded-lg p-2 text-white transition-all duration-1000 hover:bg-emerald-400 hover:scale-105">
                                    Properties
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact">
                                <span className="border-2 border-zinc-200 rounded-lg p-2 text-white transition-all duration-1000 hover:bg-emerald-400 hover:scale-105">
                                    Contact
                                </span>
                            </Link>
                        </li>
                    </ul>
                 </nav>
            </div>
        </div>
        </section>
    );
};

export default Header;