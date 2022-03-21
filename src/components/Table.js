import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(scientific_name, common_name, num_of_examined, origin) {
    return { scientific_name, common_name, num_of_examined, origin };
}

const rows = [
    createData('Uromastyx hardwickii', 'Hardwicks Spiny-tailed Lizard', 126, 'Slovenia*'),
    createData('Iguana iguana', 'Green Iguana', 25, 'EU countries'),
    createData('Uromastyx dispar', 'Lepard Gecko', 25, 'Pakistan'),
    createData('Gekko gecko', 'Sudan Spiny-tailed Lizard', 26, 'Mali'),
    createData('Pogona vitticeps', 'Tokay Gecko', 15, 'EU countries**'),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Scientific Name</TableCell>
                        <TableCell align="right">Common Name</TableCell>
                        <TableCell align="right">Number Of Examined</TableCell>
                        <TableCell align="right">Origin</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.scientific_name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.scientific_name}
                            </TableCell>
                            <TableCell align="right">{row.common_name}</TableCell>
                            <TableCell align="right">{row.num_of_examined}</TableCell>
                            <TableCell align="right">{row.origin}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}