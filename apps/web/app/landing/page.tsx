export default function Landing() {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Our Platform
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
        Get started with our amazing services
      </p>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>
  );
}