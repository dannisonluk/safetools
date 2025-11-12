import { PDFDocument } from "pdf-lib";

export async function combinePDFs(files: File[]): Promise<Blob> {
	const mergedPdf = await PDFDocument.create();

	for (const file of files) {
		const arrayBuffer = await file.arrayBuffer();
		const pdf = await PDFDocument.load(arrayBuffer);
		const copiedPages = await mergedPdf.copyPages(
			pdf,
			pdf.getPageIndices()
		);
		copiedPages.forEach((page) => mergedPdf.addPage(page));
	}

	const mergedBytes = await mergedPdf.save();
	return new Blob([mergedBytes as unknown as BlobPart], { type: "application/pdf" });
}

export function downloadBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 2000);
}
