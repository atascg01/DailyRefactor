import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="editorial-container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">DailyRefactor<span>.</span></Link>
            <p>A space for better software and clearer thinking.</p>
          </div>
          <div className="footer-links">
            <Link href="/blog">Journal</Link><Link href="/quiz">Practice</Link><Link href="/about">About</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DailyRefactor</span>
          <div>
            <Link href="https://github.com/atascg01" target="_blank" rel="noopener noreferrer">GitHub ↗</Link>
            <Link href="https://www.linkedin.com/in/andrestascon/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</Link>
            <Link href="https://x.com/atascg" target="_blank" rel="noopener noreferrer">X ↗</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
