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
import CustomSpinner from "../../common/animation/CustomSpiner";

const InvoiceList2 = ({ data, id }) => {
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };
  const filteredData = data?.filter((item) => item.courseId === id);

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
            data={filteredData}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            noDataComponent={
              <>
                {!filteredData ? (
                  <CustomSpinner
                    style={"text-primary"}
                    style2={{ marginTop: "100px", marginBottom: "100px" }}
                    color={""}
                  />
                ) : (
                  <h2 style={{ marginTop: "100px", marginBottom: "100px" }}>
                    نظری وجود ندارد{" "}
                  </h2>
                )}
              </>
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList2;
