import Link from "next/link";

export default function PredictionPage() {
    return (
        <div>
            <ul>
                <li className="text-2xl font-bold">
                    <Link href="/prediction/form">Form</Link>
                </li>
                <li className="text-2xl font-bold">
                    <Link href="/prediction/report">Report</Link>
                </li>
            </ul>
        </div>
    )
}