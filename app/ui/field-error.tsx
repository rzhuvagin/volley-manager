interface FieldErrorProps {
    id: string;
    errors?: string[];
}

export default function FieldError({ id, errors }: FieldErrorProps) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true">
            {errors &&
                errors.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}
        </div>
    );
}
