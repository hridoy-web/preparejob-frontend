export async function uploadImage(
  file: File,
  folder: string = "preparejob/avatars"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.url;
}
