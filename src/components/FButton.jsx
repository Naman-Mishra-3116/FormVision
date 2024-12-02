import { Button } from "@mantine/core";
import React from "react";

const FButton = ({ fn, children }) => {
  return (
    <Button
      variant="gradient"
      style={{ flexGrow: 1 }}
      gradient={{ from: "orange", to: "red", deg: 131 }}
      onClick={fn}
    >
      {children}
    </Button>
  );
};

export default React.memo(FButton);
