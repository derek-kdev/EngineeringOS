import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#FF6200]/20 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">© 2026 EngineeringOS — Built for innovators.</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/docs" className="hover:text-[#FF8A00] transition">Docs</Link>
            <Link href="/status" className="hover:text-[#FF8A00] transition">Status</Link>
            <Link href="/support" className="hover:text-[#FF8A00] transition">Support</Link>
            <span className="text-zinc-600 text-xs">v2.4.1</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#FF8A00] transition">GitHub</Link>
            <Link href="#" className="hover:text-[#FF8A00] transition">Twitter</Link>
            <Link href="#" className="hover:text-[#FF8A00] transition">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}