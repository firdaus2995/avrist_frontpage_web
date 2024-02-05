interface IMediumTag {
  title: string;
};

const MediumTag = ({
  title,
}: IMediumTag) => {
  return (
    <div className="px-2 py-1 bg-purple_light_bg rounded-sm">
      <p className="text-purple_dark font-semibold">{title}</p>
    </div>
  )
};

export default MediumTag;
