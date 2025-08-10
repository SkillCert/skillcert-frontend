"use client";
import * as React from "react";

export default function ThumbnailView() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const MAX_MB = 10;

  const openPicker = () => inputRef.current?.click();

  const validate = (file: File) => {
    if (!ACCEPTED.includes(file.type)) {
      alert("Formato no permitido. Use JPG, PNG, WEBP o GIF.");
      return false;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      alert(`El archivo excede ${MAX_MB}MB.`);
      return false;
    }
    return true;
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const f = files[0];
    if (!validate(f)) return;

    setIsUploading(true);
    try {
      // Previsualización local
      setPreviewUrl(URL.createObjectURL(f));
      setFileName(f.name);

      // TODO: Subida real si aplica:
      // const fd = new FormData();
      // fd.append("thumbnail", f);
      // await fetch(`/api/courses/${courseId}/thumbnail`, { method: "POST", body: fd });
    } catch (e) {
      console.error(e);
      alert("No se pudo subir la imagen.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="w-full">
      {/* Encabezado */}
      <h2 className="text-[28px] leading-8 font-semibold text-white">
        Course Thumbnail
      </h2>
      <p className="mt-2 text-sm text-zinc-400">
        Upload an attractive thumbnail image for your course (recommended: 1280x720px)
      </p>

      {/* Tarjeta principal */}
      <div
        className={[
          "mt-6 rounded-2xl border border-zinc-800 bg-[#0a0f1a]/80 px-6 py-6 md:px-8 md:py-8",
          isDragging ? "ring-2 ring-fuchsia-500/60" : "",
        ].join(" ")}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <div className="mx-auto w-full max-w-[880px]">
          {/* Marco 16:9 con preview o placeholder */}
          <div className="relative overflow-hidden rounded-xl bg-zinc-900">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={fileName ?? "Course thumbnail preview"}
                className="h-auto w-full object-cover"
                style={{ aspectRatio: "16 / 9" }}
              />
            ) : (
              <div
                className="relative flex h-full w-full items-center justify-center"
                style={{ aspectRatio: "16 / 9" }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_60%)]" />
                <div className="text-center">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="mx-auto h-12 w-12 text-zinc-300 opacity-70"
                    fill="currentColor"
                  >
                    <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7l-3.293 3.293A1 1 0 0 1 7 19v-2H6a2 2 0 0 1-2-2V5Zm2 0v10h12V5H6Zm2 2h8v2H8V7Z" />
                  </svg>
                  <p className="mt-3 text-sm text-zinc-300">
                    Arrastre y suelte una imagen aquí
                  </p>
                  <p className="text-xs text-zinc-500">
                    Formatos: JPG, PNG, WEBP, GIF · Máx. {MAX_MB}MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Botón Upload */}
          <div className="mt-5">
            <button
              type="button"
              onClick={openPicker}
              disabled={isUploading}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800/70 disabled:opacity-60"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-zinc-300"
                  fill="currentColor"
                >
                  <path d="M12 3a1 1 0 0 1 1 1v7h3l-4 4-4-4h3V4a1 1 0 0 1 1-1Zm-7 14h14v2H5v-2Z" />
                </svg>
              </span>
              Upload New ThumbNail
            </button>

            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED.join(",")}
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            {fileName && (
              <p className="mt-2 text-xs text-zinc-500">
                Seleccionado: <span className="text-zinc-300">{fileName}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
