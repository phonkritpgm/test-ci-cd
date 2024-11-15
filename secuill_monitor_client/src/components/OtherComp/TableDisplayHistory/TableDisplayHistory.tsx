// @ts-nocheck 
import React from "react";
import { useSortBy, useTable } from "react-table";
import { v4 as uuidv4 } from 'uuid';
import styles from "./TableDisplayHistory.module.css";

const useRowSpan = (instance: any) => {
    const { allColumns } = instance;
    let rowSpanHeaders: any = [];
    let rowsUniqueKey: any = [];
    let cellTextCenter: any = [];
    // let rowCenter: any=[];
    allColumns.forEach((column: any, i: number) => {
        const { id, enableRowSpan, filedDuplicate, cellCenter } = column;
        if (enableRowSpan) {
            rowSpanHeaders = [
                ...rowSpanHeaders,
                { id, topCellValue: null, topCellIndex: 0 , duplicateCellsValue: null},
            ];
        }

        //if(filedDuplicate){
        rowsUniqueKey = [
            ...rowsUniqueKey,
            { colNumber: i, id, filedDuplicate: filedDuplicate },
        ];

        //}

        // if(cellCenter){
        cellTextCenter = [
            ...cellTextCenter,
            { colNumber: i, id, cellTextCenter: cellCenter },
        ];
        // }

        Object.assign(instance, { rowSpanHeaders, rowsUniqueKey, cellTextCenter });
    });
};

const TableDisplayHistory = ( props: any ) => {
    const tableData = React.useMemo(() => props.data == undefined || props == undefined ? [] : props.data[0], []);
    const columns = React.useMemo(() => {
        return props.columns == undefined || props == undefined ? [] : props.columns[0]
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        rowSpanHeaders,
        rowsUniqueKey,
        cellTextCenter,
    } = useTable(
        { columns, data: tableData },
        (hooks: any) => hooks.useInstance.push(useRowSpan),
        useSortBy
    );

    return (
        <React.Fragment>
            { 
                props == undefined || columns == null
                ? 
                    <div>Error data nothing!</div>
                :         
                    <div className={ styles.table_container }>
                        <table key={ uuidv4() } {...getTableProps()}>
                            <thead>
                                {headerGroups.map((headerGroup: any) => (
                                    // {...headerGroup.getHeaderGroupProps()}
                                    <tr key={ uuidv4() } {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column: any) => (
                                            // {...column.getHeaderProps()} //sortby : > {...column.getHeaderProps(column.getSortByToggleProps())}
                                            <th key={ uuidv4() } {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render("Header")}
                                                <span>
                                                    {/* {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : " 🔽"} */}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row: any, i: number) => {
                                    prepareRow(row);
                                    
                                    let strCheckSpanKey: string = "";
                                    // fir unique key name
                                    for (let j = 0; j < rowsUniqueKey.length; j++) { 
                                        if(rowsUniqueKey[j].filedDuplicate){
                                            strCheckSpanKey += row.allCells[rowsUniqueKey[j].colNumber].value;
                                        }              
                                    }                           
                                    
                                    // for column span
                                    for (let j = 0; j < row.allCells.length; j++) {        
                                        
                                        const cell = row.allCells[j];
                                        const rowSpanHeader: any = rowSpanHeaders.find(
                                            (x: any) => x.id === cell.column.id
                                        );

                                        if(rowSpanHeader) { 
                                            if( cell.value != rowSpanHeader.topCellValue || strCheckSpanKey != rowSpanHeader.duplicateCellsValue || rowSpanHeader.topCellValue === null ){
                                                cell.isRowSpanned = false;
                                                rowSpanHeader.topCellValue = cell.value;
                                                rowSpanHeader.duplicateCellsValue = strCheckSpanKey
                                                rowSpanHeader.topCellIndex = i;
                                                cell.rowSpan = 1;
                                                
                                            } else{
                                                rows[rowSpanHeader.topCellIndex].allCells[j].rowSpan++;
                                                cell.isRowSpanned = true;
                                            }
                                        }                                                                   
                                    }
                                    return null;
                                })}
                                {rows.map((row: any) => {
                                    return (       
                                        <tr key={ uuidv4() }>
                                            {/* {...row.getRowProps()} */}
                                            {row.cells.map((cell: any, i: number) => {
                                                if (cell.isRowSpanned) return null;
                                                else
                                                    return (
                                                        <td key={ uuidv4() }
                                                            className={ cellTextCenter[i].cellTextCenter && styles.text_center }
                                                            rowSpan={cell.rowSpan}
                                                            // {...cell.getCellProps()}
                                                        >
                                                            {cell.render("Cell")}
                                                        </td>
                                                    );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
            }       
        </React.Fragment>
    );
};

export default TableDisplayHistory;
