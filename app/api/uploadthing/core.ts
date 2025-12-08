import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 50 } })
    .onUploadComplete(({ file }) => {
      console.log("Upload complete:", file.url);
    }),
  pdfUploader: f({ pdf: { maxFileSize: "16MB", maxFileCount: 10 } })
    .onUploadComplete(({ file }) => {
      console.log("PDF upload complete:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
