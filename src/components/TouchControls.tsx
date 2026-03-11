import type { FC } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronsDown, RotateCw } from 'lucide-react';

interface TouchControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotate: () => void;
  onSoftDrop: () => void;
  onHardDrop: () => void;
  disabled?: boolean;
}

const ControlButton: FC<{
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  label: string;
  className?: string;
}> = ({ onPress, disabled, children, label, className = '' }) => {
  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!disabled) onPress();
  };

  return (
    <button
      aria-label={label}
      onPointerDown={disabled ? undefined : onPress}
      onTouchStart={handleTouch}
      disabled={disabled}
      className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gray-700
        active:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed
        touch-none select-none text-white transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export const TouchControls: FC<TouchControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  onRotate,
  onSoftDrop,
  onHardDrop,
  disabled,
}) => {
  return (
    <div className="flex md:hidden flex-col items-center gap-3 py-4">
      {/* Top row: rotate + hard drop */}
      <div className="flex gap-4">
        <ControlButton onPress={onRotate} disabled={disabled} label="Rotate">
          <RotateCw className="w-6 h-6" />
        </ControlButton>
        <ControlButton onPress={onHardDrop} disabled={disabled} label="Hard drop">
          <ChevronsDown className="w-6 h-6" />
        </ControlButton>
      </div>

      {/* Bottom row: left, soft drop, right */}
      <div className="flex gap-4">
        <ControlButton onPress={onMoveLeft} disabled={disabled} label="Move left">
          <ChevronLeft className="w-6 h-6" />
        </ControlButton>
        <ControlButton onPress={onSoftDrop} disabled={disabled} label="Soft drop">
          <ChevronDown className="w-6 h-6" />
        </ControlButton>
        <ControlButton onPress={onMoveRight} disabled={disabled} label="Move right">
          <ChevronRight className="w-6 h-6" />
        </ControlButton>
      </div>
    </div>
  );
};
