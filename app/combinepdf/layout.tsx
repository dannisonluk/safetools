import type { Metadata } from "next";
import Navigation from "@/components/combinepdf/Navigation";
import "./globals.css";

export const metadata: Metadata = {
	title: "CombinePDF",
	description:
		"Combine your PDFs with complete privacy. All processing happens locally in your browser.",
	keywords: "pdf, combine, privacy",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Navigation />
			<main>{children}</main>
		</div>
	);
}
