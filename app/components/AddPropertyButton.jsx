import Link from "next/link";

const AddPropertyButton = () => {
    return (
        <div className=" text-center py-3">
        <Link href="/add-property">
        <button className="flex items-center bg-rose-500  text-white  px-4 py-3 rounded-lg hover:border-rose-600 border-rose-400 border-2 border-solid transition-all duration-500 h-12 shadow-lg  focus:outline-none focus:ring-2 focus:ring-rose-300 w-64 justify-center font-bold ">
            Add Property
          </button>
          </Link>
        </div>
      );
}
 
export default AddPropertyButton;