export interface TextIconProps {
  text: string;
  icon: JSX.Element;
}

const TextIcon = ({ text, icon }: TextIconProps) => {
  return (
    <div className="flex flex-row w-min items-center">
      <div className="w-4 h-4 mx-2">{icon}</div>
      <span>{text}</span>
    </div>
  );
};

export default TextIcon;
