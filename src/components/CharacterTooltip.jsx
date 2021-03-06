import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import React, { useState } from "react";
import { Status } from ".";

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

const CharacterTooltip = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [disableHover, setHover] = useState(false);
  
  const {
    avatar,
    characterName,
    armorClass,
    conditions,
    experience,
    gender,
    hitPoints,
    levels,
    race,
    hover
  } = props;

  const handleClick = () => {
    setOpen(true);
    setHover(true);
  };

  const handleClose = () => {
    setOpen(false);
    setHover(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip 
    open={open}
    disableHoverListener={disableHover}
    onOpen={hover ? handleOpen : null}
    onClose={handleClose}
    onClick={handleClick}
    title={
      <Status
          card
          avatar={avatar}
          characterName={characterName}
          hitPoints={hitPoints}
          armorClass={armorClass}
          experience={experience}
          levels={levels}
          gender={gender}
          race={race}
          conditions={conditions}
        ></Status>
      }
    >
      <Chip
        avatar={
          <Avatar alt={characterName} src={avatar} className={classes.avatar} />
        }
        label={characterName}
        variant="outlined"
      />
    </Tooltip>
  );
};

export default CharacterTooltip;
