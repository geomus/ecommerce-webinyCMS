import React from 'react';
import ShopCartButton from './ShopCartButton'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
    root: {
        textAlign: "center",
        transition: "all 0.1s",
        '&:hover': {
            transform: "scale(1.05) translateY(-20px)",
            textDecoration: "none",
            boxShadow:" 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            zIndex:1000
        },
    },
    media: {
        backgroundSize: "contain",
        height: 200,
    },
    btnCenter: {
        width: "100%",
    }
});

export default function Product(props) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={3} lg={2}>
            <Card className={classes.root} key={props.id} elevation={0}>
                <CardActionArea href={`/wonder-slug/product-detail?id=${props.id}`}>
                        <CardMedia
                            className={classes.media}
                            image={props.images}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body1" color="textSecondary">
                                {props.name}
                            </Typography>
                            <Typography gutterBottom variant="h6" color="textSecondary">
                                ${props.price}
                            </Typography>
                        </CardContent>
                </CardActionArea>
                <CardActions>
                    <ShopCartButton {...props} />
                </CardActions>
            </Card>
        </Grid>
    );
}
