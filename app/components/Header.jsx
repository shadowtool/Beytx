import Link from "next/link";
import AuthButton from "./AuthButton";
import AddProperty from "../add-property/page";
import AddPropertyButton from "./AddPropertyButton";

const Header = () => {
    return (  
        <header className="text-white p-6 shadow-md bg-gradient-to-r from-emerald-600 from-20% via-emerald-500 via-30% to-emerald-500 to-90%">
          
                {/* Navigation Links */}
                <nav className="flex-1 text-center">  
                    <ul className="flex space-x-10 text-xl justify-center mx-auto">
                        <li><Link href="/"><span className="hover:underline">Home</span></Link></li>
                        <li><Link href="/properties"><span className="hover:underline">Properties</span></Link></li>
                        <li><Link href="/contact"><span className="hover:underline">Contact</span></Link></li>
                    </ul>
                </nav>
                


            <div className="container mx-auto max-h-24 flex justify-between items-center">
            <img src="/images/beyt.png" alt="Logo" className="max-w-36 max-h-12 mr-12" />



                {/* Auth Button */}

                <div className="flex  justify-center items-center gap-2">
                  
                    <AuthButton />
                    <AddPropertyButton />
                    
                </div>

               
               
            </div>
        </header>
    );
};

export default Header;