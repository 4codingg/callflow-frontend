import { Paragraph } from '@/components/Paragraph';
import { convertCamelCaseToWordsAndTranslate } from '@/utils/convertCamelCaseToWords';

export const TableHead = ({ titles, width }) => {
  return (
    <thead className="flex bg-light-light-grey py-4 px-4 rounded-lg border-light-grey border">
      <tr className="flex justify-between w-full">
        {titles.map((title) => {
          return (
            <th key={title} className={`flex justify-start`} style={{ width }}>
              <Paragraph className="font-medium">
                {convertCamelCaseToWordsAndTranslate(title)}
              </Paragraph>
            </th>
          );
        })}
        <th className={`flex justify-start`} style={{ width }}></th>
      </tr>
    </thead>
  );
};
