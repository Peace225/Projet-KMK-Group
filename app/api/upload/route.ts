import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

export async function POST(req: NextRequest) {
  const err = await requireAuth();
  if (err) return err;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const allowed = ["jpg", "jpeg", "png", "webp", "gif"];
    if (!allowed.includes(ext)) {
      return NextResponse.json({ error: "Format non supporté" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Si les clés Cloudinary sont configurées → upload cloud (prod)
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      const cloudinaryModule = await import("cloudinary");
      const cloudinary = cloudinaryModule.v2;
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "kmk-group/blog", resource_type: "image" },
          (error: Error | undefined, result: { secure_url: string } | undefined) => {
            if (error || !result) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      return NextResponse.json({ url: result.secure_url });
    }

    // Sinon → sauvegarde locale dans public/images/blog (dev)
    const { writeFile, mkdir } = await import("fs/promises");
    const path = await import("path");
    const filename = `blog-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "images", "blog");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({ url: `/images/blog/${filename}` });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
