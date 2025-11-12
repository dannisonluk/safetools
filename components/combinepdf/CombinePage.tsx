"use client";

import React, {
	useState,
	useCallback,
	useRef,
	ChangeEvent,
	DragEvent,
} from "react";
import { motion } from "framer-motion";
import {
	Download,
	FileText,
	Shield,
	X,
	ChevronUp,
	ChevronDown,
} from "lucide-react";
import { DragEndEvent, DndContext, closestCenter } from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { combinePDFs, downloadBlob } from "@/utils/combinepdf/pdfCombiner";

interface PDFFile {
	id: string;
	file: File;
	name: string;
	size: number;
	pageCount: number | null;
}

function SortableFile({
	file,
	onRemove,
	onMove,
	isFirst,
	isLast,
}: {
	file: PDFFile;
	onRemove: (id: string) => void;
	onMove: (id: string, direction: "up" | "down") => void;
	isFirst: boolean;
	isLast: boolean;
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: file.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<motion.div
			ref={setNodeRef}
			style={style}
			className="bg-black/30 rounded-lg p-3 flex items-center justify-between group border-gray-500 border-1"
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
		>
			{/* Drag handle and file info container */}
			<div
				className="flex items-center flex-1 min-w-0 pr-2"
				{...attributes}
				{...listeners}
			>
				<FileText className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" />
				<div className="min-w-0">
					<p className="text-white text-sm truncate">{file.name}</p>
					<p className="text-gray-500 text-xs">
						{(file.size / 1024).toFixed(1)} KB
					</p>
				</div>
			</div>

			{/* Action buttons */}
			<div className="flex items-center space-x-2 flex-shrink-0">
				<button
					type="button"
					onClick={() => onMove(file.id, "up")}
					disabled={isFirst}
					className="p-1 text-gray-400 hover:text-amber-400 disabled:opacity-30"
				>
					<ChevronUp className="w-4 h-4" />
				</button>
				<button
					type="button"
					onClick={() => onMove(file.id, "down")}
					disabled={isLast}
					className="p-1 text-gray-400 hover:text-amber-400 disabled:opacity-30"
				>
					<ChevronDown className="w-4 h-4" />
				</button>
				<button
					type="button"
					onClick={() => onRemove(file.id)}
					className="p-1 text-gray-400 hover:text-red-400"
				>
					<X className="w-4 h-4" />
				</button>
			</div>
		</motion.div>
	);
}

