interface SearchParams {
  tab?: string;
}

const MediaDanPromosi: React.FC<{ searchParams: SearchParams }> = ({ searchParams }) => {
  const tab = searchParams.tab ?? "FIRST_INDEX"; // NEED LOGIC TO RENDER THE ACTIVE TAB

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-purple_dark/[.03]">
      INI ADALAH HALAMAN MEDIA DAN PROMOSI
      {
        tab && (
          <div>{tab}</div>
        )
      }
    </div>
  )
}

export default MediaDanPromosi;
