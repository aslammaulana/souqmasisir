type Props = {
    current: 1 | 2 | 3;
};

export default function StepIndicator({ current }: Props) {
    return (
        <div className="flex items-center justify-center gap-0 px-6 py-6">
            {[1, 2, 3].map((step, i) => {
                const done = current > step;
                const active = current === step;
                return (
                    <div key={step} className="flex items-center">
                        {/* Circle */}
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all"
                            style={{
                                borderColor: active || done ? "#132a4c" : "#d1d5db",
                                color: active || done ? "#132a4c" : "#9ca3af",
                                backgroundColor: "transparent",
                            }}
                        >
                            {String(step).padStart(2, "0")}
                        </div>
                        {/* Dashed line between steps */}
                        {i < 2 && (
                            <div className="flex gap-0.5 mx-1">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <div
                                        key={j}
                                        className="w-3 h-[2px] rounded-full"
                                        style={{
                                            backgroundColor: done ? "#132a4c" : "#d1d5db",
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
