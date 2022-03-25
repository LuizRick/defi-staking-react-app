import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppEthereumContext } from "../../context/AppEthereumContext";
import ThemeToggle from "../theme-settings/themetoggle";

export default function MenuAppBar() {
  const context = useAppEthereumContext();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" sx={{ mr: 2 }} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Decentral Bank
          </Typography>
          Conta: {context.account}
          <ThemeToggle />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
