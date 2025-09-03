import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRef } from "react";

import StaticOldManControls from "./StaticOldManControls.tsx";
import TargetImagePicker from "./TargetImagePicker.tsx";
import PresetScenarios from "./PresetScenarios.tsx";
import { getOldManImageUrl, getOldManPosition } from "./lib/static-old-man.ts";
import { useBoundStore } from "./store/index.ts";

interface ConfigurationFormProps {
  inputImageRef: React.RefObject<HTMLImageElement>;
}

function ConfigurationForm({ inputImageRef }: ConfigurationFormProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const status = useBoundStore((state) => state.status);
  const targetImages = useBoundStore((state) => state.targetImages);
  const staticOldMan = useBoundStore((state) => state.staticOldMan);
  const setStatus = useBoundStore((state) => state.setStatus);
  const messageApi = useBoundStore((state) => state.messageApi);

  async function handleGenerateImage() {
    if (!inputImageRef.current || !canvasRef.current) {
      return;
    }

    setStatus("GENERATING");

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size to match input image
      canvas.width = inputImageRef.current.naturalWidth;
      canvas.height = inputImageRef.current.naturalHeight;

      // Draw background image
      ctx.drawImage(inputImageRef.current, 0, 0);

      // Draw target images (behind old man)
      for (const target of targetImages) {
        const targetImg = new Image();
        targetImg.crossOrigin = "anonymous";
        await new Promise((resolve) => {
          targetImg.onload = resolve;
          targetImg.src = target.imageUrl;
        });
        
        ctx.drawImage(
          targetImg,
          target.coordinates.x,
          target.coordinates.y,
          target.size.width,
          target.size.height
        );
      }

      // Draw static old man
      const oldManImg = new Image();
      oldManImg.crossOrigin = "anonymous";
      await new Promise((resolve) => {
        oldManImg.onload = resolve;
        oldManImg.src = getOldManImageUrl();
      });

      // Calculate old man position
      const position = getOldManPosition(staticOldMan.position, canvas.width);
      
      ctx.drawImage(
        oldManImg,
        position.x,
        position.y,
        staticOldMan.size.width,
        staticOldMan.size.height
      );

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "old-man-yells-at.png";
          a.click();
          URL.revokeObjectURL(url);
        }
        setStatus("READY");
        messageApi?.success("Image generated successfully!");
      }, "image/png");

    } catch (error) {
      console.error("Error generating image:", error);
      messageApi?.error("Failed to generate image");
      setStatus("READY");
    }
  }

  return (
    <div className="space-y-4">
      <PresetScenarios />
      <StaticOldManControls />
      <TargetImagePicker />
      
      <Button
        block
        disabled={targetImages.length === 0 || status !== "READY"}
        type="primary"
        size="large"
        icon={<DownloadOutlined />}
        loading={status === "GENERATING"}
        onClick={handleGenerateImage}
      >
        {status === "GENERATING" ? "Generating..." : "Generate Image"}
      </Button>

      {/* Hidden canvas for image generation */}
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ConfigurationForm;
