interface IUser {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  extraDetails: string;
  skills: string;
  profession: string;
  details: string;
  dateCreated: string
}

interface IUserState {
  user: IUser;
  token: string;
 }

export default interface IState {
  user: IUserState;
  loading: boolean;
  _persist: object;
 }