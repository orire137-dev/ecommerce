import { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { ProductContext } from "../Context/ProductProvider";

const Navbar = () => {
  const { cartCount } = useContext(ProductContext);
  const navlinks = [
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Men",
      path: "/men",
    },
    {
      name: "Women",
      path: "/women",
    },
    {
      name: "Kids",
      path: "/kids",
    },
  ];

  //   useEffect(() => {
  //     console.log(navlinks);
  //   }, []);

  return (
    <div className="  flex justify-between items-center p-4 bg-white shadow-2xl sticky top-0 z-50 ">
      <Link to={"/"}  className="logo font-bold text-[30px]">B</Link>

      <div className="links flex justify-between items-center gap-4">
        {navlinks.map((item, i) => (
          <NavLink
            className={({ isActive }) =>
              ` ${isActive ? "bg-white border-black" : "border-2 border-transparent"}  font-semibold rounded-md p-2 hover:bg-white transition ease-in-out duration-500 border-2 border-transparent`
            }
            to={item.path}
            key={i}
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="actionbtn flex justify-between items-center gap-4">
        <span className="cursor-pointer">
          <IoPerson className="h-5 w-5" />
        </span>
        <Link to={"/Checkout"} className="cursor-pointer relative">
          <FaCartShopping className="h-5 w-5" />
          <p className="absolute -top-[8px] -right-[16px] bg-black text-white rounded-full border-2 border-white h-5 w-5 flex justify-center items-center p-[10px]">
            {cartCount}
          </p>
          
        </Link>
      </div>
    </div>
  );
};

export default Navbar;