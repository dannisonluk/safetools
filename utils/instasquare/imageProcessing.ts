/**
 * Image Processing Utilities
 *
 * PRIVACY GUARANTEE:
 * All image processing happens client-side using the HTML5 Canvas API.
 * No network requests are made. Images are processed entirely in the browser's memory.
 *
 * How it works:
 * 1. User selects image -> File is read using FileReader API (local)
 * 2. Image is loaded into an HTMLImageElement (in memory)
 * 3. Canvas API manipulates pixels directly in browser memory
 * 4. Result is converted to Blob (still in memory)
 * 5. Blob is offered as download (local file system)
 *
 * No server communication occurs at any point.
 */

export function canvasToBlob(
	canvas: HTMLCanvasElement,
	type: "image/png" | "image/jpeg" | "image/webp" = "image/png",
	quality?: number
): Promise<Blob> {
	return new Promise<Blob>((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (blob) {
					resolve(blob);
				} else {
					reject(new Error("Failed to create blob from canvas"));
				}
			},
			type,
			quality
		);
	});
}

export function createCanvas(w: number, h: number): HTMLCanvasElement {
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.round(w));
	canvas.height = Math.max(1, Math.round(h));
	return canvas;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error("Failed to load image"));
		img.src = src;
	});
}

// Square Processing Functions
export async function squareByCrop(
	img: HTMLImageElement,
	size: number
): Promise<Blob> {
	const canvas = createCanvas(size, size);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Failed to get canvas context");

	const iw = img.naturalWidth || img.width;
	const ih = img.naturalHeight || img.height;

	// Calculate scale to cover the square (crop excess)
	const scale = Math.max(size / iw, size / ih);
	const dw = iw * scale;
	const dh = ih * scale;
	const dx = (size - dw) / 2;
	const dy = (size - dh) / 2;

	ctx.imageSmoothingQuality = "high";
	ctx.drawImage(img, dx, dy, dw, dh);

	return canvasToBlob(canvas);
}

export async function squareWithColor(
	img: HTMLImageElement,
	size: number,
	color = "#000000"
): Promise<Blob> {
	const canvas = createCanvas(size, size);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Failed to get canvas context");

	// Fill background with color
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, size, size);

	const iw = img.naturalWidth || img.width;
	const ih = img.naturalHeight || img.height;

	// Calculate scale to contain the image (add padding)
	const scale = Math.min(size / iw, size / ih);
	const dw = iw * scale;
	const dh = ih * scale;
	const dx = (size - dw) / 2;
	const dy = (size - dh) / 2;

	ctx.imageSmoothingQuality = "high";
	ctx.drawImage(img, dx, dy, dw, dh);

	return canvasToBlob(canvas);
}

export async function squareWithBlur(
	img: HTMLImageElement,
	size: number
): Promise<Blob> {
	const canvas = createCanvas(size, size);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Failed to get canvas context");

	const iw = img.naturalWidth || img.width;
	const ih = img.naturalHeight || img.height;

	// Draw blurred background (cover)
	const coverScale = Math.max(size / iw, size / ih);
	const dwCover = iw * coverScale;
	const dhCover = ih * coverScale;
	const dxCover = (size - dwCover) / 2;
	const dyCover = (size - dhCover) / 2;

	ctx.filter = "blur(24px) brightness(0.9)";
	ctx.drawImage(img, dxCover, dyCover, dwCover, dhCover);
	ctx.filter = "none";

	// Draw sharp foreground (contain)
	const containScale = Math.min(size / iw, size / ih);
	const dw = iw * containScale;
	const dh = ih * containScale;
	const dx = (size - dw) / 2;
	const dy = (size - dh) / 2;

	ctx.imageSmoothingQuality = "high";
	ctx.drawImage(img, dx, dy, dw, dh);

	return canvasToBlob(canvas);
}

// Stitch Types and Functions
export type StitchDirection = "horizontal" | "vertical";

export interface StitchOptions {
	direction?: StitchDirection;
	gap?: number;
	background?: string;
	align?: "center" | "start" | "end";
	size?: { width: number; height: number } | "auto";
	preserveAspectRatio?: boolean;
	format?: "image/png" | "image/jpeg" | "image/webp";
	quality?: number;
}

export async function stitchTwoImages(
	imgA: HTMLImageElement,
	imgB: HTMLImageElement,
	opts: StitchOptions = {}
): Promise<Blob> {
	const {
		direction = "horizontal",
		gap = 0,
		background = "transparent",
		align = "center",
		size = "auto",
		preserveAspectRatio = true,
		format = "image/png",
		quality,
	} = opts;

	const aW = imgA.naturalWidth || imgA.width;
	const aH = imgA.naturalHeight || imgA.height;
	const bW = imgB.naturalWidth || imgB.width;
	const bH = imgB.naturalHeight || imgB.height;

	let canvasWidth: number;
	let canvasHeight: number;

	if (size === "auto") {
		if (direction === "horizontal") {
			canvasWidth = aW + gap + bW;
			canvasHeight = Math.max(aH, bH);
		} else {
			canvasWidth = Math.max(aW, bW);
			canvasHeight = aH + gap + bH;
		}
	} else {
		canvasWidth = size.width;
		canvasHeight = size.height;
	}

	const canvas = createCanvas(canvasWidth, canvasHeight);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Failed to get canvas context");

	ctx.imageSmoothingQuality = "high";

	// Fill background if not transparent
	if (background !== "transparent") {
		ctx.fillStyle = background;
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	}

	// Helper functions for fitting and alignment
	function fit(w: number, h: number, maxW: number, maxH: number) {
		if (!preserveAspectRatio) return { dw: maxW, dh: maxH };
		const s = Math.min(maxW / w, maxH / h);
		return { dw: w * s, dh: h * s };
	}

	function alignCoord(
		container: number,
		content: number,
		mode: "center" | "start" | "end"
	) {
		if (mode === "start") return 0;
		if (mode === "end") return container - content;
		return (container - content) / 2;
	}

	if (direction === "horizontal") {
		const zoneA_W =
			size === "auto" ? aW : Math.floor((canvasWidth - gap) / 2);
		const zoneB_W = size === "auto" ? bW : canvasWidth - gap - zoneA_W;

		const A = fit(aW, aH, zoneA_W, canvasHeight);
		const B = fit(bW, bH, zoneB_W, canvasHeight);

		const ax = alignCoord(zoneA_W, A.dw, "center");
		const ay = alignCoord(canvasHeight, A.dh, align);
		const bx = alignCoord(zoneB_W, B.dw, "center");
		const by = alignCoord(canvasHeight, B.dh, align);

		ctx.drawImage(imgA, ax, ay, A.dw, A.dh);
		ctx.drawImage(imgB, zoneA_W + gap + bx, by, B.dw, B.dh);
	} else {
		const zoneA_H =
			size === "auto" ? aH : Math.floor((canvasHeight - gap) / 2);
		const zoneB_H = size === "auto" ? bH : canvasHeight - gap - zoneA_H;

		const A = fit(aW, aH, canvasWidth, zoneA_H);
		const B = fit(bW, bH, canvasWidth, zoneB_H);

		const ax = alignCoord(canvasWidth, A.dw, align);
		const ay = alignCoord(zoneA_H, A.dh, "center");
		const bx = alignCoord(canvasWidth, B.dw, align);
		const by = alignCoord(zoneB_H, B.dh, "center");

		ctx.drawImage(imgA, ax, ay, A.dw, A.dh);
		ctx.drawImage(imgB, bx, zoneA_H + gap + by, B.dw, B.dh);
	}

	return canvasToBlob(canvas, format, quality);
}
