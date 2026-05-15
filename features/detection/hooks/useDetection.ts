"use client";

import { useState } from "react";
import { DetectionResult } from "../types/detection.type";
import {
  predictBrainTumor,
  saveDetectionHistory,
  uploadBase64ImageToSupabase,
  uploadImageToSupabase,
} from "../services/detectionService";
import { validateMRIFile } from "../utils/fileValidation";

type LoadingStep =
  | "idle"
  | "validating"
  | "uploading"
  | "analyzing"
  | "saving"
  | "done";

export function useDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<LoadingStep>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSelectFile(selectedFile: File) {
    const validation = validateMRIFile(selectedFile);

    if (!validation.valid) {
      setErrorMessage(validation.message);
      setFile(null);
      setPreviewUrl("");
      setResult(null);
      return;
    }

    setErrorMessage("");
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setLoadingStep("idle");
  }

  async function handleDetect() {
    if (!file) {
      setErrorMessage("Silakan upload gambar MRI terlebih dahulu.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      setLoadingStep("validating");
      const validation = validateMRIFile(file);

      if (!validation.valid) {
        setErrorMessage(validation.message);
        return;
      }

      setLoadingStep("analyzing");
      const detectionResult = await predictBrainTumor(file);

      setLoadingStep("uploading");
      const imageUrl = await uploadImageToSupabase(file);

      let annotatedImageUrl = "";

      if (detectionResult.annotated_image) {
        annotatedImageUrl = await uploadBase64ImageToSupabase(
          detectionResult.annotated_image,
          "annotated"
        );
      }

      setLoadingStep("saving");

      await saveDetectionHistory({
        fileName: file.name,
        result: detectionResult,
        imageUrl,
        annotatedImageUrl,
      });

      setResult({
        ...detectionResult,
        image_url: imageUrl,
        annotated_image_url: annotatedImageUrl,
      });

      setLoadingStep("done");
    } catch (error) {
      console.error(error);
      setErrorMessage("Terjadi kesalahan saat proses deteksi.");
    } finally {
      setIsLoading(false);
    }
  }

  function resetDetection() {
    setFile(null);
    setPreviewUrl("");
    setResult(null);
    setErrorMessage("");
    setLoadingStep("idle");
  }

  return {
    file,
    previewUrl,
    result,
    isLoading,
    loadingStep,
    errorMessage,
    handleSelectFile,
    handleDetect,
    resetDetection,
  };
}