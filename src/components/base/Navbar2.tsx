import { Link } from "react-router";

const Navbar2 = () => {
  return (
    <nav className="h-20   flex justify-between items-center paddings">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-foreground tracking-wide"
        >
          PRINT WEB
        </Link>
      </div>

      <div className="flex items-center space-x-4"></div>
    </nav>
  );
};

export default Navbar2;
