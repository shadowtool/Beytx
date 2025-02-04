import Link from "next/link";

const AddPropertyButton = () => {
    return (
        <div className=" text-center py-3">
        <Link href="/add-property">
        <button className="flex items-center bg-blue-600  text-white  px-4 py-3 rounded-lg hover:border-blue-400 border-blue-300 border-2 border-solid transition-all duration-300 h-12 ">
            + Add Property
          </button>
          </Link>
        </div>
      );
}
 
export default AddPropertyButton;