"use client";


import CommunityHeader from "@/components/dashboard/community/CommunityHeader";
import CommunityStats from "@/components/dashboard/community/CommunityStats";

import ActivityFeed from "@/components/dashboard/community/ActivityFeed";
import CommunityPost from "@/components/dashboard/community/CommunityPost";
import CreatePost from "@/components/dashboard/community/CreatePost";
import DiscussionThread from "@/components/dashboard/community/DiscussionThread";

import ChannelList from "@/components/dashboard/community/ChannelList";
import MemberDirectory from "@/components/dashboard/community/MemberDirectory";
import TrendingTopics from "@/components/dashboard/community/TrendingTopics";
import PinnedKnowledge from "@/components/dashboard/community/PinnedKnowledge";
import AIAssistant from "@/components/dashboard/community/AIAssistant";



export default function CommunityPage(){


return (

<div className="space-y-6">


<CommunityHeader />


<CommunityStats />



<div
className="
grid
grid-cols-1
xl:grid-cols-3
gap-6
"
>


{/* MAIN COMMUNITY FEED */}

<div
className="
xl:col-span-2
space-y-6
"
>


<CreatePost />


<ActivityFeed />


<CommunityPost />


<DiscussionThread />


</div>




{/* COMMUNITY SIDEBAR */}

<div
className="
space-y-6
"
>


<ChannelList />


<MemberDirectory />


<TrendingTopics />


<PinnedKnowledge />


<AIAssistant />


</div>


</div>


</div>

);

}