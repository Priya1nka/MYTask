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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
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
} from "recharts";
import BarChartIcon from "@mui/icons-material/BarChart";
import RadarIcon from "@mui/icons-material/Radar";
import moment from "moment";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import EditIcon from "@mui/icons-material/Edit";

const generateNewDataPoint = () => {
  const value = Math.floor(Math.random() * 100) + 1;
  const timestamp = moment().format("hh:mm:ss A");
  return { timestamp, value };
};

const Task = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [editPointIndex, setEditPointIndex] = useState(null);

  useEffect(() => {
    const initialData = Array.from({ length: 10 }, () => generateNewDataPoint());
    setData(initialData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => [...prevData, generateNewDataPoint()]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleEditClick = (row) => {
    setEditPointIndex(data.indexOf(row));
    setNewValue(row.value);
    setOpen(true);
  };

  const handleValueChange = (event) => {
    setNewValue(event.target.value);
  };

  const handleSave = () => {
    const updatedData = data.map((row, index) =>
      index === editPointIndex ? { ...row, value: parseInt(newValue, 10) } : row
    );
    setData(updatedData);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLineClick = (data) => {
    const index = data.index;
    setEditPointIndex(index);
    setNewValue(data.payload.value);
    setOpen(true);
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
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
     
            <Grid item xs={12} md={6}>
              <Card style={{ backgroundColor: "#e3f2fd", borderRadius: "15px", boxShadow: "0px 4px 20px rgba(0,0,0,0.1)", transition: "0.3s", '&:hover': { boxShadow: "0px 8px 40px rgba(0,0,0,0.2)" } }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    <ShowChartIcon /> Line Chart
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.slice(-10)}>
                      <XAxis dataKey="timestamp" />
                      <YAxis domain={["auto", "auto"]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#FF5722"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                        dot={{ stroke: "#FF5722", strokeWidth: 2 }}
                        onClick={handleLineClick}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

        
            <Grid item xs={12} md={6}>
              <Card style={{ backgroundColor: "#e8f5e9", borderRadius: "15px", boxShadow: "0px 4px 20px rgba(0,0,0,0.1)", transition: "0.3s", '&:hover': { boxShadow: "0px 8px 40px rgba(0,0,0,0.2)" } }}>
                <CardContent>
                  <Typography variant="h6" color="secondary" gutterBottom>
                    <BarChartIcon /> Bar Chart
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.slice(-10)}>
                      <XAxis dataKey="timestamp" />
                      <YAxis domain={["auto", "auto"]} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#FF9800" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} md={6}>
              <Card style={{ backgroundColor: "#fce4ec", borderRadius: "15px", boxShadow: "0px 4px 20px rgba(0,0,0,0.1)", transition: "0.3s", '&:hover': { boxShadow: "0px 8px 40px rgba(0,0,0,0.2)" } }}>
                <CardContent>
                  <Typography variant="h6" color="error" gutterBottom>
                    <PieChartIcon /> Pie Chart
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={data.slice(-5)} dataKey="value" nameKey="timestamp" cx="50%" cy="50%" outerRadius={100} fill="#FF4081" label />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card style={{ backgroundColor: "#fff3e0", borderRadius: "15px", boxShadow: "0px 4px 20px rgba(0,0,0,0.1)", transition: "0.3s", '&:hover': { boxShadow: "0px 8px 40px rgba(0,0,0,0.2)" } }}>
                <CardContent>
                  <Typography variant="h6" color="warning" gutterBottom>
                    <RadarIcon /> Radar Chart
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={data.slice(-5)}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="timestamp" />
                      <YAxis domain={["auto", "auto"]} />
                      <Radar name="Value" dataKey="value" stroke="#FF5722" fill="#FF5722" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Data Table */}
          <Paper style={{ marginTop: "20px", padding: "20px", borderRadius: "15px", boxShadow: "0px 4px 20px rgba(0,0,0,0.1)" }}>
            <Typography variant="h6" gutterBottom>
              Data Table
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", backgroundColor: "#e0e0e0" }}>Timestamp</TableCell>
                  <TableCell style={{ fontWeight: "bold", backgroundColor: "#e0e0e0" }}>Value</TableCell>
                  <TableCell style={{ fontWeight: "bold", backgroundColor: "#e0e0e0" }}>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.timestamp}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(row)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>

  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Data Point</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Value"
              type="number"
              fullWidth
              variant="standard"
              value={newValue}
              onChange={handleValueChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Task;
