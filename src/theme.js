import { extendTheme } from "@chakra-ui/react";
import { createLocalStorageManager } from "@chakra-ui/react";

const config = {
    initialColorMode:'light',
    useSystemColorMOde:false
}

const theme=extendTheme({config})
export const colorModeManager=createLocalStorageManager("chakra-ui-color-mode");
export default theme;