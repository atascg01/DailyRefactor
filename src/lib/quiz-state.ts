export interface QuizState {
  currentIndex: number;
  answers: (number | null)[];
}
export type QuizAction =
  | { type: "answer"; option: number; optionCount: number }
  | { type: "next" }
  | { type: "restart" };
export function createQuizState(questionCount: number): QuizState {
  return { currentIndex: 0, answers: Array(questionCount).fill(null) };
}
export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  if (action.type === "restart") return createQuizState(state.answers.length);
  if (state.currentIndex >= state.answers.length) return state;
  if (action.type === "next") {
    if (state.answers[state.currentIndex] === null) return state;
    return { ...state, currentIndex: state.currentIndex + 1 };
  }
  if (state.answers[state.currentIndex] !== null || !Number.isInteger(action.option) ||
      action.option < 0 || action.option >= action.optionCount) return state;
  return { ...state, answers: state.answers.map((answer, index) => index === state.currentIndex ? action.option : answer) };
}
