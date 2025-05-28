import { GithubOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Text, Link } = Typography;

export default function Title() {
  return (
    <div className="text-center">
      <Text className="sm:flex justify-center gap-1" type="secondary">
        <div>
          Made for LOLs by{" "}
          <Link href="https://unthrottled.io/" target="_blank">
            Unthrottled
          </Link>
          .
        </div>
        <div>
          Source code on
          <Link
            className="ms-2"
            href="https://github.com/Unthrottled/old-man-yells-at"
            target="_blank"
          >
            <GithubOutlined className="mr-1" />
            GitHub
          </Link>
          .
        </div>
      </Text>
    </div>
  );
}
