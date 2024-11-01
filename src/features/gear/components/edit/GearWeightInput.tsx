import React, { useState } from 'react';
import { Input } from '@/ui/input';
import { cn, useFormatWeight } from '@/lib/utils';
import { useEditGearForm } from './EditGearForm';
import { Controller } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Button } from '@/ui/button';
import { PopoverArrow } from '@radix-ui/react-popover';
import { useAuth } from '@/features/auth/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Label } from '@/ui/label';

export function GearWeightInput2({ className }: { className?: string }) {
    const { register, errors } = useEditGearForm();
    return (
        <div className={cn('min-w-20', className)}>
            <div className='flex items-center gap-1'>
                <Input
                    type='number'
                    placeholder='Weight'
                    {...register('weight', {
                        required: 'Weight is required',
                        valueAsNumber: true,
                        min: {
                            value: 0,
                            message: 'Weight must be a positive number',
                        },
                    })}
                    aria-invalid={!!errors.weight}
                />
                <span className='text-sm font-semibold text-primary/70'>
                    oz
                </span>
            </div>
            {errors.weight && (
                <p className='text-sm text-red-600'>{errors.weight.message}</p>
            )}
        </div>
    );
}

export function GearWeightInput({ className }: { className?: string }) {
    const { profile } = useAuth();
    const preferredWeightFormat =
        (profile?.preferredWeightFormat || 'kg') === 'kg' ? 'kg+g' : 'lbs+oz';
    const { errors, control } = useEditGearForm();
    const formatWeight = useFormatWeight();
    const [open, setOpen] = useState(false);
    return (
        <div className={cn('min-w-20', className)}>
            <Controller
                name='weight'
                control={control}
                render={({ field: { onChange, value } }) => (
                    <div>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant='outline'
                                    aria-invalid={!!errors.weight}
                                >
                                    {formatWeight(+(value || 0))}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='xbg-muted p-2'>
                                <PopoverArrow />
                                <Tabs defaultValue={preferredWeightFormat}>
                                    <TabsContent value='kg+g' className='mt-0'>
                                        <KilogramsAndGramsForm
                                            grams={+(value || 0)}
                                            onChange={(v) => {
                                                onChange(v);
                                                setOpen(false);
                                            }}
                                        />
                                    </TabsContent>
                                    <TabsContent
                                        value='lbs+oz'
                                        className='mt-0'
                                    >
                                        <PoundsAndOuncesForm
                                            grams={+(value || 0)}
                                            onChange={(v) => {
                                                onChange(v);
                                                setOpen(false);
                                            }}
                                        />
                                    </TabsContent>
                                    <TabsList className='mx-auto w-fit justify-center self-center mt-1'>
                                        <TabsTrigger value={'kg+g'}>
                                            kg + g
                                        </TabsTrigger>
                                        <TabsTrigger value='lbs+oz'>
                                            lbs + oz
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
            />
            {errors.weight && (
                <p className='text-sm text-red-600'>{errors.weight.message}</p>
            )}
        </div>
    );
}

function PoundsAndOuncesForm({
    grams,
    onChange,
}: {
    grams: number;
    onChange: (value: number) => void;
}) {
    const defaultLbs = Math.floor(grams / 453.592);
    const [lbs, setLbs] = useState(defaultLbs);
    const defaultOz = Math.round((grams % 453.592) / 28.3495);
    const [oz, setOz] = useState(defaultOz);

    function handleSave() {
        const grams = lbs * 453.592 + oz * 28.3495;
        onChange(grams);
    }
    return (
        <div className='flex items-center gap-2'>
            <div className='flex gap-2 items-center bg-muted rounded border p-1 pr-2 mb-1'>
                <Input
                    id='lbs'
                    className='bg-background'
                    type='number'
                    placeholder='lbs'
                    value={lbs}
                    onChange={(e) => setLbs(+e.target.value)}
                />
                <Label htmlFor='lbs'>lbs</Label>
                <Input
                    id='oz'
                    className='bg-background'
                    type='number'
                    placeholder='oz'
                    value={oz}
                    onChange={(e) => setOz(+e.target.value)}
                />
                <Label htmlFor='oz'>oz</Label>
            </div>
            <Button onClick={handleSave}>Set</Button>
        </div>
    );
}

function KilogramsAndGramsForm({
    grams: initialGrams,
    onChange,
}: {
    grams: number;
    onChange: (value: number) => void;
}) {
    const [grams, setGrams] = useState(initialGrams % 1000);
    const initialKgs = Math.round(initialGrams / 1000);
    const [kgs, setKgs] = useState(initialKgs);
    function handleSave() {
        const totalGrams = kgs * 1000 + grams;
        onChange(totalGrams);
    }
    return (
        <div className='flex items-center gap-2'>
            <div className='flex gap-2 items-center bg-muted rounded border p-1 pr-2 mb-1'>
                <Input
                    id='kgs'
                    className='bg-background'
                    type='number'
                    placeholder='kg'
                    value={kgs}
                    onChange={(e) => setKgs(+e.target.value)}
                />
                <Label htmlFor='kgs'>kg</Label>
                <Input
                    id='g'
                    className='bg-background'
                    type='number'
                    placeholder='g'
                    value={grams}
                    onChange={(e) => setGrams(+e.target.value)}
                />
                <Label htmlFor='g'>g</Label>
            </div>
            <Button onClick={handleSave}>Set</Button>
        </div>
    );
}
