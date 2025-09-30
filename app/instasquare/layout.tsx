import type { Metadata } from "next";
import Navigation from "@/components/instasquare/Navigation";
import "./globals.css";

export const metadata: Metadata = {
	title: "InstaSquare",
	description:
		"Edit and optimize your Instagram photos with complete privacy. All processing happens locally in your browser.",
	keywords:
		"instagram, photo editor, privacy, square photos, image processing",
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
