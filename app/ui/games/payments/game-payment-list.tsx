import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { Player } from '@/app/lib/players/players.model';

interface GamePaymentListProps {
    payments: Record<string, boolean>;
    playersMap: Map<string, Player>;

    setIsPaid(playerId: string, isPaid: boolean): void;
}

export default function GamePaymentList({
    payments,
    playersMap,
    setIsPaid,
}: GamePaymentListProps) {
    return (
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
            {Object.entries(payments).map(([playerId, isPaid]) => (
                <ListItem key={playerId}>
                    <ListItemText
                        primary={`${playersMap.get(playerId)?.name} ${
                            playersMap.get(playerId)?.lastname || ''
                        }`}
                    />
                    <Checkbox
                        checked={isPaid}
                        onChange={(_, checked) => {
                            setIsPaid(playerId, checked);
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );
}
