import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

function getSteps() {
    return ['Selecciona un archivo', 'Defina las columnas a importar', 'Inicie la importación'];
}

export default function StepperImport() {
    const classes = useStyles();
    const [activeStep] = React.useState(0);
    const steps = getSteps();

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label} color="primary" active>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
  );
}
