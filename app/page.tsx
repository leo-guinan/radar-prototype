import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <h2 className="text-2xl font-bold mb-4">Prediction</h2>
        <ul>
          <li className="text-xl font-semibold mb-2">
            <Link href="/prediction/form">Form</Link>
          </li>
          <li className="text-xl font-semibold">
            <Link href="/prediction/report">Report</Link>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Trends</h2>
        <ul>
          <li className="text-xl font-semibold mb-2">
            <Link href="/trends/form">Form</Link>
          </li>
          <li className="text-xl font-semibold">
            <Link href="/trends/report">Report</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
