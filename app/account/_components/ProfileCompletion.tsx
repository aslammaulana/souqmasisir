type Props = {
    completedSteps: number;
    totalSteps: number;
};

export default function ProfileCompletion({ completedSteps, totalSteps }: Props) {
    const stepsLeft = totalSteps - completedSteps;

    return (
        <div className="px-5 mb-6">
            <p className="text-gray-900 font-bold text-base mb-3">
                {stepsLeft} steps left
            </p>
            {/* Progress bar */}
            <div className="flex gap-1.5 mb-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                        key={i}
                        className="h-2 flex-1 rounded-full"
                        style={{ backgroundColor: i < completedSteps ? "#f0c800" : "#e5e7eb" }}
                    />
                ))}
            </div>
            <p className="text-gray-400 text-xs">
                We are built on trust, Help one another to get to know other better
            </p>
        </div>
    );
}
