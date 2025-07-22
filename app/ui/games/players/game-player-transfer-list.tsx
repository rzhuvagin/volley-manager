'use client';

import { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { Player } from '@/app/lib/players/players.model';

function not(a: readonly string[], b: readonly string[]) {
    return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly string[], b: readonly string[]) {
    return a.filter((value) => b.includes(value));
}

function union(a: readonly string[], b: readonly string[]) {
    return [...a, ...not(b, a)];
}

interface GamePlayerTransferListProps {
    gamePlayers: string[];
    playersMap: Map<string, Player>;
    setPlayerList(newPlayerList: string[]): void;
}

export default function GamePlayerTransferList({
    gamePlayers,
    playersMap,
    setPlayerList,
}: GamePlayerTransferListProps) {
    const [checked, setChecked] = useState<readonly string[]>([]);
    const [left, setLeft] = useState<readonly string[]>(
        Array.from(playersMap.keys()).filter((id) => !gamePlayers.includes(id))
    );
    const [right, setRight] = useState<readonly string[]>(gamePlayers);
    useEffect(() => {
        setPlayerList([...right]);
    }, [right]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items: readonly string[]) =>
        intersection(checked, items).length;

    const handleToggleAll = (items: readonly string[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (
        title: React.ReactNode,
        items: readonly string[],
        allowSelectAll: boolean
    ) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    allowSelectAll && (
                        <Checkbox
                            onClick={handleToggleAll(items)}
                            checked={
                                numberOfChecked(items) === items.length &&
                                items.length !== 0
                            }
                            indeterminate={
                                numberOfChecked(items) !== items.length &&
                                numberOfChecked(items) !== 0
                            }
                            disabled={items.length === 0}
                            inputProps={{
                                'aria-label': 'all items selected',
                            }}
                        />
                    )
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: 300,
                    height: 580,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value: string) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItemButton
                            key={value}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.includes(value)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={`${playersMap.get(value)?.name} ${
                                    playersMap.get(value)?.lastname || ''
                                }`}
                                secondary={
                                    playersMap.get(value)?.tg &&
                                    `${playersMap.get(value)?.tg}`
                                }
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );

    return (
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <Grid>{customList('Choices', left, false)}</Grid>
            <Grid>
                <Grid
                    container
                    direction="column"
                    sx={{ alignItems: 'center' }}
                >
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid>{customList('Chosen', right, true)}</Grid>
        </Grid>
    );
}
