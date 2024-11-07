import { Button } from '@/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from '@/ui/dialog';
import React, { useContext } from 'react';
import { PackStatsModalContent } from './PackStatsModalContent';

const PackStatsModalContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}>({
    isOpen: false,
    setIsOpen: () => {},
});

export function PackStatsModal({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <PackStatsModalContext.Provider value={{ isOpen, setIsOpen }}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {children}
                <DialogContent>
                    <DialogHeader>Pack Stats</DialogHeader>
                    <PackStatsModalContent />
                    <DialogFooter>
                        <Button onClick={() => setIsOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </PackStatsModalContext.Provider>
    );
}

export function PackStatsModalTrigger(
    dialogTriggerProps: React.ComponentProps<typeof DialogTrigger>
) {
    const { setIsOpen } = useContext(PackStatsModalContext)!;
    return (
        <DialogTrigger
            onClick={() => setIsOpen(true)}
            {...dialogTriggerProps}
        />
    );
}
