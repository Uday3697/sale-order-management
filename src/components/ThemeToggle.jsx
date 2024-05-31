import { useColorMode, Switch } from "@chakra-ui/react";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
  );
};

export default ThemeToggle;
