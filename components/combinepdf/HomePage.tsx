"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock, Zap, FileText, ChevronRight } from "lucide-react";

export default function HomePage() {
	return (
		<div className="bg-black">
			<div className="min-h-[calc(100vh-64px)] bg-black relative overflow-hidden flex items-center">
				{/* Background gradient - yellow theme */}
				<div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-yellow-900/20" />

				{/* Glow blobs - yellow theme */}
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
					<div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
					<div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl" />
					<div className="absolute bottom-1/3 right-2/5 w-72 h-72 bg-yellow-500/15 rounded-full blur-3xl" />
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center"
					>
						<h1 className="text-3xl lg:text-7xl font-bold text-white mb-6">
							<p className="mb-2 text-5xl lg:text-7xl block">
								<span className="text-white">❌</span>{" "}
								{/* Lock icon in white */}
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">
									AI Dataset
								</span>
							</p>
							Combine Your PDFs
						</h1>

						<p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
							Merge PDF files directly in your browser. No
							uploads, no server storage, no AI training. Your
							documents stay completely private and secure.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
							<Link
								href="/combinepdf/combine"
								className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all transform hover:scale-105"
							>
								Start Combining
								<ChevronRight className="ml-2 w-5 h-5" />
							</Link>
							<Link
								href="/combinepdf/privacy"
								className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
							>
								<Shield className="mr-2 w-5 h-5" />
								Privacy First
							</Link>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
								className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
							>
								<div className="flex items-center justify-center mb-3">
									<div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mr-3">
										<Lock className="w-5 h-5 text-amber-400" />
									</div>
									<h3 className="text-lg font-semibold text-white">
										100% Private
									</h3>
								</div>
								<p className="text-gray-400 text-sm">
									All processing happens in your browser. No
									uploads, no storage, no AI training
									datasets.
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
							>
								<div className="flex items-center justify-center mb-3">
									<div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-3">
										<Zap className="w-5 h-5 text-yellow-400" />
									</div>
									<h3 className="text-lg font-semibold text-white">
										Lightning Fast
									</h3>
								</div>
								<p className="text-gray-400 text-sm">
									Instant processing with no server delays.
									Combine and download in seconds.
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
							>
								<div className="flex items-center justify-center mb-3">
									<div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mr-3">
										<FileText className="w-5 h-5 text-amber-400" />
									</div>
									<h3 className="text-lg font-semibold text-white">
										Smart Features
									</h3>
								</div>
								<p className="text-gray-400 text-sm">
									Reorder pages, rotate, delete unwanted
									pages, and export high-quality PDFs.
								</p>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
