import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { listCategoriesParentsEnabled } from "../../graphql/query";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import SubcategoriesList from "./ListSubcategories";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 240,
            flexGrow: 1,
            maxWidth: 400
        },
        list: {
            display: "flex",
            flexDirection: "column",
            width: 360
        }
    })
);

const CategoriesFilter = ({ categoriesFilter }) => {
    const classes = useStyles();
    const [selected, setSelected] = useState<string>("");
    const [subLevel, setSubLevel] = useState(false);

    const { loading: loadingParents, error: errorParents, data: dataParents } = useQuery(
        listCategoriesParentsEnabled
    );

    if (loadingParents) {
        return (
            <h1>
                <LinearProgress />
            </h1>
        );
    }

    if (errorParents) {
        console.dir(errorParents);
        return <h1> error </h1>;
    }

    const handleSelect = (event: React.ChangeEvent<{}>, nodeId) => {
        setSubLevel(true);
        setSelected(nodeId);
        categoriesFilter(nodeId);
    };

    return (
        <React.Fragment>
            <Grid container item spacing={3} sm={3} direction="column">
                <Grid item>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        <Link color="inherit" href="#">
                            Parent1
                        </Link>
                        <Link color="inherit" href="#">
                            SubCat1
                        </Link>
                        <Typography color="textPrimary">SubCat1</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item container>
                    <TreeView
                        className={classes.root}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpanded={["root"]}
                        defaultExpandIcon={<ChevronRightIcon />}
                        selected={selected}
                        onNodeSelect={handleSelect}
                    >
                        {!subLevel ? (
                            dataParents.categories.listCategories.data.map((category, i) => (
                                <TreeItem
                                    key={category + i}
                                    nodeId={category.id}
                                    label={category.name}
                                />
                            ))
                        ) : (
                            <SubcategoriesList parent={selected} />
                        )}
                    </TreeView>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default CategoriesFilter;
