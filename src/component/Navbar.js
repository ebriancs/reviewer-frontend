import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1>Reviewer</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/afp" className="hover:underline">
            AFP
          </Link>
          <Link to="/cse" className="hover:underline">
            CSE
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
