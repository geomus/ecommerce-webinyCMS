import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
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
    white: {
        color: "white",
    },
    btnCenter: {
        margin: "auto",
    }
});

export default function Product({ id, images, name, price }) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.root} key={id} elevation={5}>
                <CardActionArea href={`/wonder-slug/product-detail?id=${id}`}>
                        <CardMedia
                            className={classes.media}
                            image={images}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body1" color="textSecondary">
                                {name}
                            </Typography>
                            <Typography gutterBottom variant="h6" color="textSecondary">
                                ${price}
                            </Typography>
                        </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        className={classes.btnCenter}
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                    >
                        ADD TO CART
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
