import React, { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Autocomplete,
  autocompleteClasses,
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Popper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList } from "react-window";
import { matchSorter } from "match-sorter";
import _ from "lodash";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const stockObj = { ...dataSet[1] };

  const symbol = <Typography variant='body1'>{stockObj.name} — {stockObj.exchange}</Typography>

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={symbol} />
      </ListItemButton>
    </ListItem>
  );
}

const OuterElementContext = createContext({});

const OuterElementType = forwardRef(function OuterELement(props, ref) {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });

  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

export default function Virtualize({ options }) {
  const OPTIONS = options.data;

  const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
      boxSizing: 'border-box',
      '& ul': {
        padding: 0,
        margin: 0,
      },
    },
  });


  // const updateQuery = e => setQuery(e?.target?.value);
  // const debounceOnChange = _.debounce(updateQuery, 500);

  const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['name', 'symbol']});

  return (
    <Autocomplete
      id="search-input"
      sx={{ width: "100%" }}
      disableListWrap
      filterOptions={filterOptions}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={OPTIONS}
      getOptionLabel={option => option.name}
      renderInput={(params) => (<TextField {...params} label="Search a symbol"/>)}
      renderOption={(props, option) => [props, option]}
      renderGroup={(params) => params}
    />
  );
}
