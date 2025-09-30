"use client";

import React from "react";
import { motion } from "framer-motion";
import {
	Upload,
	Square,
	Download,
	ChevronRight,
	Layers,
	Crop,
	Palette,
	ArrowRight,
	Check,
	Info,
	Grid3x3,
	Sliders,
	Maximize2,
	LucideIcon,
} from "lucide-react";

interface Option {
	name: string;
	description: string;
	icon: string;
}

interface Setting {
	name: string;
	description: string;
}

interface Step {
	number: string;
	title: string;
	description: string;
	icon: LucideIcon;
	color: "purple" | "pink";
	tips?: string[];
	options?: Option[];
	settings?: Setting[];
	sizes?: string[];
	features?: string[];
}

interface Mode {
	title: string;
	icon: LucideIcon;
	description: string;
	steps: Step[];
}

export default function HowToUsePage() {
	const modes: Mode[] = [
		{
			title: "Square Mode",
			icon: Square,
			description:
				"Transform single images into perfect squares for Instagram",
			steps: [
				{
					number: "01",
					title: "Choose Your Image",
					description:
						"Click 'Choose Image' to upload a photo from your device.",
					icon: Upload,
					color: "purple",
					tips: ["Supports mainstream image formats"],
				},
				{
					number: "02",
					title: "Select Square Method",
					description:
						"Choose how to transform your image into a square format.",
					icon: Crop,
					color: "pink",
					options: [
						{
							name: "Crop",
							description:
								"Manually crop your image to a perfect 1:1 ratio",
							icon: "✂️",
						},
						{
							name: "Fill with Color",
							description:
								"Add colored padding to maintain full image",
							icon: "🎨",
						},
						{
							name: "Fill with Blur",
							description:
								"Add blurred background for artistic effect",
							icon: "🌫️",
						},
					],
				},
				{
					number: "03",
					title: "Choose Output Size",
					description:
						"Select your preferred resolution for the final image.",
					icon: Maximize2,
					color: "purple",
					sizes: [
						"From 1080×1080 (Instagram Standard)",
						"Up to 8192x8192 (8K ultra-high quality)",
						"Custom sizes based on original resolution",
						"Final resolution cannot exceed the original",
					],
				},
				{
					number: "04",
					title: "Generate & Download",
					description:
						"Click 'Generate Square' to process and download your perfectly formatted image.",
					icon: Download,
					color: "pink",
					features: ["Instant processing", "High quality output"],
				},
			],
		},
		{
			title: "Stitch Mode",
			icon: Grid3x3,
			description: "Combine 2 images into a single square collage",
			steps: [
				{
					number: "01",
					title: "Upload Two Images",
					description:
						"Add Image A and Image B to create your collage.",
					icon: Layers,
					color: "purple",
					tips: [
						"Upload two separate images",
						"Images can be different sizes",
						"Supports mainstream image formats",
					],
				},
				{
					number: "02",
					title: "Choose Direction",
					description: "Select how to arrange your images.",
					icon: Sliders,
					color: "pink",
					options: [
						{
							name: "Horizontal",
							description: "Places images side by side",
							icon: "↔️",
						},
						{
							name: "Vertical",
							description: "Stacks images top to bottom",
							icon: "↕️",
						},
					],
				},
				{
					number: "03",
					title: "Adjust Layout",
					description: "Fine-tune the appearance of your collage.",
					icon: Palette,
					color: "purple",
					settings: [
						{
							name: "Width Distribution",
							description:
								"Adjust the space each image takes (50%/50% default)",
						},
						{
							name: "Gap",
							description: "Set spacing between images (0-100px)",
						},
						{
							name: "Padding",
							description:
								"Add padding around the entire collage (0-100px)",
						},
						{
							name: "Background",
							description:
								"Choose background color with color picker",
						},
					],
				},
				{
					number: "04",
					title: "Stitch Images",
					description:
						"Click 'Stitch Images' to combine and download your collage.",
					icon: Download,
					color: "pink",
					features: [
						"Instant processing",
						"High quality output",
						"More freedom in editing within the collage",
					],
				},
			],
		},
	];

	return (
		<div className="min-h-screen bg-black relative overflow-hidden">
			{/* Background gradients */}
			<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
				<div className="absolute top-[50%] left-[20%] w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" />
			</div>

			<div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-16"
				>
					<h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
						How to Use
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
							InstaSquare
						</span>
					</h1>
					<p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
						Transform your images into perfect Instagram posts with
						our two powerful modes
					</p>
				</motion.div>

				{/* Modes */}
				<div className="space-y-20">
					{modes.map((mode, modeIndex) => (
						<motion.div
							key={mode.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: modeIndex * 0.2 }}
						>
							{/* Mode Header */}
							<div className="flex items-center gap-4 mb-10">
								<div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
									<mode.icon className="w-7 h-7 text-purple-400" />
								</div>
								<div>
									<h2 className="text-2xl lg:text-3xl font-bold text-white">
										{mode.title}
									</h2>
									<p className="text-gray-400 text-sm lg:text-base mt-1">
										{mode.description}
									</p>
								</div>
							</div>

							{/* Steps Grid */}
							<div className="grid gap-8 lg:gap-10">
								{mode.steps.map((step, index) => (
									<motion.div
										key={step.number}
										initial={{
											opacity: 0,
											x: index % 2 === 0 ? -20 : 20,
										}}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											delay:
												modeIndex * 0.2 + index * 0.1,
										}}
										className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-white/10"
									>
										{/* Step Header */}
										<div className="flex items-start gap-4 mb-4">
											<span
												className={`text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${
													step.color === "purple"
														? "from-purple-400 to-purple-600"
														: "from-pink-400 to-pink-600"
												}`}
											>
												{step.number}
											</span>
											<div className="flex-1">
												<h3 className="text-xl lg:text-2xl font-bold text-white">
													{step.title}
												</h3>
												<p className="text-gray-400 text-sm lg:text-base mt-1">
													{step.description}
												</p>
											</div>
										</div>

										{/* Step Content */}
										<div className="ml-0 lg:ml-14 space-y-4">
											{step.tips && (
												<ul className="space-y-2">
													{step.tips.map((tip, i) => (
														<li
															key={i}
															className="flex items-start gap-3 text-sm lg:text-base text-gray-400"
														>
															<Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
															<span>{tip}</span>
														</li>
													))}
												</ul>
											)}

											{step.options && (
												<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
													{step.options.map(
														(option, i) => (
															<div
																key={i}
																className="bg-black/30 rounded-xl p-4 border border-white/10"
															>
																<div className="flex items-center gap-2 mb-2">
																	<span className="text-xl">
																		{
																			option.icon
																		}
																	</span>
																	<h4 className="font-semibold text-white">
																		{
																			option.name
																		}
																	</h4>
																</div>
																<p className="text-xs lg:text-sm text-gray-400">
																	{
																		option.description
																	}
																</p>
															</div>
														)
													)}
												</div>
											)}

											{step.settings && (
												<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
													{step.settings.map(
														(setting, i) => (
															<div
																key={i}
																className="bg-black/30 rounded-xl p-4 border border-white/10"
															>
																<h4 className="font-semibold text-white mb-1">
																	{
																		setting.name
																	}
																</h4>
																<p className="text-xs lg:text-sm text-gray-400">
																	{
																		setting.description
																	}
																</p>
															</div>
														)
													)}
												</div>
											)}

											{step.sizes && (
												<ul className="space-y-2">
													{step.sizes.map(
														(size, i) => (
															<li
																key={i}
																className="flex items-center gap-3 text-sm lg:text-base text-gray-400"
															>
																<ArrowRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
																<span>
																	{size}
																</span>
															</li>
														)
													)}
												</ul>
											)}

											{step.features && (
												<ul className="space-y-2">
													{step.features.map(
														(feature, i) => (
															<li
																key={i}
																className="flex items-start gap-3 text-sm lg:text-base text-gray-400"
															>
																<Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
																<span>
																	{feature}
																</span>
															</li>
														)
													)}
												</ul>
											)}
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					))}
				</div>

				{/* Tips Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8 }}
					className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 lg:p-8 border border-white/10 mt-16 mb-12"
				>
					<div className="flex items-start gap-4">
						<Info className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
						<div className="flex-1">
							<h3 className="text-lg lg:text-xl font-semibold text-white mb-3">
								Pro Tips
							</h3>
							<ul className="space-y-2 text-sm lg:text-base text-gray-400">
								<li>
									• Use high-resolution images for best
									quality results
								</li>
								<li>
									• Instagram recommends 1080×1080px for
									square posts
								</li>
								<li>
									• For Stitch mode, use images with similar
									lighting for cohesive look
								</li>
								<li>
									• Experiment with gap and padding in Stitch
									mode for unique layouts
								</li>
								<li>
									• Fill with Blur creates a professional
									depth-of-field effect
								</li>
								<li>
									• All processing is done locally - your
									images never leave your device
								</li>
							</ul>
						</div>
					</div>
				</motion.div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.9 }}
					className="text-center"
				>
					<h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
						Ready to Try InstaSquare?
					</h2>
					<a
						href="/instasquare/editor"
						className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:scale-105"
					>
						Start Editing Now
						<ChevronRight className="ml-2 w-5 h-5" />
					</a>
				</motion.div>
			</div>
		</div>
	);
}
