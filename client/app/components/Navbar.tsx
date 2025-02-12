import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-zinc-950 to-zinc-800 p-4 text-white shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-100 hover:text-white transition-colors duration-300">
          <Link href="/">SNS Clone</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <>
              <Link
                href="/login"
                className="bg-zinc-100 text-zinc-900 py-2 px-6 rounded-lg font-medium hover:bg-white transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
              >
                ログイン
              </Link>
              <Link
                href="/signup"
                className="bg-zinc-900 text-white py-2 px-6 rounded-lg font-medium hover:bg-zinc-800 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 border border-zinc-700"
              >
                サインアップ
              </Link>
            </>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
