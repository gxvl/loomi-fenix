export const TopTab = ({
  title,
  button
}: {
  title: string;
  button?: React.ReactNode;
}) => {
  return (
    <div className="bg-grayblue fixed top-0 z-50 flex h-[8%] w-full items-center justify-between pl-40">
      <p className="font-montserrat text-xl font-semibold">{title}</p>
      {button && button}
    </div>
  );
};
