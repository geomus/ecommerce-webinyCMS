import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { listSubcategories } from "../../graphql/query";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const SubcategoriesList = ({ parent, handlerBreadcrumb }): JSX.Element => {
    const [selected, setSelected] = useState<string>("");
    const [parentId, setParentId] = useState({});

    useEffect(() => {
        setParentId(parent.id);
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

    return (
        <React.Fragment>
            {dataSubcategories.categories.listCategories.data
                ? dataSubcategories.categories.listCategories.data.map((category) => (
                      <ListItem button key={category.id}>
                          <ListItemText
                              primary={category.name}
                              onClick={() => handlerBreadcrumb(category)}
                          />
                      </ListItem>
                  ))
                : ""}
        </React.Fragment>
    );
};

export default SubcategoriesList;
