import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRef } from "react";

import StaticOldManControls from "./StaticOldManControls.tsx";
import { getOldManImageUrl, getOldManPosition } from "./lib/static-old-man.ts";
import { useBoundStore } from "./store/index.ts";

interface ConfigurationFormProps {
  inputImageRef: React.RefObject<HTMLImageElement>;
}

function ConfigurationForm({ inputImageRef }: ConfigurationFormProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const status = useBoundStore((state) => state.status);
  const backgroundImage = useBoundStore((state) => state.backgroundImage);
  const staticOldMan = useBoundStore((state) => state.staticOldMan);
  const inputImageDataUrl = useBoundStore((state) => state.inputImageDataUrl);
  const setStatus = useBoundStore((state) => state.setStatus);
  const messageApi = useBoundStore((state) => state.messageApi);

  async function handleGenerateImage() {
    if (!inputImageRef.current || !canvasRef.current || !backgroundImage) {
      return;
    }

    setStatus("GENERATING");

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size to fixed dimensions
      canvas.width = 600;
      canvas.height = 400;

      // Fill with background color
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background image
      const backgroundImg = new Image();
      backgroundImg.crossOrigin = "anonymous";
      await new Promise((resolve) => {
        backgroundImg.onload = resolve;
        backgroundImg.src = inputImageDataUrl;
      });
      
      ctx.drawImage(
        backgroundImg,
        backgroundImage.coordinates.x,
        backgroundImage.coordinates.y,
        backgroundImage.size.width,
        backgroundImage.size.height
      );

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
      <StaticOldManControls />
      
      <Button
        block
        disabled={!backgroundImage || status !== "READY"}
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
