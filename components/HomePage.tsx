"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	Shield,
	Lock,
	Zap,
	FileText,
	ChevronRight,
	Camera,
	FileImage,
	QrCode,
	ImageIcon,
	Scissors,
	Construction,
} from "lucide-react";

export default function HomePage() {
	const tools = [
		{
			id: "instasquare",
			title: "InstaSquare",
			description: "Perfect square photos for Instagram",
			icon: Camera,
			color: "from-pink-500 to-purple-500",
			shadowColor: "purple-500",
			link: "/instasquare",
			status: "active",
		},
		{
			id: "combinepdf",
			title: "CombinePDF",
			description: "Merge multiple PDFs into one document instantly",
			icon: FileText,
			color: "from-amber-500 to-yellow-500",
			shadowColor: "amber-500",
			link: "/combinepdf",
			status: "active",
		},
		{
			id: "imagecompress",
			title: "Image Compress",
			description: "Reduce image file sizes without quality loss",
			icon: FileImage,
			color: "from-blue-500 to-cyan-500",
			shadowColor: "blue-500",
			link: "/compress",
			status: "developing",
		},
		{
			id: "qrgen",
			title: "QR Generator",
			description: "Create QR codes for links, WiFi, and more",
			icon: QrCode,
			color: "from-green-500 to-emerald-500",
			shadowColor: "green-500",
			link: "/qrcode",
			status: "developing",
		},
		{
			id: "imageformat",
			title: "Image Format Converter",
			description: "Convert images between JPG, PNG, WebP, and more",
			icon: ImageIcon,
			color: "from-indigo-500 to-purple-500",
			shadowColor: "indigo-500",
			link: "/converter",
			status: "developing",
		},
		{
			id: "removebackground",
			title: "Remove Background",
			description: "Remove backgrounds from images automatically",
			icon: Scissors,
			color: "from-red-500 to-orange-500",
			shadowColor: "red-500",
			link: "/remove-bg",
			status: "developing",
		},
	];

	return (
		<div className="bg-black">
			<div className="min-h-[calc(100vh-64px)] bg-black relative overflow-hidden">
				{/* Background gradient - multi-color theme */}
				<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-amber-900/20" />

				{/* Animated glow blobs */}
				<div className="absolute inset-0 pointer-events-none">
					<motion.div
						animate={{
							x: [0, 100, 0],
							y: [0, -50, 0],
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							ease: "linear",
						}}
						className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
					/>
					<motion.div
						animate={{
							x: [0, -100, 0],
							y: [0, 50, 0],
						}}
						transition={{
							duration: 25,
							repeat: Infinity,
							ease: "linear",
						}}
						className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
					/>
					<motion.div
						animate={{
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 15,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
					/>
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center mb-16"
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 260,
								damping: 20,
							}}
							className="inline-block mb-6"
						>
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-amber-500 rounded-2xl blur-2xl opacity-50" />
								<div className="relative bg-black rounded-2xl p-4 border border-white/20">
									<Shield className="w-16 h-16 text-white" />
								</div>
							</div>
						</motion.div>

						<h1 className="text-4xl lg:text-7xl font-bold text-white mb-6">
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">
								Privacy-First
							</span>
							<br />
							<span className="text-3xl lg:text-5xl">
								Online Tools Suite
							</span>
						</h1>

						<p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
							Powerful browser-based tools that work entirely
							offline. No uploads, no cloud storage, no tracking,
							no AI training on your data. Your files never leave
							your device.
						</p>

						{/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
							<Link
								href="#tools"
								className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:scale-105"
							>
								Explore Tools
								<ChevronRight className="ml-2 w-5 h-5" />
							</Link>
							<Link
								href="/privacy"
								className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
							>
								<Lock className="mr-2 w-5 h-5" />
								How We Protect You
							</Link>
						</div> */}

						{/* Trust indicators */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-20">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
								className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
							>
								<div className="flex items-center justify-center mb-3">
									<div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
										<Lock className="w-5 h-5 text-purple-400" />
									</div>
									<h3 className="text-lg font-semibold text-white">
										100% Offline
									</h3>
								</div>
								<p className="text-gray-400 text-sm">
									Everything runs in your browser. Your data
									never touches our servers.
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
							>
								<div className="flex items-center justify-center mb-3">
									<div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mr-3">
										<Zap className="w-5 h-5 text-amber-400" />
									</div>
									<h3 className="text-lg font-semibold text-white">
										Lightning Fast
									</h3>
								</div>
								<p className="text-gray-400 text-sm">
									No upload wait times. Process files
									instantly on your device.
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
							>
								<div className="flex items-center justify-center mb-3">
									<div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center mr-3">
										<Shield className="w-5 h-5 text-pink-400" />
									</div>
									<h3 className="text-lg font-semibold text-white">
										No AI Training
									</h3>
								</div>
								<p className="text-gray-400 text-sm">
									Your data is never used to train AI models.
									Complete privacy guaranteed.
								</p>
							</motion.div>
						</div>
					</motion.div>

					{/* Tools Grid */}
					<div
						id="tools"
						className="scroll-mt-20"
					>
						<motion.h2
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
							className="text-3xl font-bold text-white text-center mb-12"
						>
							Available Tools
						</motion.h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{tools.map((tool, index) => {
								const Icon = tool.icon;
								const isDeveloping =
									tool.status === "developing";

								const CardContent = (
									<motion.div
										key={tool.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.1 * index }}
										whileHover={{
											y: isDeveloping ? 0 : -5,
										}}
										className={`group ${
											isDeveloping
												? "cursor-not-allowed"
												: ""
										}`}
									>
										<div
											className={`relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 ${
												isDeveloping
													? "opacity-60"
													: "hover:border-white/20"
											} transition-all h-full`}
										>
											{/* Developing Badge */}
											{isDeveloping && (
												<div className="absolute top-4 right-4 z-20">
													<div className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full text-xs font-medium">
														<Construction className="w-3 h-3" />
														<span>Developing</span>
													</div>
												</div>
											)}

											<div
												className={`absolute inset-0 bg-gradient-to-br ${
													tool.color
												} opacity-0 ${
													isDeveloping
														? ""
														: "group-hover:opacity-10"
												} rounded-2xl transition-opacity`}
											/>

											<div className="relative z-10">
												<div className="flex items-start justify-between mb-4">
													<div
														className={`w-12 h-12 bg-gradient-to-br ${
															tool.color
														} rounded-xl flex items-center justify-center ${
															isDeveloping
																? ""
																: "group-hover:shadow-lg group-hover:shadow-" +
																  tool.shadowColor +
																  "/25"
														} transition-all`}
													>
														<Icon className="w-6 h-6 text-white" />
													</div>
												</div>

												<h3 className="text-xl font-semibold text-white mb-3">
													{tool.title}
												</h3>

												<p className="text-gray-400 text-sm mb-4">
													{tool.description}
												</p>

												<div className="flex items-center text-sm font-medium">
													<span
														className={`text-transparent bg-clip-text bg-gradient-to-r ${tool.color}`}
													>
														{isDeveloping
															? "Coming Soon"
															: "Open Tool"}
													</span>
													{!isDeveloping && (
														<ChevronRight className="ml-1 w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
													)}
												</div>
											</div>
										</div>
									</motion.div>
								);

								// Wrap with Link only if tool is active
								if (!isDeveloping) {
									return (
										<Link
											href={tool.link}
											key={tool.id}
										>
											{CardContent}
										</Link>
									);
								}

								return CardContent;
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
