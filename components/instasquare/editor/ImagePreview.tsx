"use client";

import React from "react";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImagePreviewProps {
	url: string | null;
	alt: string;
	className?: string;
}

export default function ImagePreview({
	url,
	alt,
	className = "",
}: ImagePreviewProps) {
	return (
		<div
			className={`aspect-square bg-black/50 rounded-xl overflow-hidden border border-white/10 relative ${className}`}
		>
			{url ? (
				<Image
					src={url}
					alt={alt}
					fill
					className="object-contain"
				/>
			) : (
				<div className="w-full h-full flex items-center justify-center text-gray-600">
					<div className="text-center">
						<ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
						<p className="text-sm">
							{alt === "Result"
								? "Result will appear here"
								: "No image selected"}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
