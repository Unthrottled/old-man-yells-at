import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import { useState } from "react";

import { useBoundStore } from "./store/index.ts";

import exampleGroupImageUrl from "./assets/example-group.jpg";
import examplePersonImageUrl from "./assets/example-person.jpg";
import examplePortraitImageUrl from "./assets/example-portrait.jpg";

function FileInput() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const messageApi = useBoundStore((state) => state.messageApi);
  const setInputFile = useBoundStore((state) => state.setInputFile);

  async function handleSubmitImageUrl() {
    if (!imageUrl) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "image", { type: blob.type });
      setInputFile(file);
    } catch (error) {
      messageApi?.error("Failed to load image from URL");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectExampleImage(exampleImageUrl: string) {
    setImageUrl(exampleImageUrl);
    handleSubmitImageUrl();
  }

  const exampleImages = [
    { url: examplePersonImageUrl, label: "Person" },
    { url: exampleGroupImageUrl, label: "Group" },
    { url: examplePortraitImageUrl, label: "Portrait" },
  ];

  return (
    <div className="flex flex-col gap-4 items-center">
      <Upload.Dragger
        name="file"
        multiple={false}
        showUploadList={false}
        beforeUpload={(file) => {
          setInputFile(file);
          return false;
        }}
        className="w-full max-w-md"
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single image file. JPG, PNG, GIF, etc.
        </p>
      </Upload.Dragger>

      <div className="text-center text-gray-500">or</div>

      <div className="flex gap-2 w-full max-w-md">
        <Input
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onPressEnter={handleSubmitImageUrl}
        />
        <Button
          type="primary"
          onClick={handleSubmitImageUrl}
          loading={loading}
          icon={loading ? <LoadingOutlined /> : undefined}
        >
          Load
        </Button>
      </div>

      <div className="text-center text-gray-500">or try an example</div>

      <div className="flex gap-2 flex-wrap justify-center">
        {exampleImages.map((example) => (
          <Button
            key={example.url}
            size="small"
            onClick={() => handleSelectExampleImage(example.url)}
          >
            {example.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default FileInput;
