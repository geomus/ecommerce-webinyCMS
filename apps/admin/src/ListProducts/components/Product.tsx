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

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    white: {
        color: "white",
    }
});

export default function Product({ id, images, name, price }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} key={id}>
            <CardActionArea>
                <a href={`/wonder-slug/product-detail?${id}`}>
                <CardMedia
                    className={classes.media}
                    image={images}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" color="textSecondary">
                        {name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        ${price}
                    </Typography>
                </CardContent>
                </a>
            </CardActionArea>
            <CardActions>
            <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                    >
                        ADD TO CART
                    </Button>
            </CardActions>
        </Card>
    );
}