export default function CombinePage() {
	const [files, setFiles] = useState<PDFFile[]>([]);
	const [processing, setProcessing] = useState(false);
	const [dragActive, setDragActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFiles = useCallback((newFiles: File[]) => {
		const pdfFiles = newFiles.filter(
			(file) => file.type === "application/pdf"
		);
		const filesWithId: PDFFile[] = pdfFiles.map((file) => ({
			id: Math.random().toString(36).substr(2, 9),
			file,
			name: file.name,
			size: file.size,
			pageCount: null,
		}));
		setFiles((prev) => [...prev, ...filesWithId]);
	}, []);

	const handleFileSelect = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			if (e.target.files) {
				handleFiles(Array.from(e.target.files));
			}
		},
		[handleFiles]
	);

	const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(e.type === "dragenter" || e.type === "dragover");
	}, []);

	const handleDrop = useCallback(
		(e: DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setDragActive(false);
			if (e.dataTransfer.files) {
				handleFiles(Array.from(e.dataTransfer.files));
			}
		},
		[handleFiles]
	);

	const handleRemove = useCallback((id: string) => {
		setFiles((prev) => prev.filter((f) => f.id !== id));
	}, []);

	const handleMove = useCallback((id: string, direction: "up" | "down") => {
		setFiles((prev) => {
			const index = prev.findIndex((f) => f.id === id);
			if (index === -1) return prev;

			const newIndex = direction === "up" ? index - 1 : index + 1;
			if (newIndex < 0 || newIndex >= prev.length) return prev;

			return arrayMove(prev, index, newIndex);
		});
	}, []);

	const handleCombine = useCallback(async () => {
		if (files.length < 2) return;
		setProcessing(true);
		try {
			const pdfBlob = await combinePDFs(files.map((f) => f.file));
			downloadBlob(pdfBlob, "combined.pdf");
		} catch (err) {
			console.error("Error combining PDFs:", err);
			alert("Failed to combine PDFs. Please try again.");
		} finally {
			setProcessing(false);
		}
	}, [files]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;

		if (active.id !== over.id) {
			setFiles((prev) => {
				const oldIndex = prev.findIndex((f) => f.id === active.id);
				const newIndex = prev.findIndex((f) => f.id === over.id);
				return arrayMove(prev, oldIndex, newIndex);
			});
		}
	};

	return (
		<div className="min-h-[calc(100vh-64px)] bg-black">
			<div className="fixed inset-0 bg-gradient-to-br from-amber-900/10 via-black to-yellow-900/10" />
			<div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8"
				>
					<h1 className="text-4xl font-bold text-white mb-2">
						PDF Combiner
					</h1>
					<p className="text-gray-400">
						Merge multiple PDF files into one - completely private
						and secure
					</p>
				</motion.div>

				{/* Privacy Badge */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="mb-6 inline-flex items-center bg-amber-500/10 backdrop-blur-lg rounded-full px-4 py-2 border border-amber-500/20"
				>
					<Shield className="w-4 h-4 text-amber-400 mr-2" />
					<span className="text-sm text-amber-400">
						Processing locally • No uploads • No AI training
					</span>
				</motion.div>

				{/* Upload Section */}
				<div
					className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
						dragActive
							? "border-amber-500 bg-amber-500/10"
							: "border-white/20 hover:border-amber-500/50"
					}`}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
				>
					<input
						ref={fileInputRef}
						type="file"
						multiple
						accept="application/pdf"
						onChange={handleFileSelect}
						className="hidden"
					/>
					<FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
					<p className="text-white mb-2">
						Drag & drop PDF files here
					</p>
					<p className="text-gray-400 text-sm mb-4">or</p>
					<button
						onClick={() => fileInputRef.current?.click()}
						className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-medium rounded-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all"
					>
						Browse Files
					</button>
				</div>

				{/* File List */}
				{files.length > 0 && (
					<div className="mt-6 space-y-2">
						<p className="text-sm text-gray-400 mb-2">
							{files.length} file{files.length !== 1 ? "s" : ""}{" "}
							selected{" "}
							<span className="text-white font-bold">
								(Drag or use arrows to change sequence)
							</span>
						</p>
						<DndContext
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext
								items={files.map((f) => f.id)}
								strategy={verticalListSortingStrategy}
							>
								<div className="space-y-2">
									{files.map((file, index) => (
										<SortableFile
											key={file.id}
											file={file}
											onRemove={handleRemove}
											onMove={handleMove}
											isFirst={index === 0}
											isLast={index === files.length - 1}
										/>
									))}
								</div>
							</SortableContext>
						</DndContext>
					</div>
				)}

				{/* Action Button */}
				<div className="mt-6">
					<button
						onClick={handleCombine}
						disabled={files.length < 2 || processing}
						className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center"
					>
						{processing ? (
							<>
								<Download className="w-5 h-5 mr-2 animate-spin" />
								Processing...
							</>
						) : (
							<>
								<Download className="w-5 h-5 mr-2" />
								Combine {files.length} PDFs
							</>
						)}
					</button>
				</div>

				{/* Privacy Reminder */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="mt-12 text-center"
				>
					<div className="inline-flex items-center text-sm text-gray-500">
						<Shield className="w-4 h-4 mr-2" />
						All processing happens locally • Your documents never
						leave your device
					</div>
				</motion.div>
			</div>
		</div>
	);
}
