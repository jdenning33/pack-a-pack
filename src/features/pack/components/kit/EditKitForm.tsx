import React, { useState, useEffect } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { usePack } from '../../hooks/usePack';
import { Kit } from '@/lib/appTypes';

export const EditKitForm = ({
    kit,
    onFinished,
}: {
    kit?: Kit;
    onFinished?: () => void;
}) => {
    const [kitName, setKitName] = useState('');
    const [kitDescription, setKitDescription] = useState('');
    const { pack, addKit, updateKit } = usePack();

    useEffect(() => {
        if (kit) {
            setKitName(kit.name);
            setKitDescription(kit.description || '');
        }
    }, [kit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (kitName.trim()) {
            const kitData = {
                name: kitName,
                description: kitDescription,
                isDeleted: false,
                items: kit ? kit.items : [],
            };

            if (kit) {
                await updateKit({ ...kit, ...kitData });
            } else {
                await addKit({ ...kitData, packId: pack.id });
            }

            onFinished?.();
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
                placeholder='Kit Name'
                value={kitName}
                onChange={(e) => setKitName(e.target.value)}
                required
            />
            <Textarea
                placeholder='Kit Description (optional)'
                value={kitDescription}
                onChange={(e) => setKitDescription(e.target.value)}
            />
            <div className='flex justify-end space-x-2'>
                <Button type='button' variant='outline' onClick={onFinished}>
                    Cancel
                </Button>
                <Button type='submit'>{kit ? 'Update Kit' : 'Add Kit'}</Button>
            </div>
        </form>
    );
};
