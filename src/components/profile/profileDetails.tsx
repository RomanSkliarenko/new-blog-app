import style from './profile.module.css';
import userAvatr from '../../images/user-default-avatar.png';
import IUser from '../../common/User.interface';

interface IProps {
  currentAuthUser: IUser | null;
}

const ProfileDetails = ({ currentAuthUser }: IProps): JSX.Element => {
  const imageErrorHandler = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = userAvatr;
  };

  return (
    <div className={style.userDetailsWrapper}>
      <ul>
        <li className={style.userDetailsItem}>
          <p>
            <span className={style.userDetailsItemTitle}>User name : </span>
            {currentAuthUser?.name}
          </p>
        </li>
        <li className={style.userDetailsItem}>
          <p>
            <span className={style.userDetailsItemTitle}>User email : </span>
            {currentAuthUser?.email}
          </p>
        </li>
        <li className={style.userDetailsItem}>
          <p>
            <span className={style.userDetailsItemTitle}>
              User extra_details :
            </span>
            {currentAuthUser?.extra_details}
          </p>
        </li>
        <li className={style.userDetailsItem}>
          <p>
            <span className={style.userDetailsItemTitle}>User skills :</span>
            {currentAuthUser?.skills}
          </p>
        </li>
        <li className={style.userDetailsItem}>
          <p>
            <span className={style.userDetailsItemTitle}>
              User profession :
            </span>
            {currentAuthUser?.profession}
          </p>
        </li>

        <li className={style.userDetailsItem}>
          <p>
            <span className={style.userDetailsItemTitle}>User details :</span>
            {currentAuthUser?.details}
          </p>
        </li>
      </ul>
      <div>
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${currentAuthUser?.avatar}`}
          onError={imageErrorHandler}
          alt="user-avatar"
        />
      </div>
    </div>
  );
};
export default ProfileDetails;
