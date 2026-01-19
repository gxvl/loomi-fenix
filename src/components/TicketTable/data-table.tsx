"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TicketTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    }
  });

  return (
    <>
      <div className="bg-table-gray w-full rounded-2xl border-none">
        <div className="overflow-hidden rounded-2xl border border-none p-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-border-gray hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="font-montserrat text-gray-400"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-border-gray hover:bg-default-blue/50 border-y-2"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="font-montserrat h-20">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-400"
                  >
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Paginação */}
      </div>
      <div className="flex items-center justify-end gap-6 px-4 pt-4">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="text-gray-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronFirst className="h-6 w-6 cursor-pointer" />
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="text-gray-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-6 w-6 cursor-pointer" />
        </button>
        <span className="text-white">
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="text-gray-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-6 w-6 cursor-pointer" />
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="text-gray-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLast className="h-6 w-6 cursor-pointer" />
        </button>
      </div>
    </>
  );
}
