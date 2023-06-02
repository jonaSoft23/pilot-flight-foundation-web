import PropTypes from "prop-types";
import { useState } from "react";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useQuery } from "@apollo/react-hooks";
import getAllMembers from "@/queries/getMembers";

export const MembersTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  var loader = [];
  var totalMembers;

  const {
    loading: getMembersLoading,
    error: getMembersError,
    data: membersResult,
  } = useQuery(getAllMembers, {
    variables: { offset: page * rowsPerPage, limit: rowsPerPage },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (membersResult) {
    // console.log(JSON.stringify(membersResult?.members?.data));
    loader = membersResult?.members?.data;
    totalMembers = membersResult?.members?.meta?.pagination?.total;
  }

  if (getMembersLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (getMembersError) {
    console.log(JSON.stringify(getMembersError));
    return <p>Something Went Wrong !!!</p>;
  }

  return (
    <>
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Contact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loader.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar>
                            {getInitials(
                              item?.attributes?.first_name +
                                " " +
                                item?.attributes?.last_name
                            )}
                          </Avatar>
                          <Typography variant="subtitle2">
                            {item?.attributes?.first_name +
                              " " +
                              item?.attributes?.last_name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{item?.attributes?.last_name}</TableCell>
                      <TableCell>{item?.attributes?.contact}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalMembers}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Card>
    </>
  );
};

MembersTable.propTypes = {
  members: PropTypes.object,
};
