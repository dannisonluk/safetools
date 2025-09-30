"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Square, Layers2, Shield } from "lucide-react";
import SquareEditor from "@/components/instasquare/editor/SquareEditor";
import StitchEditor from "@/components/instasquare/editor/StitchEditor";
import PrivacyBadge from "@/components/instasquare/editor/PrivacyBadge";

type EditorMode = "square" | "stitch";

export default function EditorPage() {
	const [mode, setMode] = useState<EditorMode>("square");

	return (
		<div className="min-h-screen bg-black">
			<div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10" />

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<h1 className="text-4xl font-bold text-white mb-2">
						Image Editor
					</h1>
					<p className="text-gray-400">
						Create perfect Instagram content with privacy-first
						tools
					</p>
				</motion.div>

				<PrivacyBadge />

				{/* Mode Selector */}
				<div className="mb-8">
					<div className="inline-flex bg-white/5 backdrop-blur-lg rounded-xl p-1 border border-white/10">
						<button
							onClick={() => setMode("square")}
							className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
								mode === "square"
									? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
									: "text-gray-400 hover:text-white"
							}`}
						>
							<Square className="w-5 h-5 mr-2" />
							Square Mode
						</button>
						<button
							onClick={() => setMode("stitch")}
							className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
								mode === "stitch"
									? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
									: "text-gray-400 hover:text-white"
							}`}
						>
							<Layers2 className="w-5 h-5 mr-2" />
							Stitch Mode
						</button>
					</div>
				</div>

				{/* Editor Content */}
				<motion.div
					key={mode}
					initial={{ opacity: 0, x: mode === "square" ? -20 : 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3 }}
				>
					{mode === "square" ? <SquareEditor /> : <StitchEditor />}
				</motion.div>

				{/* Privacy Reminder */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="mt-12 text-center"
				>
					<div className="inline-flex items-center text-sm text-gray-500">
						<Shield className="w-4 h-4 mr-2" />
						All processing happens locally • Your images never leave
						your device
					</div>
				</motion.div>
			</div>
		</div>
	);
}
