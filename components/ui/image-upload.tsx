"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onUpload: (file: File) => Promise<string>;
}

export function ImageUpload({ value, onChange, onUpload }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    try {
      setIsUploading(true);
      const url = await onUpload(e.target.files[0]);
      onChange(url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={isUploading}
        className="hidden"
        id="imageUpload"
      />
      <div className="flex flex-col items-center justify-center gap-4">
        {value ? (
          <div className="relative w-40 h-40">
            <Image
              src={value}
              placeholder="blur"
              blurDataURL={value}
              alt="Thumbnail"
              fill
              sizes="160px"
              className="object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="w-40 h-40 bg-muted rounded-lg flex items-center justify-center">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
        <label htmlFor="imageUpload">
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            className="cursor-pointer"
            asChild
          >
            <span>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  {value ? "Change Image" : "Upload Image"}
                </>
              )}
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
}
