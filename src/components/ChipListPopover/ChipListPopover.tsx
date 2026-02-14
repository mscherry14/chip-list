import {
  useFloating,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  useMergeRefs,
  FloatingPortal,
  offset,
  flip,
  shift,
} from "@floating-ui/react";
import { useState, useMemo, createContext, useContext } from "react";
import styles from "./ChipListPopover.module.css";
import type {
  TriggerColor,
  TriggerSize,
  TriggerVariant,
} from "./ChipListPopover.types";
import MoreIcon from "../../assets/MoreIcon";
import { cx } from "../../utils/cx";
import type { ExpandProps } from "../../utils/ExpandProps";

function usePopover() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-end",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    ancestorScroll: true,
  }); 
  const role = useRole(context, { role: "select" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      refs,
      floatingStyles,
      context,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      isOpen,
      setIsOpen,
      refs,
      floatingStyles,
      context,
      getReferenceProps,
      getFloatingProps,
    ],
  );
}

type PopoverContextType = ReturnType<typeof usePopover> | null;

const PopoverContext = createContext<PopoverContextType>(null);

const usePopoverContext = () => {
  const context = useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

interface ChipListPopoverProps {
  children: React.ReactNode;
}

const ChipListPopover: React.FC<ChipListPopoverProps> = ({ children }) => {
  const popover = usePopover();
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
};

interface ChipListPopoverTriggerProps {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;

  color?: TriggerColor;
  variant?: TriggerVariant;
  size?: TriggerSize;
}

const ChipListPopoverTrigger: React.FC<ExpandProps<ChipListPopoverTriggerProps, HTMLButtonElement>> = ({
  children,
  ref: propRef,

  color = "neutral",
  variant = "filled",
  size = "medium",

  ...props
}) => {
  const context = usePopoverContext();
  const ref = useMergeRefs([context.refs.setReference, propRef]);

  return (
    <button
      ref={ref}
      type="button"
      {...context.getReferenceProps({
        ...props,
        className: cx(
          styles.trigger,
          styles[`variant-${variant}`],
          styles[`size-${size}`],
          styles[`color-${color}`],
          props?.className,
        ),
      })}
    >
      <MoreIcon className={cx(styles[`icon-size-${size}`])} />

      {children}
    </button>
  );
};

interface ChipListPopoverContentProps {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const ChipListPopoverContent: React.FC<
  ExpandProps<ChipListPopoverContentProps, HTMLDivElement>
> = ({ children, ref: propRef, ...props }) => {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={floatingContext} modal={false}>
        <div
          ref={ref}
          style={{ ...context.floatingStyles }}
          {...context.getFloatingProps({
            ...props,
            className: cx(styles.content, props?.className),
          })}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};

export { ChipListPopover, ChipListPopoverTrigger, ChipListPopoverContent };
