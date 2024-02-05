interface IMediumTag {
  title: string;
};

const MediumTag = ({
  title,
}: IMediumTag) => {
  return (
    <div className="px-2 py-1 bg-purple_light_bg text-purple_brand">
      <p className="text-purple_brand font-semibold">{title}</p>
    </div>
  )
};

export default MediumTag;
