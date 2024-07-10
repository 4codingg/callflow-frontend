import { TableHeader as TH, TableRow, TableHead } from "@/components/ui/table";
import { convertCamelCaseToWordsAndTranslate } from "@/utils/convertCamelCaseToWords";

export const TableHeader = ({ titles, width }) => {
  return (
    <TH>
      <TableRow>
        {titles.map((title) => {
          return (
            <TableHead key={title} style={{ width }}>


              {convertCamelCaseToWordsAndTranslate(title)}
            </TableHead>
          );
        })}
        <th className={`flex justify-start`} style={{ width }}> </th>
      </TableRow>
    </TH>
  );
};
