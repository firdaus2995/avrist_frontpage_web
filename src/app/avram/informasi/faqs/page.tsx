interface SearchParams {
  detail?: string;
}

const FAQS: React.FC<{ searchParams: SearchParams }> = ({ searchParams }) => {
  const detail = searchParams.detail ?? null;

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-purple_dark/[.03]">
      {
        detail ? (
          <div>INI ADALAH HALAMAN FAQS</div>
        ) : (
          <div>INI ADALAH HALAMAN DETAIL FAQS</div>
        )
      }
    </div>
  )
}

export default FAQS;
