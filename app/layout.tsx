import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "../assets/styles/main.css";

const body = localFont({
	src: "../assets/fonts/body.ttf",
});

export const metadata: Metadata = {
	title: "efobi.dev",
	description: "Full stack web development agency",
	openGraph: {
		images: "/opengraph.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${body.className} antialiased`}>
				<Header />
				{children}
				<Toaster />
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
