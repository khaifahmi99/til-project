export interface PillProps {
  text: string;
}

const Pill = ({ text }: PillProps) => {
  return (
    <div className="w-8 min-w-min p-2 bg-sky-500 rounded-lg overflow-hidden whitespace-nowrap text-center">
      {text}
    </div>
  );
};

export default Pill;
