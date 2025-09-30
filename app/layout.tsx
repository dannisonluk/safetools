import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
	title: "SafeTool",
	description:
		"Privacy-first online tools for image editing, PDF processing, and more. All processing happens locally in your browser - no uploads, no tracking, no AI training on your data.",
	keywords:
		"safe tools, instagram square, pdf combiner, image compress, qr code generator, color palette, json formatter, browser-based, offline tools, secure file processing",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable}`}
		>
			<body>
				<Navigation />
				<main className="pt-16">{children}</main>
			</body>
		</html>
	);
}
