import styles from './app.module.css';
import data from './utils/data.json';
import { useState } from 'react';

export const App = () => {
	const [steps, setSteps] = useState(data[0]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [firstStep, setFirstStep] = useState(true);
	const [endStep, setEndStep] = useState(false);

	const validate = (value) => {
		switch (value) {
			case '1':
				if (!firstStep) {
					setFirstStep(true);
				}
				break;
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
				if (firstStep) {
					setFirstStep(false);
				}
				if (endStep) {
					setEndStep(false);
				}
				break;
			case '7':
				if (!endStep) {
					setEndStep(true);
				}
				break;
			default:
				setFirstStep(true);
				setEndStep(false);
				break;
		}
	};

	const handleClickStepButton = ({ target }) => {
		setActiveIndex(Number(target.textContent) - 1);
		setSteps(data[Number(target.textContent) - 1]);
		validate(target.textContent);
	};

	const handleClickRepeat = () => {
		setActiveIndex(0);
		setSteps(data[0]);
		validate();
	};

	const handleClickForward = () => {
		setActiveIndex(activeIndex + 1);
		setSteps(data[activeIndex + 1]);
		validate(String(Number(data[activeIndex + 1].id)));
	};

	const handleClickBack = () => {
		setActiveIndex(activeIndex - 1);
		setSteps(data[activeIndex - 1]);
		validate(String(Number(data[activeIndex - 1].id)));
	};

	return (
		<div className={styles.container}>
			<div>
				<h1>Инструкция по готовке пельменей</h1>
				<div>
					<div className={styles['steps-content']}>{steps.content}</div>
					<ul className={styles['steps-list']}>
						{data.map((item, index) => {
							return (
								<li
									key={item.id}
									className={`${styles['steps-item']} + ' ' + ${index < activeIndex ? styles.done : ''} + ' ' + ${index === activeIndex ? styles.active : ''}`}
								>
									<button
										className={styles['steps-item-button']}
										onClick={handleClickStepButton}
									>
										{Number(item.id)}
									</button>
									{item.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							disabled={firstStep}
							onClick={handleClickBack}
						>
							Назад
						</button>
						{!endStep ? (
							<button
								className={styles.button}
								onClick={handleClickForward}
							>
								Далее
							</button>
						) : (
							<button className={styles.button} onClick={handleClickRepeat}>
								Начать сначала
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
