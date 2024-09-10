import Link from "next/link";

export default function TrendsPage() {
    return (
        <div>
            <ul>
                <li className="text-2xl font-bold">
                    <Link href="/trends/form">Form</Link>
                </li>
                <li className="text-2xl font-bold">
                    <Link href="/trends/report">Report</Link>
                </li>
            </ul>
        </div>
    )
}