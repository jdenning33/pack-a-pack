import { WeightType } from '@/lib/appTypes';
import { Button, ButtonSize, ButtonVariant } from '@/ui/button';
import { Shirt, Tent, Utensils } from 'lucide-react';

export function EditWeightTypeToggle({
    weightType,
    onChange,
    buttonSize = 'default',
    activeButtonVariant = 'secondary',
    inactiveButtonVariant = 'outline',
    activeButtonClassName,
    inactiveButtonClassName,
}: {
    weightType: WeightType;
    onChange: (value: WeightType) => void;
    buttonSize?: ButtonSize;
    activeButtonVariant?: ButtonVariant;
    inactiveButtonVariant?: ButtonVariant;
    activeButtonClassName?: string;
    inactiveButtonClassName?: string;
}) {
    return (
        <div className='flex [&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md'>
            <Button
                type='button'
                size={buttonSize}
                variant={
                    weightType == 'base'
                        ? activeButtonVariant
                        : inactiveButtonVariant
                }
                className={
                    weightType == 'base'
                        ? activeButtonClassName
                        : inactiveButtonClassName
                }
                onClick={() => onChange('base')}
                title='Mark as Base Weight'
            >
                <Tent size={14} />
            </Button>
            <Button
                type='button'
                size={buttonSize}
                variant={
                    weightType == 'wearable'
                        ? activeButtonVariant
                        : inactiveButtonVariant
                }
                className={
                    weightType == 'wearable'
                        ? activeButtonClassName
                        : inactiveButtonClassName
                }
                onClick={() => onChange('wearable')}
                title='Mark as Worn Weight'
            >
                <Shirt size={14} />
            </Button>
            <Button
                type='button'
                size={buttonSize}
                variant={
                    weightType == 'consumable'
                        ? activeButtonVariant
                        : inactiveButtonVariant
                }
                className={
                    weightType == 'consumable'
                        ? activeButtonClassName
                        : inactiveButtonClassName
                }
                onClick={() => onChange('consumable')}
                title='Mark as Consumable Weight'
            >
                <Utensils size={14} />
            </Button>
        </div>
    );
}
