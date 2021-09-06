export default interface IPost {
  _id: string;
  title: string;
  fullText: string;
  description: string;
  dateCreated: string;
  image: string;
  likes: [string];
  postedBy: string;
}