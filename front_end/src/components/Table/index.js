import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
import {
    Wrapper,
    ReactTable,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableData,
    Content,
    Tool,
    Search,
    Select,
    Option,
    Pagination,
    Button,
} from "./styles";

const Table = ({ labels, datas, hasDetail, setOpenUpdateModal, setOpenDetailModal, setCurrentObject, deleteObject }) => {
    const data = useMemo(() => [...datas], [datas]);

    const columns = useMemo(() => [...labels], [labels]);

    const handleUpdate = (value) => {
        setCurrentObject(value);
        setOpenUpdateModal(true);
    };

    const handleDetail = (value) => {
        setCurrentObject(value);
        setOpenDetailModal(true);
    };

    const tableEditHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "actions",
                Header: "Actions",
                Cell: ({ row }) => (
                    <>
                        {hasDetail && (
                            <Button style={{ marginLeft: "0" }} onClick={() => handleDetail(row.original)}>
                                <span className='ti-eye'></span>
                            </Button>
                        )}
                        <Button style={!hasDetail ? { marginLeft: "0" } : { marginLeft: "10px" }} onClick={() => handleUpdate(row.original)}>
                            <span className='ti-pencil-alt'></span>
                        </Button>
                        {/* <Button onClick={() => deleteObject(row.original)}>
                            <span className='ti-trash'></span>
                        </Button> */}
                    </>
                ),
            },
        ]);
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
    } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination, tableEditHooks);

    return (
        <Wrapper>
            <Tool>
                <Search
                    value={state.globalFilter || ""}
                    onChange={(e) => {
                        setGlobalFilter(e.target.value);
                    }}
                    placeholder='Search ...'
                />
                <Select
                    value={state.pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 20, 30, 50].map((pageSize) => (
                        <Option key={pageSize} value={pageSize}>
                            Display {pageSize}
                        </Option>
                    ))}
                </Select>
            </Tool>
            <Content>
                <ReactTable {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}{" "}
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <span className='ti-angle-down'></span>
                                            ) : (
                                                <span className='ti-angle-up'></span>
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        
                                        return <TableData {...cell.getCellProps()}>{cell.render("Cell")}</TableData>;
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </ReactTable>
            </Content>
            <Pagination>
                <div>
                    Page <strong>{state.pageIndex + 1}</strong>/<strong>{pageOptions.length}</strong>
                </div>
                <div>
                    <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <span className='ti-angle-double-left'></span>
                    </Button>
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <span className='ti-angle-left'></span>
                    </Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                        <span className='ti-angle-right'></span>
                    </Button>
                    <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <span className='ti-angle-double-right'></span>
                    </Button>
                </div>
            </Pagination>
        </Wrapper>
    );
};

export default Table;
