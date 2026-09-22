import React, { useState, useEffect } from 'react';

interface AudioWaveformProps {
  onRecorded: (transcript: string) => void;
  className?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  onRecorded,
  className = ''
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [levels, setLevels] = useState<number[]>(Array(48).fill(8));
  const [hasRecorded, setHasRecorded] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  useEffect(() => {
    let animInterval: any;
    if (isRecording && !isPaused) {
      animInterval = setInterval(() => {
        setLevels((prev) =>
          prev.map(() => Math.floor(Math.random() * 55) + 10)
        );
      }, 100);
    } else {
      setLevels(Array(48).fill(6));
    }
    return () => clearInterval(animInterval);
  }, [isRecording, isPaused]);

  const formatTimer = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRecording(true);
    setIsPaused(false);
    setSeconds(0);
    setHasRecorded(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
    setHasRecorded(true);
    onRecorded('Paint my room white for ₹8,000 by Friday.');
  };

  const handleReset = () => {
    setIsRecording(false);
    setIsPaused(false);
    setSeconds(0);
    setHasRecorded(false);
  };

  return (
    <div className={`p-6 bg-[#FFFFFF] border border-[#DCDCD6] rounded-[6px] ${className}`}>
      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-[#DCDCD6] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#171717] font-semibold">
            RECORD AGREEMENT
          </span>
          <span className="text-[11px] text-[#6B6B67] font-mono">/ PCM 48kHz</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isRecording
                  ? isPaused
                    ? 'bg-[#B45309]'
                    : 'bg-[#B91C1C]'
                  : 'bg-[#DCDCD6]'
              }`}
            />
            <span className="text-[10px] font-mono uppercase text-[#6B6B67]">
              {isRecording
                ? isPaused
                  ? 'PAUSED'
                  : 'REC'
                : hasRecorded
                ? 'CAPTURED'
                : 'STANDBY'}
            </span>
          </div>

          <div className="font-mono text-sm font-bold tracking-wider text-[#171717] bg-[#F7F7F4] px-2.5 py-0.5 border border-[#DCDCD6] rounded-[3px]">
            {formatTimer(seconds)}
          </div>
        </div>
      </div>

      {/* Level Meter / Waveform Bars */}
      <div className="h-20 w-full bg-[#151515] rounded-[4px] p-3 flex items-end justify-between gap-[2px] overflow-hidden">
        {levels.map((lvl, idx) => (
          <div
            key={idx}
            className={`w-full transition-all duration-75 ${
              isRecording
                ? isPaused
                  ? 'bg-[#6B6B67]'
                  : lvl > 48
                  ? 'bg-[#B91C1C]'
                  : 'bg-[#FFFFFF]'
                : hasRecorded
                ? 'bg-[#15803D]'
                : 'bg-[#2E2E2E]'
            }`}
            style={{ height: `${isRecording ? lvl : 6}%` }}
          />
        ))}
      </div>

      {/* Professional Controls */}
      <div className="mt-4 flex items-center justify-between gap-3">
        {!isRecording && !hasRecorded ? (
          <button
            type="button"
            onClick={handleStart}
            className="w-full py-2.5 px-4 rounded-[4px] bg-[#171717] hover:bg-[#2E2E2E] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            [ Start Recording ]
          </button>
        ) : isRecording ? (
          <div className="flex items-center gap-2 w-full">
            <button
              type="button"
              onClick={handlePauseResume}
              className="flex-1 py-2 px-3 rounded-[4px] bg-[#F7F7F4] hover:bg-[#EBEBE6] text-[#171717] border border-[#DCDCD6] font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              {isPaused ? '[ Resume ]' : '[ Pause ]'}
            </button>
            <button
              type="button"
              onClick={handleStop}
              className="flex-1 py-2 px-3 rounded-[4px] bg-[#B91C1C] hover:bg-[#991B1B] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              [ Stop & Process ]
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full gap-3">
            <div className="text-xs font-mono text-[#166534] bg-[#F0FDF4] px-3 py-1.5 border border-[#BBF7D0] rounded-[4px] flex-1">
              Captured: “Paint my room white for ₹8,000 by Friday.”
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="py-1.5 px-3 rounded-[4px] bg-[#F7F7F4] hover:bg-[#EBEBE6] text-[#171717] border border-[#DCDCD6] font-mono text-xs tracking-wider uppercase cursor-pointer"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
