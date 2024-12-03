// ** React Imports
import { useState, useEffect } from "react";

// ** Table Columns
import {
  columns,
  GroupOfCourseDetailsList,
  PayColInCoursePage,
} from "./columns";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Reactstrap Imports
import { Card, Col, Row } from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomSpinner from "../../common/animation/CustomSpiner";

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
            sortServer
            columns={GroupOfCourseDetailsList}
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
                    گروهی وجود ندارد{" "}
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

export default ListOfGroupCourse;
