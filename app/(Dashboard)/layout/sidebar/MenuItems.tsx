import {
  IconArticle,
  IconClipboardData,
  IconLayoutDashboard,
  IconListCheck,
  IconBuilding,
  IconUser,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";
import { useSession } from "next-auth/react";

function Menuitems(){
  const {data:session, status} = useSession()
  const masters = [
    {
      navlabel: true,
      subheader: "Masters",
    },
    {
      id: uniqueId(),
      title: "Category",
      icon: IconClipboardData,
      href: "/master/category",
    },
    {
      id: uniqueId(),
      title: "District",
      icon: IconBuilding,
      href: "/master/district",
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
  ]
  if (status === "loading" || status === 'unauthenticated'){
    return []
  }
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
    
    ...(session?.user.role === 1 ?
      masters : []
    ),
    
  ];
}



export default Menuitems;
