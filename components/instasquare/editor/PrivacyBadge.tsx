"use client";

import React from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyBadge() {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20"
		>
			<div className="flex items-center text-sm text-gray-300">
				<Shield className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
				<span>
					Your images are processed locally and never leave your
					device
				</span>
			</div>
		</motion.div>
	);
}
