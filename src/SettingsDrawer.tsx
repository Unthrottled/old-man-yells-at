import { Drawer, Typography } from "antd";

import { useBoundStore } from "./store/index.ts";

const { Paragraph } = Typography;

function SettingsDrawer() {
  const drawerOpen = useBoundStore((state) => state.drawerOpen);
  const setDrawerOpen = useBoundStore((state) => state.setDrawerOpen);

  return (
    <Drawer
      title="Settings"
      placement="right"
      onClose={() => setDrawerOpen(false)}
      open={drawerOpen}
    >
      <Paragraph>
        Configure your preferences and privacy settings.
      </Paragraph>
    </Drawer>
  );
}

export default SettingsDrawer;
