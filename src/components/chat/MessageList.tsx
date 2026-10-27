import MessageBubble from './MessageBubble';
import type { Message } from './types';
import { useEffect, useRef } from 'react';

interface MessageListProps {
	messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const wasAtBottomRef = useRef(true);

	const handleScroll = () => {
		const element = containerRef.current;
		if (!element) return;

		const distanceFromBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
		wasAtBottomRef.current = distanceFromBottom < 50;
	};

	useEffect(() => {
		const element = containerRef.current;
		if (!element) return;

		if (wasAtBottomRef.current) {
			element.scrollTop = element.scrollHeight;
		}
	}, [messages]);

	if (messages.length === 0) {
		return (
			<div className='message-list empty'>
				<p className='placeholder-text'>Describe a diagram and the AI will create it for you.</p>
			</div>
		);
	}

	return (
		<div className='message-list' ref={containerRef} onScroll={handleScroll}>
			{messages.map((msg) => (
				<MessageBubble key={msg.id} message={msg} />
			))}
		</div>
	);
}
