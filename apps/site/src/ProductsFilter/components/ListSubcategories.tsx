import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { listSubcategories } from "../../graphql/query";
import LinearProgress from "@material-ui/core/LinearProgress";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";

const SubcategoriesList = (parent): JSX.Element => {
    const [selected, setSelected] = useState<string>("");
    const [parentId, setParentId] = useState({});
    useEffect(() => {
        setParentId(parent.parent);
    }, []);

    const {
        loading: loadingSubcategories,
        error: errorSubcategories,
        data: dataSubcategories
    } = useQuery(listSubcategories, { variables: { parent: { id: parentId } } });
    if (loadingSubcategories) {
        return (
            <h1>
                <LinearProgress />
            </h1>
        );
    }

    if (errorSubcategories) {
        console.dir(errorSubcategories);
        return <h1> error </h1>;
    }
    console.log(dataSubcategories.categories.listCategories.data);
    
    const handleSelect = (event: React.ChangeEvent<{}>, nodeId) => {
        setSelected(nodeId);
    };

    return (
        <React.Fragment>
            <Typography variant="subtitle1">{selected}</Typography>
            {dataSubcategories ??
                dataSubcategories.categories.listCategories.data.map((category, i) => (
                    <TreeItem key={i + "subcat"} nodeId={category.id} label={category.name} />
                ))}
        </React.Fragment>
    );
};

export default SubcategoriesList;
