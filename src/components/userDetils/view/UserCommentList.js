// ** React Imports
import { useState, useEffect } from "react";

// ** Table Columns
import { columns, columns2, columns3ForComment } from "./columns";

// ** Third Party Components
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  ExternalLink,
  Printer,
  FileText,
  File,
  Clipboard,
  Copy,
} from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

// ** Store & Actions
// import { getData } from '@src/views/apps/invoice/store'
import { useDispatch, useSelector } from "react-redux";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const UserCommentList = ({ data }) => {
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            sortServer
            columns={columns3ForComment}
            responsive={true}
            onSort={handleSort}
            data={data}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
          />
        </div>
      </Card>
    </div>
  );
};

export default UserCommentList;
