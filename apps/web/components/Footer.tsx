// @/components/Footer.tsx


export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-black">
      <div className="flex h-14 items-center justify-center">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </span>
      </div>
    </footer>
  );
}