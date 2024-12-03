// ** React Imports
import { useState, useEffect } from "react";

// ** Table Columns
import { columns, columns2 } from "./columns";

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

const InvoiceList = ({ data, CourseDetails }) => {
  // ** Store Vars
  const dispatch = useDispatch();
  // const store = useSelector(state => state.invoice)

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
            columns={columns2(CourseDetails)}
            responsive={true}
            onSort={handleSort}
            data={data}
            sortIcon={<ChevronDown />}
            className="react-dataTable overflow-visible overflow-x-visible"
            defaultSortField="invoiceId"
            noDataComponent={
              <>
                {!data ? (
                  <CustomSpinner
                    style={"text-primary"}
                    style2={{ marginTop: "100px", marginBottom: "100px" }}
                    color={""}
                  />
                ) : (
                  <h2 style={{ marginTop: "100px", marginBottom: "100px" }}>
                    رزروی وجود ندارد{" "}
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

export default InvoiceList;
