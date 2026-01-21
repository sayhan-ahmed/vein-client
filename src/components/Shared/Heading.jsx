// ================= [ SECTION HEADING ] ================= //
// > Standardized titles and subtitles for sections.
const Heading = ({ title, subtitle, paragraph, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-lg text-neutral-500 mt-2">{subtitle}</div>
      <div className="font-light text-base text-neutral-500 mt-2">
        {paragraph}
      </div>
    </div>
  );
};

export default Heading;
