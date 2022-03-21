import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image="https://image.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    UX Design Course
                </Typography>
                <Typography variant="body2" color="text.secondary">
                   Spring 2021
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
