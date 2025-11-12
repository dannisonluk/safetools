"use client";

import React, { useState, useCallback } from "react";
import { Upload, Download, Crop, Palette, ImageIcon } from "lucide-react";
import ImagePreview from "./ImagePreview";
import {
	squareByCrop,
	squareWithColor,
	squareWithBlur,
	loadImage,
} from "@/utils/instasquare/imageProcessing";

import { Listbox, ListboxOption } from "@/components/instasquare/Listbox";

const sizeOptions: Array<ListboxOption<number>> = [
	{ label: "1080×1080 (Instagram)", value: 1080 },
	{ label: "2048×2048 (High)", value: 2048 },
	{ label: "4096×4096 (4K)", value: 4096 },
	{ label: "8192×8192 (8K)", value: 8192 },
];

export default function SquareEditor() {
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [resultUrl, setResultUrl] = useState<string | null>(null);
	const [mode, setMode] = useState<"crop" | "color" | "blur">("crop");
	const [bgColor, setBgColor] = useState("#1a1a1a");
	const [size, setSize] = useState(1080);
	const [processing, setProcessing] = useState(false);

	const handleFileSelect = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFile = e.target.files?.[0];
			if (!selectedFile) return;

			// Clean up previous URLs
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			if (resultUrl) URL.revokeObjectURL(resultUrl);

			setFile(selectedFile);
			setPreviewUrl(URL.createObjectURL(selectedFile));
			setResultUrl(null);
		},
		[previewUrl, resultUrl]
	);

	const processImage = useCallback(async () => {
		if (!file) return;

		setProcessing(true);
		const tempUrl = URL.createObjectURL(file);

		try {
			const img = await loadImage(tempUrl);
			let blob: Blob;

			switch (mode) {
				case "crop":
					blob = await squareByCrop(img, size);
					break;
				case "color":
					blob = await squareWithColor(img, size, bgColor);
					break;
				case "blur":
					blob = await squareWithBlur(img, size);
					break;
			}

			if (resultUrl) URL.revokeObjectURL(resultUrl);
			setResultUrl(URL.createObjectURL(blob));
		} catch (error) {
			console.error("Processing failed:", error);
		} finally {
			URL.revokeObjectURL(tempUrl);
			setProcessing(false);
		}
	}, [file, mode, size, bgColor, resultUrl]);

	const download = useCallback(() => {
		if (!resultUrl) return;
		const a = document.createElement("a");
		a.href = resultUrl;
		a.download = `instagram-square-${Date.now()}.png`;
		a.click();
	}, [resultUrl]);

	// Cleanup on unmount
	React.useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			if (resultUrl) URL.revokeObjectURL(resultUrl);
		};
	}, [previewUrl, resultUrl]);

	return (
		<div className="grid lg:grid-cols-2 gap-8">
			{/* Input Section */}
			<div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
				<h2 className="text-xl font-semibold text-white mb-6 flex items-center">
					<Upload className="w-5 h-5 mr-2" />
					Source Image
				</h2>

				<div className="space-y-4 mb-6">
					<label className="block">
						<input
							type="file"
							accept="image/*"
							onChange={handleFileSelect}
							className="hidden"
						/>
						<div className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 px-6 rounded-xl text-center hover:shadow-lg hover:shadow-purple-500/25 transition-all">
							Choose Image
						</div>
					</label>

					{/* Mode Selection */}
					<div className="grid grid-cols-3 gap-2">
						<button
							onClick={() => setMode("crop")}
							className={`p-3 rounded-lg border transition-all ${
								mode === "crop"
									? "bg-purple-500/20 border-purple-500/40 text-white"
									: "bg-white/5 border-white/10 text-gray-400"
							}`}
						>
							<Crop className="w-4 h-4 mx-auto mb-1" />
							<span className="text-xs">Crop</span>
						</button>
						<button
							onClick={() => setMode("color")}
							className={`p-3 rounded-lg border transition-all ${
								mode === "color"
									? "bg-purple-500/20 border-purple-500/40 text-white"
									: "bg-white/5 border-white/10 text-gray-400"
							}`}
						>
							<Palette className="w-4 h-4 mx-auto mb-1" />
							<span className="text-xs">Color Fill</span>
						</button>
						<button
							onClick={() => setMode("blur")}
							className={`p-3 rounded-lg border transition-all ${
								mode === "blur"
									? "bg-purple-500/20 border-purple-500/40 text-white"
									: "bg-white/5 border-white/10 text-gray-400"
							}`}
						>
							<ImageIcon className="w-4 h-4 mx-auto mb-1" />
							<span className="text-xs">Blur Fill</span>
						</button>
					</div>

					{/* Settings */}
					<div className="space-y-3">
						<div>
							<label className="text-sm text-gray-400 mb-1 block">
								Output Size (Restricted by original resolution)
							</label>
							<Listbox
								value={size}
								onChange={setSize}
								options={sizeOptions}
							/>
						</div>

						{mode === "color" && (
							<div>
								<label className="text-sm text-gray-400 mb-1 block">
									Background Color
								</label>
								<div className="flex gap-2">
									<input
										type="color"
										value={bgColor}
										onChange={(e) =>
											setBgColor(e.target.value)
										}
										className="w-12 h-10 bg-transparent border border-white/20 rounded-lg cursor-pointer"
									/>
									<input
										type="text"
										value={bgColor}
										onChange={(e) =>
											setBgColor(e.target.value)
										}
										className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
									/>
								</div>
							</div>
						)}
					</div>

					<button
						onClick={processImage}
						disabled={!file || processing}
						className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25 transition-all"
					>
						{processing ? "Processing..." : "Generate Square"}
					</button>
				</div>

				<ImagePreview
					url={previewUrl}
					alt="Original"
				/>
			</div>

			{/* Result Section */}
			<div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
				<h2 className="text-xl font-semibold text-white mb-6">
					Result
				</h2>

				<ImagePreview
					url={resultUrl}
					alt="Result"
				/>

				{resultUrl && (
					<button
						onClick={download}
						className="w-full mt-4 py-3 bg-white/10 backdrop-blur text-white font-medium rounded-xl hover:bg-white/20 transition-all flex items-center justify-center"
					>
						<Download className="w-5 h-5 mr-2" />
						Download Image
					</button>
				)}
			</div>
		</div>
	);
}
