"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Upload, Download, Plus, Layers } from "lucide-react";
import {
	loadImage,
	type StitchDirection,
} from "@/utils/instasquare/imageProcessing";

export default function StitchEditor() {
	const [fileA, setFileA] = useState<File | null>(null);
	const [fileB, setFileB] = useState<File | null>(null);
	const [urlA, setUrlA] = useState<string | null>(null);
	const [urlB, setUrlB] = useState<string | null>(null);
	const [resultUrl, setResultUrl] = useState<string | null>(null);
	const [direction, setDirection] = useState<StitchDirection>("horizontal");
	const [gap, setGap] = useState(20);
	const [bgColor, setBgColor] = useState("#0a0a0a");
	const [widthRatio, setWidthRatio] = useState(50);
	const [padding, setPadding] = useState(20);
	const [processing, setProcessing] = useState(false);

	const handleSelectA = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (!file) return;
			if (urlA) URL.revokeObjectURL(urlA);
			setFileA(file);
			setUrlA(URL.createObjectURL(file));
			setResultUrl(null);
		},
		[urlA]
	);

	const handleSelectB = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (!file) return;
			if (urlB) URL.revokeObjectURL(urlB);
			setFileB(file);
			setUrlB(URL.createObjectURL(file));
			setResultUrl(null);
		},
		[urlB]
	);

	const processStitch = useCallback(async () => {
		if (!fileA || !fileB) return;

		setProcessing(true);
		const tempA = URL.createObjectURL(fileA);
		const tempB = URL.createObjectURL(fileB);

		try {
			const imgA = await loadImage(tempA);
			const imgB = await loadImage(tempB);

			// Custom stitching with width ratio
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			if (!ctx) throw new Error("Failed to get canvas context");

			// Always create a square canvas
			const squareSize = 1080; // Instagram square size
			canvas.width = squareSize;
			canvas.height = squareSize;

			// Fill background
			ctx.fillStyle = bgColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Calculate available space after padding
			const availableWidth = squareSize - padding * 2;
			const availableHeight = squareSize - padding * 2;

			if (direction === "horizontal") {
				// Calculate dimensions based on ratio for horizontal layout
				const totalContentWidth = availableWidth - gap;
				const widthA = Math.floor(
					totalContentWidth * (widthRatio / 100)
				);
				const widthB = totalContentWidth - widthA;

				// Draw image A (left side)
				const scaleA = Math.min(
					widthA / imgA.width,
					availableHeight / imgA.height
				);
				const drawWidthA = imgA.width * scaleA;
				const drawHeightA = imgA.height * scaleA;
				const xA = padding + (widthA - drawWidthA) / 2;
				const yA = padding + (availableHeight - drawHeightA) / 2;
				ctx.drawImage(imgA, xA, yA, drawWidthA, drawHeightA);

				// Draw image B (right side)
				const scaleB = Math.min(
					widthB / imgB.width,
					availableHeight / imgB.height
				);
				const drawWidthB = imgB.width * scaleB;
				const drawHeightB = imgB.height * scaleB;
				const xB = padding + widthA + gap + (widthB - drawWidthB) / 2;
				const yB = padding + (availableHeight - drawHeightB) / 2;
				ctx.drawImage(imgB, xB, yB, drawWidthB, drawHeightB);
			} else {
				// Vertical stitch with height ratio
				const totalContentHeight = availableHeight - gap;
				const heightA = Math.floor(
					totalContentHeight * (widthRatio / 100)
				);
				const heightB = totalContentHeight - heightA;

				// Draw image A (top)
				const scaleA = Math.min(
					availableWidth / imgA.width,
					heightA / imgA.height
				);
				const drawWidthA = imgA.width * scaleA;
				const drawHeightA = imgA.height * scaleA;
				const xA = padding + (availableWidth - drawWidthA) / 2;
				const yA = padding + (heightA - drawHeightA) / 2;
				ctx.drawImage(imgA, xA, yA, drawWidthA, drawHeightA);

				// Draw image B (bottom)
				const scaleB = Math.min(
					availableWidth / imgB.width,
					heightB / imgB.height
				);
				const drawWidthB = imgB.width * scaleB;
				const drawHeightB = imgB.height * scaleB;
				const xB = padding + (availableWidth - drawWidthB) / 2;
				const yB =
					padding + heightA + gap + (heightB - drawHeightB) / 2;
				ctx.drawImage(imgB, xB, yB, drawWidthB, drawHeightB);
			}

			// Convert to blob
			const blob = await new Promise<Blob>((resolve) => {
				canvas.toBlob((blob) => {
					if (blob) resolve(blob);
				}, "image/png");
			});

			if (resultUrl) URL.revokeObjectURL(resultUrl);
			setResultUrl(URL.createObjectURL(blob));
		} catch (error) {
			console.error("Stitching failed:", error);
		} finally {
			URL.revokeObjectURL(tempA);
			URL.revokeObjectURL(tempB);
			setProcessing(false);
		}
	}, [fileA, fileB, direction, gap, bgColor, widthRatio, padding, resultUrl]);

	const download = useCallback(() => {
		if (!resultUrl) return;
		const a = document.createElement("a");
		a.href = resultUrl;
		a.download = `instagram-stitch-${Date.now()}.png`;
		a.click();
	}, [resultUrl]);

	// Cleanup
	React.useEffect(() => {
		return () => {
			if (urlA) URL.revokeObjectURL(urlA);
			if (urlB) URL.revokeObjectURL(urlB);
			if (resultUrl) URL.revokeObjectURL(resultUrl);
		};
	}, [resultUrl, urlA, urlB]);

	return (
		<div className="grid lg:grid-cols-2 gap-8">
			{/* Input Section */}
			<div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
				<h2 className="text-xl font-semibold text-white mb-6 flex items-center">
					<Upload className="w-5 h-5 mr-2" />
					Source Images
				</h2>

				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block">
							<input
								type="file"
								accept="image/*"
								onChange={handleSelectA}
								className="hidden"
							/>
							<div className="cursor-pointer bg-purple-500/20 border border-purple-500/40 text-white font-medium py-2 px-4 rounded-lg text-center hover:bg-purple-500/30 transition-all text-sm">
								Image A
							</div>
						</label>
						<label className="block mt-2">
							<input
								type="file"
								accept="image/*"
								onChange={handleSelectA}
								className="hidden"
							/>
							<div className="aspect-square bg-black/50 rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:border-purple-500/50 transition-all">
								{urlA ? (
									<div className="relative w-full h-full">
										<Image
											src={urlA}
											alt="A"
											fill
											className="object-contain"
											sizes="(max-width: 768px) 50vw, 25vw"
										/>
									</div>
								) : (
									<div className="w-full h-full flex items-center justify-center">
										<Plus className="w-8 h-8 text-gray-600" />
									</div>
								)}
							</div>
						</label>
					</div>

					<div>
						<label className="block">
							<input
								type="file"
								accept="image/*"
								onChange={handleSelectB}
								className="hidden"
							/>
							<div className="cursor-pointer bg-pink-500/20 border border-pink-500/40 text-white font-medium py-2 px-4 rounded-lg text-center hover:bg-pink-500/30 transition-all text-sm">
								Image B
							</div>
						</label>
						<label className="block mt-2">
							<input
								type="file"
								accept="image/*"
								onChange={handleSelectB}
								className="hidden"
							/>
							<div className="aspect-square bg-black/50 rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:border-pink-500/50 transition-all">
								{urlB ? (
									<div className="relative w-full h-full">
										<Image
											src={urlB}
											alt="B"
											fill
											className="object-contain"
											sizes="(max-width: 768px) 50vw, 25vw"
										/>
									</div>
								) : (
									<div className="w-full h-full flex items-center justify-center">
										<Plus className="w-8 h-8 text-gray-600" />
									</div>
								)}
							</div>
						</label>
					</div>
				</div>

				<div className="space-y-3 mb-4">
					<div>
						<label className="text-sm text-gray-400 mb-1 block">
							Direction
						</label>
						<div className="grid grid-cols-2 gap-2">
							<button
								onClick={() => setDirection("horizontal")}
								className={`py-2 px-4 rounded-lg border transition-all ${
									direction === "horizontal"
										? "bg-purple-500/20 border-purple-500/40 text-white"
										: "bg-white/5 border-white/10 text-gray-400"
								}`}
							>
								Horizontal
							</button>
							<button
								onClick={() => setDirection("vertical")}
								className={`py-2 px-4 rounded-lg border transition-all ${
									direction === "vertical"
										? "bg-purple-500/20 border-purple-500/40 text-white"
										: "bg-white/5 border-white/10 text-gray-400"
								}`}
							>
								Vertical
							</button>
						</div>
					</div>

					<div>
						<label className="text-sm text-gray-400 mb-1 block">
							{direction === "horizontal" ? "Width" : "Height"}{" "}
							Distribution: {widthRatio}% / {100 - widthRatio}%
						</label>
						<div className="flex items-center gap-2">
							<span className="text-xs text-purple-400">A</span>
							<input
								type="range"
								min={20}
								max={80}
								value={widthRatio}
								onChange={(e) =>
									setWidthRatio(Number(e.target.value))
								}
								className="flex-1 accent-purple-500"
							/>
							<span className="text-xs text-pink-400">B</span>
						</div>
						<div className="flex justify-between mt-1">
							<span className="text-xs text-gray-500">
								{widthRatio}%
							</span>
							<span className="text-xs text-gray-500">
								{100 - widthRatio}%
							</span>
						</div>
					</div>

					<div>
						<label className="text-sm text-gray-400 mb-1 block">
							Gap: {gap}px
						</label>
						<input
							type="range"
							min={0}
							max={100}
							value={gap}
							onChange={(e) => setGap(Number(e.target.value))}
							className="w-full accent-purple-500"
						/>
					</div>

					<div>
						<label className="text-sm text-gray-400 mb-1 block">
							Padding: {padding}px
						</label>
						<input
							type="range"
							min={0}
							max={100}
							value={padding}
							onChange={(e) => setPadding(Number(e.target.value))}
							className="w-full accent-purple-500"
						/>
					</div>

					<div>
						<label className="text-sm text-gray-400 mb-1 block">
							Background
						</label>
						<div className="flex gap-2">
							<input
								type="color"
								value={bgColor}
								onChange={(e) => setBgColor(e.target.value)}
								className="w-12 h-10 bg-transparent border border-white/20 rounded-lg cursor-pointer"
							/>
							<input
								type="text"
								value={bgColor}
								onChange={(e) => setBgColor(e.target.value)}
								className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
							/>
						</div>
					</div>
				</div>

				<button
					onClick={processStitch}
					disabled={!fileA || !fileB || processing}
					className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25 transition-all"
				>
					{processing ? "Processing..." : "Stitch Images"}
				</button>
			</div>

			{/* Result Section */}
			<div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
				<h2 className="text-xl font-semibold text-white mb-6 flex items-center">
					<Layers className="w-5 h-5 mr-2" />
					Result
				</h2>

				<div
					className="bg-black/50 rounded-xl overflow-hidden border border-white/10 mb-4"
					style={{ minHeight: "400px" }}
				>
					{resultUrl ? (
						<div
							className="relative w-full"
							style={{ minHeight: "400px" }}
						>
							<Image
								src={resultUrl}
								alt="Result"
								fill
								className="object-contain"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>
					) : (
						<div
							className="w-full h-full flex items-center justify-center text-gray-600"
							style={{ minHeight: "400px" }}
						>
							<div className="text-center">
								<Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
								<p className="text-sm">
									Stitched result will appear here
								</p>
							</div>
						</div>
					)}
				</div>

				{resultUrl && (
					<button
						onClick={download}
						className="w-full py-3 bg-white/10 backdrop-blur text-white font-medium rounded-xl hover:bg-white/20 transition-all flex items-center justify-center"
					>
						<Download className="w-5 h-5 mr-2" />
						Download Image
					</button>
				)}
			</div>
		</div>
	);
}
