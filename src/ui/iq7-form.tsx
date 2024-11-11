import React from 'react';
import {
    Control,
    FieldErrors,
    UseFormRegister,
    useForm,
    UseFormWatch,
    UseFormSetValue,
    UseFormReset,
    UseFormHandleSubmit,
    DefaultValues,
} from 'react-hook-form';

// Base form contract that all forms will have
export type Iq7FormBaseContract<TFormData extends Record<string, unknown>> = {
    control: Control<TFormData, unknown>;
    register: UseFormRegister<TFormData>;
    errors: FieldErrors<TFormData>;
    onCancel: (() => void) | undefined;
    watch: UseFormWatch<TFormData>;
    setValue: UseFormSetValue<TFormData>;
    reset: UseFormReset<TFormData>;
    handleSubmit: UseFormHandleSubmit<TFormData>;
};

// Function to create context with additional values
export function createIq7FormContext<
    TFormData extends Record<string, unknown>,
    TExtraContext = Record<string, unknown>
>() {
    const FormContext = React.createContext<
        (Iq7FormBaseContract<TFormData> & TExtraContext) | null
    >(null);

    function useFormContext() {
        const context = React.useContext(FormContext);
        if (!context) {
            throw new Error(
                'Form components must be used within their FormProvider'
            );
        }
        return context;
    }

    return [FormContext, useFormContext] as const;
}

export function Iq7Form<
    TFormData extends Record<string, unknown>,
    TExtraContext
>({
    context: FormContext,
    defaultValues,
    onSubmit,
    onFinished,
    children,
    className,
    extraContext = {} as TExtraContext,
}: {
    context: React.Context<
        (Iq7FormBaseContract<TFormData> & TExtraContext) | null
    >;
    defaultValues: DefaultValues<TFormData> | null | undefined;
    onSubmit: (data: TFormData) => Promise<void>;
    onFinished?: () => void;
    children: React.ReactNode;
    className?: string;
    extraContext?: TExtraContext;
}) {
    const safeDefaultValues = defaultValues || ({} as DefaultValues<TFormData>);

    const form = useForm<TFormData>({
        defaultValues: safeDefaultValues,
    });

    function handleCancel() {
        form.reset(safeDefaultValues);
        onFinished?.();
    }

    const baseProvider: Iq7FormBaseContract<TFormData> = {
        ...form,
        onCancel: handleCancel,
        errors: form.formState.errors,
    };

    const provider = {
        ...baseProvider,
        ...extraContext,
    };

    return (
        <FormContext.Provider value={provider}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
                {children}
            </form>
        </FormContext.Provider>
    );
}
