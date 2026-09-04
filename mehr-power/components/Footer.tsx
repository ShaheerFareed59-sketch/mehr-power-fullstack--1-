import Link from "next/link";

export default function Footer() {
  return (
    <footer className="wrap">
      <div>© {new Date().getFullYear()} MEHR Power · Karachi, Pakistan</div>
      <div className="foot-links">
        <Link href="/categories">Products</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  );
}
