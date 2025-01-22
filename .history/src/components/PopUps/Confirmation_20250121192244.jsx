import React, {useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import { InfoOutlined } from '@mui/icons-material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import Button from '@mui/material/Button';
import Overlay from '../Overlay/Overlay';

const Confirmation = ({ open, onClose, text, onConfirm }) => {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(open);
    // https://mui.com/material-ui/react-alert/
    const option = {
        info: {
            type: "info",
            logo: <InfoOutlined style={{ color: "rgb(43, 147, 213)" }} />,
            logoColor: "rgb(43, 147, 213)",
            textColor: "rgb(2, 67,96)",
            divColor: "rgb(229, 245, 253)",
            buttons: [
                {text: "Confirm", onAction: ()=>console.log("confirm has been pressed"), color: "success"},
            ]
        },
        warning: {
            type: "warning",
            logo: <ReportProblemOutlinedIcon style={{ color: "rgb(239,123,41)" }} />,
            logoColor: "rgb(239,123,41)",
            textColor: "rgb(142,107,66)",
            divColor: "rgb(255,243,229)",
            buttons: [
                {text: "Cancel", onAction: ()=>onClose(), color: "error"},
                {text: "Confirm", onAction: ()=>onConfirm(), color: "success"},
            ]
        },
    }
    if (!open) {
        return;
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        backgroundColor: "white",
        minHeight: "100px",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        zIndex: "12", 
    };
    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
    }
    const handleConfirmAction = () => {
        console.log("Hello");
    }
    return (

        // <div style={{ 
        //     position: "fixed",
        //     top: "0",
        //     left: "0",
        //     width: "100%",
        //     height: "100%",
        //     background: "rgba(0, 0, 0, 0.1)",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     zIndex: "10",
        // }}
        //     onClick={()=>{onClose()}}
        // >
        //     <div style={{...style, backgroundColor: option.warning.divColor}} onClick={(e)=>e.stopPropagation()}>
        //         <div style={{display:"flex", flexDirection:"row"}}>
        //             <div>
        //                 {option.warning.logo}
        //             </div>
        //             <div style={{flexGrow: "1", display:"flex", flexDirection: "column", marginLeft:"10px"}}>
        //                 <div style={{ color: option.warning.textColor, marginBottom:"10px", fontFamily:"Roboto", fontSize:"20px", fontWeight:"500", lineHeight:"24px" }}>Warning</div>
        //                 <div style={{color: option.warning.textColor, flexGrow: "1", fontFamily:"Roboto", fontSize:"16px", fontWeight:"400", lineHeight:"24px"}}>
        //                     {text}
        //                 </div>
        //             </div>
                    
        //         </div>
        //         <div style={{display:"flex", justifyContent:"flex-end", height: "40px", marginTop:"10px"}}>
        //             {/* <Button color="error" style={{marginRight:"10px"}} onClick={()=>{}}>Cancel</Button>
        //             <Button disabled={false} variant="contained" color="success" onClick={() => { }}>Create</Button> */}

        //             {option.warning.buttons.map((button, index)=>{
        //                 if(button.color === 'error'){
        //                     return <Button key={index} color="error" style={{marginRight:"10px"}} onClick={()=>button.onAction()}>Cancel</Button>
        //                 }else{
        //                     return <Button key={index} disabled={false} variant="contained" color={button.color} onClick={()=>button.onAction()}>Create</Button>
        //                 }
                        
        //             })}
        //       </div>
        //     </div>
        // </div>
        
        <div style={{ padding: '20px' }}>
      
      <Confirmation
                open={isConfirmationOpen}
                isVisible={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        text="Are you sure you want to proceed with this action?"
        onConfirm={handleConfirmAction}
      />
    </div>
        
      );
}

export default Confirmation;