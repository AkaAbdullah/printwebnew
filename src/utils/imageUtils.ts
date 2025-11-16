import imageCompression from "browser-image-compression";

export interface CompressOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  initialQuality?: number;
  useWebWorker?: boolean;
}

/**
 * Compresses a Blob or File into a webp File using browser-image-compression
 * @param blob the input Blob or File
 * @param filename the desired output filename (will end with .webp)
 * @param opts compression options
 */
export async function compressBlobToWebp(
  blob: Blob,
  filename: string,
  opts?: CompressOptions
): Promise<File> {
  const fileType = "image/webp";
  const file = new File([blob], filename, { type: blob.type });
  interface ImageCompressionOptions {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    useWebWorker?: boolean;
    initialQuality?: number;
    fileType?: string;
  }

  const defaultOpts: ImageCompressionOptions = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.6,
    fileType,
  };
  const options: ImageCompressionOptions = { ...defaultOpts, ...(opts ?? {}) };
  const compressed = await imageCompression(file, options);
  // Ensure the extension is .webp in the filename
  const outFilename = filename.replace(/\.[^/.]+$/, "") + ".webp";
  const compressedFile = new File([compressed], outFilename, {
    type: fileType,
  });
  return compressedFile;
}

export default compressBlobToWebp;

export async function compressImageUrlToWebp(
  imageUrl: string,
  filename: string,
  opts?: CompressOptions
): Promise<File | null> {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) return null;
    const blob = await res.blob();
    const compressed = await compressBlobToWebp(blob, filename, opts);
    return compressed;
  } catch (error) {
    console.warn("Failed to compress image url to webp:", imageUrl, error);
    return null;
  }
}

export async function compressImageUrlsToWebp(
  inputs: Array<{ imageUrl: string; filename: string }> ,
  opts?: CompressOptions
): Promise<Array<{ input: { imageUrl: string; filename: string }; file: File | null }>> {
  const results = await Promise.all(
    inputs.map(async (i) => ({ input: i, file: await compressImageUrlToWebp(i.imageUrl, i.filename, opts) }))
  );
  return results;
}
