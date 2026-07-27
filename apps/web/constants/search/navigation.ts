import {
LayoutDashboard,
FolderKanban,
Users
} from "lucide-react";


export const NAVIGATION = [

{
id:"dashboard",
title:"Dashboard",
description:"Engineering workspace overview",
category:"Page",
href:"/dashboard",
keywords:[
"home",
"workspace"
],
icon:LayoutDashboard
},


{
id:"projects",
title:"Projects",
description:"Engineering projects",
category:"Project",
href:"/dashboard/projects",
keywords:[
"project",
"design",
"development"
],
icon:FolderKanban
},


{
id:"community",
title:"Engineering Community",
description:"Engineers and collaborators",
category:"Page",
href:"/dashboard/community",
keywords:[
"community",
"users",
"engineers"
],
icon:Users
}

];
