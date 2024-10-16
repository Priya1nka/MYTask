


import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  TablePagination,
  Tooltip as MuiTooltip,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import BarChartIcon from "@mui/icons-material/BarChart";
import RadarIcon from "@mui/icons-material/Radar";
import moment from "moment";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

// Function to generate random data
const generateNewDataPoint = () => {
  const value = Math.floor(Math.random() * 100) + 1;
  const timestamp = moment().format("hh:mm:ss A"); // 12-hour format with AM/PM
  return { timestamp, value };
};

const Task = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Initialize with random data
  useEffect(() => {
    const initialData = Array.from({ length: 10 }, () =>
      generateNewDataPoint()
    );
    setData(initialData);
  }, []);

  // Auto-refresh to append new data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => [...prevData, generateNewDataPoint()]);
    }, 5000); // 5 seconds interval
    return () => clearInterval(interval);
  }, []);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* AppBar Header */}
      <AppBar position="static" style={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dashboard - Live Data Monitoring
          </Typography>
          <MuiTooltip title="Save Data">
            <IconButton color="inherit">
              <SaveAltIcon />
            </IconButton>
          </MuiTooltip>
          <MuiTooltip title="Refresh Data">
            <IconButton color="inherit">
              <RefreshIcon />
            </IconButton>
          </MuiTooltip>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={4}>
          {/* Line Chart */}
          <Grid item xs={12} md={6}>
            <Card
              style={{
                backgroundColor: "#e3f2fd",
                borderRadius: "15px",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary">
                  <ShowChartIcon /> Line Chart 
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.slice(-10)}>
                    <XAxis dataKey="timestamp" />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip />
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e88e5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#1e88e5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#1e88e5"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <Card
              style={{
                backgroundColor: "#e8f5e9",
                borderRadius: "15px",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="secondary">
                  <BarChartIcon /> Bar Chart 
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.slice(-10)}>
                    <XAxis dataKey="timestamp" />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#43a047" />
                    <Bar dataKey="value" fill="#fb8c00" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card
              style={{
                backgroundColor: "#fce4ec",
                borderRadius: "15px",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="error">
                  <PieChartIcon /> Pie Chart 
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.slice(-10)}
                      dataKey="value"
                      outerRadius={100}
                      fill="#e53935"
                      label={(entry) => entry.timestamp}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Radar Chart */}
          <Grid item xs={12} md={6}>
            <Card
              style={{
                backgroundColor: "#fff3e0",
                borderRadius: "15px",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" style={{ color: "#ff8f00" }}>
                  <RadarIcon /> Radar Chart 
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={data.slice(-10)}>
                    <PolarGrid stroke="#ff8f00" />
                    <PolarAngleAxis dataKey="timestamp" />
                    <Radar
                      name="Values"
                      dataKey="value"
                      stroke="#ff8f00"
                      fill="#ff8f00"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Table for Data with Pagination */}
          <Grid item xs={12}>
            <Card
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "15px",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6">Generated Data</Typography>
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.timestamp}</TableCell>
                          <TableCell>{row.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination Controls */}
                  <TablePagination
                    component="div"
                    count={data.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Task;
