import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface Message {
  id: number;
  content: string;
  user_id: string;
  user_name: string;
  created_at: string;
}

interface PostItProps {
  message: Message;
}

export default function PostIt({ message }: PostItProps) {
  return (
    <div className="bg-yellow-200 p-4 rounded shadow-md transform rotate-1 hover:rotate-0 transition-transform">
      <p className="mb-2">{message.content}</p>
      <div className="text-sm text-gray-600">
        <span>{message.user_name}</span>
        <span className="ml-2">
          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale: ko })}
        </span>
      </div>
    </div>
  )
}