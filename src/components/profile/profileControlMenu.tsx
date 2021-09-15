import { useAppDispatch, useAppSelector } from '../../redux/store';
import style from './profile.module.css';
import usersOperations from '../../redux/users/users-operations';
import { useRef, useState } from 'react';
import btnTitle from '../../common/constants/buttonTitle';

interface IProps {
  setEditUserFlag: React.Dispatch<React.SetStateAction<boolean>>;
  editUserFlag: boolean;
}

const ProfileControlMenu = ({
  setEditUserFlag,
  editUserFlag,
}: IProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentAuthUser = useAppSelector(state => state.currentUser.user);
  const [currentUserAvatar, setCurrentUserAvatar] = useState<File | null>(null);
  const avatarInput = useRef<HTMLInputElement>(null);

  const uploadAvatar = () => {
    if (currentAuthUser && currentUserAvatar) {
      dispatch(
        usersOperations.uploadUserAvatar(
          currentAuthUser._id,
          currentUserAvatar,
        ),
      );
    }
    setCurrentUserAvatar(null);
  };
  const deleteUserHandler = () => {
    if (currentAuthUser) {
      dispatch(usersOperations.deleteUser(currentAuthUser));
    }
  };
  const changeAvatarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCurrentUserAvatar(event.target.files[0]);
    }
  };
  return (
    <div className={style.profileNavBtnContainer}>
      <button
        className={style.sectionNavBtn}
        type="button"
        onClick={() => {
          setEditUserFlag(!editUserFlag);
        }}
      >
        {btnTitle.EDIT_USER}
      </button>
      <button
        className={style.sectionNavBtn}
        type="button"
        onClick={deleteUserHandler}
      >
        {btnTitle.DELETE_USER}
      </button>
      <button
        className={style.sectionNavBtn}
        type="button"
        onClick={() =>
          avatarInput.current ? avatarInput.current.click() : null
        }
      >
        {!currentUserAvatar ? 'Add avatar' : 'Change Avatar'}
      </button>
      {currentUserAvatar && (
        <button
          className={style.sectionNavBtn}
          type="button"
          onClick={uploadAvatar}
        >
          {btnTitle.UPLOAD}
        </button>
      )}
      <input
        ref={avatarInput}
        style={{ display: 'none' }}
        type="file"
        onChange={changeAvatarHandler}
      />
    </div>
  );
};

export default ProfileControlMenu;
