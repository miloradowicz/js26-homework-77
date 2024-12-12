export interface Feedback {
  id: string;
  author: string | null;
  message: string;
  image: string | null;
}

export type FeedbackMutation = Omit<Feedback, 'id' | 'image'> & {
  image: File | null;
};
