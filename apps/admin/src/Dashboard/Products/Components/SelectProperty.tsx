/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client'
import { listProperties } from '../../../graphql/query'

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        padding: "10px 0"
    },
    textField: {
        textTransform: "uppercase",
        paddingRight: 10
    },
    inputField: {
        border: 0,
        borderBottom: "1px solid #000"
    }
}));

export default function Tags({handleChangeVariants}) {
    const classes = useStyles();
    const [propertyList, setPropertyList] = useState([{
        id: null,
        name: null
    }])
    
    const { loading, error, data } = useQuery(listProperties)
    useEffect(() => {
        if (!loading && data) {
            const properties = data.properties.listProperties.data    
            setPropertyList(properties)
        }
    }, [loading, data])
    

    return (
        <div>
                    {
                        propertyList.map((item, i) => 
                        <div key={i} className={classes.root}>
                            <p className={classes.textField}>{item.name}:</p>
                            <input className={classes.inputField} type="text" name={item.name} onBlur={handleChangeVariants} />
                        </div>)
                    }
        </div >
    );
}

