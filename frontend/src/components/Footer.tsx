export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
        <p>&copy; {year} ReactFullstack Base. Built with ❤️</p>
      </div>
    </footer>
  );
}
