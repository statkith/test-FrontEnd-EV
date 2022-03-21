import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DescriptionIcon from '@mui/icons-material/Description';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '60%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const MediaControlCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let title = props.title
  let subTitle = props.subTitle

  let image_link
  if (typeof props.imageLink != 'undefined') {
    image_link = props.imageLink
  }

  let summary = props.summary

  return (
    <>
      <React.Fragment>
        <Card id='box' sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {subTitle}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton id='btn1' aria-label="summary" onClick={handleOpen}>
                <DescriptionIcon />
              </IconButton>
              <IconButton aria-label="link">
                <LinkIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="more">
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={image_link}
            alt="Live from space album cover"
          />
        </Card>
      </React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {summary}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default MediaControlCard;
