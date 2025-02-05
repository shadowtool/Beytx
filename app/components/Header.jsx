import Link from "next/link";
import AuthButton from "./AuthButton";
import AddPropertyButton from "./AddPropertyButton";

const Header = () => {
    return ( 
        <section> 
        <header className="text-white p-6 shadow-md bg-gradient-to-r from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90%">
            <div className="container mx-auto flex justify-between items-center">
                <img src="/images/beyt.png" alt="Logo" className="max-w-36 max-h-12" />

                {/* Navigation Links */}
                <nav className="flex-0 flex justify-center items-center ml-72">
                    <ul className="flex space-x-10 text-xl">
                        <li><Link href="/"><span className="hover:underline">Home</span></Link></li>
                        <li><Link href="/properties"><span className="hover:underline">Properties</span></Link></li>
                        <li><Link href="/contact"><span className="hover:underline">Contact</span></Link></li>
                    </ul>
                </nav>

                {/* Auth Button */}
                <div className="flex justify-center items-center gap-2">
                    <AuthButton />
                    <AddPropertyButton />
                </div>
            </div>
        </header>
        </section>
    );
};

export default Header;