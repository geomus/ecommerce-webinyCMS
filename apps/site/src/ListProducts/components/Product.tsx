import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as ShopCart } from "@icons/material/svg/cart-plus.svg";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function Product({ id, images, name, price }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} key={id}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={images}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <form action="/wonder-slug/product-detail" method="get">
                    <input type="hidden" name="id" value={id} />
                    <Button size="small" color="primary" type="submit">
                        Ver Mas
                </Button>
                </form>
                <Button size="small" color="primary">
                    <ShopCart />
                </Button>
            </CardActions>
        </Card>
    );
}
