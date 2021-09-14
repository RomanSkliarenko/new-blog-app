interface IProps {
  text: string;
  callback: () => void;
  btnClass: string;
}

const Button = ({ text, callback, btnClass }: IProps): JSX.Element => (
  <button className={btnClass} type="button" onClick={callback}>
    {text}
  </button>
);

export default Button;
