import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Drawer, Form, Segmented, Switch, Typography } from "antd";

import { useBoundStore } from "./store/index.ts";

const { Link, Paragraph, Title } = Typography;

function SettingsDrawer() {
  const isOpen = useBoundStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useBoundStore((state) => state.setDrawerOpen);
  const posthog = useBoundStore((state) => state.posthog);
  const theme = useBoundStore((state) => state.themeMode);
  const setTheme = useBoundStore((state) => state.setThemeMode);

  function handleClose() {
    setDrawerOpen(false);
  }

  function handleTrackingChange(isEnabled: boolean) {
    if (isEnabled) {
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
  }
  return (
    <Drawer title="Settings and help" onClose={handleClose} open={isOpen}>
      <Title level={4}>Settings</Title>
      <Segmented
        onChange={setTheme}
        defaultValue={theme}
        options={[
          { label: "Light mode", value: "light", icon: <SunOutlined /> },
          { label: "Dark mode", value: "dark", icon: <MoonOutlined /> },
        ]}
      />
      <Form.Item
        className="mb-2 mt-2"
        label="Anonymous analytics"
        tooltip="Uses open-source PostHog project to help me figure out how users are interacting with the app. Totally optional, but this anonymous data helps me improve the app if you enable it."
      >
        <Switch
          defaultChecked={posthog.has_opted_in_capturing()}
          onChange={handleTrackingChange}
        />
      </Form.Item>
      <Title level={4}>About</Title>
      <Paragraph>
        <ul>
          <li>
            All operations done fully client-side - no backend, no private data
            leaves your browser.
          </li>
          <li>
            Uses{" "}
            <Link
              href="https://ai.google.dev/edge/mediapipe/solutions/vision/face_detector"
              target="_blank"
            >
              MediaPipe Face Detector task
            </Link>{" "}
            to automatically detect and position the old man character.
          </li>
          <li>
            Extensive customization options for the old man:
            <ul>
              <li>
                Placement anywhere on the input image (including
                slightly going outside it).
              </li>
              <li>Change the size of the old man character.</li>
              <li>
                Customize facial expressions and yelling intensity.
              </li>
              <li>No limit on the number of old men (for maximum yelling chaos).</li>
              <li>Flip the character vertically or horizontally.</li>
              <li>
                Customize the direction from which the old man appears.
              </li>
              <li>Different old man character styles and expressions.</li>
            </ul>
          </li>
          <li>
            GIF output options:
            <ul>
              <li>Looping mode.</li>
              <li>Number of frames.</li>
              <li>Frame delay.</li>
              <li>Separate delay setting for last frame.</li>
              <li>Output size.</li>
            </ul>
          </li>
          <li>
            Anonymous product analytics using{" "}
            <Link href="https://posthog.com/" target="_blank">
              PostHog
            </Link>
            , requiring explicit <em>opt-in</em>.
          </li>
          <li>Celebration confetti 🎉</li>
          <li>Easter eggs.</li>
        </ul>
      </Paragraph>
    </Drawer>
  );
}

export default SettingsDrawer;
