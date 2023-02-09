import React, {useRef} from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FormControl from "@material-ui/core/FormControl";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Save} from "@material-ui/icons";
import axios from "axios";


export default function EditJob(props) {
    const packetName = useRef();
    const methodName = useRef();
    const className = useRef();
    const date = useRef();

    function updateJob(e) {
        console.log(packetName.current.value)
        console.log(methodName.current.value)
        console.log(className.current.value)
       // console.log(date.current)
        console.log(props.jobInfo.id)

        let classNameWithFirstCharUpper= className.current.value.charAt(0).toUpperCase()+className.current.value.slice(1).toLowerCase()

        axios.post("http://localhost:8080/api/update", null,{ params: {
                id: props.jobInfo.id,
                packageName: packetName.current.value,
                 methodName: methodName.current.value,
                className: classNameWithFirstCharUpper,
                scheduledTime: date.current.value
            }})
    }

    const dateJob = props.jobInfo.jobHistory[props.jobInfo.jobHistory.length - 1].scheduledAt !== undefined ?
        new Date(props.jobInfo.jobHistory[props.jobInfo.jobHistory.length - 1].scheduledAt).toISOString().substring(0, 16) :
        new Date(Date.now()).toISOString().substring(0, 16)


    const jobDisplay = NameDisplay()

    function NameDisplay() {
        const jobInfo = props.jobInfo.jobDetails.className.split(".")
        const classNameDisplay = jobInfo[jobInfo.length - 1]
        jobInfo.pop(classNameDisplay)
        const packetNameDisplay = jobInfo.join('.')
        return [packetNameDisplay, classNameDisplay]
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls="panel1a-content"
                    id="edit-job"
                >
                    <Typography>Edit Job</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl variant="standard">
                        <TextField
                            id="demo-helper-text-misaligned"
                            label="Packet name"
                            style={{width: "500px", marginBottom: "10px"}}
                            inputRef={packetName}
                            defaultValue={jobDisplay[0]}

                        />
                        <TextField
                            id="demo-helper-text-misaligned"
                            label="Class name"
                            style={{width: "500px", marginBottom: "10px"}}
                            inputRef={className}
                            defaultValue={jobDisplay[1]}

                        />

                        <TextField
                            id="demo-helper-text-misaligned"
                            label="Method name"
                            style={{width: "500px", marginBottom: "10px"}}
                            inputRef={methodName}
                            defaultValue={props.jobInfo.jobDetails.methodName}
                        />
                        {props.state !== 'SUCCEEDED' && props.state !== 'DELETED' && props.state !== 'FAILED' &&
                            <TextField
                                id="datetime-local"
                                label="Scheduled time"
                                type="datetime-local"
                                defaultValue={dateJob}
                                style={{width: "500px", marginBottom: "10px"}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputRef={date}
                            />
                        }


                        <Button variant="contained" endIcon={<Save/>} onClick={updateJob}>Update</Button>

                    </FormControl>


                </AccordionDetails>
            </Accordion>

        </div>
    );
}