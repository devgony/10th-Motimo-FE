import { cn } from "@/lib/utils";
import { GroupChatItem } from "./GroupChatItem";
import {
  GroupMessageItemRs,
  TodoResultSubmittedContent,
} from "@/api/generated/motimo/Api";

interface GroupChatProps {
  messages: GroupMessageItemRs[];
  className?: string;
  onReactionClick?: (messageId: string) => void;
}

export const GroupChat = ({
  messages,
  className,
  onReactionClick,
}: GroupChatProps) => {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {messages.map((m) => (
        <GroupChatItem
          key={m.messageId}
          id={m.messageId}
          userId={m.userId}
          style={"todo"}
          hasUserReacted={m.hasUserReacted}
          reactionCount={m.reactionCount}
          userName={m.userName}
          mainText={m.message.content as TodoResultSubmittedContent}
          checkboxLabel={"checkboxLabel"}
          isChecked={true}
          diaryText={"다이어리 텍스트"}
          photoUrl={"https://picsum.photos/200"}
          reactionType={"good"}
          onReactionClick={onReactionClick}
        />
      ))}
    </div>
  );
};
