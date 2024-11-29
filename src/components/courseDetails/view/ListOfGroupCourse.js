// ** React Imports
import { useState, useEffect } from "react";

// ** Table Columns
import { columns, GroupOfCourseDetailsList, PayColInCoursePage } from "./columns";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const ListOfGroupCourse = ({ data, id }) => {
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
            columns={GroupOfCourseDetailsList}
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

export default ListOfGroupCourse;
