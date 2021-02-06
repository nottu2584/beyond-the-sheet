import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { Abilities, Currencies, SpellBook, Spells } from "../";
import { GroupAbilities } from "../GroupAbilities";
import { GroupCurrencies } from "../GroupCurrencies";
import { GroupInventory } from "../GroupInventory";
import { GroupStatus } from "../GroupStatus";
import { Status, StatusCard } from "../Status";
import { SpellCard } from "../SpellCard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const Characters = (props) => {
  const { characters } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Paper elevation={3}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Abilities" {...a11yProps(0)} />
          <Tab label="Status" {...a11yProps(1)} />
          <Tab label="Inventory" {...a11yProps(2)} />
          <Tab label="Currencies" {...a11yProps(3)} />
          <Tab label="Spells" {...a11yProps(4)} />
        </Tabs>
        <LinearProgress />
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <GroupAbilities>
              {characters.map((character, key) => {
                return (
                  <Abilities
                    key={key}
                    avatar={character.data.avatarUrl}
                    characterName={character.data.name}
                    race={character.data.race.baseRaceName}
                    hitPoints={character.hitPoints}
                    armorClass={character.armorClass}
                    conditions={character.conditions}
                    experience={character.experience}
                    levels={character.levels}
                    gender={character.data.gender}
                    abilities={character.abilities}
                    initiative={character.initiative}
                    savingThrows={character.savingThrows}
                    skills={character.skills}
                  ></Abilities>
                );
              })}
            </GroupAbilities>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <GroupStatus>
              {characters.map((character, key) => {
                return (
                  <Status
                    avatar={character.data.avatarUrl}
                    characterName={character.data.name}
                    key={key}
                    hitPoints={character.hitPoints}
                    race={character.data.race.baseRaceName}
                    levels={character.levels}
                    gender={character.data.gender}
                    armorClass={character.armorClass}
                    experience={character.experience}
                    conditions={character.conditions}
                  ></Status>
                );
              })}
            </GroupStatus>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <GroupInventory characters={characters}></GroupInventory>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <GroupCurrencies characters={characters}>
              {characters.map((character, key) => {
                return (
                  <Currencies
                    key={key}
                    avatar={character.data.avatarUrl}
                    characterName={character.data.name}
                    race={character.data.race.baseRaceName}
                    hitPoints={character.hitPoints}
                    armorClass={character.armorClass}
                    conditions={character.conditions}
                    experience={character.experience}
                    levels={character.levels}
                    gender={character.data.gender}
                    pp={character.data.currencies.pp}
                    gp={character.data.currencies.gp}
                    ep={character.data.currencies.ep}
                    sp={character.data.currencies.sp}
                    cp={character.data.currencies.cp}
                  ></Currencies>
                );
              })}
            </GroupCurrencies>
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            {characters.map((character, key) => {
              return character.data.classes.map((characterClass, key) => {
                return (
                  <SpellBook
                    key={key}
                    cantripsKnown={
                      characterClass.definition.spellRules
                        .levelCantripsKnownMaxes[characterClass.level]
                    }
                    spellsKnown={
                      characterClass.definition.spellRules.levelSpellKnownMaxes[
                        characterClass.level
                      ]
                    }
                    spellSlots={
                      characterClass.definition.spellRules.levelSpellSlots[
                        characterClass.level
                      ]
                    }
                    characterName={character.data.name}
                    avatar={character.data.avatarUrl}
                  >
                    {character.data.classSpells.map((classSpells, key) => {
                      return classSpells.spells.map((spell, key) => {
                        return (
                          <Spells
                            key={key}
                            name={spell.definition.name}
                            time={spell.activation.activationType}
                            lvl={spell.definition.level}
                            duration={
                              spell.definition.duration.durationUnit
                                ? spell.definition.duration.durationInterval +
                                  " " +
                                  spell.definition.duration.durationUnit
                                : null
                            }
                            range={
                              spell.definition.range.rangeValue
                                ? spell.definition.range.rangeValue
                                : spell.definition.range.origin
                            }
                            components={spell.definition.components}
                            DC={spell.definition.saveDcAbilityId}
                          ></Spells>
                        );
                      });
                    })}
                  </SpellBook>
                );
              });
            })}
          </TabPanel>
        </SwipeableViews>
      </Paper>

      <SpellCard
        spellName={"Fire Ball"}
        avatar={
          "https://www.dndbeyond.com/avatars/6984/464/637026335031473780.png?width=150&height=150&fit=crop&quality=95&auto=webp"
        }
        characterName={"Oz de Mezro"}
      ></SpellCard>

      {/* <StatusCard
        avatar={
          "https://www.dndbeyond.com/avatars/6984/464/637026335031473780.png?width=150&height=150&fit=crop&quality=95&auto=webp"
        }
        characterName={"Oz de Mezro"}
        conditions={["exaustion", "rapapa"]}
        hitPoints={{
          base: 10,
          // bonuses: [
          //   {
          //     description: "Tough",
          //     value: 10,
          //   }
          // ],
          current: 8,
          max: 10,
          temp: 0,
        }}
        armorClass={15}
        experience={1222}
        levels={{
          classes: [
            {
              name: "Bard",
              level: 10,
            },
          ],
          total: 10,
        }}
        gender={"Machote"}
        race={"Dimoni"}
      ></StatusCard> */}
    </>
  );
};

export default Characters;
