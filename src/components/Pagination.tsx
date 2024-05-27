import {
  CaretRight,
  CaretDoubleRight,
  CaretLeft,
  CaretDoubleLeft,
} from "phosphor-react";
import { Button } from "./Button";

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button className="!h-8 !w-8 p-0">
            <CaretDoubleLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button className="!h-8 !w-8 p-0">
            <CaretLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button className="!h-8 !w-8 p-0">
            <CaretRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button className="!h-8 !w-8 p-0">
            <CaretDoubleRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
