import * as React from 'react';
import { FC } from 'react';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

import ListItem from '@module/Dashboard/ListItem';
import {
    docsListItems,
    mainListItems,
    secondaryListItems,
} from '@module/Dashboard/listItems';

interface Props {
    selectedItem: string;
}

const SidebarList: FC<Props> = ({ selectedItem }) => (
    <List component="nav">
        {mainListItems.map((item) => (
            <ListItem
                key={item.title}
                item={item}
                selectedItem={selectedItem}
            />
        ))}
        <Divider sx={{ my: 1 }} />
        <ListSubheader component="div" inset>
            Documentation
        </ListSubheader>
        {docsListItems.map((item) => (
            <ListItem
                key={item.title}
                item={item}
                selectedItem={selectedItem}
            />
        ))}
        <Divider sx={{ my: 1 }} />
        <ListSubheader component="div" inset>
            Other
        </ListSubheader>
        {secondaryListItems.map((item) => (
            <ListItem
                key={item.title}
                item={item}
                selectedItem={selectedItem}
            />
        ))}
    </List>
);

export default SidebarList;
