interface IMediumTag {
  title: string;
};

const MediumTag = ({
  title,
}: IMediumTag) => {
  return (
    <div className="px-2 py-1 bg-purple_dark/[.06] rounded-sm">
      <p className="text-purple_dark/[.8] text-sm font-semibold">{title}</p>
    </div>
  )
};

export default MediumTag;
