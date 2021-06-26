import { ReactNode } from 'react';
import cx from 'classnames';

import '../styles/question.scss';
import { useTheme } from '../hooks/useTheme';

type QuestionProps = {
	content: string;
	author: {
		name: string;
		avatar: string;
	};
	children?: ReactNode;
	isAnswered?: boolean;
	isHighlighted?: boolean;
};

export function Question({
	content,
	author,
	children,
	isAnswered = false,
	isHighlighted = false,
}: QuestionProps) {
	const { theme } = useTheme();

	return (
		<div
			className={cx(
				`question ${theme}`,
				{ answered: isAnswered },
				{ highlighted: isHighlighted && !isAnswered }
			)}
		>
			<p>{content}</p>
			<footer>
				<div className={`user-info ${theme}`}>
					<img src={author.avatar} alt={author.name} />
					<span>{author.name}</span>
				</div>
				<div>{children}</div>
			</footer>
		</div>
	);
}
