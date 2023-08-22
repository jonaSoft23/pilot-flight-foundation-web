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

  const testData = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Kamya',
      address: 'Kampala, Uganda',
      contact: '+256701234567',
      VSLA: 'Kampala Loans Group'
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Nalubega',
      address: 'Entebbe, Uganda',
      contact: '+256712345678',
      VSLA: 'Entebbe Loans Group'
    },
    {
      id: 3,
      first_name: 'Michael',
      last_name: 'Ssempala',
      address: 'Jinja, Uganda',
      contact: '+256723456789',
      VSLA: 'Jinja Loans Group'
    },
    // Add 10 more entries here
    {
      id: 4,
      first_name: 'Grace',
      last_name: 'Namubiru',
      address: 'Masaka, Uganda',
      contact: '+256734567890',
      VSLA: 'Masaka Loans Group'
    },
    {
      id: 5,
      first_name: 'David',
      last_name: 'Owori',
      address: 'Gulu, Uganda',
      contact: '+256745678901',
      VSLA: 'Gulu Loans Group'
    },
    {
      id: 6,
      first_name: 'Sarah',
      last_name: 'Lubega',
      address: 'Mbale, Uganda',
      contact: '+256756789012',
      VSLA: 'Mbale Loans Group'
    },
    {
      id: 7,
      first_name: 'Andrew',
      last_name: 'Musoke',
      address: 'Mbarara, Uganda',
      contact: '+256767890123',
      VSLA: 'Mbarara Loans Group'
    },
    {
      id: 8,
      first_name: 'Sandra',
      last_name: 'Katusiime',
      address: 'Fort Portal, Uganda',
      contact: '+256778901234',
      VSLA: 'Fort Portal Loans Group'
    },
    {
      id: 9,
      first_name: 'Joseph',
      last_name: 'Mugabi',
      address: 'Kasese, Uganda',
      contact: '+256789012345',
      VSLA: 'Kasese Loans Group'
    },
    {
      id: 10,
      first_name: 'Juliet',
      last_name: 'Nakato',
      address: 'Masindi, Uganda',
      contact: '+256790123456',
      VSLA: 'Masindi Loans Group'
    },
    {
      id: 11,
      first_name: 'Peter',
      last_name: 'Kiggundu',
      address: 'Arua, Uganda',
      contact: '+256801234567',
      VSLA: 'Arua Loans Group'
    },
    {
      id: 12,
      first_name: 'Catherine',
      last_name: 'Lubowa',
      address: 'Lira, Uganda',
      contact: '+256812345678',
      VSLA: 'Lira Loans Group'
    },
    {
      id: 13,
      first_name: 'Paul',
      last_name: 'Ssebunya',
      address: 'Kabale, Uganda',
      contact: '+256823456789',
      VSLA: 'Kabale Loans Group'
    },
    {
      id: 14,
      first_name: 'Mary',
      last_name: 'Nakato',
      address: 'Soroti, Uganda',
      contact: '+256834567890',
      VSLA: 'Soroti Loans Group'
    },
    {
      id: 15,
      first_name: 'Simon',
      last_name: 'Kawesa',
      address: 'Tororo, Uganda',
      contact: '+256845678901',
      VSLA: 'Tororo Loans Group'
    },
    {
      id: 16,
      first_name: 'Christine',
      last_name: 'Mirembe',
      address: 'Hoima, Uganda',
      contact: '+256856789012',
      VSLA: 'Hoima Loans Group'
    },
    {
      id: 17,
      first_name: 'Daniel',
      last_name: 'Lutaaya',
      address: 'Kabale, Uganda',
      contact: '+256867890123',
      VSLA: 'Kabale Loans Group'
    },
    {
      id: 18,
      first_name: 'Rebecca',
      last_name: 'Nabirye',
      address: 'Masindi, Uganda',
      contact: '+256878901234',
      VSLA: 'Masindi Loans Group'
    },
    {
      id: 19,
      first_name: 'Robert',
      last_name: 'Wasswa',
      address: 'Arua, Uganda',
      contact: '+256889012345',
      VSLA: 'Arua Loans Group'
    }
  ];
  
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


/* handling test data table */


const [pageT, setPageT] = useState(0);
const [rowsPerPageT, setRowsPerPageT] = useState(5);

const handleChangePageT = (event, newPageT) => {
  setPageT(newPageT);
};

const handleChangeRowsPerPageT = (event) => {
    setRowsPerPageT(parseInt(event.target.value, 10));
    setPageT(0);
  };

/* handling test data table */


  if (membersResult) {
    loader = membersResult?.members?.data;
    console.log(JSON.stringify(loader, null, 2));
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
            {/* <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Address</TableCell>
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
                      <TableCell>{item?.attributes?.address}</TableCell>                      
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table> */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>VSLA</TableCell>
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
                      <TableCell>{item?.attributes?.contact}</TableCell>
                      <TableCell>{item?.attributes?.address}</TableCell>                      
                      <TableCell>{item?.attributes?.vsla?.data?.attributes?.name}</TableCell>                      
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalMembers}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        /> */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={5}
          onPageChange={handleChangePageT}
          onRowsPerPageChange={handleChangeRowsPerPageT}
          page={pageT}
          rowsPerPage={5}
        />
      </Card>
    </>
  );
};

MembersTable.propTypes = {
  members: PropTypes.object,
};
