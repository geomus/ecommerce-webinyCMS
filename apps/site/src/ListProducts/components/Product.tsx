import React from 'react';
import ShopCartButton from './ShopCartButton'
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


export default function Product(props) {
    const theme = useTheme();
    const useStyles = makeStyles({
        root: {
            textAlign: "left",
            transition: "all 0.1s",
            height: '100%',
            [theme.breakpoints.up(768)]: {
                height: '85%',
            },
            '&:hover': {
                transform: "scale(1.05) translateY(-20px)",
                textDecoration: "none",
                boxShadow: " 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
                zIndex: 1000,
                height: '100%'
            },
        },
        media: {
            backgroundSize: "contain",
            height: 200,
        },
        productName: {
            height: 55,
            textTransform: 'uppercase',
            fontWeight: 'bolder',
            marginBottom: 5
        },
        productPrice: {
            position: 'relative',
            top: 20,
            fontWeight: 'bold'
        }
    });
    const classes = useStyles();

    return (
        <Grid item xs={6} sm={6} md={3} lg={2}>
            <Card className={classes.root} key={props.id} elevation={0}>
                <CardActionArea href={`/wonder-slug/product-detail?id=${props.id}`}>
                    <CardMedia
                        className={classes.media}
                        image={props.images}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.productName}>
                            {props.name}
                        </Typography>
                        <Typography gutterBottom variant="h6" color="textPrimary" className={classes.productPrice}>
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
