'use client';
import { SetStateAction, useState } from 'react';

const headerList = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(65 + index)
);

const data = [
  {
    value: 'A',
    list: [
      {
        title: 'A1',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A2',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A3',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A4',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A5',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A6',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A7',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A8',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A9',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A10',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A11',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A12',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A13',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A14',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'A15',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      }
    ]
  },
  {
    value: 'B',
    list: [
      {
        title: 'B1',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B2',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B3',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B4',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B5',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B6',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B7',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B8',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B9',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B10',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B11',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B12',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B13',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B14',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      },
      {
        title: 'B15',
        content:
          'Lorem ipsum dolor sit amet consectetur. Nulla turpis semper in elementum magna senectus ipsum commodo sodales. Nec lorem quis convallis hendrerit ultricies amet sagittis lectus. Ut morbi massa purus pellentesque nisl amet. Fringilla potenti orci in diam massa. Nibh ullamcorper bibendum dui sed orci blandit volutpat. A arcu viverra facilisis massa. Nisl ullamcorper at dui sed senectus.',
        tags: ['Reksa Dana', 'Investasi']
      }
    ]
  }
];

const AccordionItem = ({
  title,
  content,
  tags,
  rowSpan,
  colSpan,
  isExpanded,
  setIsExpanded,
  index
}: {
  title: string;
  content: string;
  tags: string[];
  rowSpan: number;
  colSpan: number;
  isExpanded: number;
  setIsExpanded: (index: number) => void;
  index: number;
}) => {
  const checkGrouping = (number: number, active: number) => {
    return Math.floor((active - 1) / 3) === Math.floor((number - 1) / 3);
  };

  return (
    <div
      className={`mb-4 ${isExpanded !== index && checkGrouping(index, isExpanded) ? 'hidden' : ''} ${isExpanded === index ? `row-span-${rowSpan} col-span-${colSpan}` : ''}`}
    >
      <div
        className="flex flex-col items-center p-4 bg-white border rounded-lg cursor-pointer shadow-xl"
        onClick={() => setIsExpanded(index)}
      >
        <div className="flex w-full flex-row justify-between">
          <div className="md:text-[20px] xs:text-[16px] font-bold">{title}</div>
          <div className="text-[24px] font-semibold text-purple_verylight">
            {isExpanded === index ? '-' : '+'}
          </div>
        </div>
        {isExpanded === index && (
          <div className="p-4">
            <div className="text-sm">{content}</div>
            <div className="mt-2 w-full flex flex-row gap-2">
              {tags.map((val: string) => (
                <div
                  key={val}
                  className="p-2 text-sm bg-purple_dark/[.06] font-medium text-purple_dark"
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface AccordionListProps {
  data: {
    value: string;
    list: { title: string; content: string; tags: string[] }[];
  }[];
  selected: string;
}

const AccordionList = ({ data, selected }: AccordionListProps) => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState<number>(0);

  const totalItems = data.filter(
    (val: { value: string }) => val.value === selected
  )[0].list.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (pageNumber: SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  // Calculate grid layout based on the current page
  const gridLayout = data
    .filter((val) => val.value === selected)[0]
    .list.map((item, index) => {
      const row = Math.floor(index / itemsPerPage) + 1;
      const col = (index % itemsPerPage) + 1;
      const rowSpan = Math.ceil(item.title.length / 10);
      const colSpan = 3;
      return { ...item, row, col, rowSpan, colSpan };
    });

  const updateEkspanded = (e: SetStateAction<number>) => {
    console.log(e);
    if (Number(e) === isExpanded) {
      setIsExpanded(0);
    } else {
      setIsExpanded(Number(e));
    }
  };

  const currentItems = gridLayout
    .filter((item) => item.row === currentPage)
    .map((item, idx) => (
      <AccordionItem
        key={item.title}
        title={item.title}
        content={item.content}
        tags={item.tags}
        rowSpan={item.rowSpan}
        colSpan={item.colSpan}
        isExpanded={isExpanded}
        index={idx + 1}
        setIsExpanded={(e) => updateEkspanded(e)}
      />
    ));

  return (
    <div className="grid grid-cols-3 gap-4 relative pb-16">
      {currentItems}
      <div className="pagination flex flex-row w-full absolute bottom-5 justify-between">
        <div>
          Menampilkan{' '}
          <span className="font-bold text-purple_dark">
            {itemsPerPage * (currentPage - 1) + 1}-
            {Math.min(itemsPerPage * currentPage, totalItems)}
          </span>{' '}
          dari <span className="font-bold">{totalItems}</span> hasil
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <span
                key={pageNumber}
                onClick={() => {
                  setIsExpanded(0);
                  paginate(pageNumber);
                }}
                className={`pagination-item mr-2 font-semibold ${
                  pageNumber === currentPage ? 'active text-purple_dark' : ''
                }`}
              >
                {pageNumber}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const AvrampediaList = () => {
  const [selected, setSelected] = useState('A');
  return (
    <div className="w-full flex flex-col bg-white md:px-20 xs:p-5 md:py-10 bg-purple_dark/[.03] gap-10">
      <div className="flex flex-row justify-center items-center divide-x border rounded-lg bg-white flex-wrap">
        {headerList.map((val, idx) => (
          <div
            key={idx}
            role="button"
            onClick={() => setSelected(val)}
            className={`p-3 grow text-center text-sm font-bold ${
              idx === 0
                ? 'rounded-l-lg'
                : idx === headerList.length - 1
                  ? 'rounded-r-lg'
                  : ''
            } ${selected === val ? 'bg-purple_dark text-white' : ''}`}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="p-10 bg-white rounded-lg shadow-xl flex flex-col gap-4">
        <p className="md:text-[56px] xs:text-[38px] font-bold text-purple_dark">
          {selected}
        </p>
        <AccordionList data={data} selected={selected} />
      </div>
    </div>
  );
};

export default AvrampediaList;
