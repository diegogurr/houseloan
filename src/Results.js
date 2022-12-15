import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React, {useState} from "react";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import HSBCLogo from './Images/1200px-HSBC_logo_(2018).svg.png'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function createData(name, paymentPerMonthAPS, promiseOfSale, paymentPerMonthHSBC, paymentPerMonthBankOfValletta, paymentPerMonthBNF, canAfford) {
    return {
        name,
        paymentPerMonthAPS,
        promiseOfSale,
        paymentPerMonthHSBC,
        paymentPerMonthBankOfValletta,
        paymentPerMonthBNF,
        canAfford
    };
}

function Results(props) {
    const [rows, setRows] = useState([]);
    const [currentIncomesSum, setCurrentIncomesSum] = useState(0);
    const [resultsVisible, setResultsVisible] = useState(false);
    const [calculateClickable, setCalculateClickable] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);


    function calculatePOS(priceEveryStep, monthlyRateInterest) {
        const p = 0.9 * (priceEveryStep)
        const r = monthlyRateInterest / 12 / 100
        const n = props.loanDuration * 12

        const x = (1 + r) ** n
        const y = (1 + r) ** n - 1

        const finalResult = (p * r * x / y).toFixed(2)

        return finalResult
    }

    const handleSnackbarClick = () => {
        setSnackbarOpen(true)
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };
    const handleAddButtonClick = (minPrice, maxPrice) => {
        let price = minPrice
        let priceStep = 10000
        setRows([]) //RESET TABLE

        while (price <= maxPrice) {

            const newItem = createData(price, calculatePOS(price, 3.04), 0.1 * price, calculatePOS(price, 2.70), calculatePOS(price, 2.58), calculatePOS(price, 2.81))

            setRows(current => [...current, newItem])

            if (price >= 1000000) {
                priceStep = 100000
                price += priceStep
            } else
                price += priceStep

        }

    };

    return (
        <Box sx={{marginBottom: 10}}>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{backgroundColor: '#e9c46a', height: 100}}>
                            <TableCell>Price Steps</TableCell>
                            <TableCell align="right">Promise of Sale</TableCell>
                            <TableCell align="right">Payment per month(APS)</TableCell>
                            <TableCell align="right">Payment per month(HSBC)
                                <img style={{height: 20}}
                                     src={HSBCLogo}/></TableCell>
                            <TableCell align="right">Payment per month(Bank of Valletta)</TableCell>
                            <TableCell align="right">Payment per month(BNF)</TableCell>
                            <TableCell>
                                <Button sx={{marginBottom: 2}} variant="contained" size='small'
                                        endIcon={<SendIcon/>}
                                        onClick={() => {
                                            handleAddButtonClick(props.minPrice, props.maxPrice);
                                            setCurrentIncomesSum(props.incomesSum);
                                            setResultsVisible(true);
                                        }}
                                        disabled={props.annualGrossIncome == 0 || props.mainAge == 0 || props.minPrice == 0 || props.maxPrice == 0 || props.mainAge < 18 || props.mainAge > 100 || isNaN(props.annualGrossIncome)}>Calculate</Button>
                                <Button sx={{
                                    backgroundColor: "#e76f51", '&:hover': {
                                        backgroundColor: '#f4a261',
                                    }
                                }} variant="contained" size='small'
                                        startIcon={<DeleteIcon/>}
                                        disabled={!resultsVisible}
                                        onClick={() => {
                                            setRows([]);
                                            setResultsVisible(false);
                                            handleSnackbarClick();
                                        }}>Clear</Button>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.promiseOfSale}</TableCell>
                                <TableCell sx={{color: currentIncomesSum > row.paymentPerMonthAPS ? 'green' : 'red'}}
                                           align="right">{row.paymentPerMonthAPS}
                                </TableCell>
                                <TableCell sx={{color: currentIncomesSum > row.paymentPerMonthHSBC ? 'green' : 'red'}}
                                           align="right">{row.paymentPerMonthHSBC}</TableCell>
                                <TableCell
                                    sx={{color: currentIncomesSum > row.paymentPerMonthBankOfValletta ? 'green' : 'red'}}
                                    align="right">{row.paymentPerMonthBankOfValletta}</TableCell>
                                <TableCell sx={{color: currentIncomesSum > row.paymentPerMonthBNF ? 'green' : 'red'}}
                                           align="right">{row.paymentPerMonthBNF}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <Alert variant={'filled'} onClose={handleSnackbarClose} severity={'info'}>
                    {'Results Cleared'}
                </Alert>
            </Snackbar>
        </Box>
    );

}

export default Results;
