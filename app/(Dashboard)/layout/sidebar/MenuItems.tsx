import {
  IconArticle,
  IconClipboardData,
  IconLayoutDashboard,
  IconListCheck,
  IconMessageReport,
  IconUser,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

function Menuitems(){

  
  return [
    {
      navlabel: true,
      subheader: "Home",
    },
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/",
    },
  
    {
      navlabel: true,
      subheader: "Penerimaan",
    },
    {
      id: uniqueId(),
      title: "Penerimaan",
      icon: IconArticle,
      href: "/penerimaan",
    },
    {
      navlabel: true,
      subheader: "Masters",
    },
    {
      id: uniqueId(),
      title: "Catagory",
      icon: IconClipboardData,
      href: "/master/catagory",
    },
    {
      id: uniqueId(),
      title: "Users",
      icon: IconUser,
      href: "/settings/district",
    },
  
    {
      navlabel: true,
      subheader: "settings",
    },
    {
      id: uniqueId(),
      title: "Users",
      icon: IconUser,
      href: "/settings/users",
    },
  ];
}



export default Menuitems;
