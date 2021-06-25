import { useHistory, useParams } from 'react-router-dom';
import Modal from 'react-modal';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { useState } from 'react';

type RoomParams = {
	id: string;
};

Modal.setAppElement('#root');

export function AdminRoom() {
	const history = useHistory();
	const params = useParams<RoomParams>();
	const roomId = params.id;
	const { questions, title } = useRoom(roomId);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [questionId, setQuestionId] = useState('');

	async function handleEndRoom() {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});

		history.push('/');
	}

	async function handleCheckQuestionAsAnswered(
		questionId: string,
		isAnswered?: boolean
	) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isAnswered: !isAnswered,
		});
	}

	async function handleHighlightQuestion(
		questionId: string,
		isHighlighted?: boolean
	) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
			isHighlighted: !isHighlighted,
		});
	}

	function handleDeleteConfirmationModal(questionId: string) {
		setIsModalVisible(true);
		setQuestionId(questionId);
	}

	async function handleDeleteQuestion() {
		if (questionId) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
		setIsModalVisible(false);
	}

	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={logoImg} alt='letmeask logo' />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Encerrar sala
						</Button>
					</div>
				</div>
			</header>

			<main>
				<div className='room-title'>
					<h1>Sala {title}</h1>
					{questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
				</div>

				<div className='question-list'>
					{questions.map(question => (
						<Question
							key={question.id}
							content={question.content}
							author={question.author}
							isAnswered={question.isAnswered}
							isHighlighted={question.isHighlighted}
						>
							{question.isAnswered ? (
								<>
									<button
										type='button'
										onClick={() =>
											handleCheckQuestionAsAnswered(question.id, question.isAnswered)
										}
									>
										<img src={checkImg} alt='Marcar pergunta como respondida' />
									</button>
								</>
							) : (
								<>
									<button
										type='button'
										onClick={() => handleCheckQuestionAsAnswered(question.id)}
									>
										<img src={checkImg} alt='Marcar pergunta como respondida' />
									</button>

									<button
										type='button'
										onClick={() =>
											handleHighlightQuestion(question.id, question.isHighlighted)
										}
									>
										<img src={answerImg} alt='Dar destaque à pergunta' />
									</button>
								</>
							)}

							<button
								type='button'
								onClick={() => handleDeleteConfirmationModal(question.id)}
							>
								<img src={deleteImg} alt='Remover pergunta' />
							</button>
						</Question>
					))}
				</div>
			</main>

			<Modal
				isOpen={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
				className='modal'
				overlayClassName='overlay'
			>
				<div className='modal-content'>
					<svg
						width='50'
						height='50'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M3 5.99988H5H21'
							stroke='#E73F5D'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path
							d='M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z'
							stroke='#E73F5D'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>

					<strong>Excluir pergunta</strong>
					<span>Tem certeza de que deseja excluir essa pergunta?</span>

					<div>
						<button onClick={() => setIsModalVisible(false)}>Cancelar</button>
						<button onClick={handleDeleteQuestion}>Sim, excluir</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
