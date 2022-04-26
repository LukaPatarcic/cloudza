import { FC } from 'react';

import Link from 'next/link';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Item } from '@type/components/ListItemProps';

interface Prop {
    item: Item;
    selectedItem: string;
}

const ListItem: FC<Prop> = ({ item, selectedItem }) => (
    <Link href={item.href} passHref>
        <ListItemButton selected={item.title === selectedItem}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
        </ListItemButton>
    </Link>
);

export default ListItem;
