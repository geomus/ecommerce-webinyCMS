import React from "react";
import { useQuery } from "@apollo/client";
import ProductsFormAdd from "./ProductsFormAdd";
import { listAllCategories } from "../../../graphql/query";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import LinearProgress from "@material-ui/core/LinearProgress";
import { TransitionProps } from "@material-ui/core/transitions";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: "relative"
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1
        }
    })
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);
    const { loading: categoriesLoading, error: categoriesError, data } = useQuery(
        listAllCategories
    );

    if (categoriesLoading) {
        return (
            <h1>
                {" "}
                <LinearProgress />{" "}
            </h1>
        );
    }
    if (categoriesError) {
        console.dir(categoriesError);
        return <h1> error </h1>;
    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const categoriesData = JSON.parse(JSON.stringify(data.categories.listCategories.data)).filter(
        (c) => c.enabled == true
    );

    for (const c of categoriesData) {
        delete c.__typename;
        delete c.isEnabledInHierarchy;
        c.parent ? delete c.parent.__typename : "";
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
            >
                NUEVO
            </Button>
            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDialog}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Nuevo Producto
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ProductsFormAdd
                        handleCloseDialog={handleCloseDialog}
                        enabledCategories={categoriesData}
                    />
                </List>
            </Dialog>
        </div>
    );
}
