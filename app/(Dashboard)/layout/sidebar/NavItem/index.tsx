import React from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";
import normalizePath from "@/utils/normalizePath";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, onClick }: ItemType) => {
  const Icon = item.icon
  const theme = useTheme()
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />


  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "8px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
    },
  }))

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href}
          disabled={item.disabled}
          selected={pathDirect.split("/")[1] === "master" ? 
            pathDirect.split("/")[2] === item.href.split("/")[2] : 
            pathDirect.split("/")[1] === item.href.split("/")[1]}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color: "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            <>{item.title}</>
          </ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};


function isSame(pathDirect: string, itemHref: string) {
  // Trim leading slashes from both paths for consistent comparison
  const trimmedPathDirect = pathDirect.replace(/^\/+/, '');
  const trimmedItemHref = itemHref.replace(/^\/+/, '');

  // Check if the trimmed path starts with the trimmed itemHref
  // and ensure that the itemHref is not equal to the whole path
  return (
    trimmedPathDirect.startsWith(trimmedItemHref) &&
    (trimmedPathDirect.length > trimmedItemHref.length &&
     trimmedPathDirect[trimmedItemHref.length] === '/' ||
     trimmedItemHref.length < trimmedPathDirect.length)
  );
}

export default NavItem;
