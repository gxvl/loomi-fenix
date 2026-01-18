export const TopTab = ({
  title,
  button
}: {
  title: string;
  button?: React.ReactNode;
}) => {
  return (
    <div className="w-full z-50 items-center pl-40 fixed top-0 flex justify-between h-[8%] bg-grayblue">
      <p className="font-montserrat font-semibold text-xl">{title}</p>
      {button && button}
    </div>
  );
};
