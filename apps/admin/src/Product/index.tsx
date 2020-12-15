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
import { ReactComponent as RbNew } from '../utils/svg/rb-new.svg'


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
        },
        ribbonNew: {
            position: 'absolute',
            top: -10,
            right: -5,
            width: 70
        }
    });
    const classes = useStyles();

    return (
        <Card className={classes.root} key={props.id} elevation={0}>
            <CardActionArea href={`/wonder-slug/product-detail?id=${props.id}`}>
            {props.images ?
                    <CardMedia
                    className={classes.media}
                    image={`${process.env.REACT_APP_API_URL}/files/${props.images[0]}`}
                    title="Producto"
                /> :
                <CardMedia
                    className={classes.media}
                    image="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                    title="Producto"
                />
                }
                <CardContent>
                    <Typography gutterBottom variant="body2" color="textSecondary" className={classes.productName}>
                        {props.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" color="textPrimary" className={classes.productPrice}>
                        ${props.priceBase}
                    </Typography>
                    {props.isFeatured && <RbNew className={classes.ribbonNew} />}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <ShopCartButton {...props} />
            </CardActions>
        </Card>
    );
}
