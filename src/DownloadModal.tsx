import { DownloadOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
  imageDataUrl: string;
}

function DownloadModal({ open, onClose, imageDataUrl }: DownloadModalProps) {
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  useEffect(() => {
    if (open && imageDataUrl) {
      setDownloadUrl(imageDataUrl);
    }
  }, [open, imageDataUrl]);

  function handleClose() {
    onClose();
  }

  function handleDownload() {
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "old-man-yells-at.png";
      a.click();
    }
  }

  return (
    <Modal
      title="Download Your Image"
      open={open}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          Close
        </Button>,
        <Button
          key="download"
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
        >
          Download
        </Button>,
      ]}
    >
      {downloadUrl && (
        <div className="text-center">
          <img
            src={downloadUrl}
            alt="Generated"
            className="max-w-full h-auto rounded"
          />
        </div>
      )}
    </Modal>
  );
}

export default DownloadModal;
